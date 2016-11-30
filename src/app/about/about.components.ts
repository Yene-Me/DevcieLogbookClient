import {Component, NgModule} from "@angular/core";
import {MaterialModule} from "@angular/material";


@NgModule({
    imports: [MaterialModule.forRoot()]
})

@Component({
    selector: 'about-layout',
    templateUrl: './about.template.html',
    styleUrls: ['./about.style.less'],
})

/**
 * WIP - Use to show useful information about our app, including a FAQ, Attributions, and links to the source
 */
export class AboutComponent {
    imageAttributions: any;

    constructor() {

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

}