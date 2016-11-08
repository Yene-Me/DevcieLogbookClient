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




        return image;
    }

}
