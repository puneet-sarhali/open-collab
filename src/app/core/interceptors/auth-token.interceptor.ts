import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {AuthService} from "../auth/auth.service";

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem("authToken");
    let tokenReq = request.clone({
      setHeaders: {
        Authorization: "Bearer " + token
      }
    })
    return next.handle(tokenReq).pipe(
      catchError((err) => {
        if(err.status == 403){
          this.auth.unAuthReq()
        }
        return throwError(err)
      }
    ))
  }
}
