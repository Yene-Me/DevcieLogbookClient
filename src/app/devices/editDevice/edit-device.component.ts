import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable}     from 'rxjs/Observable';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import {DomSanitizer} from '@angular/platform-browser';
import {DeviceService} from '../../devices/device.service';
import 'rxjs/add/operator/map';

@Component({
    selector: 'edit-device',
    styleUrls: ['./edit-device.component.css'],
    templateUrl: './edit-device.template.html'
})
export class EditDeviceComponent implements OnInit {
    @Input()
    device: FirebaseObjectObservable<any>;
    deviceLog: FirebaseListObservable<any>;
    sub: any;
    sessionId: Observable<string>;
    token: Observable<string>;
    deviceView: Array<any>;
    deviceUser: {};
    deviceLogView: any;
    sortyQuery: Observable<any>;
    deviceID: string;
    limitToLast: number;
    userId: string;

    constructor(private route: ActivatedRoute, private af: AngularFire, private sanitizer: DomSanitizer, private deviceService: DeviceService, private router: Router) {

    }

    ngOnInit() {
        this.deviceView = [];
        this.deviceUser = {};
        this.deviceLogView = [];
        this.limitToLast = 0;
        this.sub = this.route.params.subscribe(params => {
            this.deviceID = params['id'];
            this.getDeviceById(params['id']);
        });

    }

    getDeviceById(id: string) {

        this.af.auth.subscribe(auth => {
            this.userId = auth.uid;
        });

        this.device = this.deviceService.getDeviceByID(id);
        this.device.subscribe((deviceData: any) => {
            this.deviceView = deviceData;
            var user = this.af.database.object('/users/' + this.deviceView['userId']);
        });
    }

    done() {
        //TODO - We should use location to go back here, rather than assuming that they are entering from the admin page
        this.deviceService.updateDevice(this.device, this.deviceView);
        this.router.navigateByUrl('admin');
    }
}
