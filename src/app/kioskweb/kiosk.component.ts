import {Component, OnInit, NgModule, ViewChild, ElementRef} from "@angular/core";
import {MaterialModule} from "@angular/material";
import {AngularFire, FirebaseObjectObservable} from "angularfire2";


@NgModule({
    imports: [MaterialModule.forRoot()]
})

@Component({
    selector: 'kiosk-layout',
    templateUrl: './kiosk.template.html',
    styleUrls: ['./kiosk.style.less']

})

export class KioskComponentWeb implements OnInit {


    nearKiosk: FirebaseObjectObservable<any>;
    userName: string;
    deviceName: string;


    @ViewChild('nfcInput') nfcInput: ElementRef;


    constructor(public af: AngularFire) {

    }

    ngOnInit() {

        this.nearKiosk = this.af.database.object('/webKiosk/user');

        this.nearKiosk.subscribe((data) => {

            this.userName = data.$value;
        });

        this.nearKiosk = this.af.database.object('/webKiosk/device');

        this.nearKiosk.subscribe((data) => {

            this.deviceName = data.$value;
        })
    }


}