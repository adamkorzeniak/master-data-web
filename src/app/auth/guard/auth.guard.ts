import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../service/auth.service';

// Guard checks if user is authenticated, and if not navigates to login page
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthenticationService) { }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isAuthorised()) {
        return true;
    }
    this.navigateToLoginPage(state);
    return false;
  }

  private navigateToLoginPage(state: RouterStateSnapshot): void {
    this.router.navigate(['/login'], {
      queryParams: {
        returnUrl: state.url.split('?')[0]
      }
    });
  }
}
