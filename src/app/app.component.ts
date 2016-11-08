import {Component} from '@angular/core';
import {MaterialModule} from '@angular/material';
import {NgModule} from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {Router} from "@angular/router";


@NgModule({
    imports: [MaterialModule.forRoot()]
})

@Component({
    selector: 'my-app',
    templateUrl: './dashboard.html'
})

export class AppComponent {
    title = 'Device List';
    isAdmin = false;

    constructor(public af: AngularFire, private router: Router) {
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

    logout() {
        this.af.auth.logout();
        window.location.reload()
    }


    manage() {
        //      TODO
    }

}
