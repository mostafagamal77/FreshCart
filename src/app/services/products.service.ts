import { Product } from './../interfaces/product';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  baseUrl: string = 'https://ecommerce.routemisr.com/api/v1/';

  constructor(private _httpClient: HttpClient) {}

  // Get all products from api
  getAllProducts(): Observable<any> {
    return this._httpClient.get(this.baseUrl + 'products');
  }

  // Get Specific Product
  getOneProduct(productId: string): Observable<any> {
    return this._httpClient.get(this.baseUrl + `products/${productId}`);
  }

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
