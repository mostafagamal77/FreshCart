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
  baseUrl = environment.baseUrl

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
      `${this.baseUrl}auth/signup`,
      registerForm
    );
  }
  handleSignIn(loginForm: Loginform): Observable<any> {
    return this._HttpClient.post(
      `${this.baseUrl}auth/signin`,
      loginForm
    );
  }

  logout() {
    this.userIsLogedIn.next(false);
    localStorage.removeItem('token');
    this._Router.navigate(['/home']);
  }

  forgetPassword(email: any): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}auth/forgotPasswords`, email)
  }
  verifyCode(code: any): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}auth/verifyResetCode`, code)
  }

  resetPassword(newData: any): Observable<any> {
    return this._HttpClient.put(`${this.baseUrl}auth/resetPassword`, newData)
  }
}
