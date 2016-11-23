import{Component, OnInit, NgModule, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import {MaterialModule} from '@angular/material';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import {Router} from "@angular/router";
import {Location} from '@angular/common';
import {DeviceService} from '../devices/device.service';
import {UserService} from  '../auth/user/user.service';
import {ActivatedRoute} from '@angular/router';
import {NFCService} from "../utils/nfc/nfc.servcie"


@NgModule({
    imports: [MaterialModule.forRoot()]
})

@Component({
    selector: 'user-layout',
    templateUrl: './user.template.html',
    styleUrls: ['./user.style.css']

})

export class UserDetailsComponent implements OnInit,AfterViewInit {

    sub:any;
    userID:any;
    currentUsers:any;
    userInfo:any;
    observer:any;
    userTag:FirebaseObjectObservable<any>;

    @ViewChild('nfcInput') nfcInput:ElementRef;


    constructor(public af:AngularFire, private router:Router,
                private location:Location,
                private deviceService:DeviceService,
                private usersService:UserService,
                private route:ActivatedRoute,
                private nfcService:NFCService) {

    }

    ngOnInit() {

        this.sub = this.route.params.subscribe(params => {
            this.userID = params['id'];
            this.currentUsers = this.usersService.getUserById(this.userID);
            this.nfcService.getAssociateId(this.userID, this.callBackTags.bind(this));

        });

        this.currentUsers.subscribe((userData:any) => {
            this.userInfo = userData;

        })
    }

    callBackTags(tag:any) {
        this.userInfo.nfc = tag['$key'];

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

    onChange(nfcId:any):void {

        this.userInfo.nfc = nfcId;
        this.nfcService.registerTag(this.userInfo.nfc, this.userID);
    }

    unregisterTag() {

        this.nfcService.unregisterTag(this.userInfo.nfc)
    }

    ngOnDestroy() {
        this.observer.disconnect()
    }

}