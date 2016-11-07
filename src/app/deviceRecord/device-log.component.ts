import {Component} from '@angular/core';
import DeviceLogModel from './device-log.model.ts';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';

@Component({
    selector: 'my-device-log',
    //templateUrl: ''
})

export class DeviceLog {

    deviceModel:DeviceLogModel;
    deviceLog:FirebaseListObservable<any[]>;
    listObservable:FirebaseListObservable<any[]>;
    af:AngularFire;


    constructor(af:AngularFire) {
        this.af = af;
        this.deviceLog = af.database.list('/devicesLogs');
    }

    onSave(device:any, userId:any, status:string):void {
        this.deviceModel = new DeviceLogModel(userId, status, new Date().toISOString());

        this.listObservable = this.af.database.list('/devicesLogs/' + device.$key);
        this.listObservable.push(this.deviceModel);
    }


    getAllDeviceLogs():any {
        return [];
    }

    getDeviceLogById(id:string):any {
        return "";
    }

}
