import {Injectable} from '@angular/core';


@Injectable()
export class ToolBarService {

    dict = {
        "/devices/all": "Devices",
        "/devices/myDevices": "My Devices",
        "/about": "About",
        "/login": "Login",
        "/register": "Register",
        "device": "Device",
        "/kiosk": "Kiosk",
        "/admin": "Admin",
        "user": "My Account",
        "/add": "Add New Device",
        "/kioskWeb": "Web Kiosk"

    };

    constructor() {

    }

    getTitleByUrl(url:string):string {
        if (/^\/details/.test(url)) {
            return this.dict["device"];
        }
        else if (/^\/user/.test(url)) {
            return this.dict["user"];
        }
        return this.dict[url];
    }

    //TODO:hide and show ToolBar
    toggleToolBar(url:string) {

    }


}