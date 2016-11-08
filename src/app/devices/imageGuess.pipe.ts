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


        // platform -> os -> model

        var deviceImageList =
        {
            tablet: {
                img: "http://placehold.it/150x150",
                ios: {
                    img: "http://placehold.it/10x10"
                }
            },
            mobile: {
                img: "http://placehold.it/100x100"
            },
            desktop: {
                img: "http://placehold.it/150x150"
            }
        };


        //MATCHING
        if (deviceImageList[device.device_type]) {
            image = deviceImageList[device.device_type].img;

            if (deviceImageList[device.device_type][device.device_os]) {
                image = deviceImageList[device.device_type][device.device_os].img;

                if (deviceImageList[device.device_type][device.device_os][device.device_device_model]) {
                    image = deviceImageList[device.device_type][device.device_os][device.device_device_model].img;
                }

            }
        }

        return image;
    }

}
