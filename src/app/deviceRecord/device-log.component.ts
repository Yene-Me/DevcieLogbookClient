import { Component } from '@angular/core';
import DeviceLogModel from './device-log.model.ts';

@Component({
  selector: 'my-device-log',
  //templateUrl: ''
})

export class DeviceLog {

  deviceModel : DeviceLogModel;

  constructor() {

  }
  onSave(device:any, user:any, status:string):void
  {
      this.deviceModel = new DeviceLogModel(device.$key, "1", status, new Date)
      console.log("DeviceLog", device, this.deviceModel)
  }

  getAllDeviceLogs():any
  {
    return [];
  }

  getDeviceLogById(id:string):any
  {
    return "";
  }

}
