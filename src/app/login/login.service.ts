import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
// import {switchMap} from 'rxjs/operators';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import { AngularFireDatabase } from '@angular/fire/database';
// import * as firebase from 'firebase';
import * as firebase from 'firebase/app';

@Injectable()
export class LoginService {
  authState: Observable<{} | null>;

  user: Observable<{} | null>;
  userUid: string;
  sessionKey: string;

  /*
  The constructor fetches the user as an observable.
    the maybe updates info about the user, if anything ever subscribes to this.user.
      as of 2018-11-14 this is dead code in the fileclient app, since nothing subscribes.
   */
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private db: AngularFireDatabase
  ) {
    console.log('Constructor for LoginService ', typeof this.db);
    this.user = this.afAuth.authState
    .switchMap((user) => {

      if (user) {
        this.userUid = user.uid;
        console.log('switchMap call bac in Constructor for LoginService this.userUid', this.userUid);
        return this.db.object(`users/${user.uid}`)
          .update({email: user.email})
          .then(() => {
              return this.db.object(`users/${user.uid}`).valueChanges();
            })
          .catch( (error) => {
            console.error('ERROR UPDATING USER EMAIL', error);
        });
      } else {
        console.log('LoginService Constructor return Observable.of', 'null thingy');
        return Observable.of(null);
      }
    });
  }

  loginWithEmail(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((auth) => {
        console.log('auth.user.uid', auth.user.uid);
        this.userUid = auth.user.uid;
        const createdAt = firebase.database.ServerValue.TIMESTAMP;
        // debugLog('loginWithEmail CREATED. Timestamp will be assigned on the firebase server', createdAt);
        this.sessionKey = this.db.database
                        .ref(`sessions`)
                        .push({
                          userUid: auth.user.uid
                        }).key;

        const sessionPayload: any = {
          createdAt: createdAt,
          userUid: auth.user.uid,
          currentSessionKey: this.sessionKey,
        };

        const sessionPayloads: any = {};
        sessionPayloads[`currentSession/${auth.user.uid}`] = sessionPayload;
        sessionPayloads[`users/${auth.user.uid}/sessions/${this.sessionKey}`] = {'createdAt': createdAt};
        console.log('sessionPayloads', sessionPayloads )
        return this.db.database.ref().update(sessionPayloads);
      })
      .catch(error => {
        console.log(error);
        throw error;
      });
  }

  signOut() {
    // TODO Cleanup: This allways throws ERROR: ... Client doesn't have permission to access the desired data
    this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }
}
