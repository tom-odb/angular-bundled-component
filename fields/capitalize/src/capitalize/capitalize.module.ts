import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgPipesModule } from 'ngx-pipes';


import { CapitalizeFieldComponent } from './capitalize.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgPipesModule,
  ],
  declarations: [
    CapitalizeFieldComponent,
  ],
  exports: [
    CapitalizeFieldComponent,
  ],
})
export class CapitalizeFieldModule {}
