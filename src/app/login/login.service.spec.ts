import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {FirebaseOptionsToken} from '@angular/fire';
import {firebaseConfig} from '../../environments/environment';
import {Router, RouterModule} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {AngularFireDatabase} from '@angular/fire/database';

describe('LoginService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AngularFireAuth,
      AngularFireDatabase,
      { provide: FirebaseOptionsToken, useValue: firebaseConfig },
    ],
    imports: [
      RouterTestingModule,
    ]
  }));

  it('should be created', () => {
    const service: LoginService = TestBed.get(LoginService);
    expect(service).toBeTruthy();
  });
});
