import { Injectable, Injector} from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router, Event, NavigationError } from '@angular/router';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { AppSettings } from 'src/app/app.settings';
import { HttpClient } from '@angular/common/http';
import { IError } from '../model/error';

@Injectable({ providedIn: 'root' })
export class ErrorsService {
  private readonly ERROR_URL = AppSettings.REST_URL + '/v0/Error/errors';

  constructor(
    private injector: Injector,
    private router: Router,
    private http: HttpClient) {
    // Subscribe to the NavigationError
    this.router
      .events
      .subscribe((event: Event) => {
        if (event instanceof NavigationError) {
          this.log(event.error)
            .subscribe((errorWithContext) => {
              this.router.navigate(['/error'], { queryParams: errorWithContext });
            });
        }
      });
  }

  public log(error) {
    console.error(error);
    const errorToSend = this.addContextInfo(error);
    return this.sendError(errorToSend);
  }

  private addContextInfo(error) {
    // You can include context details here (usually coming from other services: UserService...)
    const name = error.name || null;
    const appId = 'master-data-web';
    const time = new Date().getTime();
    const errorId = `${appId}-${time}`;
    const location = this.injector.get(LocationStrategy);
    const url = location instanceof PathLocationStrategy ? location.path() : '';
    const status = error.status || null;
    const details = error.message || error.toString();
    const stack = error.stack;

    return { appId, errorId, name, details, time, url, status, stack };
  }

  private sendError(error): Observable<any> {
    this.http.post<IError>(this.ERROR_URL, error).subscribe();
    console.log('Error sent to the server: ', error);
    return of(error);
  }
}
