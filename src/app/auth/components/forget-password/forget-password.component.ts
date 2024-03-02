import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {

  forgetForm = this._fb.group({
    email: ["", [Validators.required, Validators.email]]
  })

  constructor(private _AuthService: AuthService,
    private _fb: FormBuilder,
    private toastr: ToastrService,
    private _Router: Router
  ) { }


  forgetPassword() {
    console.log(this.forgetForm.value);

    this._AuthService.forgetPassword(this.forgetForm.value).subscribe({
      next: res => {
        this.toastr.success(res.message, '', {
          timeOut: 2000,
          progressBar: true
        })
        this._Router.navigate(["/auth/verifyCode"])
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
