import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    try {
      req = req.clone({
        setHeaders: {
          'x-api-key': environment.apiKey
        }
      });
      return next.handle(req);
    } catch (error) {
      return next.handle(req);
    }
  }
}
