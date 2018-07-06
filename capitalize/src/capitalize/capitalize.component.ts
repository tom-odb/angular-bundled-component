import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import { UcWordsPipe } from 'ngx-pipes';

@Component({
  selector: 'capitalize-field',
  templateUrl: './capitalize.component.html',
  providers: [
    UcWordsPipe,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CapitalizeFieldComponent),
      multi: true,
    },
  ],
})
export class CapitalizeFieldComponent implements ControlValueAccessor {
  @Input() public id = 'capitalized';
  @Input() public name = 'capitalized';
  @Input() public label;
  @Input() public placeholder;

  public input = '';
  public capitalized = '';
  public onChange: (..._) => any = () => {};

  constructor(
    private capitalize: UcWordsPipe,
  ) {}

  public registerOnChange(onChange: (..._) => any): void {
    this.onChange = onChange;
  }

  public registerOnTouched(): void {}

  public writeValue(value: any): void {
    this.capitalized = this.input = this.capitalize.transform(value);
  }

  public handleInputChange(): void {
    this.capitalized = this.capitalize.transform(this.input);

    this.onChange(this.capitalized);
  }
}
