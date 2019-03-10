import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { IMovie } from '../model/movie';
import { AppSettings } from '../../app.settings';

@Injectable({ providedIn: 'root' })
export class MovieService {
  private readonly MOVIE_URL = AppSettings.HOST + '/Movie/v0/movies';

  constructor( private http: HttpClient ) {}

  public getMovies(): Observable<IMovie[]> {
    return this.searchMovies('');
  }

  public searchMovies(queryParamString: string): Observable<IMovie[]> {
    return this.http.get<IMovie[]>(this.MOVIE_URL + queryParamString);
  }

  public queryMovies(queryParam): Observable<IMovie[]> {
    return this.http.get<IMovie[]>(this.MOVIE_URL, { params: queryParam });
  }

  public getMovie(id: number): Observable<IMovie> {
    return this.http.get<IMovie>(this.MOVIE_URL + '/' + id).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  public createMovie(movie: IMovie): Observable<IMovie> {
    return this.http.post<IMovie>(this.MOVIE_URL, movie).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  public updateMovie(id: number, movie: IMovie): Observable<IMovie> {
    return this.http.put<IMovie>(this.MOVIE_URL + '/' + id, movie).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  public deleteMovie(id: number): Observable<{}> {
    return this.http.delete<any>(this.MOVIE_URL + '/' + id).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
        errorMessage = 'An Error Occured' + err.error.message;
    } else {
        errorMessage = 'Server returned '  + err.status;
    }
    return throwError(errorMessage);
  }

}
