import { Pipe, PipeTransform } from '@angular/core';

import { IGenre } from '../model/genre';

// Converts array of Genres to string joined with ', '
@Pipe({ name: 'genre' })
export class ConvertMovieGenrePipe implements PipeTransform {

  public transform(array: IGenre[]) {
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
