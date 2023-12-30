import { Loginform } from '../../interfaces/loginform';
import { Registerform } from '../../interfaces/registerform';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userIsLogedIn = new BehaviorSubject(false);

  constructor(private _HttpClient: HttpClient, private _Router: Router) {
    if (localStorage.getItem('token') !== null) {
      this.userIsLogedIn.next(true);
      try {
        const decoded = jwtDecode(localStorage.getItem('token') || '');
      } catch (error: any) {
        if (error.message) {
          this.logout();
        }
      }
    }
  }

  handleSignUp(registerForm: Registerform): Observable<any> {
    return this._HttpClient.post(
      'https://ecommerce.routemisr.com/api/v1/auth/signup',
      registerForm
    );
  }
  handleSignIn(loginForm: Loginform): Observable<any> {
    return this._HttpClient.post(
      'https://ecommerce.routemisr.com/api/v1/auth/signin',
      loginForm
    );
  }

  logout() {
    this.userIsLogedIn.next(false);
    localStorage.removeItem('token');
    this._Router.navigate(['/home']);
  }
}
