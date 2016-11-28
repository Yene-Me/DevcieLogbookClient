import {Component, ViewContainerRef} from "@angular/core";
import {AngularFire} from "angularfire2";
import {Router} from "@angular/router";
import "../../../../public/css/styles.css";
import "../../../../public/css/bootstrap.css";
import {MdDialogRef, MdDialog, MdDialogConfig} from "@angular/material";
import {ErrorDialog} from "../../utils/dialog/dislog.component";
import {User} from "../user/user";

@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.less']
})

export class RegisterComponent {

    domain: string = "@playtech.com";
    displayname: string;
    username: string;
    password: string;
    user: User;
    dialogRef: MdDialogRef<ErrorDialog>;

    constructor(public af: AngularFire, private router: Router, public dialog: MdDialog,
                public viewContainerRef: ViewContainerRef) {
    }

    /**
     * Register the user to firebase
     */
    register() {
        if (this.validateParams() === true) {
            var email = this.username + this.domain;
            this.user = new User(this.displayname, email);

            this.af.auth.createUser({
                email: email,
                password: this.password
            })
                .then((success: any) => {
                    const itemObservable = this.af.database.object('/users/' + success.uid);
                    itemObservable.set(this.user);
                    this.login();
                })
                .catch((error: any) => {
                    this.openDialog(error.message)
                });
        }
    }

    validateParams(): boolean {
        if (this.displayname.length < 3) {
            this.openDialog("Display Name must be at least 3 Characters");
            return false;
        }

        return true;
    }

    /**
     * Log the user in with email/password
     */
    login() {
        this.af.auth.login({email: this.username + this.domain, password: this.password})
            .then(() => {
                this.router.navigateByUrl('');
            })
            .catch((error: any) => {
                this.openDialog(error.message)
            });
    }

    /**
     * Show a dialog to the user
     * @param errorText
     */
    openDialog(errorText: String) {
        let config = new MdDialogConfig();
        config.viewContainerRef = this.viewContainerRef;
        this.dialogRef = this.dialog.open(ErrorDialog, config);
        this.dialogRef.componentInstance.error = errorText;
    }


}
