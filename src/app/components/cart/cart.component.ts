import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  productsCart: any[] = [];
  cartId: string = ''
  productsCount!: number;
  totalPrice!: number;
  updateTimeOut: any;

  constructor(private _CartService: CartService) {}

  ngOnInit(): void {
    this.getCartProducts();
  }

  getCartProducts() {
    this._CartService.getCartProducts().subscribe({
      next: (res) => {
        this.productsCount = res.numOfCartItems;
        this.cartId = res.data._id
        this.totalPrice = res.data.totalCartPrice;
        this.productsCart = res.data.products;
      },
    });
  }

  deleteCartProduct(productId: string, event: any) {
    this.deleteFromDom(event);
    this._CartService.deleteCartProduct(productId).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.productsCount = res.numOfCartItems;
          this.totalPrice = res.data.totalCartPrice;
          this.productsCart = res.data.products;
          this._CartService.numOfCartItems.next(
            this._CartService.numOfCartItems.value - 1
          );
        }
      },
    });
  }

  deleteFromDom(event: any) {
    const button = event.target as HTMLButtonElement;
    const parentElement =
      button.parentElement?.parentElement?.parentElement?.parentElement;
    parentElement?.remove();
  }
  clearCart() {
    this._CartService.clearCart().subscribe({
      next: (res) => {
        if ((res.message = 'success')) {
          this.productsCart = [];
          this._CartService.numOfCartItems.next(0);
        }
      },
    });
  }

  updateProductCount(productId: string, count: number, even: any) {
    clearTimeout(this.updateTimeOut);

    this.updateTimeOut = setTimeout(() => {
      if (count === 0) {
        this.deleteCartProduct(productId, even);
      } else {
        this._CartService.updateProductCount(productId, count).subscribe({
          next: (res) => {
            this.productsCount = res.numOfCartItems;
            this.totalPrice = res.data.totalCartPrice;
            this.productsCart = res.data.products;
          },
        });
      }
    }, 500);
  }
}
