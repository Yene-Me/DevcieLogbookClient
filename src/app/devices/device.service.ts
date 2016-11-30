import {Injectable} from "@angular/core";
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from "angularfire2";
import DeviceLogModel from "../deviceRecord/device-log.model";


@Injectable()
/**
 * Handel the communication related to devices between the server (firebase) and the app.
 */
export class DeviceService {
    deviceModel: DeviceLogModel;
    devices: FirebaseListObservable<any>;
    listObservable: FirebaseListObservable<any>;

    constructor(private af: AngularFire) {
    }

    /**
     * Get a list of all the devices (Includes deactivated devices by default)
     * @returns {FirebaseListObservable<any>}
     */
    getDevices(): FirebaseListObservable<any[]> {
        this.devices = this.af.database.list('/devices');
        return this.devices;
    }

    /**
     * Get a device, by the ID. An Observable will be returned so you will receive updates.
     * @param id - The ID of the device to get
     * @returns {FirebaseObjectObservable<any>}
     */
    getDeviceByID(id: string): FirebaseObjectObservable<any> {
        return this.af.database.object('/devices/' + id);
    }

    /**
     *  Create a new device log. The current time will be used by default
     * @param device - The related device
     * @param userId - The ID of the user making the log
     * @param status - The status to log (IN, OUT etc)
     */
    updateDeviceStatus(device: any, userId: any, status: string): void {
        if (!this.devices) {
            this.devices = this.af.database.list('/devices');
        }
        this.devices.update(device, {userId: userId, status: status});
        this.deviceModel = new DeviceLogModel(userId, status, new Date().getTime() + "");
        this.listObservable = this.af.database.list('/devicesLogs/' + device);
        this.listObservable.push(this.deviceModel);
    }

    /**
     * Used to update the cor information of the device, software version, os, etc
     * @param device - The device to update
     * @param deviceData - That new device data
     */
    updateDevice(device: any, deviceData: any): void {
        this.devices.update(device,
            {
                device_model: deviceData.device_model,
                device_os: deviceData.device_os,
                device_resolution: deviceData.device_resolution,
                device_type: deviceData.device_type,
                device_userAgent: deviceData.device_userAgent,
                device_vendor: deviceData.device_vendor,
                device_version: deviceData.device_version
            }
        );
    }

}