import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable}     from 'rxjs/Observable';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import 'rxjs/add/operator/map';
@Component({
    selector: 'my-device-detail',
    templateUrl: './device-details.template.html'
})
export class DeviceDetailComponent implements OnInit {
    @Input()
    device:FirebaseObjectObservable<any>;
    deviceLog:FirebaseListObservable<any>;
    sub:any;
    sessionId:Observable<string>;
    token:Observable<string>;
    deviceView:any;
    deviceLogView:any;

    constructor(private route:ActivatedRoute, private af:AngularFire) {

    }

    ngOnInit() {
        this.deviceView = [];
        this.sub = this.route.params.subscribe(params => {
            this.getDeviceById(params['id']);
            this.getDeviceLogById(params['id']);
        });

    }

    getDeviceById(id:string) {
        this.device = this.af.database.object('/devices/' + id);
        this.device.subscribe((deviceData:any) => {
            this.deviceView = deviceData;
        });
    }

    getDeviceLogById(id:string) {
        this.deviceLog = this.af.database.list('/devicesLogs/' + id);

        this.deviceLog.subscribe((deviceLogData:any) => {

        });
    }

}
