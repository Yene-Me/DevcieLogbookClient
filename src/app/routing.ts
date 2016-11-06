import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DevicesComponent }      from './devices/listDevice/devices.component';
import { LoginComponent }      from './auth/login/login.component';
import { AddDevicesComponent }      from '../app/devices/addDevice/add_device';
import { AuthGuard } from './authGaurd';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/devices',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'devices',
    component: DevicesComponent
  },
  {
    path: 'add',
    component: AddDevicesComponent
    //TODO - Uncomment this for auth redirect
    // component: AddDevicesComponent,
    // canActivate: [AuthGuard]
  }

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);


