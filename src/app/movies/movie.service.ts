import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { IMovie } from './movie';

@Injectable({
    providedIn: 'root'
})
export class MovieService {
    private movieUrl: string = 'http://localhost:8080/Movie/api/v0/movies';

    constructor(private http: HttpClient) {}
    
    getMovies(): Observable<IMovie[]> {
        return this.http.get<IMovie[]>(this.movieUrl).pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    getMovie(id: number): Observable<IMovie> {
        return this.http.get<IMovie>(this.movieUrl + '/' + id).pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    createMovie(movie: IMovie): Observable<IMovie> {
        return this.http.post<IMovie>(this.movieUrl, movie).pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    updateMovie(id: number, movie: IMovie): Observable<IMovie> {
        return this.http.put<IMovie>(this.movieUrl + '/' + id, movie).pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    deleteMovie(id: number): Observable<{}> {
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
        return throwError(errorMessage)
    }

}