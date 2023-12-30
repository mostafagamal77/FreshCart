import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AddHeaderInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let modifiedRequest = request;
    if (!request.url.includes('signup') || !request.url.includes('signup')) {
      modifiedRequest = request.clone({
        headers: request.headers.set(
          'token',
          localStorage.getItem('token') || ''
        ),
      });
    }
    return next.handle(modifiedRequest);
  }
}
