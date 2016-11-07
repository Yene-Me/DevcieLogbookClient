import {Component, OnInit} from '@angular/core';
import {DeviceLog} from '../../deviceRecord/device-log.component'
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import {User} from '../../auth/user/user'

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
    userId:string;
    deviceView:any;

    ngOnInit():void {
    }

    devices:FirebaseListObservable<any[]>;

    constructor(af:AngularFire) {
        this.devices = af.database.list('/devices');
        this.deviceView = [];

        this.devices.subscribe((deviceData:any) => {
            this.deviceView = [];
            for (let item in deviceData) {
                var userId = deviceData[item].userId;
                if (userId) {
                    var user = af.database.object('/users/' + userId);
                    user.subscribe((data:User) => {

                        deviceData[item].inUseBy = data.displayName;
                    })
                }
                else {
                    deviceData[item].inUseBy = "";
                }
                console.log("deviceData", deviceData);
                this.deviceView.push(deviceData[item]);
            }
        });

        this.deviceLog = new DeviceLog(af);
        af.auth.subscribe(auth => {
            this.userId = auth.uid;
        });
    }

    //update device log as return
    onReturn(device:any):void {
        if (this.userId != device.userId) {
            alert("have really borrowed this device :)");
        }
        else {
            this.deviceLog.onSave(device, this.userId, "in");
            this.devices.update(device, {userId: ""});
        }

    }

    //update device log as borrowed
    onBorrow(device:any):void {
        this.deviceLog.onSave(device, this.userId, "out");
        this.devices.update(device, {userId: this.userId})
    }
}
