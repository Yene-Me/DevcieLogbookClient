import { Component } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { NgModule } from '@angular/core';


@NgModule({
  imports: [MaterialModule.forRoot()]
})


@Component({
  selector: 'my-app',
  templateUrl: './dashboard.html'
})



export class AppComponent {
  title = 'Device List'
}
