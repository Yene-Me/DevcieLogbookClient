import {Injectable} from "@angular/core";
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from "angularfire2";
import {Router} from "@angular/router";


@Injectable()
export class UserService {

    users: FirebaseListObservable<any>;
    user: FirebaseObjectObservable<any>;
    isAdmin: boolean;

    constructor(private af: AngularFire, private router: Router) {

    }

    /**
     *
     * @param isUserAdminCallBack
     */
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

    /**
     *
     * @returns {boolean}
     */
    isUserAdmin(): boolean {
        return this.isAdmin
    }

    /**
     *
     * @returns {FirebaseListObservable<any>}
     */
    getUsers(): FirebaseListObservable<any[]> {
        this.users = this.af.database.list('/users');
        return this.users;
    }

    /**
     *
     * @param id - The ID of the user to get
     * @returns {FirebaseObjectObservable<any>}
     */
    getUserById(id: string): FirebaseObjectObservable<any> {
        this.user = this.af.database.object('/users/' + id);

        return this.user;
    }
}