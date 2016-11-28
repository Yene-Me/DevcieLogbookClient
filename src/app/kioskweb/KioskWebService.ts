import {Injectable} from '@angular/core';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import DeviceLogModel from '../deviceRecord/device-log.model.ts';


@Injectable()
export class KioskWebService {

    user:FirebaseObjectObservable<any>;
    device:FirebaseObjectObservable<any>;
    

    constructor(private af:AngularFire) {
    }

    currentBorrowerUpdate(userName:string){
        this.user = this.af.database.object('/webKiosk/user');
        this.user.set(userName);
    }

    currentDeviceUpdate(deviceName:string){
        this.device = this.af.database.object('/webKiosk/device');
        this.device.set(deviceName);
    }
    
    reset ()
    {
        
        this.device.set(null);
        this.user.set(null);
    }
}