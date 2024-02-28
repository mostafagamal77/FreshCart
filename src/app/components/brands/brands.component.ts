import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BrandsService } from 'src/app/services/brands.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css'],
})
export class BrandsComponent implements OnInit {
  brands: any[] = [];
  numberOfPages: number = 0;
  currentPage: number = 0;
  nextPageNum: number = 0;
  prevPageNum: number = 0;

  constructor(private _BrandsService: BrandsService, private _Router: Router) {}

  ngOnInit(): void {
    this.getAllBrands(1);
  }

  getAllBrands(pageNumber: number) {
    this._BrandsService.getAllBrands(pageNumber).subscribe({
      next: (res) => {
        this.brands = res.data;
        this.numberOfPages = res.metadata.numberOfPages;
        this.currentPage = res.metadata.currentPage;
        this._Router.navigate(['/brands'], {
          queryParams: { page: pageNumber },
        });
      },
    });
  }

  nextPage() {
    if (this.currentPage < this.numberOfPages) {
      this.currentPage++;
      this.getAllBrands(this.currentPage);
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getAllBrands(this.currentPage);
    }
  }

  PagesNum(num: number): number[] {
    return Array(num).fill(0);
  }
}
