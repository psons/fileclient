import { TestBed } from '@angular/core/testing';

import { UserDataService } from './user-data.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase} from '@angular/fire/database';
import {FirebaseOptionsToken} from '@angular/fire';
import {firebaseConfig} from '../../environments/environment';
import {RouterTestingModule} from '@angular/router/testing';

describe('UserDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AngularFireAuth,
      AngularFireDatabase,
      { provide: FirebaseOptionsToken, useValue: firebaseConfig },
    ],
    imports: [
      RouterTestingModule,
    ],

  }));

  it('should be created', () => {
    const service: UserDataService = TestBed.get(UserDataService);
    expect(service).toBeTruthy();
  });
});
