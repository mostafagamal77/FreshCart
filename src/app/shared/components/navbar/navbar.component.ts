import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { BrandsService } from 'src/app/services/brands.service';
import { CartService } from 'src/app/services/cart.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(
    public _AuthService: AuthService,
    public _CartService: CartService,
    public _WishlistService: WishlistService
  ) {}
  ngOnInit(): void {
    this._AuthService.userIsLogedIn.subscribe((user) => {
      if (user) {
        this.getCartItems();
        this.getWishlist();
      }
    });
  }

  getCartItems() {
    this._CartService.getCartProducts().subscribe({
      next: (res) => {
        this._CartService.numOfCartItems.next(res.numOfCartItems);
      },
      error: (err) => console.log(err),
    });
  }
  getWishlist() {
    this._WishlistService.getWishlist().subscribe({
      next: (res) => {
        this._WishlistService.numberOfWishlist.next(res.count);
      },
    });
  }
}
