import {Component, OnInit, NgModule, ViewChild, ElementRef, AfterViewInit} from "@angular/core";
import {MaterialModule} from "@angular/material";
import {AngularFire, FirebaseObjectObservable} from "angularfire2";
import {Router, ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {DeviceService} from "../devices/device.service";
import {UserService} from "../auth/user/user.service";
import {NFCService} from "../utils/nfc/nfc.servcie";
import {KioskWebService} from "../kioskweb/kiosk.web.service";


@NgModule({
    imports: [MaterialModule.forRoot()]
})

@Component({
    selector: 'kiosk-layout',
    templateUrl: './kiosk.template.html',
    styleUrls: ['./kiosk.style.less']

})

export class KioskComponent implements OnInit,AfterViewInit {
    userID: any;
    deviceId: any;
    userInfo: any;
    observer: any;
    tagObject: FirebaseObjectObservable<any>;
    deviceObject: FirebaseObjectObservable<any>;
    userObject: FirebaseObjectObservable<any>;
    userView: any;
    deviceView: any;
    isDone: boolean;
    counter: number;
    id: any;


    @ViewChild('nfcInput') nfcInput: ElementRef;


    constructor(public af: AngularFire, private router: Router,
                private location: Location,
                private deviceService: DeviceService,
                private usersService: UserService,
                private route: ActivatedRoute,
                private nfcService: NFCService,
                private kioskWebService: KioskWebService) {
        this.isDone = false;


    }

    ngOnInit() {


    }

    callBackTags(tag: any) {

    }

    ngAfterViewInit() {

        this.observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                this.onChange(mutation.target['innerText'])
            });
        });

        let config = {attributes: true, childList: false, characterData: false};
        this.observer.observe(this.nfcInput.nativeElement, config);
    }

    onChange(nfcId: any): void {


        this.tagObject = this.nfcService.getTagByID(nfcId);

        this.tagObject.subscribe((tagItem: any) => {
            if (tagItem['associateType'] == "device") {
                this.getDeviceInfo(tagItem['associateId'])
            } else if (tagItem['associateType'] == "user") {
                this.getUserInfo(tagItem['associateId'])
            }

        })
    }

    getDeviceInfo(deviceId: string): void {
        this.deviceObject = this.deviceService.getDeviceByID(deviceId);
        this.deviceId = deviceId;
        this.deviceObject.subscribe((data)=> {
            this.borrowDevice();
            this.deviceView = data;
            this.kioskWebService.currentDeviceUpdate(data.device_model);
        });

        clearInterval(this.id);
        this.counter = 10;
        this.startCountDown();
    }

    getUserInfo(userId: string): void {
        this.userObject = this.usersService.getUserById(userId);
        this.userID = userId;
        this.userObject.subscribe((data)=> {
            this.userView = data;
            this.kioskWebService.currentBorrowerUpdate(data.displayName);
            this.borrowDevice();
        })
    }

    borrowDevice() {
        if (this.deviceId && this.userID) {
            this.deviceService.updateDeviceStatus(this.deviceId, this.userID, "inUse");
            this.isDone = true;
            clearInterval(this.id);
            setTimeout(()=> {
                this.resetView();
            }, 2000);
        }
    }

    unregisterTag() {

        this.nfcService.unregisterTag(this.userInfo.nfc);

    }

    ngOnDestroy() {
        this.observer.disconnect()
    }

    startCountDown() {
        this.id = setInterval(()=> {
            this.counter -= 1;

            if (this.counter == 0) {
                this.deviceService.updateDeviceStatus(this.deviceId, "", "");
                clearInterval(this.id);
                this.resetView();
            }
        }, 1000)
    }

    resetView() {
        this.isDone = false;
        this.deviceView = null;
        this.userView = null;
        this.deviceId = null;
        this.userID = null;
        this.counter = 10;
        this.kioskWebService.reset();
    }

}