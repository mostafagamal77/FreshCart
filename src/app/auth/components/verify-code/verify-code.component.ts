import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.css']
})
export class VerifyCodeComponent {


  codeForm = this._fb.group({
    resetCode: ["", [Validators.required]]
  })

  constructor(private _AuthService: AuthService,
    private _fb: FormBuilder,
    private toastr: ToastrService,
    private _Router: Router
  ) { }


  verifyCode() {
    this._AuthService.verifyCode(this.codeForm.value).subscribe({
      next: res => {
        if (res.status === "Success") {
          this._Router.navigate(["/auth/resetPassword"])

        }
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
