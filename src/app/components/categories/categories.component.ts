import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categories: any[] = [];
  constructor(private _CategoriesService: CategoriesService) {}
  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    this._CategoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.categories = res.data;
        console.log(this.categories);
      },
    });
  }
}
