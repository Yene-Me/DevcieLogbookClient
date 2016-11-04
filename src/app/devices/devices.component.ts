import { Component ,OnInit } from '@angular/core';
import { DeviceService } from './device.service';
import { Device } from './device';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';

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
    }

    devices: FirebaseListObservable<any[]>;

    constructor(af: AngularFire) {
        this.devices = af.database.list('/devices');
    }


   onSelect(device:Device):void{
     this.selectDevice = device;
   }
 }
