import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'timeformateChange' })
export class TimeformateChange implements PipeTransform {
    transform(value: string): string {
        if (value != null && value != '') {
            let timeValue: string = "";
            let time: string = value;
            let timeArray: Array<any>;

            timeArray = time.split(':'); // convert to array

            // fetch
            var hours = Number(timeArray[0]);
            var minutes = Number(timeArray[1]);


            if (hours > 0 && hours <= 12) {
                timeValue = "" + hours;
            } else if (hours > 12) {
                timeValue = "" + (hours - 12);
            } else if (hours == 0) {
                timeValue = "12";
            }

            timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;  // get minutes
            timeValue += (hours >= 12) ? " P.M." : " A.M.";  // get AM/PM

            return timeValue;
        } else {
            return 'Closed'
        }
    }
}