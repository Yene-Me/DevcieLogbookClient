import {ModuleWithProviders}  from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DevicesComponent}      from './devices/listDevice/devices.component';
import {LoginComponent}      from './auth/login/login.component';
import {AddDevicesComponent}      from '../app/devices/addDevice/add_device';
import {AuthGuard} from './authGaurd';
import {RegisterComponent} from "./auth/register/register.component";
import {DeviceDetailComponent} from "./devices/detailDevice/device-detail.component";
import {AdminComponent} from "./admin/admin.components";
import {UserDetailsComponent} from "./users/user-details.component";
import {EditDeviceComponent} from "./devices/editDevice/edit-device.component";
import {AboutComponent} from "./about/about.components";
import {KioskComponent} from "./kiosk/kiosk.component";
import {KioskComponentWeb} from "./kioskweb/kiosk.component";

const appRoutes:Routes = [
    {
        path: '',
        redirectTo: '/devices/all',
        pathMatch: 'full'
    },
    {
        path: 'about',
        component: AboutComponent
    },
    {
        path: 'login',
        component: LoginComponent
    }, {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'devices/:tabID',
        component: DevicesComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'add',
        component: AddDevicesComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'details/:id',
        component: DeviceDetailComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'devices/edit/:id',
        component: EditDeviceComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'user/details/:id',
        component: UserDetailsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'kiosk',
        component: KioskComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'kioskWeb',
        component: KioskComponentWeb,
        canActivate: [AuthGuard]
    },
    {
        path: '',
        redirectTo: '/devices/all',
        pathMatch: 'full'
    }

];


export const routing:ModuleWithProviders = RouterModule.forRoot(appRoutes);


