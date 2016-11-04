import {Component, OnInit} from '@angular/core';
import {DeviceService} from '../device.service';
import {Device} from '../device';
import {DeviceModel} from './device_model';


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
        this.getDevices();
        this.deviceInfo();
    }

    constructor(private deviceService:DeviceService) {
    }

    devices:Device[];

    getDevices():void {
        this.devices = this.deviceService.getDevices();

    }

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
        this.submitted =true;
        console.log(this.device)
    }
    

    get diagnostic(){
        return JSON.stringify(this.device);
    }
}
