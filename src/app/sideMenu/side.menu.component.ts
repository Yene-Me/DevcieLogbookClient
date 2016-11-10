import {Component, OnInit} from '@angular/core';
import {MaterialModule} from '@angular/material';
import {NgModule} from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {Router} from "@angular/router";
import {Location} from '@angular/common';
import {User} from "../auth/user/user";


@NgModule({
    imports: [MaterialModule.forRoot()]
})

@Component({
    selector: 'side-menu-layout',
    templateUrl: './side.menu.html',
    styleUrls: ['./side.menu.style.css']
})

export class SideMenuComponent implements OnInit {
    cupboardlocation: any;
    userId: string;
    user: any;

    constructor(public af: AngularFire, private router: Router, private location: Location) {
        this.cupboardlocation = {};
        this.cupboardlocation.name = "Camden";
        this.cupboardlocation.image = "../../../../public/images/locations/camden.jpg";
        this.user = {};

        this.af.auth.subscribe(auth => {
            this.userId = auth.uid;

            var user = this.af.database.object('/users/' + auth.uid);
            user.subscribe((data: User) => {
                this.user = data;
            })

        });
    }

    ngOnInit() {

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

}