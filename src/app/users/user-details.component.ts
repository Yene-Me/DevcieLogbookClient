import{Component, OnInit, NgModule, Input, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import {MaterialModule} from '@angular/material';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {Router} from "@angular/router";
import {Location} from '@angular/common';
import {DeviceService} from '../devices/device.service';
import {UserService} from  '../auth/user/user.service';
import {ActivatedRoute} from '@angular/router';


@NgModule({
    imports: [MaterialModule.forRoot()]
})

@Component({
    selector: 'user-layout',
    templateUrl: './user.template.html',
    styleUrls: ['./user.style.css'],
    inputs: ['nfcId']

})

export class UserDetailsComponent implements OnInit,AfterViewInit {

    sub:any;
    userID:any;
    currentUsers:any;
    userInfo:any;
    public nfcId:string;
    @ViewChild('nfcInput') nfcInput:ElementRef;


    constructor(public af:AngularFire, private router:Router,
                private location:Location,
                private deviceService:DeviceService,
                private usersService:UserService,
                private route:ActivatedRoute) {

    }

    ngOnInit() {

        this.sub = this.route.params.subscribe(params => {
            this.userID = params['id'];
            this.currentUsers = this.usersService.getUserById(this.userID);
            console.log(this.userID, this.currentUsers);
        });

        this.currentUsers.subscribe((userData:any) => {
            this.userInfo = userData;

            if (userData.nfc) {
                this.userInfo.nfc = userData.nfc;
            }

        })
    }

    ngAfterViewInit() {
        this.nfcInput.nativeElement.addEventListener('focus', (e:any) => {
            this.onChange(e);
        }, false);
    }

    onChange(event:any):void {
       
        this.userInfo.nfc = event.srcElement.value;
    }

    updateNFC() {
        this.currentUsers.update({nfc: this.userInfo.nfc});
        console.log(this.userInfo);
    }

}