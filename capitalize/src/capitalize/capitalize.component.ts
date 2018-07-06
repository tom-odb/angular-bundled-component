import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { UcWordsPipe } from 'ngx-pipes';

@Component({
  selector: 'capitalize-field',
  templateUrl: './capitalize.component.html',
  providers: [
    UcWordsPipe,
  ],
})
export class CapitalizeFieldComponent implements OnInit {
  @Input() public control: FormControl;
  @Input() public id = 'capitalized';
  @Input() public name = 'capitalized';
  @Input() public label;
  @Input() public placeholder;

  public input = '';
  public capitalized = '';

  constructor(
    private capitalize: UcWordsPipe,
  ) {}

  public ngOnInit(): void {
    this.input = this.control.value;

    this.handleInputChange(false);
  }

  public handleInputChange(shouldUpdate: boolean = true): void {
    this.capitalized = this.capitalize.transform(this.input);

    if (shouldUpdate) {
      this.control.setValue(this.capitalized);
    }
  }
}
