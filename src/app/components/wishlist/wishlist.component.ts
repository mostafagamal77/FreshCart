import { Component, OnInit } from '@angular/core';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent implements OnInit {
  wishlistProducts: any[] = [];

  constructor(private _WishlistService: WishlistService) {}
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
}
