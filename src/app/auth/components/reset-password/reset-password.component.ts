import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {

  resetForm = this._fb.group({
    email: ["", [Validators.required, Validators.email]],
    newPassword: ["", [Validators.required]]
  })

  constructor(private _AuthService: AuthService,
    private _fb: FormBuilder,
    private toastr: ToastrService,
    private _Router: Router
  ) { }


  resetPassword() {
    this._AuthService.resetPassword(this.resetForm.value).subscribe({
      next: res => {
        console.log(res);

        localStorage.setItem('token', res.token);
        this._AuthService.userIsLogedIn.next(true);
        this._Router.navigate(['/home']);
        // this._Router.navigate(["/auth/verifyCode"])
      },
      error: err => {
        console.log(err);
        this.toastr.error(err.error.message, '', {
          timeOut: 2000,
          progressBar: true
        })
      }
    })
  }

}
