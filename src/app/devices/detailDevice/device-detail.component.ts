import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable}     from 'rxjs/Observable';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import 'rxjs/add/operator/map';
@Component({
    selector: 'my-device-detail',
    styleUrls: ['./device-detail.component.css'],
    templateUrl: './device-details.template.html'
})
export class DeviceDetailComponent implements OnInit {
    @Input()
    device:FirebaseObjectObservable<any>;
    deviceLog:FirebaseListObservable<any>;
    sub:any;
    sessionId:Observable<string>;
    token:Observable<string>;
    deviceView:Array<any>;
    deviceLogView:any;
    sortyQuery:Observable<any>;
    deviceID:string;
    limitToLast:number;

    constructor(private route:ActivatedRoute, private af:AngularFire) {

    }

    ngOnInit() {
        this.deviceView = [];
        this.deviceLogView = [];
        this.limitToLast = 0;
        this.sub = this.route.params.subscribe(params => {
            this.deviceID = params['id'];
            this.getDeviceById(params['id']);
            this.getDeviceLogById();
        });

    }

    getDeviceById(id:string) {
        this.device = this.af.database.object('/devices/' + id);
        this.device.subscribe((deviceData:any) => {
            this.deviceView = deviceData;
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
    onScroll ()
    {
       this.getDeviceLogById();
    }
}
