import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  baseUrl: string = environment.baseUrl
  checkUrl: string = environment.checkUrl
  constructor(private http: HttpClient) { }


  onlinePay(cartId: string | null, model: any): Observable<any> {
    return this.http.post(`${this.baseUrl}orders/checkout-session/${cartId}?url=${this.checkUrl}`, {
      shippingAddress: model
    })
  }

  cashPay(cartId: string | null, model: any): Observable<any> {
    return this.http.post(`${this.baseUrl}orders/${cartId}`, {
      shippingAddress: model
    })
  }
}
