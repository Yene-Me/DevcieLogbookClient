import {Injectable, Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: 'ImageGuessPipe'
})
@Injectable()

/**
 * Given a device, will return the closest matching icon.
 * Matches by type -> os -> model
 * eg mobile -> iOS -> iPhone6
 * Each stage has an image, that is used if the next stage does not match. EG if there was no image for the iPhone 6, then the image for iOS, mobile would be used.
 */
export class ImageGuessPipe implements PipeTransform {
    transform(device: any): string {
        var image = 'mobile/iphone6.svg';


        // platform -> os -> model
        var deviceImageList =
        {
            tablet: {
                img: "tablet/ipad.svg",
                ios: {
                    img: "tablet/ipad.svg"
                },
                android: {
                    img: "tablet/samsungTab.svg"
                }
            },
            mobile: {
                img: "mobile/iphone6.svg",
                android: {
                    img: "mobile/samsungPhone.svg"
                }
            },
            desktop: {
                img: "desktop/macbook.svg"
            }
        };


        //MATCHING
        if (device.device_type && deviceImageList[device.device_type.toLocaleLowerCase()]) {
            image = deviceImageList[device.device_type.toLocaleLowerCase()].img;

            if (device.device_os && deviceImageList[device.device_type.toLocaleLowerCase()][device.device_os.toLocaleLowerCase()]) {
                image = deviceImageList[device.device_type.toLocaleLowerCase()][device.device_os.toLocaleLowerCase()].img;

                if (device.device_device_model && deviceImageList[device.device_type.toLocaleLowerCase()][device.device_os.toLocaleLowerCase()][device.device_device_model.toLocaleLowerCase()]) {
                    image = deviceImageList[device.device_type.toLocaleLowerCase()][device.device_os.toLocaleLowerCase()][device.device_device_model.toLocaleLowerCase()].img;
                }

            }
        }

        return "img/devices/" + image;
    }

}
