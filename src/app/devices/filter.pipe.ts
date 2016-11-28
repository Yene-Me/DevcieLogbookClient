import {Injectable, Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: 'DeviceFilterPipe'
})
@Injectable()

/**
 * Given a array of devices and a search string, will filter to the devices that match the string
 */
export class DeviceFilterPipe implements PipeTransform {
    transform(devices: any[], args: string): any {
        if (!args) {
            //If the argument is empty, then match all the devices
            return devices;
        }
        else {
            var output: any[];
            output = [];

            //Loop Though all of the devices
            for (let i = 0; i < devices.length; i++) {

                let device = devices[i];

                //Loop Through all of the keys in the device
                for (var key in device) {
                    var value = device[key];

                    //We don't want to search all the keys like user agent, as this will give some wired results
                    let searchKeys = ['device_model', 'device_os', 'device_resolution', 'device_type', 'device_vendor', 'device_version', 'inUseBy', 'name', 'device_status'];
                    if (searchKeys.indexOf(key) !== -1) {

                        //Ensure we do not add the device to the output twice
                        if (output.indexOf(device) === -1) {
                            //Check if the key value matches the user input
                            if (device[key].toLowerCase().indexOf(args.toLowerCase()) !== -1) {
                                output.push(device);
                            }
                        }
                    }

                }
            }
            return output;
        }

    }
}