import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  constructor(
    private _CartService: CartService,
    private _AuthService: AuthService,
    private _Router: Router
  ) {}

  @Input() product: any;

  ngOnInit(): void {}

  addToCart(productId: string) {
    if (this._AuthService.userIsLogedIn.value == true) {
      this._CartService.addToCart(productId).subscribe({
        next: (res) => {
          this._CartService.numOfCartItems.next(res.numOfCartItems);
        },
      });
    } else {
      this._Router.navigate(['/auth']);
    }
  }
}
