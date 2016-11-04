import { Component ,OnInit } from '@angular/core';
import { DeviceService } from './device.service';
import { Device } from './device';

import '../../../public/css/styles.css';
import '../../../public/css/bootstrap.css';
@Component({
  selector: 'my-devices',
  templateUrl: '../app.component.html',
  styleUrls: ['../app.component.css'],
  providers: [DeviceService]
})
export class DevicesComponent implements OnInit {
    name:string = "Camden";
    selectDevice: Device;
    ngOnInit(): void {
          this.getDevices();
    }
    constructor(private deviceService: DeviceService) { }

    devices:Device[];

    getDevices(): void {
     this.devices = this.deviceService.getDevices();
   }

   onSelect(device:Device):void{
     this.selectDevice = device;
   }
 }
