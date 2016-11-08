import { Component, Input, OnInit } from '@angular/core';
import { Device } from '../helpers/device';
import { ActivatedRoute } from '@angular/router';
import { Observable }     from 'rxjs/Observable';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import 'rxjs/add/operator/map';
@Component({
  selector: 'my-device-detail',
  templateUrl: './device-details.template.html'
})
export class DeviceDetailComponent  implements OnInit {
  @Input()
  device:  FirebaseObjectObservable<any>;
  deviceLog:FirebaseListObservable<any>;
  sub:any;
  sessionId: Observable<string>;
  token: Observable<string>;
  deviceView:any;

  constructor(private route: ActivatedRoute, private af: AngularFire)
  {

  }

  ngOnInit()
  {
    console.log(location.search);
    this.sub = this.route.queryParams.subscribe(params => {
      this.getDeviceById(params['device_id']);
      this.getDeviceLogById(params['device_id']);
    });

    this.device_id = this.route
        .queryParams
        .map(params => params['device_id'] || 'None');
  }

  getDeviceById(id:string)
  {
    this.device = this.af.database.object('/devices/'+id);
    this.device.subscribe((deviceData:any) => {
      console.log("deviceData", deviceData);
      this.deviceView = deviceData;
    });
  }

  getDeviceLogById(id:string)
  {
    this.deviceLog = this.af.database.list('/devicesLogs/'+id);
    this.deviceLog.subscribe((deviceLogData:any) => {
      console.log("deviceLogData", deviceLogData);

    });
  }

}
