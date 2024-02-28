import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartComponent } from './components/cart/cart.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { authGuard } from './guards/auth.guard';
import { ProductsComponent } from './components/products/products.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AllordersComponent } from './components/allorders/allorders.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full', title: 'FreshCart' },
  { path: 'home', component: HomeComponent, title: 'FreshCart | Home' },
  {
    path: 'products',
    component: ProductsComponent,
    title: 'FreshCart | Products',
  },
  {
    path: 'categories',
    component: CategoriesComponent,
    title: 'FreshCart | Categories',
  },
  {
    path: 'product/:id',
    component: ProductDetailsComponent,
    title: 'FreshCart | ProductDetails',
    canActivate: [authGuard],
  },
  {
    path: 'cart',
    component: CartComponent,
    title: 'FreshCart | Cart',
    canActivate: [authGuard],
  },
  {
    path: 'checkout/:cartId',
    component: CheckoutComponent,
    title: 'FreshCart | checkout',
    canActivate: [authGuard],
  },
  {
    path: 'allorders',
    component: AllordersComponent,
    title: 'FreshCart | checkout',
    canActivate: [authGuard],
  },
  {
    path: 'wishlist',
    component: WishlistComponent,
    title: 'FreshCart | wishlist',
    canActivate: [authGuard],
  },
  {
    path: 'brands',
    component: BrandsComponent,
    title: 'FreshCart | Brands',
  },

  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
