import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../auth/auth.service';

@Component({templateUrl: './login.component.html'})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    returnUrl: string;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private authenticationService: AuthenticationService) {}

    ngOnInit() {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'];
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    onSubmit() {
        const user = this.loginForm.value;
        this.authenticationService.login(user.username, user.password).subscribe(
            () => this.acceptUser(user),
            () => null
        );
    }

    private acceptUser(user) {
        const authData = 'Basic ' + window.btoa(user.username + ':' + user.password);
        localStorage.setItem('authData', authData);
        this.router.navigate([this.returnUrl]);
    }
}
