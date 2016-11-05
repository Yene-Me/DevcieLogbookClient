import {Component, OnInit} from '@angular/core';
import {DeviceService} from '../device.service';
import {Device} from '../device';
import {DeviceModel} from './device_model';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import {Router} from '@angular/router'

import '../../../../public/css/styles.css';
import '../../../../public/css/bootstrap.css';
declare var ClientJS:any;
@Component({
    selector: 'add-devices',
    templateUrl: './add-device.component.html',
    styleUrls: ['./add-device.component.css'],
    providers: [DeviceService]
})
export class AddDevicesComponent implements OnInit {
    name:string = "Add New Device";
    selectDevice:Device;
    browserData:any;
    currentResolution:any;
    device:DeviceModel;
    submitted:boolean = false;
    active:boolean = true;

    ngOnInit():void {
        this.deviceInfo();
    }

    deviceList: FirebaseListObservable<any[]>;

    constructor(af: AngularFire, private router: Router) {
        this.deviceList = af.database.list('/devices');
        // devices.push({ name: 'Mr. Nice', version:"1" ,inuseby :"yene", out:new Date().toString()});
    }

    devices:Device[];

    onSelect(device:Device):void {
        this.selectDevice = device;
    }

    deviceInfo():void {
        var client = new ClientJS();

        this.browserData = client.getBrowserData();
        this.currentResolution = client.getCurrentResolution();

        this.device = new DeviceModel(this.browserData.os.name, this.browserData.os.version, this.browserData.device.model ,
                                        this.browserData.device.type, this.browserData.device.vendor,  this.currentResolution, this.browserData.ua);

    }

    onSubmit() {
        this.deviceList.push(this.device);
        this.router.navigateByUrl('devices');
    }

    cancel() {
        this.router.navigateByUrl('devices');
    }
    

}
