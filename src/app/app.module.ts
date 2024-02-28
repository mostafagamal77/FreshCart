import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProductComponent } from './components/product/product.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartComponent } from './components/cart/cart.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { SearchPipe } from './pipes/search.pipe';
import { SliceTextPipe } from './pipes/slice-text.pipe';
import { ProductsComponent } from './components/products/products.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BestSellerPipe } from './pipes/best-seller.pipe';
import { AddHeaderInterceptor } from './shared/interceptors/add-header.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoaderInterceptor } from './shared/interceptors/loader.interceptor';
import { BrandsComponent } from './components/brands/brands.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AllordersComponent } from './components/allorders/allorders.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    ProductComponent,
    ProductDetailsComponent,
    CartComponent,
    NotFoundComponent,
    SearchPipe,
    SliceTextPipe,
    ProductsComponent,
    BestSellerPipe,
    BrandsComponent,
    CategoriesComponent,
    WishlistComponent,
    CheckoutComponent,
    AllordersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    BrowserAnimationsModule,
    CarouselModule,
    NgxSpinnerModule.forRoot({ type: 'square-jelly-box' }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AddHeaderInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
