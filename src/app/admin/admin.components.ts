import {Component, OnInit, NgModule} from "@angular/core";
import {MaterialModule} from "@angular/material";
import {AngularFire, FirebaseListObservable} from "angularfire2";
import {Router} from "@angular/router";
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

/**
 * Allows for device and use management
 */
export class AdminComponent implements OnInit {
    supportedDevice: FirebaseListObservable<any>;
    currentUsers: FirebaseListObservable<any>;
    noOfDevices: number;
    allDeviceList: any;
    allUsers: any;
    noOfUsers: number;

    constructor(public af: AngularFire, private router: Router,
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

    /**
     *
     * @param device - The device to deactivate
     */
    deactivateDevice(device: any) {
        this.supportedDevice.update(device, {status: "deactivate"})
    }

    /**
     *
     * @param device - The device to activate
     */
    activateDevice(device: any) {
        this.supportedDevice.update(device, {status: ""})
    }

    /**
     *
     * @param user - The user to activate
     */
    activateUser(user: any) {
        this.currentUsers.update(user, {status: ""})
    }

    /**
     *
     * @param user - The user to deactivate
     */
    deactivateUser(user: any) {
        this.currentUsers.update(user, {status: "deactivate"})
    }

    /**
     * Navigates to a user detail page
     * @param user - The user to navigate to
     */
    onUserInfo(user: any): void {
        this.router.navigate(['user/details', user.$key]);
    }

    /**
     *  Navigates to a device detail page
     * @param device - The device to navigate to
     */
    onDeviceInfo(device: any): void {
        this.router.navigate(['devices/edit', device.$key]);
    }

}