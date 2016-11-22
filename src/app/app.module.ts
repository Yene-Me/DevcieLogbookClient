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
import {AdminComponent} from'./admin/admin.components'
import {Gravatar} from 'ng2-gravatar-directive';
import {UserDetailsComponent} from './users/user-details.component';
import {EditDeviceComponent} from "./devices/editDevice/edit-device.component";



// Must export the config
export const firebaseConfig = {
    apiKey: "AIzaSyB-5Ix5P6X2_QomeVJ6pXcv6y2kvNcQz8g",
    authDomain: "devicecupboard-886c1.firebaseapp.com",
    databaseURL: "https://devicecupboard-886c1.firebaseio.com",
    storageBucket: "devicecupboard-886c1.appspot.com",
    messagingSenderId: "583616200696"
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
        EditDeviceComponent,
        DevicesComponent,
        LoginComponent,
        RegisterComponent,
        AddDevicesComponent,
        ErrorDialog,
        DeviceFilterPipe,
        ImageGuessPipe,
        SortDevicesPipe,
        LogFilterPipe,
        SideMenuComponent,
        AdminComponent,
        Gravatar,
        UserDetailsComponent
    ],
    bootstrap: [AppComponent],
    providers: [AuthGuard],
    entryComponents: [
        ErrorDialog
    ]
})
export class AppModule {
}
