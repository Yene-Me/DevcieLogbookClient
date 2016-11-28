import {Component, OnInit, NgModule} from "@angular/core";
import {MaterialModule} from "@angular/material";
import {AngularFire, FirebaseListObservable} from "angularfire2";
import {Router, NavigationEnd} from "@angular/router";
import {Location} from "@angular/common";
import {UserService} from "../auth/user/user.service";
import {ToolBarService} from "../utils/toolbar/toolBar.service";


@NgModule({
    imports: [MaterialModule.forRoot()]
})

@Component({
    selector: 'side-menu-layout',
    templateUrl: './side.menu.html',
    styleUrls: ['./side.menu.style.less'],
})

export class SideMenuComponent implements OnInit {
    cupboardlocation: any;
    userId: string;
    user: any;
    currentUser: any;
    userObservable: FirebaseListObservable < any >;
    isAdmin: boolean;
    title: string

    constructor(public af: AngularFire, private router: Router, private location: Location, private userService: UserService, private toolBarService: ToolBarService) {
        this.cupboardlocation = {};
        this.cupboardlocation.name = "Camden";
        this.cupboardlocation.image = "../../../../public/images/locations/camden.jpg";
        this.user = {};

    }

    ngOnInit() {
        this.userService.authUser(this.callBack.bind(this));
        this.router.events.forEach((e)=> {
            if (e instanceof NavigationEnd) {
                this.title = this.toolBarService.getTitleByUrl(e.urlAfterRedirects);

            }
        });
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

    callBack(isUserAdmin: boolean, userDate: any) {
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

    //TODO - active styling on sidebar element
    userDetailsPage() {
        console.log(this.user.$key);
        this.router.navigate(['user/details', this.user.$key]);
    }
}