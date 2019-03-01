import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { IGenre } from '../model/genre';
import { AppSettings } from '../../app.settings';

@Injectable({
    providedIn: 'root'
})
export class GenreService {
    public genreUrl: string = AppSettings.HOST + '/Movie/v0/genres';

    constructor(private http: HttpClient) {}

    public getGenres(): Observable<IGenre[]> {
        return this.http.get<IGenre[]>(this.genreUrl).pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    public createGenre(genre: IGenre): Observable<IGenre> {
        return this.http.post<IGenre>(this.genreUrl, genre).pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    public updateGenre(id: number, genre: IGenre): Observable<IGenre> {
        return this.http.put<IGenre>(this.genreUrl + '/' + id, genre).pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    public deleteGenre(id: number): Observable<{}> {
        return this.http.delete<any>(this.genreUrl + '/' + id).pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    public handleError(err: HttpErrorResponse) {
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
