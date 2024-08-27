import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild, CanDeactivate, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Route, UrlSegment } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad  {
  constructor(private userService: UserService, private router: Router) {}
  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    throw new Error('Method not implemented.');
  }
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    throw new Error('Method not implemented.');
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.userService.isLoggedIn.pipe(
      take(1),
      map((isLoggedIn: boolean) => {
        if (!isLoggedIn) {
          this.router.navigate(['/login']);
          return false;
        }
        return true;
      })
    );
  }
  }


