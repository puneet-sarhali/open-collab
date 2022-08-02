import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse
} from '@angular/common/http';
import {catchError, Observable, throwError, tap} from 'rxjs';
import {AuthService} from "../auth/auth.service";
import {ToastService} from "../services/toast.service";

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {

  constructor(private toastService: ToastService) {}

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
          this.toastService.unAuthReq()
        }
        return throwError(err)
      }
    ))
  }
}
