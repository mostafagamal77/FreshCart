import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private spinner: NgxSpinnerService) { }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (!request.url.includes('cart/')) {
      this.spinner.show();
    } else {
      this.spinner.hide();
    }
    if (request.method == 'DELETE') {
      this.spinner.hide();
    }

    if (request.url.includes('cart') && request.method == 'POST') {
      this.spinner.hide();
    }
    if (request.url.includes('wishlist') && request.method == 'POST') {
      this.spinner.hide();
    }

    return next.handle(request).pipe(
      finalize(() => {
        this.spinner.hide();
      })
    );
  }
}
