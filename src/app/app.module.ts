import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule }   from '@angular/forms';
import { routing } from './routing';
import { DeviceDetailComponent } from './devices/device-detail.component';
import { DevicesComponent } from './devices/devices.component';
import { AddDevicesComponent }      from '../app/devices/addDevice/add_device';
import { HttpModule }    from '@angular/http';
import {AngularFireModule, AuthProviders, AuthMethods} from "angularfire2";
import { MaterialModule } from '@angular/material';

// Must export the config
export const firebaseConfig = {
    apiKey: "AIzaSyDzexd0WYSFaGeoJiolu3qNCSBLOjc3k9s",
    authDomain: "devicecupboard.firebaseapp.com",
    databaseURL: "https://devicecupboard.firebaseio.com",
    storageBucket: "devicecupboard.appspot.com",
    messagingSenderId: "76395876829"
};

const myFirebaseAuthConfig = {
    provider: AuthProviders.Google,
    method: AuthMethods.Redirect
};


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig),
      MaterialModule.forRoot()
  ],
  declarations: [
    AppComponent,
    DeviceDetailComponent,
    DevicesComponent,
    AddDevicesComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
