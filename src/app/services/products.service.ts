import { Product } from './../interfaces/product';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  baseUrl: string = environment.baseUrl;

  constructor(private _httpClient: HttpClient) {}

  // Get all products from api
  getAllProducts(pageNumber: number): Observable<any> {
    return this._httpClient.get(`${this.baseUrl}products?page=${pageNumber}`);
  }

  // Get Specific Product
  getOneProduct(productId: string): Observable<any> {
    return this._httpClient.get(this.baseUrl + `products/${productId}`);
  }
}
