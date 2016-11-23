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
    cupboardlocation: any;
    userId: string;
    user: any;
    currentUser: any;
    userObservable: FirebaseListObservable < any >;
    isAdmin: boolean;

    constructor(public af: AngularFire, private router: Router, private location: Location, private userService: UserService) {
        this.cupboardlocation = {};
        this.cupboardlocation.name = "Camden";
        this.cupboardlocation.image = "../../../../public/images/locations/camden.jpg";
        this.user = {};

    }

    ngOnInit() {
        this.userService.authUser(this.callBack.bind(this));

        //TODO - This is bad, move into a user service
        this.af.auth.subscribe(auth => {
            if (auth && auth.uid) {
                this.currentUser = this.userService.getUserById(auth.uid);
                this.currentUser.subscribe((userData: any) => {
                    this.user = userData;
                })
            }
        });


    }

    callBack(isUserAdmin:boolean, userDate:any) {
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

    onAdd() {
        this.router.navigateByUrl('/add');
    }

    userDetailsPage() {
        console.log(this.user.$key);
        this.router.navigate(['user/details', this.user.$key]);
    }

    onStats() {
        //TODO Show the user a nice stats page
    }

    about() {
        this.router.navigateByUrl('/about');
    }

    onKiosk(){
        this.router.navigateByUrl('/kiosk');
    }

}