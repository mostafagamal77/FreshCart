import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CheckoutService } from 'src/app/services/checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  cartId: string | null = ''
  constructor(private fb: FormBuilder, private _ActivatedRoute: ActivatedRoute, private _CheckoutService: CheckoutService) { }
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
    this._CheckoutService.onlinePay(this.cartId, this.checkoutForm.value).subscribe({
      next: (res) => {
        if(res.status == "success") {
          window.open(res.session.url, '_self')
        }
      }
    })
  }

  cashPay() {

  }

}
