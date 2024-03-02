import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent implements OnInit {
  wishlistProducts: any[] = [];

  constructor(private _WishlistService: WishlistService,
    private _CartService: CartService,
    private _AuthService: AuthService,
    private _Router: Router,
    private toastr: ToastrService) { }
  ngOnInit(): void {
    this.getWishlist();
  }

  getWishlist() {
    this._WishlistService.getWishlist().subscribe({
      next: (res) => {
        this.wishlistProducts = res.data;
        console.log(res);
      },
    });
  }

  removeFromWishlist(productId: string, event: any) {
    this.deleteFromDom(event)
    this.toastr.success('Product removed successfully from your wishlist', '', {
      timeOut: 2000,
      progressBar: true
    });
    this._WishlistService.removeFromWishlist(productId).subscribe({
      next: res => {
        console.log(res);
        this._WishlistService.numberOfWishlist.next(res.data.length)
      }
    })
  }
  deleteFromDom(event: any) {
    const button = event.target as HTMLButtonElement;
    const parentElement =
      button.parentElement?.parentElement?.parentElement?.parentElement;
    parentElement?.remove();
  }

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
