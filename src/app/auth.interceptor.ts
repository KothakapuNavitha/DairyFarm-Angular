import { LoaderService } from './loader.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { catchError, finalize, Observable, tap, throwError } from 'rxjs';
//import { NgxUiLoaderService } from 'ngx-ui-loader';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private loaderService:LoaderService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    if(token){
      request = request.clone({
        setHeaders:{
          AuthoriZation:`Bearer ${token}`
        }
      });
    }
   // return next.handle(request);


    this.loaderService.show();
    const modifiedReq = request.clone({

    });
    return next.handle(request).pipe(
      finalize(()=>this.loaderService.hide())
    );
  }
}
