import {Injectable} from '@angular/core';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import {Router} from "@angular/router";


@Injectable()
export class UserService {

    users: FirebaseListObservable<any>;
    user: FirebaseObjectObservable<any>;
    userObservable: FirebaseListObservable<any>;
    isAdmin: boolean;

    constructor(private af: AngularFire, private router: Router) {

    }

    authUser(isUserAdminCallBack: any): void {
        this.af.auth.subscribe(auth => {
            //If the user is already logged in, take them away from the login page
            if (auth && auth.uid) {

                var admin = this.af.database.object('/admins/' + auth.uid);
                admin.subscribe((data: any) => {
                    isUserAdminCallBack(data.isAdmin, data);
                });
                if (this.router.url == "/login") {
                    this.router.navigateByUrl('');
                }

            }
        });
    }

    isUserAdmin(): boolean {
        return this.isAdmin
    }

    getUsers(): FirebaseListObservable<any[]> {
        this.users = this.af.database.list('/users');
        return this.users;
    }

    getUserById(id: string): FirebaseObjectObservable<any> {
        this.user = this.af.database.object('/users/' + id);

        return this.user;
    }
}