import {
  Component,
  Input,
  Output,
  OnChanges,
  OnDestroy,
  ViewContainerRef,
  ViewChild,
  ComponentRef,
  ComponentFactoryResolver,
  EventEmitter,
  ComponentFactory,
  Injector,
  SimpleChanges,
} from '@angular/core';
import { FormControl } from '@angular/forms';

import { FieldLoaderService } from './loader';

@Component({
  selector: 'field', // tslint:disable-line:component-selector
  template: '<ng-template #fieldContainer></ng-template>',
})
export class FieldComponent implements OnChanges, OnDestroy {
  @Input() public control: FormControl;
  @Input() public type: string;

  @Output() public modelChange: EventEmitter<any> = new EventEmitter();
  @ViewChild('fieldContainer', { read: ViewContainerRef }) fieldContainer: ViewContainerRef;

  private componentRef: ComponentRef<any> = null;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private fieldLoaderService: FieldLoaderService,
    private injector: Injector,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    const currentType = changes.type ? changes.type.currentValue : null;
    const previousType = changes.type ? changes.type.previousValue : null;

    if (currentType !== previousType) {
      setTimeout(() => this.createFieldComponent());

      return;
    }

    if (this.componentRef) {
      Object.assign(this.componentRef.instance, {
        control: this.control,
        modelChange: this.modelChange,
      });
    }
  }

  ngOnDestroy(): void {
    this.componentRef.destroy();
  }

  private createFieldComponent(): Promise<ComponentRef<any>> {
    if (this.componentRef) {
      this.componentRef.destroy();
    }

    return new Promise((resolve, reject) => {
      this.fieldLoaderService
        .load(this.type)
        .then((fieldFactory) => {
          resolve(this.createComponent(this.fieldContainer, fieldFactory));
        }).catch((err) => {
          reject(err);
        });
    });
  }

  private createComponent(fieldContainer: ViewContainerRef, component: any): ComponentRef<any> {
    // Get component factory so we can create the component
    const componentFactory = component instanceof ComponentFactory ?
      component : this.componentFactoryResolver.resolveComponentFactory(component);
    // append the component to the template with hash #fieldContainer
    const ref = <ComponentRef<any>>fieldContainer.createComponent(componentFactory, null, this.injector, null);

    Object.assign(ref.instance, {
      control: this.control,
      modelChange: this.modelChange,
    });

    this.componentRef = ref;

    return ref;
  }
}
