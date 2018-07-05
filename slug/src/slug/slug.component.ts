import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import { SlugifyPipe } from 'ngx-pipes';

@Component({
  selector: 'slug-field',
  templateUrl: './slug.component.html',
  providers: [
    SlugifyPipe,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SlugFieldComponent),
      multi: true,
    },
  ],
})
export class SlugFieldComponent implements ControlValueAccessor {
  @Input() public id = 'slug';
  @Input() public name = 'slug';
  @Input() public label;
  @Input() public placeholder;

  public input = '';
  public slug = '';
  public onChange: (..._) => any = () => {};

  constructor(
    private slugify: SlugifyPipe,
  ) {}

  public registerOnChange(onChange: (..._) => any): void {
    this.onChange = onChange;
  }

  public registerOnTouched(): void {}

  public writeValue(value: any): void {
    this.slug = this.input = this.slugify.transform(value);
  }

  public handleInputChange(): void {
    this.slug = this.slugify.transform(this.input);

    this.onChange(this.slug);
  }
}
