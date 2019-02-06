import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { IGenre } from './genre';

@Injectable({
    providedIn: 'root'
})
export class GenreService {
    private genreUrl: string = 'http://localhost:8080/Movie/api/v0/genres';

    constructor(private http: HttpClient) {}
    
    getGenres(): Observable<IGenre[]> {
        return this.http.get<IGenre[]>(this.genreUrl).pipe(
            tap(data => console.log('All: ' +JSON.stringify(data))),
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