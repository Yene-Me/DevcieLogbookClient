import { Component ,OnInit } from '@angular/core';
import {DeviceLog} from '../../deviceRecord/device-log.component'
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';

import '../../../../public/css/styles.css';
import '../../../../public/css/bootstrap.css';
@Component({
  selector: 'my-devices',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class DevicesComponent implements OnInit {
    name:string = "Camden";
    deviceLog:DeviceLog;

    ngOnInit(): void {
      this.deviceLog = new DeviceLog ();
    }

    devices: FirebaseListObservable<any[]>;

    constructor(af: AngularFire) {
        this.devices = af.database.list('/devices');
    }

   //update device log as return
   onReturn (device:any):void{
      console.log(device);

      this.devices.update(device, {inUseBy:""});
      this.deviceLog.onSave(device,"","in");
   }

   //update device log as borrowed
   onBorrow(device:any):void{
       console.log(device);
       this.devices.update(device, {inUseBy:"Yene"});
       this.deviceLog.onSave(device,"","out");
   }
 }
