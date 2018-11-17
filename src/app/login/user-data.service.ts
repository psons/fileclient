import { Injectable } from '@angular/core';
import {LoginService} from './login.service';
import {AngularFireDatabase} from '@angular/fire/database';
import {forkJoin, Observable} from 'rxjs';

/*Service to house calls to get data about the user from fire base*/

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  public userDataRef: any;
  private userAwsObject: any;
  private userAwsObjectIsSet = false;

  constructor(
    private loginService: LoginService,
    private db: AngularFireDatabase,
  ) {
    this.userDataRef = this.db
      .object(`users/${this.loginService.userUid}`).valueChanges();

    const udoSubscription = this.getUserObject().subscribe(
      (connectObject) => {
        this.userAwsObject = connectObject;
        this.userAwsObjectIsSet = true;
      },
      (error) => console.error('getUserObject() failed: ' + error),
      () => console.log('getUserObject() is done. this.userAwsObjectIsSet: '
          + this.userAwsObjectIsSet
          + JSON.stringify(this.userAwsObject)
      )
      );
  }

  getUserAwsObject() {
    if (this.userAwsObjectIsSet) {
      console.log('this.userAwsObject:' + JSON.stringify(this.userAwsObject));
      return this.userAwsObject;
    } else {
      console.error('attempt to get userAwsObject before userAwsObjectIsSet');

    }
  }
  // called directly by deprecated methods in the ObjectStoreService
  getUserObject(): Observable<any> {
    const keyString = `users/${this.loginService.userUid}`;
    const value = 'connectObject';
    console.log(`getUserObject() searching for keyString: ${keyString} value: ${value}` );
    const theQuery = this.db.list( keyString,
      ref => ref.orderByKey().equalTo(value));
    return theQuery.valueChanges();
  }

}
