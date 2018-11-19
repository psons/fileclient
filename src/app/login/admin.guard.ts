import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { LoginService} from './login.service';

import { Observable } from 'rxjs/Observable';
import { map, take, tap } from 'rxjs/operators';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private db: AngularFireDatabase) {}

  // @ts-ignore
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
    console.log('AdminGuard.canActivate called');
    // TODO FIX THIS PIPELINE. take a fresh look later.
    return this.afAuth.authState.pipe(
      map(user => user.uid),
      map(uid => {
        // i'm in a pipeline with user ID and I need to call a service to get some different data
        console.log('AdminGuard.canActivate afAuth.authState user: ' + uid);
        return this.userAdminSearch(uid);
      }),
      map(result => {
        const theAnswer = result[0];
        console.log('isAdmin' + theAnswer + JSON.stringify(result));
        return theAnswer;
      }) // !! double negation coerces to bool, flips to original val.    );
    );
  }

  userAdminSearch(userId: string ): Observable<any>{
    console.log('building an Obs to search in AdminGuard.userAdminSearch will check for' +
      userId + ' under admins.')
    const theQuery = this.db.list('admin', ref => ref.orderByKey().equalTo(userId));
    return theQuery.valueChanges();
  }


}

