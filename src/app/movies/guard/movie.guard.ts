import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

// Guard validates that Movie id is a number and is a positive value
@Injectable({
  providedIn: 'root'
})
export class MovieActivateGuard implements CanActivate {

  constructor(private router: Router) {}

  public canActivate(next: ActivatedRouteSnapshot): boolean {
    const id = +next.url[1].path;
    if (isNaN(id) || id < 1) {
      alert('Invalid movie Id');
      this.router.navigate(['movies']);
      return false;
    }
    return true;
  }
}
