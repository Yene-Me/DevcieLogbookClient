import {Component, OnInit} from '@angular/core';
import {MaterialModule} from '@angular/material';
import {NgModule} from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {Router} from "@angular/router";
import {Location} from '@angular/common';


@NgModule({
    imports: [MaterialModule.forRoot()]
})

@Component({
    selector: 'my-app',
    templateUrl: './dashboard.html'
})

export class AppComponent implements OnInit {
    title = 'Device List';
    isAdmin = false;
    showEdit = false;
    showAdd = false;

    constructor(public af: AngularFire, private router: Router, private location: Location) {
        af.auth.subscribe(auth => {
            //If the user is already logged in, take them away from the login page
            if (auth && auth.uid) {

                var admin = af.database.object('/admins/' + auth.uid);
                admin.subscribe((data: any) => {
                    this.isAdmin = data.isAdmin;
                });


                this.router.navigateByUrl('');
            }
        });
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
        this.af.auth.logout();
        window.location.reload()
    }

    back() {
        this.location.back();
    }


    manage() {
        //      TODO
    }

}
