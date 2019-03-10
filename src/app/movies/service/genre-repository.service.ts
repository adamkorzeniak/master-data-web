import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { IGenre } from '../model/genre';
import { AppSettings } from '../../app.settings';

@Injectable({ providedIn: 'root' })
export class GenreService {
  public readonly GENRE_URL: string = AppSettings.HOST + '/Movie/v0/genres';

  constructor(private http: HttpClient) {}

  public getGenres(): Observable<IGenre[]> {
    return this.http.get<IGenre[]>(this.GENRE_URL).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  public createGenre(genre: IGenre): Observable<IGenre> {
    return this.http.post<IGenre>(this.GENRE_URL, genre).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  public updateGenre(id: number, genre: IGenre): Observable<IGenre> {
    return this.http.put<IGenre>(this.GENRE_URL + '/' + id, genre).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  public deleteGenre(id: number): Observable<{}> {
    return this.http.delete<any>(this.GENRE_URL + '/' + id).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  public handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = 'An Error Occured' + err.error.message;
    } else {
      errorMessage = 'Server returned '  + err.status;
    }
    return throwError(errorMessage);
  }

}
