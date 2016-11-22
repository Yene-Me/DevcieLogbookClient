import {Component, OnInit} from '@angular/core';
import {MaterialModule} from '@angular/material';
import {NgModule} from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {Router} from "@angular/router";
import {Location} from '@angular/common';
import {User} from "../auth/user/user";
import {UserService} from "../auth/user/user.service";


@NgModule({
    imports: [MaterialModule.forRoot()]
})

@Component({
    selector: 'side-menu-layout',
    templateUrl: './side.menu.html',
    styleUrls: ['./side.menu.style.css'],
})

export class SideMenuComponent implements OnInit {
    cupboardlocation:any;
    userId:string;
    user:any;
    userObservable:FirebaseListObservable < any >;
    isAdmin:boolean;

    constructor(public af:AngularFire, private router:Router, private location:Location, private userService:UserService) {
        this.cupboardlocation = {};
        this.cupboardlocation.name = "Camden";
        this.cupboardlocation.image = "../../../../public/images/locations/camden.jpg";
        this.user = {};

    }

    ngOnInit() {
        this.userService.authUser(this.callBack.bind(this));

    }

    callBack(isUserAdmin:boolean) {
        this.isAdmin = isUserAdmin;
    }

    processURL() {

    }

    logout() {
        this.af.auth.logout();
        window.location.reload()
    }

    back() {
        this.location.back();
    }


    manage() {

    }

    onYourDevice() {

    }

    onAllDeviceList() {
        this.router.navigateByUrl('/devices/all');
    }

    onYourDeviceList() {
        this.router.navigateByUrl('/devices/yourDevices');
    }

    onAdmin() {
        this.router.navigateByUrl('/admin');
    }

    about() {
        this.router.navigateByUrl('/about');
    }

}