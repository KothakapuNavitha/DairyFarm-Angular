import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoaderService  {

  // private loadingSubject = new BehaviorSubject<boolean>(false);
  // loading$: Observable<boolean> = this.loadingSubject.asObservable();

  // setLoading(loading: boolean): void {
  //   this.loadingSubject.next(loading);
  // }

  // getLoading(): Observable<boolean> {
  //   return this.loading$;
  // }

  // private _isLoading = new BehaviorSubject<boolean>(false);
  // public readonly isLooading = this._isLoading.asObservable();

  // show(){
  //   this._isLoading.next(true);
  // }

  // hide(){
  //   this._isLoading.next(true);
  // }

  // constructor(){}
  // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   throw new Error('Method not implemented.');
  // }

  isLoading = new Subject<boolean>();

  show() {
    this.isLoading.next(true);
  }

  hide() {
    this.isLoading.next(false);
  }
}
