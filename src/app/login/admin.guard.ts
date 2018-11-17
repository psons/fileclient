import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { LoginService} from './login.service';

import { Observable } from 'rxjs/Observable';
import { map, take, tap } from 'rxjs/operators';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private authService: LoginService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
    // console.log(this.auth.isAdmin());
    console.log('IS ADMIN IS ADMIN IS ADMIN');

    // TODO FIX THIS PIPELINE to figure out if the user is an admin.
    return this.authService.user.pipe(
      take(1),
      map((user) => !!user),
      tap((loggedIn) => {   // is tap like a subscribe that keeps the observable chain going?
        if (!loggedIn) {
          console.log('access denied');
          this.router.navigate(['']);
        }
      }),
    );
  }

  userAdminSearch(firstName: string){
    const theQuery = this.db.list('firstNames',
      ref => ref.orderByKey().equalTo(firstName));
    return theQuery.valueChanges();
  }


}

