import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IUser } from '../model/user';
import { AuthenticationService } from '../service/auth.service';

// Component to allow user to provide their credentials
// When user is authorised it stores the credentials and navigates to previous page
@Component({templateUrl: './login.component.html'})
export class LoginComponent implements OnInit {

  protected loginForm: FormGroup;
  private returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService) {}

  public ngOnInit() {
    this.saveReturnUrl();
    this.buildLoginForm();
  }

  protected onLoginSubmit(): void {
    const user: IUser = this.loginForm.value;
    this.authService.login(user).subscribe(
      () => this.acceptUser(user)
    );
  }

  private saveReturnUrl(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'];
  }

  private buildLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  private acceptUser(user: IUser): void {
    this.authService.saveUser(user);
    this.router.navigate([this.returnUrl]);
  }
}
