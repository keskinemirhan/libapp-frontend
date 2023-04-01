import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from '../services';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const headers: any = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    const token = this.tokenService.getToken();

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const request = req.clone({ setHeaders: headers });
    return next.handle(request);
  }
}
