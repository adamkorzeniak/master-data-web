import { Component } from '@angular/core';
import { AuthenticationService } from './auth/auth.service';

@Component({
  selector: 'md-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  appName: string = 'Master Data';

  constructor(private authService: AuthenticationService) {}

  logout() {
    this.authService.logout();
    location.reload(true);
  }
}
