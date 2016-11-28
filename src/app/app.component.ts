import {Component, OnInit} from '@angular/core';
import {MaterialModule} from '@angular/material';
import {NgModule} from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {Router} from "@angular/router";
import {Location} from '@angular/common';
import {DeviceService} from './devices/device.service';
import {UserService} from './auth/user/user.service';
import {NFCService} from "./utils/nfc/nfc.servcie"
import {ToolBarService} from "./utils/toolbar/toolBar.service"
import {KioskWebService} from "./kioskweb/kioskWebService";



@NgModule({
    imports: [MaterialModule.forRoot()]
})

@Component({
    selector: 'my-app',
    templateUrl: './dashboard.html',
    providers:[DeviceService,UserService, NFCService, ToolBarService, KioskWebService]
})

export class AppComponent implements OnInit {
    title = 'Device List';
    showEdit = false;
    showAdd = true;
    isAdmin = false;

    constructor(public af: AngularFire, private router: Router, private location: Location, userService:UserService) {

        userService.authUser(this.callBack.bind(this));
    }

    callBack(isUserAdmin:boolean){

        this.isAdmin = isUserAdmin;

    }
    ngOnInit() {
        this.router.events.subscribe((val) => {
            this.processURL();
        });

        this.processURL();
    }

    processURL() {
        this.showEdit = false;
        this.showAdd = false;

        if (this.router.url.indexOf('/details') !== -1) {
            this.showEdit = true;
        }
        else if (this.router.url !== '/add') {
            this.showAdd = true;
        }
    }

    logout() {
       /* this.af.auth.logout();
        window.location.reload()*/
    }
    


    manage() {
        //      TODO
    }

}
