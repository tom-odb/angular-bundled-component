import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { FieldLoaderService } from './loader';
import { FieldComponent } from './field.component';

@NgModule({
  declarations: [
    AppComponent,
    FieldComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    FieldLoaderService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
