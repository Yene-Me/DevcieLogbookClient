import {Component, OnInit, ViewContainerRef} from "@angular/core";
import {DeviceLog} from "../../deviceRecord/device-log.component";
import {AngularFire, FirebaseListObservable} from "angularfire2";
import {User} from "../../auth/user/user";
import {Router, ActivatedRoute} from "@angular/router";
import "../../../../public/css/styles.css";
import "../../../../public/css/bootstrap.css";
import {MdDialog, MdDialogRef, MdDialogConfig} from "@angular/material";
import {ErrorDialog} from "../../utils/dialog/dislog.component";
import {DeviceService} from "../../devices/device.service";

@Component({
    selector: 'my-devices',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less']
})
export class DevicesComponent implements OnInit {
    name: string = "Camden";
    deviceLog: DeviceLog;
    userId: string;
    deviceView: any;
    yourDevicesView: any;
    dialogRef: MdDialogRef<ErrorDialog>;
    devices: FirebaseListObservable<any[]>;
    sub: any;
    selectedIndex: number;

    constructor(private af: AngularFire, private router: Router, public dialog: MdDialog,
                public viewContainerRef: ViewContainerRef, public deviceService: DeviceService, private route: ActivatedRoute) {

        this.devices = this.deviceService.getDevices();
        this.deviceView = [];
        this.yourDevicesView = [];
        this.deviceLog = new DeviceLog(af);
        this.selectedIndex = 1;

        af.auth.subscribe(auth => {
            this.userId = auth.uid;
            this.init();
        });

        this.sub = this.route.params.subscribe(params => {
            if (params['tabID'] === "yourDevices") {
                this.selectedIndex = 0;
            }
            else {
                this.selectedIndex = 1;
            }

        });

    }

    ngOnInit(): void {

    }

    /**
     * Only get the initial data once we are authenticated
     */
    init(): void {
        this.devices.subscribe((deviceData: any) => {
            this.deviceView = [];
            this.yourDevicesView = [];
            for (let item in deviceData) {
                var userId = deviceData[item].userId;
                if (userId) {
                    var user = this.af.database.object('/users/' + userId);
                    user.subscribe((data: User) => {

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

    /**
     * Navigate to a device info page
     * @param device
     */
    onDeviceInfo(device: any): void {
        // Navigate to the login page with extras
        this.router.navigate(['/details', device.$key]);
    }


    //TODO Implement functions below here into the view

    /**
     * Return a device
     * @param device - The device to return
     */
    onReturn(device: any): void {
        this.deviceService.updateDeviceStatus(device, "", "in");

    }

    /**
     * Take ou (Borrow) a device
     * @param device - The device to borrow
     */
    onBorrow(device: any): void {
        this.deviceService.updateDeviceStatus(device, this.userId, "out");
    }
}
