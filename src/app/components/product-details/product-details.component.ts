import { OwlOptions } from 'ngx-owl-carousel-o';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {
  productId: string = '';
  productDetails: any;
  images: string[] = [];

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
    },
    nav: true,
  };
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _ProductsService: ProductsService
  ) {
    _ActivatedRoute.params.subscribe((params) => {
      this.productId = params['id'];
    });

    _ProductsService.getOneProduct(this.productId).subscribe({
      next: (res) => {
        this.productDetails = res.data;
        this.images = res.data.images;
      },
    });
  }

  addToCart(productId: string) {
    this._ProductsService.addToCart(productId).subscribe({
      next: (res) => {},
    });
  }
}
