import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.authService.getToken();

    if (token) {
      const authorizedRequest = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + token),
      });
      console.log(authorizedRequest);

      return next.handle(authorizedRequest);
    } else {
      return next.handle(request);
    }
  }
}
