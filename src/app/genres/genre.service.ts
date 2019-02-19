import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { IGenre } from './genre';
import { AppSettings } from '../app.settings';

@Injectable({
    providedIn: 'root'
})
export class GenreService {
    private genreUrl: string = AppSettings.HOST + '/Movie/v0/genres';

    constructor(private http: HttpClient) {}

    getGenres(): Observable<IGenre[]> {
        return this.http.get<IGenre[]>(this.genreUrl).pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    createGenre(genre: IGenre): Observable<IGenre> {
        return this.http.post<IGenre>(this.genreUrl, genre).pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    updateGenre(id: number, genre: IGenre): Observable<IGenre> {
        return this.http.put<IGenre>(this.genreUrl + '/' + id, genre).pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    deleteGenre(id: number): Observable<{}> {
        return this.http.delete<any>(this.genreUrl + '/' + id).pipe(
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
