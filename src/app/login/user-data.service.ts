import { Injectable } from '@angular/core';
import {LoginService} from './login.service';
import {AngularFireDatabase} from '@angular/fire/database';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  public userDataRef: any;

  constructor(
    private loginService: LoginService,
    private db: AngularFireDatabase,
  ) {
    this.userDataRef = this.db
      .object(`users/${this.loginService.userUid}`).valueChanges();
  }
  // getUserObject2(){
  //   const keyString = `users/${this.loginService.userUid}`;
  //   const value = 'connectObject';
  //   console.log(`getUserObject2() searching for keyString: ${keyString} value: ${value}` )
  //   // return firebase.database().ref('/users/' + userId).once('value').then
  //   // const theQuery = this.db.list( keyString,
  //   //   ref => ref.orderByKey().equalTo(value));
  //   return this.db. .ref( keyString).once(value).then( snapshot => console.log("then" + JSON.stringify(snapshot)))
  // }

  getUserObject(): Observable<any> {
    const keyString = `users/${this.loginService.userUid}`;
    const value = 'connectObject';
    console.log(`getUserObject() searching for keyString: ${keyString} value: ${value}` );
    const theQuery = this.db.list( keyString,
      ref => ref.orderByKey().equalTo(value));
    return theQuery.valueChanges();
  }

}
