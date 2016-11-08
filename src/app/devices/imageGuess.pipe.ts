import {Injectable, Pipe, PipeTransform} from '@angular/core';
import {Device} from "./helpers/device";

@Pipe({
    name: 'ImageGuessPipe'
})
@Injectable()

/**
 * Given a device, will return the most appropriate image
 */
export class ImageGuessPipe implements PipeTransform {
    transform(device:any): string {
        console.log('device', device);

        var image = 'http://placehold.it/150x150';

//IDENTIFIERS
        var MOBILE =
        {
            id: "mobile",
            img: 'http://placehold.it/150x150'
        };


        var TABLET = "tablet";
        var DESKTOP = "desktop";
        var WATCH = "watch";


        var deviceImageList =
        {
            tablet: {
                img: "http://placehold.it/150x150"
            },
            mobile: {
                img: "http://placehold.it/150x150"
            },
            desktop: {
                img: "http://placehold.it/150x150"
            },
        };

        //MATCHING
        if(device.device_type === MOBILE){
            image = 'http://placehold.it/550x550';
        }



        return image;
    }

}
