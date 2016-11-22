import {Component, OnInit} from '@angular/core';
import {MaterialModule} from '@angular/material';
import {NgModule} from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {Router} from "@angular/router";
import {Location} from '@angular/common';
import {DeviceService} from '../devices/device.service';
import {UserService} from  '../auth/user/user.service';


@NgModule({
    imports: [MaterialModule.forRoot()]
})

@Component({
    selector: 'about-layout',
    templateUrl: './about.template.html',
    styleUrls: ['./about.style.css'],
})

export class AboutComponent implements OnInit {
    imageAttributions: any;

    constructor(public af: AngularFire, private router: Router,
                private location: Location,
                private deviceService: DeviceService,
                private usersService: UserService) {

        //TODO - Move this data into its own file
        this.imageAttributions =
            [
                {
                    title: "Device Images",
                    name: "Laura Reen",
                    url: "https://www.iconfinder.com/DemSt"
                }
            ]

    }

    ngOnInit() {


    }


}