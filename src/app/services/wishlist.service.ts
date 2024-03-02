import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  baseUrl = environment.baseUrl;
  numberOfWishlist = new BehaviorSubject(0);

  constructor(private _HttpClient: HttpClient) { }

  getWishlist(): Observable<any> {
    return this._HttpClient.get(this.baseUrl + 'wishlist');
  }

  addProductToWishlist(productId: string): Observable<any> {
    return this._HttpClient.post(this.baseUrl + 'wishlist', { productId });
  }

  removeFromWishlist(productId: string): Observable<any> {
    return this._HttpClient.delete(this.baseUrl + `wishlist/${productId}`);
  }
}
