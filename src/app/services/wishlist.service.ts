import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  baseUrl = environment.baseUrl;
  numberOfWishlist = new BehaviorSubject(0);

  constructor(private _HttpClient: HttpClient) {}

  getWishlist(): Observable<any> {
    return this._HttpClient.get(this.baseUrl + 'wishlist');
  }
}
