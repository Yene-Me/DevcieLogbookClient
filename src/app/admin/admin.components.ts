import {Component, OnInit} from '@angular/core';
import {MaterialModule} from '@angular/material';
import {NgModule} from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {Router} from "@angular/router";
import {Location} from '@angular/common';
import {DeviceService} from '../devices/device.service';


@NgModule({
    imports: [MaterialModule.forRoot()]
})

@Component({
    selector: 'admin-layout',
    templateUrl: './admin.template.html',
    styleUrls: ['./admin.style.css'],
})

export class AdminComponent implements OnInit {
    tiles:any[];
    supportedDevice:FirebaseListObservable<any>;
    noOfDevices:number;
    allDeviceList:any;

    constructor(public af:AngularFire, private router:Router, private location:Location, private deviceService:DeviceService) {

    }

    ngOnInit() {

        this.supportedDevice = this.deviceService.getDevices();

        this.supportedDevice.subscribe((data:any)=> {
            console.log("supportedDevice", data.length);
            this.noOfDevices = data.length;
            this.allDeviceList = data;
        })
    }

    deactivate(device:any) {
        this.supportedDevice.update(device, {status: "deactivate"})
    }

    activate(device:any) {
        this.supportedDevice.update(device, {status: ""})
    }


}