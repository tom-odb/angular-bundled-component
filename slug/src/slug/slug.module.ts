import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgPipesModule } from 'ngx-pipes';


import { SlugFieldComponent } from './slug.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgPipesModule,
  ],
  declarations: [
    SlugFieldComponent,
  ],
  exports: [
    SlugFieldComponent,
  ],
})
export class SlugFieldModule {}
