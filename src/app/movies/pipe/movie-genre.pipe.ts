import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'genre'
})

export class ConvertMovieGenrePipe implements PipeTransform {

    public transform(array: any[]) {
        let result = '';
        if (!array) {
            return '';
        }
        array.forEach(element => {
            result += element.name;
            result += ', ';
        });
        return result.slice(0, -2);
    }
}
