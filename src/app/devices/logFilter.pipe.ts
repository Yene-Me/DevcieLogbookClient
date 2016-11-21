import {Injectable, Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'LogFilterPipe'
})
@Injectable()

/**
 * Given a array of devices and a search string, will filter to the devices that match the string
 */
export class LogFilterPipe implements PipeTransform {
    transform(logs: any[], args: string): any {


        if(!args)
        {
            //If the argument is empty, then match all the logs
            return logs;
        }
        else
        {
            var output:any[];
            output = [];

            //Loop Though all of the logs
            for (let i = 0; i < logs.length; i++ ){

                let log = logs[i];

                //Loop Through all of the keys in the log
                for (var key in log) {
                    var value = log[key];

                    //We don't want to search all the keys like user agent, as this will give some wired results
                    let searchKeys = ['device_model', 'device_os', 'device_resolution', 'device_type', 'device_vendor', 'device_version', 'inUseBy'];
                    if(searchKeys.indexOf(key)!== -1)
                    {

                        //Ensure we do not add the log to the output twice
                        if(output.indexOf(log) === -1)
                        {
                            //Check if the key value matches the user input
                            if(log[key].toLowerCase().indexOf(args.toLowerCase()) !== -1)
                            {
                                output.push(log);
                            }
                        }
                    }

                }
            }
            return output;
        }

    }
}