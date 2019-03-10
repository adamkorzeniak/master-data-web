import { Pipe, PipeTransform } from '@angular/core';

// Converts value in minutes to human readable hh:mm
@Pipe({
    name: 'minutesToHours'
})
export class MinutesToHoursPipe implements PipeTransform {

  public transform(value: number): string {
    let result = '';
    result += Math.floor(value / 60) + 'h ';
    const minutes = value % 60;
    if (minutes < 10) {
        result += '0';
    }
    result += minutes + 'min';
    return result;
  }
}
