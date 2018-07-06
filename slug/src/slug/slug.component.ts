import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { SlugifyPipe } from 'ngx-pipes';

@Component({
  selector: 'slug-field',
  templateUrl: './slug.component.html',
  providers: [
    SlugifyPipe,
  ],
})
export class SlugFieldComponent implements OnInit {
  @Input() public control: FormControl;
  @Input() public id = 'slug';
  @Input() public name = 'slug';
  @Input() public label;
  @Input() public placeholder;

  public input = '';
  public slug = '';

  constructor(
    private slugify: SlugifyPipe,
  ) {}

  public ngOnInit(): void {
    this.input = this.control.value;

    this.handleInputChange(false);
  }

  public handleInputChange(shouldUpdate: boolean = true): void {
    this.slug = this.slugify.transform(this.input);

    if (shouldUpdate) {
      this.control.setValue(this.slug);
    }
  }
}
