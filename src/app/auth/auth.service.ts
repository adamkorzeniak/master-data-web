import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppSettings } from '../app.settings';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    private authUrl: string = AppSettings.HOST + '/v0/me';

    constructor(private http: HttpClient) { }

    login(username: string, password: string): Observable<{}> {
        return this.http.get<any>(this.authUrl,
            {headers: new HttpHeaders ({
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + window.btoa(username + ':' + password) })}
            ).pipe(
                tap(data => console.log('Searched: ' + JSON.stringify(data))),
                catchError(null)
        );
    }

    logout() {
        localStorage.removeItem('authData');
    }
}
