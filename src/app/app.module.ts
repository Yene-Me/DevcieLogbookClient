import {NgModule} from '@angular/core';
import {BrowserModule}  from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {FormsModule}   from '@angular/forms';
import {routing} from './routing';
import {DeviceDetailComponent} from './devices/detailDevice/device-detail.component';
import {DevicesComponent} from './devices/listDevice/devices.component';
import {LoginComponent} from './auth/login/login.component';
import {AddDevicesComponent}      from '../app/devices/addDevice/add_device';
import {HttpModule}    from '@angular/http';
import {AngularFireModule, AuthProviders, AuthMethods} from "angularfire2";
import {MaterialModule} from '@angular/material';
import {AuthGuard} from './authGaurd';
import {RegisterComponent} from "./auth/register/register.component";
import {ErrorDialog} from "./utils/dialog/dislog.component";
import {DeviceFilterPipe} from "./devices/filter.pipe";
import {LogFilterPipe} from "./devices/logFilter.pipe";
import {ImageGuessPipe} from "./devices/imageGuess.pipe";
import {SortDevicesPipe} from "./devices/sortDevices.pipe";
import {InfiniteScrollModule} from 'angular2-infinite-scroll';
import {SideMenuComponent} from'./sideMenu/side.menu.component'

// Must export the config
export const firebaseConfig = {
    apiKey: "AIzaSyDzexd0WYSFaGeoJiolu3qNCSBLOjc3k9s",
    authDomain: "devicecupboard.firebaseapp.com",
    databaseURL: "https://devicecupboard.firebaseio.com",
    storageBucket: "devicecupboard.appspot.com",
    messagingSenderId: "76395876829"
};

const myFirebaseAuthConfig = {
    provider: AuthProviders.Password,
    method: AuthMethods.Password
};


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        routing,
        HttpModule,
        AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig),
        MaterialModule.forRoot(),
        InfiniteScrollModule,
    ],
    declarations: [
        AppComponent,
        DeviceDetailComponent,
        DevicesComponent,
        LoginComponent,
        RegisterComponent,
        AddDevicesComponent,
        ErrorDialog,
        DeviceFilterPipe,
        ImageGuessPipe,
        SortDevicesPipe,
        LogFilterPipe,
        SideMenuComponent

    ],
    bootstrap: [AppComponent],
    providers: [AuthGuard],
    entryComponents: [
        ErrorDialog
    ]
})
export class AppModule {
}
