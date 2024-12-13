import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { LoginRequest } from './login-request';
import { LoginResponse } from './login-response';
import { ParseSourceFile } from '@angular/compiler';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from './auth.service';
import myAppConfig from './config/my-app-config';
import OktaSignIn from '@okta/okta-signin-widget';
import { OktaAuthStateService } from '@okta/okta-angular';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {

  oktaSignIn: any;

  constructor(private authService: AuthService, private router: Router, private oktaAuthStateService: OktaAuthStateService) {
    // this.oktaSignIn = new OktaSignIn({
    //   baseUrl: myAppConfig.oidc.issuer.split('/oauth2')[0],
    //   clientId: myAppConfig.oidc.clientId,
    //   redirectUri: myAppConfig.oidc.redirectUri,
    //   authParams: {
    //     pkce: true,
    //     issuer: myAppConfig.oidc.issuer,
    //     display: 'page',
    //     scopes: myAppConfig.oidc.scopes,
    //   },
    // });
  }

  onSubmit(): void {
    var loginRequest: LoginRequest = {
      username: this.form.controls['username'].value,
      password: this.form.controls['password'].value
    };
    
    var loginResponse: LoginResponse;

    this.authService.login(loginRequest).subscribe({
      next: result => {
        loginResponse = result;
        console.log(loginResponse);
        if (!result.success) {
          localStorage.setItem('LoginToken', result.token);
          this.authService.setUsername("User");
          // this.authService.setUsername(loginRequest.username); for actual implmentation
          console.log('Login successful');
          this.router.navigate(['/']);
        }  
      
      },
      error: e => console.error(e)
    });

  }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }
  
  form!: UntypedFormGroup;
}