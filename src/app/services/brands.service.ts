import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BrandsService {
  baseUrl: string = environment.baseUrl;

  constructor(private _HttpClient: HttpClient) {}

  getAllBrands(pageNumber: number): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}brands?page=${pageNumber}`);
  }
}
