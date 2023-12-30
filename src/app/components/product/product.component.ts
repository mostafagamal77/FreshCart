import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  constructor(
    private _ProductsService: ProductsService,
    private _AuthService: AuthService,
    private _Router: Router
  ) {}

  @Input() product: any;

  ngOnInit(): void {}

  addToCart(productId: string) {
    if (this._AuthService.userIsLogedIn.value == true) {
      this._ProductsService.addToCart(productId).subscribe({
        next: (res) => {},
      });
    } else {
      this._Router.navigate(['/auth']);
    }
  }
}
