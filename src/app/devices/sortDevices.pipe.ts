import {Injectable, Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: 'SortDevicesPipe'
})
@Injectable()

/**
 * Given a array of devices and a search string, will filter to the devices that match the string
 */
export class SortDevicesPipe implements PipeTransform {
    transform(devices: any): any {
        if (devices) {
            return devices.reverse();
        }
    }

}
