import { Pipe } from '@angular/core'

@Pipe({
    name:'genre'
})

export class ConvertMovieGenrePipe {

    transform(array: any[]) {
        let result = '';
        array.forEach(element => {
            result += element.name;
            result += ', ';
        });
        return result.slice(0, -2);
    }
}