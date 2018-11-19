import { Injectable } from '@angular/core';
import {LoginService} from './login.service';
import {AngularFireDatabase} from '@angular/fire/database';
import {Observable} from 'rxjs';
import {MessagesService} from '../messages.service';

/*Service to house calls to get data about the user from fire base*/

@Injectable()
export class UserDataService {
  public userDataRef: any;
  private userAwsObject: any;
  public userAwsObjectIsSet = false;

  constructor(
    private loginService: LoginService,
    private db: AngularFireDatabase,
    // private messagesService: MessagesService,
  ) {
    this.userDataRef = this.db
      .object(`users/${this.loginService.userUid}`).valueChanges();
    // this.userDataObjectSubscriber();
  }

  public userDataObjectSubscriber() {
    const udoSubscription = this.getUserObjectObservable().subscribe(
      (connectObject) => {
        this.userAwsObject = connectObject;
        console.log('in Subscribe callback, this.userAwsObject:' +
          JSON.stringify(this.userAwsObject));
        this.userAwsObjectIsSet = true;
      },
      (error) => console.error('getUserObjectObservable() failed: ' + error),
      () => console.log('getUserObjectObservable() is complete. this.userAwsObjectIsSet: '
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
  getUserObjectObservable(): Observable<any> {
    const keyString = `users/${this.loginService.userUid}`;
    const value = 'connectObject';
    console.log(`getUserObject() searching for keyString: ${keyString} value: ${value}` );
    const theQuery = this.db.list( keyString,
      ref => ref.orderByKey().equalTo(value));
    return theQuery.valueChanges();
  }

  reset(){
    this.userAwsObject = null;
    this.userAwsObjectIsSet = false;
    // this.messagesService.add('userAwsObject', 'set to null.');
  }
}
