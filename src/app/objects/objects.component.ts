import {Component, OnChanges, OnInit} from '@angular/core';
import {UserDataService} from '../login/user-data.service';
import {ObjectStoreService} from '../object-store.service';
import {LoginService} from '../login/login.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-objects',
  templateUrl: './objects.component.html',
  styleUrls: ['./objects.component.css']
})
export class ObjectsComponent implements OnInit, OnChanges {
  public objects: any[];
  public userDataObject: object;

  constructor(
    public objectStoreService: ObjectStoreService
  ) { }

  ngOnChanges (){
    this.objects = this.objectStoreService.objectListing;
  }


  ngOnInit() {
    // this.getObjectList();
  }

  getObjectListAsStrings(prefix: string) {
    this.objects = this.objectStoreService.getBucketListStrings(prefix);
  }

  getObjectList(prefix: string) {
    const anObservable = this.objectStoreService.getBucketList2(prefix);
    const isObservable = anObservable instanceof Observable;
    console.log('is anObservable instanceof Observable?' + isObservable); // true
    anObservable.subscribe( nextItem => {
      console.log('in object component getObjectList() subscribe' + JSON.stringify(nextItem));
      // TODO:  Problem: nextItem is empty
      this.objects = nextItem;
    } );
  }
}
