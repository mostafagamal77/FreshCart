import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginError: boolean = false;
  constructor(private _AuthService: AuthService, private _Router: Router) {}

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
  });

  signin() {
    if (this.loginForm.valid) {
      this._AuthService.handleSignIn(this.loginForm.value).subscribe({
        next: (res) => {
          this.loginError = false;
          if (res.message == 'success') {
            localStorage.setItem('token', res.token);
            this._AuthService.userIsLogedIn.next(true);
            this._Router.navigate(['/home']);
          }
        },
        error: (err) => {
          this.loginError = true;
        },
      });
    }
  }
}
