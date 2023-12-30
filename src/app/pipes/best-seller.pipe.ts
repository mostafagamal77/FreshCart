import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bestSeller',
})
export class BestSellerPipe implements PipeTransform {
  transform(products: any[]): any[] {
    return products.filter((product) => product.priceAfterDiscount);
  }
}
