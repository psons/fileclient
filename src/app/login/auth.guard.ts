import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { LoginService} from './login.service';

import { Observable } from 'rxjs/Observable';
import { map, take, tap } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private loginService: LoginService,
    private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
      // console.log('AUTH USER AUTH USER');
      // console.log(this.auth.userUid);
      // console.log('AUTH USER AUTH USER');

    // console.log('IS ADMIN IS ADMIN IS ADMIN');
    // console.log(this.auth.isAdmin());
    // console.log('IS ADMIN IS ADMIN IS ADMIN');

    return this.loginService.user.pipe(
      take(1),
      map(function(user) {
        // console.log('the user in AuthGuard is:' + JSON.stringify(user));
        return !!user;
      }
      ),
      tap((loggedIn) => {
        if (!loggedIn) {
          console.log('Access denied');
          this.router.navigate(['']);
        }
      }),
    );
  }
}
