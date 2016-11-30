import {Component, Input, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from "angularfire2";
import {DomSanitizer} from "@angular/platform-browser";
import {DeviceService} from "../../devices/device.service";
import "rxjs/add/operator/map";

@Component({
    selector: 'my-device-detail',
    styleUrls: ['./device-detail.component.less'],
    templateUrl: './device-details.template.html'
})
export class DeviceDetailComponent implements OnInit {
    @Input()
    device: FirebaseObjectObservable<any>;
    deviceLog: FirebaseListObservable<any>;
    sub: any;
    deviceView: Array<any>;
    deviceUser: {};
    deviceLogView: any;
    deviceID: string;
    limitToLast: number;
    userId: string;

    constructor(private route: ActivatedRoute, private af: AngularFire, private sanitizer: DomSanitizer, private deviceService: DeviceService) {

    }

    /**
     * Setup
     */
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

    /**
     * Gets the current device, and any the current user if there is one
     * @param id
     */
    getDeviceById(id: string) {

        this.af.auth.subscribe(auth => {
            this.userId = auth.uid;
        });

        this.device = this.deviceService.getDeviceByID(id);
        this.device.subscribe((deviceData: any) => {
            this.deviceView = deviceData;

            var user = this.af.database.object('/users/' + this.deviceView['userId']);

            user.subscribe((data: {}) => {
                this.deviceUser = data;
                this.deviceUser['sip'] = this.sanitizer.bypassSecurityTrustUrl("sip:<" + this.deviceUser['email'] + ">");
            });

        });
    }

    /**
     * Get the logs for the current devices.
     * Initially limited to 20 logs
     * When the page is scrolled past a certain point, this is used to load another 20 device logs if we have them
     */
    getDeviceLogById() {
        this.limitToLast += 20;
        this.deviceLog = this.af.database.list('/devicesLogs/' + this.deviceID, {
            query: {
                'limitToLast': this.limitToLast
            }
        });


        this.deviceLog.subscribe((deviceLogData: any) => {
            this.deviceLogView = deviceLogData.reverse();


            for (let i = 0; i < this.deviceLogView.length; i++) {
                var user = this.af.database.object('/users/' + this.deviceLogView[i].user_id);

                user.subscribe((data: any) => {
                    this.deviceLogView[i].name = data.displayName;
                });
            }
        });
    }

    /**
     * Return the current device
     */
    return() {
        this.deviceService.updateDeviceStatus(this.deviceID, "", "Available");
    }

    /**
     * Take out the current device
     */
    borrow() {
        this.deviceService.updateDeviceStatus(this.deviceID, this.userId, "inUse");
    }
}
