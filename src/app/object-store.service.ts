import { Injectable } from '@angular/core';
import {UserDataService} from './login/user-data.service';
import {first, map} from 'rxjs/operators';
import {LoginService} from './login/login.service';
import {Observable} from 'rxjs';

// import { listAllObjects } from 's3-list-all-objects/'
declare function require(name:string);
const listAllObjects = require('s3-list-all-objects');

let theObjectData: any;

// the keys in this object are used by the s3-list-all-objects module.
// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html
// s3Options: ,

@Injectable({
  providedIn: 'root'
})
export class ObjectStoreService {
  public bucketName = 'fileserv2';
  private haveUserKeys = false;
  // private s3Options = {
  //   accessKeyId: '',
  //   secretAccessKey: ''
  // };
  public  objectListing: any;


  // in a-t-o-h HeroService gets MessageService injected.
  // like that, inject user data service here to get the user object out of Firebase.
  constructor(
      private loginService: LoginService,
      private userDataService: UserDataService
    ) {
    // TODO: testing getBucketList2 vs getBucketList
    // this.getBucketList(');
  }

  // private captureObservedUserData( nObj) {
  //   /*
  //   This is the 'next' function call back on the observable from
  //   userDataService aka Fire base.
  //   */
  //   // this.s3Options.accessKeyId = nObj.accessKeyId;
  //   // this.s3Options.secretAccessKey = nObj.secretAccessKey;
  //   this.haveUserKeys = true;
  //   console.log(`captureObservedUserData(nextObject)${this.haveUserKeys} ` + JSON.stringify(nObj));
  //    }

  // getBucketListStrings(prefix: string): string[] {
  //   const asyncStuff: Observable<any> = this.userDataService.getUserObject().pipe(
  //     map ((userObject) => {
  //         // console.log(`userObject ` + JSON.stringify(userObject));
  //         let s3optionsObj = userObject[0];
  //         if ( typeof s3optionsObj === 'undefined' || s3optionsObj === null) {
  //           const message = `
  //         the user object is null, so can not get S3 objects.
  //         This usually happens when the server and browser reload and the user is no longer
  //         correctly logged in.`;
  //           console.error(message);
  //         } else {
  //           // s3optionsObj.prefix = prefix;
  //           s3optionsObj =  {prefix: 'root/altpsons/al/',
  //             accessKeyId: '',
  //             secretAccessKey: ''};
  //           const listArgumentObject2 = {bucket: 'fileserv2', s3options: s3optionsObj};
  //           console.log(`listArgumentObject2 ` + JSON.stringify(listArgumentObject2));
  //           // get rid of the listAllObjects library
  //           listAllObjects( listArgumentObject2, // https://www.npmjs.com/package/s3-list-all-objects
  //             function(err, data) {
  //               // this.objectListing = data;
  //               // ERROR Error: Cannot set property 'objectListing' of undefined
  //               if (typeof err === 'undefined' || err === null){
  //                 theObjectData = data; // theObjectData has file scope,so it is available here, two levels deep.
  //                 console.log('getBucketList2 first object: ' + JSON.stringify(data[0]));
  //               } else {
  //                 console.log(`Could not get object data from AWS. err is: ` + err);
  //               }
  //             }
  //           );
  //           // console.log('theObjectData: ' + JSON.stringify(theObjectData));
  //           this.objectListing = theObjectData;
  //           // theObjectData carries the value out to where instance member objectListing can be set
  //         }
  //       }
  //     )
  //   );
  //   asyncStuff.subscribe();
  //   return this.objectListing;
  // }


  // getBucketList2(prefix: string): Observable<any>{
  //   const asyncStuff: Observable<any> = this.userDataService.getUserObject().pipe(
  //     map ((userObject) => {
  //       // console.log(`userObject ` + JSON.stringify(userObject));
  //       let s3optionsObj = userObject[0];
  //       if ( typeof s3optionsObj === 'undefined' || s3optionsObj === null) {
  //         const message = `
  //         the user object is null, so can not get S3 objects.
  //         This usually happens when the server and browser reload and the user is no longer
  //         correctly logged in.`;
  //         console.error(message); // TODO better error handling needed.
  //         } else {
  //         // s3optionsObj.prefix = prefix;
  //         s3optionsObj =  {prefix: 'root/altpsons/al/',
  //           accessKeyId: 'AKIAJCZNIFJTMMROKDEQ',
  //           secretAccessKey: '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'};
  //         const listArgumentObject2 = {bucket: 'fileserv2', s3options: s3optionsObj};
  //         console.log(`listArgumentObject2 ` + JSON.stringify(listArgumentObject2));
  //         // TODO: prefix passing is broken if I use the call signature that passes an API key.
  //         // get rid of the listAllObjects library
  //         listAllObjects( listArgumentObject2, // https://www.npmjs.com/package/s3-list-all-objects
  //           function(err, data) {
  //             // this.objectListing = data;
  //             // ERROR Error: Cannot set property 'objectListing' of undefined
  //             if (typeof err === 'undefined' || err === null){
  //               theObjectData = data; // theObjectData has file scope,so it is available here, two levels deep.
  //               console.log('getBucketList2 first object: ' + JSON.stringify(data[0]));
  //             } else {
  //               console.log(`Could not get object data from AWS. err is: ` + err);
  //             }
  //           }
  //         );
  //         // console.log('theObjectData: ' + JSON.stringify(theObjectData));
  //         this.objectListing = theObjectData;
  //         // theObjectData carries the value out to where instance member objectListing can be set
  //       }
  //     }
  //     )
  //   );
  //   return asyncStuff;
  // }

}
