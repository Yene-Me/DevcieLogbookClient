import {Component} from "@angular/core";
import {AngularFire, FirebaseListObservable} from "angularfire2";

@Component({
    selector: 'my-device-log'
})

export class DeviceLog {
    deviceLog: FirebaseListObservable<any[]>;
    af: AngularFire;


    constructor(af: AngularFire) {
        this.af = af;
        this.deviceLog = af.database.list('/devicesLogs');
    }
}
