import {Injectable, Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: 'SortDevicesPipe'
})
@Injectable()

/**
 *  Reverses the order of a array of devices
 */
export class SortDevicesPipe implements PipeTransform {
    transform(devices: any): any {
        if (devices) {
            return devices.reverse();
        }
    }
}
