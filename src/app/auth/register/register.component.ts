import {Component, ViewContainerRef} from '@angular/core';
import {AngularFire} from 'angularfire2';
import {Router} from '@angular/router'

import '../../../../public/css/styles.css';
import '../../../../public/css/bootstrap.css';
import {MdDialogRef, MdDialog, MdDialogConfig} from "@angular/material";
import {ErrorDialog} from "../../utils/dialog/dislog.component";

@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})

export class RegisterComponent {

    domain:string = "@playtech.com";
    username:string;
    password:string;
    dialogRef: MdDialogRef<ErrorDialog>;

    constructor(public af: AngularFire,private router: Router, public dialog: MdDialog,
                public viewContainerRef: ViewContainerRef) {}

    /**
     * Register the user to firebase
     */
    register() {
        this.af.auth.createUser({
            email: this.username + this.domain,
            password: this.password
        })
        .then(() => {
            this.login();
        })
        .catch((error) => {
            this.openDialog(error.message)
        });
    }

    /**
     * Log the user in with email/password
     */
    login()
    {
        this.af.auth.login({ email: this.username + this.domain, password: this.password })
            .then(() => {
                this.router.navigateByUrl('');
            })
            .catch((error) => {
                this.openDialog(error.message)
            });
    }

    /**
     * Show a dialog to the user
     * @param errorText
     */
    openDialog(errorText:String) {
        let config = new MdDialogConfig();
        config.viewContainerRef = this.viewContainerRef;
        this.dialogRef = this.dialog.open(ErrorDialog, config);
        this.dialogRef.componentInstance.error = errorText;
    }


}
