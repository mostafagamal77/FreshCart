import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  baseUrl: string = environment.baseUrl;
  numOfCartItems = new BehaviorSubject(0);

  constructor(private _httpClient: HttpClient) {}

  // Add Product To Cart
  addToCart(productId: string): Observable<any> {
    return this._httpClient.post(this.baseUrl + 'cart', {
      productId: productId,
    });
  }

  // Get Cart Products
  getCartProducts(): Observable<any> {
    return this._httpClient.get(this.baseUrl + 'cart');
  }

  // Delete Specific Product
  deleteCartProduct(productId: string): Observable<any> {
    return this._httpClient.delete(this.baseUrl + `cart/${productId}`);
  }

  //Clear Cart
  clearCart(): Observable<any> {
    return this._httpClient.delete(this.baseUrl + 'cart');
  }

  //update product count in cart
  updateProductCount(productId: string, count: number): Observable<any> {
    return this._httpClient.put(this.baseUrl + `cart/${productId}`, {
      count: count,
    });
  }
}
