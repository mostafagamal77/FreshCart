import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  cartId: string | null = ''
  constructor(private fb: FormBuilder,
    private _ActivatedRoute: ActivatedRoute,
    private _CheckoutService: CheckoutService,
    private _CartService: CartService,
    private _Router: Router,
    private toastr: ToastrService
  ) { }
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe(params => {
      this.cartId = params.get("cartId")
    })
  }


  checkoutForm: FormGroup = this.fb.group({
    details: ["", Validators.required],
    phone: ["", Validators.required],
    city: ["", Validators.required]
  })

  onlinePay() {
    if (this.checkoutForm.valid) {
      this._CheckoutService.onlinePay(this.cartId, this.checkoutForm.value).subscribe({
        next: (res) => {
          if (res.status == "success") {
            window.open(res.session.url, '_self')
          }
        }
      })
    }
  }

  cashPay() {
    if (this.checkoutForm.valid) {
      this._CheckoutService.cashPay(this.cartId, this.checkoutForm.value).subscribe({
        next: res => {
          this.toastr.success('You ordered successfully', '', {
            timeOut: 2000,
            progressBar: true
          });
          this._CartService.numOfCartItems.next(0)
          this._Router.navigate(["/"])
        }
      })
    }
  }

}
