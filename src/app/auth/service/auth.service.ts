import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { AppSettings } from '../../app.settings';
import { IUser } from '../model/user';

// Provides functionality to:
//    login user
//    logout user
//    check if current user is authorized
//    retrieve authorization details
//    store authorization details

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    private authUrl: string = AppSettings.HOST + '/v0/me';
    private authStorageLocation = 'authData';

    constructor(private http: HttpClient) { }

    public login(user: IUser): Observable<{}> {
      return this.http.get<any>(this.authUrl,
          {headers: new HttpHeaders ({
              'Content-Type': 'application/json',
              'Authorization': 'Basic ' + window.btoa(user.username + ':' + user.password) })}
          ).pipe(
              tap(data => console.log('User authenticated: ' + JSON.stringify(data))),
              catchError(null)
      );
    }

  public logout(): void {
    localStorage.removeItem(this.authStorageLocation);
  }

  public isAuthorised(): boolean {
    return !!localStorage.getItem(this.authStorageLocation);
  }

  public getAuthorisationData(): string {
    return localStorage.getItem(this.authStorageLocation);
  }

  public saveUser(user: IUser): void {
    const authData = 'Basic ' + window.btoa(user.username + ':' + user.password);
    localStorage.setItem(this.authStorageLocation, authData);
  }
}
