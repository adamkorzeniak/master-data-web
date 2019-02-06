import { Pipe } from '@angular/core'

@Pipe({
    name:'minutesToHours'
})

export class MinutesToHoursPipe {

    transform(value: number): string {
        let result = '';
        result += Math.floor(value / 60) + ':';
        let minutes = value % 60;
        if (minutes < 10) {
            result += '0';
        }
        result += minutes;
        return result;
    }
}