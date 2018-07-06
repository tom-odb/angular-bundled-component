import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public fieldControl = new FormControl();
  public fieldType = 'slug';

  public handleChange(value: any) {
    console.log(value);
  }
}
