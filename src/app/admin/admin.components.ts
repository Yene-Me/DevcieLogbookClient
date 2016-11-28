import {Component, OnInit, NgModule} from "@angular/core";
import {MaterialModule} from "@angular/material";
import {AngularFire, FirebaseListObservable} from "angularfire2";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {DeviceService} from "../devices/device.service";
import {UserService} from "../auth/user/user.service";


@NgModule({
    imports: [MaterialModule.forRoot()]
})

@Component({
    selector: 'admin-layout',
    templateUrl: './admin.template.html',
    styleUrls: ['./admin.style.less'],
})

export class AdminComponent implements OnInit {
    tiles: any[];
    supportedDevice: FirebaseListObservable<any>;
    currentUsers: FirebaseListObservable<any>;
    noOfDevices: number;
    allDeviceList: any;
    allUsers: any;
    noOfUsers: number;

    constructor(public af: AngularFire, private router: Router,
                private location: Location,
                private deviceService: DeviceService,
                private usersService: UserService) {

    }

    ngOnInit() {

        this.supportedDevice = this.deviceService.getDevices();

        this.supportedDevice.subscribe((data: any)=> {
            this.noOfDevices = data.length;
            this.allDeviceList = data;
        });

        this.currentUsers = this.usersService.getUsers();

        this.currentUsers.subscribe((data: any)=> {
            this.allUsers = data;
            this.noOfUsers = data.length;

        });

    }

    deactivateDevice(device: any) {
        this.supportedDevice.update(device, {status: "deactivate"})
    }

    activateDevice(device: any) {
        this.supportedDevice.update(device, {status: ""})
    }

    activateUser(user: any) {
        this.currentUsers.update(user, {status: ""})
    }

    deactivateUser(user: any) {
        this.currentUsers.update(user, {status: "deactivate"})
    }

    onUserInfo(user: any): void {
        this.router.navigate(['user/details', user.$key]);
    }

    onDeviceInfo(devices: any): void {
        this.router.navigate(['devices/edit', devices.$key]);
    }

}