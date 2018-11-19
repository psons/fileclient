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
    private loginService: LoginService,
    private db: AngularFireDatabase) {}

  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>  {
    console.log('AdminGuard.canActivate called');
    return this.isAdmin2(this.loginService.userUid);
  }

  /* returns an observable, which will apparently be
* subscribed to by the framework calling canActivate
* I think that is the Router from RouterModule*/
  isAdmin2(userId): Observable<boolean> {
    console.log(`isAdmin2() passed userId ${userId}` );
    return this.db.list('admins', ref => ref.orderByKey().equalTo(userId))
      .valueChanges()
      .pipe(map(value => {
          console.log(`isAdmin2() pipe map got value: ${value}` );
          return (`${value}` === 'true'); // log to see what value looks like
        }, )
      );
  }
  // @ts-ignore
  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean> | boolean {
  //   console.log('AdminGuard.canActivate called');
  //   return this.afAuth.authState.pipe(
  //     map(user => user.uid),
  //     map(uid => {
  //       // i'm in a pipeline with user ID and I need to call a service to get some different data
  //       console.log('AdminGuard.canActivate afAuth.authState user: ' + uid);
  //       return this.isAdmin(uid);
  //     })
  // );
  // }

  // canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>  {
  //   console.log('AdminGuard.canActivate called');
  //   // What is authState?
  //   //  must be an observable that emits user.
  //   // need to return this wholepipeline to accommodate the
  //   // async nature.
  //   // whaty subscribes? caller.  don't need tap.
  //   // @ts-ignore
  //   return this.afAuth.authState.pipe(
  //     map(user => user.uid),
  //     map(uid => {
  //       console.log(`map uid: ${uid}`);
  //       this.isAdmin2(uid);  // should i put return before this?
  //     }),
  //   );
  // }


  // userAdminSearch(userId: string ): Observable<any>{
  //   console.log('building an Obs to search in AdminGuard.userAdminSearch will check for' +
  //     userId + ' under admins.')
  //   const theQuery = this.db.list('admins', ref => ref.orderByKey().equalTo(userId));
  //   return theQuery.valueChanges();
  // }

  // isAdmin(userId): Observable<boolean> {
  //   return this.userAdminSearch(userId).pipe(map(value => {
  //     console.log(`isAdmin() got value: ${value}` )
  //     return (value === 'true');
  //     })
  //   );
  //   return this.adminStatus;
  // }
}

