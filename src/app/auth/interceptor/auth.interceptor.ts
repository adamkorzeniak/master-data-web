import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../service/auth.service';

// Before every requests it add Content-Type, Accent, Authentication headers
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthenticationService) { }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authData = this.authService.getAuthorisationData();
    if (authData) {
      req = req.clone({
        setHeaders: {
          'Content-Type' : 'application/json; charset=utf-8',
          'Accept'       : 'application/json',
          'Authorization': authData
        }
      });
    }
    return next.handle(req);
  }
}
