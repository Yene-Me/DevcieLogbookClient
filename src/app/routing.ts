import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DevicesComponent }      from './devices/listDevice/devices.component';
import { AddDevicesComponent }      from '../app/devices/addDevice/add_device';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/devices',
    pathMatch: 'full'
  },
  {
    path: 'devices',
    component: DevicesComponent
  },
  {
    path: 'add',
    component: AddDevicesComponent
  }

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
