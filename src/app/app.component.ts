import { Component } from '@angular/core';
import { AuthenticationService } from './auth/service/auth.service';

@Component({
  selector: 'md-root',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(
    private authService: AuthenticationService) {}

  public logout() {
    this.authService.logout();
    location.reload(true);
  }

  public isLogged(): boolean {
    return this.authService.isAuthorised();
  }
}
