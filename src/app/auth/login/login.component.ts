import {Component, OnInit} from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {Router} from '@angular/router'

import '../../../../public/css/styles.css';
import '../../../../public/css/bootstrap.css';
declare var ClientJS:any;
@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent {

    domain:string = "@playtech.com";
    username:string;
    password:string;


    deviceList: FirebaseListObservable<any[]>;

    constructor(public af: AngularFire,private router: Router) {}

    login()
    {
        this.af.auth.login({ email: this.username + this.domain, password: this.password })
            .then(() => {
                this.router.navigateByUrl('');
            })
            .catch((error) => {
                //TODO - Add toasts or such
                alert('Incorrect Username OR Password');
                console.log("Firebase failure: " + JSON.stringify(error));
            });

        // var notification = new Notification("Hi, " + this.username);
    }

}
