import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule }   from '@angular/forms';
import { routing } from './routing';
import { DeviceDetailComponent } from './device-detail.component';
import { DevicesComponent } from './devices.component';
import { AddDevicesComponent }      from '../app/add_device/add_device';
import { HttpModule }    from '@angular/http';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
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
