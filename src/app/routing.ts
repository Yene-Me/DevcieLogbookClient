import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DevicesComponent }      from './devices.component';
import { AddDevicesComponent }      from '../app/add_device/add_device';

const appRoutes: Routes = [
  {
    path: 'devices',
    component: DevicesComponent
  },
  {
    path: 'add_devices',
    component: AddDevicesComponent
  }

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
