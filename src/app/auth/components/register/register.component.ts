import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerError: boolean = false;
  isPassMatch: boolean = false;

  constructor(private _AuthService: AuthService, private _Router: Router) {}

  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-zA-Z0-9][a-zA-Z0-9]{0,}$/),
    ]),
    email: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/),
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
      ),
    ]),
    rePassword: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^01[0125][0-9]{8}$/),
    ]),
  });

  signUp() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      this._AuthService.handleSignUp(this.registerForm.value).subscribe({
        next: (res) => {
          this.registerError = false;
          if (res.message == 'success') {
            this._Router.navigate(['/auth']);
          }
        },
        error: (err) => {
          this.registerError = true;
        },
      });
    }
  }

  matchPass() {
    if (
      this.registerForm.value.password == this.registerForm.value.rePassword
    ) {
      this.isPassMatch = true;
    } else {
      this.isPassMatch = false;
    }
  }
}
