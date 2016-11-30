import {Component, OnInit} from "@angular/core";
import {Device} from "../helpers/device";
import {DeviceModel} from "./device_model";
import {FirebaseListObservable} from "angularfire2";
import {DeviceService} from "../../devices/device.service";
import "../../../../public/css/styles.css";
import "../../../../public/css/bootstrap.css";
import {Router} from "@angular/router";

declare var ClientJS: any;
@Component({
    selector: 'add-devices',
    templateUrl: './add-device.component.html',
    styleUrls: ['./add-device.component.less']
})
export class AddDevicesComponent implements OnInit {
    name: string = "Add New Device";
    browserData: any;
    currentResolution: any;
    device: DeviceModel;
    deviceList: FirebaseListObservable<any[]>;
    devices: Device[];

    ngOnInit(): void {
        this.deviceInfo();
    }

    constructor(private router: Router, private deviceService: DeviceService) {
        this.deviceList = deviceService.getDevices();
    }


    /**
     * Pre populate any fields we know using client js library. Magic :)
     */
    deviceInfo(): void {
        var client = new ClientJS();

        this.browserData = client.getBrowserData();
        this.currentResolution = client.getCurrentResolution();

        this.device = new DeviceModel(this.browserData.os.name, this.browserData.os.version, this.browserData.device.model,
            this.browserData.device.type, this.browserData.device.vendor, this.currentResolution, this.browserData.ua, "");

    }

    /**
     * Adds the current device to the list
     * TODO - Check that all teh params are valid, this will also happen server side
     */
    onSubmit() {
        this.deviceList.push(this.device);
        this.router.navigateByUrl('devices/all');
    }

    /**
     * Navigates back to the home page
     * TODO - Navigate to back one page instead
     */
    cancel() {
        this.router.navigateByUrl('devices/all');
    }
}
