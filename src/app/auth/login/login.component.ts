import {Component, ViewContainerRef} from '@angular/core';
import {AngularFire} from 'angularfire2';
import {Router} from '@angular/router'

import '../../../../public/css/styles.css';
import '../../../../public/css/bootstrap.css';
import {MdDialog, MdDialogConfig, MdDialogRef} from "@angular/material";
import {ErrorDialog} from "../../utils/dialog/dislog.component";
@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent {

    domain:string = "@playtech.com";
    username:string;
    password:string;
    message:string;
    dialogRef: MdDialogRef<ErrorDialog>;

    constructor(public af: AngularFire,private router: Router, public dialog: MdDialog,
                public viewContainerRef: ViewContainerRef) {}

    /**
     * Log the user into the app
     */
    login()
    {
        this.af.auth.login({ email: this.username + this.domain, password: this.password })
            .then(() => {
                this.router.navigateByUrl('');
            })
            .catch((error:any) => {
                this.openDialog(error.message);
            });
    }

    /**
     * Show the user a dialog
     * @param errorText
     */
    openDialog(errorText:String) {
        let config = new MdDialogConfig();
        config.viewContainerRef = this.viewContainerRef;
        this.dialogRef = this.dialog.open(ErrorDialog, config);
        this.dialogRef.componentInstance.error = errorText;
    }

}


