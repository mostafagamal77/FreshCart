import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  constructor(
    private _CartService: CartService,
    private _AuthService: AuthService,
    private _Router: Router,
    private _WishlistService: WishlistService,
    private toastr: ToastrService
  ) { }

  @Input() product: any;

  ngOnInit(): void { }

  addToCart(productId: string) {
    if (this._AuthService.userIsLogedIn.value == true) {
      this.toastr.success('Product added to cart successfully', '', {
        timeOut: 2000,
        progressBar: true
      });
      this._CartService.addToCart(productId).subscribe({
        next: (res) => {
          this._CartService.numOfCartItems.next(res.numOfCartItems);

        },
      });
    } else {
      this._Router.navigate(['/auth']);
    }
  }

  addProductToWishlist(productId: string) {
    this.toastr.success('Product added to wishlist successfully', '', {
      timeOut: 2000,
      progressBar: true
    });
    this._WishlistService.addProductToWishlist(productId).subscribe({
      next: (res) => {
        console.log(res);
        this._WishlistService.numberOfWishlist.next(res.data.length)

      },
      error: (err) => console.log(err),
    })
  }
}
