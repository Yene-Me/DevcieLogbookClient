import {Component, Input, OnInit, ViewContainerRef} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable , FirebaseApp} from "angularfire2";
import {DomSanitizer} from "@angular/platform-browser";
import {DeviceService} from "../../devices/device.service";
import {MdDialog, MdDialogRef, MdDialogConfig} from "@angular/material";
import {ErrorDialog} from "../../utils/dialog/dislog.component";
import "rxjs/add/operator/map";

@Component({
    selector: 'my-device-detail',
    styleUrls: ['./device-detail.component.less'],
    templateUrl: './device-details.template.html'
})
export class DeviceDetailComponent implements OnInit {
    @Input()
    device:FirebaseObjectObservable<any>;
    deviceLog:FirebaseListObservable<any>;
    sub:any;
    deviceView:Array<any>;
    deviceUser:{};
    deviceLogView:any;
    deviceID:string;
    limitToLast:number;
    userId:string;
    notification:any;
    dialogRef:MdDialogRef<ErrorDialog>;

    constructor(private route:ActivatedRoute, private af:AngularFire,
                private sanitizer:DomSanitizer, private deviceService:DeviceService,
                public viewContainerRef:ViewContainerRef,
                public dialog:MdDialog) {

    }

    ngOnInit() {
        this.deviceView = [];
        this.deviceUser = {};
        this.deviceLogView = [];
        this.limitToLast = 0;
        this.sub = this.route.params.subscribe(params => {
            this.deviceID = params['id'];
            this.getDeviceById(params['id']);
            this.getDeviceLogById();
        });

    }

    getDeviceById(id:string) {

        this.af.auth.subscribe(auth => {
            this.userId = auth.uid;
        });

        this.device = this.deviceService.getDeviceByID(id);
        this.device.subscribe((deviceData:any) => {
            this.deviceView = deviceData;

            var user = this.af.database.object('/users/' + this.deviceView['userId']);

            user.subscribe((data:{}) => {
                this.deviceUser = data;
                this.deviceUser['sip'] = this.sanitizer.bypassSecurityTrustUrl("sip:<" + this.deviceUser['email'] + ">");
            });

        });
    }

    getDeviceLogById() {
        this.limitToLast += 20;
        this.deviceLog = this.af.database.list('/devicesLogs/' + this.deviceID, {
            query: {
                'limitToLast': this.limitToLast
            }
        });


        this.deviceLog.subscribe((deviceLogData:any) => {
            this.deviceLogView = deviceLogData.reverse();


            for (let i = 0; i < this.deviceLogView.length; i++) {
                var user = this.af.database.object('/users/' + this.deviceLogView[i].user_id);

                user.subscribe((data:any) => {
                    this.deviceLogView[i].name = data.displayName;
                });
            }
        });
    }

    onScroll() {
        this.getDeviceLogById();
    }

    return(device:any) {

        this.deviceService.updateDeviceStatus(this.deviceID, "", "Available");
        //this.spawnNotification(device.device_model, device.device_model, "");
    }


    borrow() {

        this.deviceService.updateDeviceStatus(this.deviceID, this.userId, "inUse");
    }
    //TODO, Notifications
    onNotify(device:any):void {
        console.log("cominig soon...");
      /*  this.notification.requestPermission().then(function (result:any) {
            if (result === 'denied') {
                this.openDialog('Permission wasn\'t granted.');
                return;
            }
            else if (result === 'default') {
                this.openDialog('The permission request was dismissed.');
                return;
            }

            this.openDialog('We will let you know when ' + device.device_model + ' is back in the device cupboard.');
          
        }.bind(this));*/

    }

    /**
     * create notification
     */
    spawnNotification(theBody:any, theIcon:any, theTitle:any) {
        var options = {
            body: theBody,
            icon: theIcon
        };
        var n = new this.notification(theTitle, options);
    }

    /**
     * Show the user a dialog
     * @param errorText
     */
    openDialog(errorText:String) {
        let config = new MdDialogConfig();
        config.viewContainerRef = this.viewContainerRef;
        this.dialogRef = this.dialog.open(ErrorDialog, config);
        this.dialogRef.componentInstance.error = errorText;
    }
}
