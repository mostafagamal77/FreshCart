import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  searchTerm: string = '';

  constructor(
    private _ProductsService: ProductsService,
    private _Router: Router
  ) {}

  numberOfPages: number = 0;
  currentPage: number = 0;
  nextPageNum: number = 0;
  prevPageNum: number = 0;

  ngOnInit(): void {
    this.getAllProducts(1);
  }

  getAllProducts(pageNumber: number) {
    this._ProductsService.getAllProducts(pageNumber).subscribe({
      next: (res) => {
        this.products = res.data;
        this.numberOfPages = res.metadata.numberOfPages;
        this.currentPage = res.metadata.currentPage;
        this._Router.navigate(['/products'], {
          queryParams: { page: pageNumber },
        });
      },
    });
  }

  nextPage() {
    if (this.currentPage < this.numberOfPages) {
      this.currentPage++;
      this.getAllProducts(this.currentPage);
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getAllProducts(this.currentPage);
    }
  }

  PagesNum(num: number): number[] {
    return Array(num).fill(0);
  }
}
