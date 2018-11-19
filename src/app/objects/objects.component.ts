import {Component, OnChanges, OnInit} from '@angular/core';
import {UserDataService} from '../login/user-data.service';
// import {ObjectStoreService} from '../object-store.service';
import {LoginService} from '../login/login.service';
import {Observable} from 'rxjs';
import {S3Object} from './s3-object';
import {UploadObjectService} from './upload-object.service';
import {MessagesService} from '../messages.service';
declare var gtag: any;
/*
* There is some hacky timing going on that works as long
* as the user is slow enough to click the 'List S3 button'
*   Required Event---------------------> Time driver
*   ---------------------------------------------------------------
*   get the user Uid-------------------> when login button clicked
*   use Uid to get S3 secret key-------> ngOninit of this component
*   use secret key to get S3 bucket----> user click on List S3 button
*
*   I think I'd like to convert the first two steps to a pipeline.
*   */

@Component({
  selector: 'app-objects',
  templateUrl: './objects.component.html',
  styleUrls: ['./objects.component.css']
})
export class ObjectsComponent implements OnInit, OnChanges {
  public objects: any[];
  public userDataObject: object;
  showFile = false;
  fileUploads: Observable<Array<S3Object>>;

  constructor(
    // public objectStoreService: ObjectStoreService,
    public uploadObjectService: UploadObjectService,
    public messageService: MessagesService,
    public userDataService: UserDataService,
  ) { }

  ngOnChanges (){}

  ngOnInit() {
    this.userDataService.userDataObjectSubscriber();
  }

  showFiles(prefix: string, enable: boolean) {
    this.showFile = enable;

    if (enable) {
      this.messageService.add(`show prefix:`, `${prefix}`);
      gtag('event', 'prefix', {
        'event_category': 'S3',
        'event_label': 'list',
        'value': prefix
      });
      this.fileUploads = this.uploadObjectService.getFiles(prefix);
    }
  }

  // getObjectListAsStrings(prefix: string) {
  //   this.objects = ['root/',
  //     'root/altpsons/',
  //     'root/altpsons/Sons.txt',
  //     'root/altpsons/al/',
  //     'root/altpsons/al/american.txt',
  //     'root/altpsons/constitution.txt',
  //     'root/altpsons/declaration.txt'];
  // }

  // getObjectList(prefix: string) {
  //   // const anObservable = this.objectStoreService.getBucketList2(prefix);
  //   const isObservable = anObservable instanceof Observable;
  //   console.log('is anObservable instanceof Observable?' + isObservable); // true
  //   anObservable.subscribe( nextItem => {
  //     console.log('in object component getObjectList() subscribe' + JSON.stringify(nextItem));
  //     // TODO:  Problem: nextItem is empty.
  //     this.objects = nextItem;
  //   } );
  // }
}

