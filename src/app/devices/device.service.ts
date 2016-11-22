import {Injectable} from '@angular/core';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import DeviceLogModel from '../deviceRecord/device-log.model.ts';


@Injectable()
export class DeviceService {
    deviceModel:DeviceLogModel;
    devices:FirebaseListObservable<any>;
    listObservable:FirebaseListObservable<any>;

    constructor(private af:AngularFire) {
    }

    getDevices():FirebaseListObservable<any[]> {
        this.devices = this.af.database.list('/devices');
        return this.devices;
    }

    getDeviceByID(id:string):FirebaseObjectObservable<any> {
        return this.af.database.object('/devices/' + id);
    }


    updateDeviceStatus(device:any, userId:any, status:string):void {
        
        this.devices.update(device, {userId: userId});
        this.deviceModel = new DeviceLogModel(userId, status, new Date().getTime() + "");
        this.listObservable = this.af.database.list('/devicesLogs/' + device.$key);
        this.listObservable.push(this.deviceModel);
    }

    updateDevice(device: any, deviceData: any): void {
        this.devices.update(device,
            {
                device_model: deviceData.device_model,
                device_os: deviceData.device_os,
                device_resolution: deviceData.device_resolution,
                device_type: deviceData.device_type,
                device_userAgent: deviceData.device_userAgent,
                device_vendor: deviceData.device_vendor,
                device_version: deviceData.device_version
            }
        );
    }

}