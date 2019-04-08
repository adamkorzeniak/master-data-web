import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  private readonly AUTH_URL: string = AppSettings.REST_URL + '/v0/me';
  private readonly AUTH_STORAGE_LOCATION = 'authData';

  constructor(private http: HttpClient) { }

  public login(user: IUser): Observable<{}> {
    return this.http.get<any>(
      this.AUTH_URL,
      {
        headers: new HttpHeaders ({
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + window.btoa(user.username + ':' + user.password)
        })
      });
  }

  public logout(): void {
    localStorage.removeItem(this.AUTH_STORAGE_LOCATION);
  }

  public isAuthorised(): boolean {
    return !!localStorage.getItem(this.AUTH_STORAGE_LOCATION);
  }

  public getAuthorisationData(): string {
    return localStorage.getItem(this.AUTH_STORAGE_LOCATION);
  }

  public saveUser(user: IUser): void {
    const authData = 'Basic ' + window.btoa(user.username + ':' + user.password);
    localStorage.setItem(this.AUTH_STORAGE_LOCATION, authData);
  }
}
