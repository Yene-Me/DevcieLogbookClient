import { Component } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { NgModule } from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {Router} from "@angular/router";


@NgModule({
  imports: [MaterialModule.forRoot()]
})

@Component({
  selector: 'my-app',
  templateUrl: './dashboard.html'
})

export class AppComponent {
  title = 'Device List';

  constructor(public af: AngularFire,private router: Router) {}

  logout()
  {
      this.af.auth.logout();
      this.router.navigateByUrl('login');
  }

}
