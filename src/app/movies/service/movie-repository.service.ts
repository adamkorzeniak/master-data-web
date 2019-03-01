import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { IMovie } from '../model/movie';
import { AppSettings } from '../../app.settings';

@Injectable({
    providedIn: 'root'
})
export class MovieService {
    private movieUrl: string = AppSettings.HOST + '/Movie/v0/moviesz';

    constructor(
      private http: HttpClient
      ) {}

    public getMovies(): Observable<IMovie[]> {
        return this.searchMovies('');
    }

    public searchMovies(queryParamString: string): Observable<IMovie[]> {
        return this.http.get<IMovie[]>(this.movieUrl + queryParamString).pipe(
            tap(data => console.log('Searched: ' + JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    public queryMovies(queryParam): Observable<IMovie[]> {
        return this.http.get<IMovie[]>(this.movieUrl, { params: queryParam }).pipe(
            tap(data => console.log('Searched: ' + JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    public getMovie(id: number): Observable<IMovie> {
        return this.http.get<IMovie>(this.movieUrl + '/' + id).pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    public createMovie(movie: IMovie): Observable<IMovie> {
        return this.http.post<IMovie>(this.movieUrl, movie).pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    public updateMovie(id: number, movie: IMovie): Observable<IMovie> {
        return this.http.put<IMovie>(this.movieUrl + '/' + id, movie).pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    public deleteMovie(id: number): Observable<{}> {
        return this.http.delete<any>(this.movieUrl + '/' + id).pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    private handleError(err: HttpErrorResponse) {
        console.log(err);
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
            errorMessage = 'An Error Occured' + err.error.message;
        } else {
            errorMessage = 'Server returned '  + err.status;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
    }

}
