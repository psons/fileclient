import { TestBed } from '@angular/core/testing';

import { UploadObjectService } from './upload-object.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {FormsModule} from '@angular/forms';
import {LoginComponent} from '../login/login.component';
import {FirebaseOptionsToken} from '@angular/fire';
import {firebaseConfig} from '../../environments/environment';
import {RouterTestingModule} from '@angular/router/testing';
import {AngularFireDatabase} from '@angular/fire/database';

describe('UploadObjectService', () => {
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
    const service: UploadObjectService = TestBed.get(UploadObjectService);
    expect(service).toBeTruthy();
  });
});
