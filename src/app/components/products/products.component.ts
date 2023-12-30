import { Component } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  products: any[] = [];
  searchTerm: string = '';

  constructor(private _ProductsService: ProductsService) {}

  ngOnInit(): void {
    this._ProductsService.getAllProducts().subscribe({
      next: (res) => {
        this.products = res.data;
      },
    });
  }
}
