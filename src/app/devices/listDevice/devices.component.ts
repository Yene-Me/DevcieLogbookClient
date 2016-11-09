import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {DeviceLog} from '../../deviceRecord/device-log.component'
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import {User} from '../../auth/user/user'
import {Router, NavigationExtras} from '@angular/router';
import '../../../../public/css/styles.css';
import '../../../../public/css/bootstrap.css';
import {DeviceFilterPipe} from "../filter.pipe";
import {MdDialog, MdDialogRef, MdDialogConfig} from "@angular/material";
import {ErrorDialog} from "../../utils/dialog/dislog.component";

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
    yourDevicesView:any;
    dialogRef: MdDialogRef<ErrorDialog>;

    ngOnInit():void {
    }

    devices:FirebaseListObservable<any[]>;

    constructor(private af: AngularFire, private router: Router, public dialog: MdDialog,
                public viewContainerRef: ViewContainerRef) {
        this.devices = af.database.list('/devices');
        this.deviceView = [];
        this.yourDevicesView = [];
        this.deviceLog = new DeviceLog(af);


        af.auth.subscribe(auth => {
            this.userId = auth.uid;
            this.init();
        });
    }

    /**
     * Only get the initial data once we are authenticated
     */
    init():void
    {
        this.devices.subscribe((deviceData:any) => {
            this.deviceView = [];
            this.yourDevicesView = [];
            for (let item in deviceData) {
                var userId = deviceData[item].userId;
                if (userId) {
                    var user = this.af.database.object('/users/' + userId);
                    user.subscribe((data:User) => {

                        deviceData[item].inUseBy = data.displayName;
                    })
                }
                else {
                    deviceData[item].inUseBy = "";
                }
                this.deviceView.push(deviceData[item]);

                if (this.userId === deviceData[item].userId) {
                    this.yourDevicesView.push(deviceData[item]);
                }
            }
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

    onDeviceInfo(device:any):void {
        // Navigate to the login page with extras
        this.router.navigate(['/details', device.$key]);
    }

    onNotify(device: any): void {

        Notification.requestPermission().then(function (result) {
            if (result === 'denied') {
                this.openDialog('Permission wasn\'t granted.');
                return;
            }
            if (result === 'default') {
                this.openDialog('The permission request was dismissed.');
                return;
            }
            this.openDialog('We will let you know when ' + device.model + 'is back in the device cupboard.');
            //TODO, Notifications
        }.bind(this));

    }

    /**
     * Show the user a dialog
     * @param errorText
     */
    openDialog(errorText: String) {
        let config = new MdDialogConfig();
        config.viewContainerRef = this.viewContainerRef;
        this.dialogRef = this.dialog.open(ErrorDialog, config);
        this.dialogRef.componentInstance.error = errorText;
    }
}
