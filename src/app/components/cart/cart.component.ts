import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  productsCart: any[] = [];
  productsCount!: number;
  totalPrice!: number;
  updateTimeOut: any;

  constructor(private _ProductsService: ProductsService) {}

  ngOnInit(): void {
    this.getCartProducts();
  }

  getCartProducts() {
    this._ProductsService.getCartProducts().subscribe({
      next: (res) => {
        this.productsCount = res.numOfCartItems;
        this.totalPrice = res.data.totalCartPrice;
        this.productsCart = res.data.products;
      },
    });
  }

  deleteCartProduct(productId: string, event: any) {
    this.deleteFromDom(event);
    this._ProductsService.deleteCartProduct(productId).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.productsCount = res.numOfCartItems;
          this.totalPrice = res.data.totalCartPrice;
          this.productsCart = res.data.products;
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
    this._ProductsService.clearCart().subscribe({
      next: (res) => {
        if ((res.message = 'success')) {
          this.productsCart = [];
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
        this._ProductsService.updateProductCount(productId, count).subscribe({
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
