import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';
import {AngularFireAuth} from '@angular/fire/auth';
import {BehaviorSubject} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireModule, FirebaseOptionsToken} from '@angular/fire';
import {environment, firebaseConfig} from '../../environments/environment';
import {Router, RouterModule} from '@angular/router';
import {AngularFireDatabase} from '@angular/fire/database';

const FirestoreStub = {
  collection: (name: string) => ({
    doc: (_id: string) => ({
      valueChanges: () => new BehaviorSubject({ foo: 'bar' }),
      set: (_d: any) => new Promise((resolve, _reject) => resolve()),
    }),
  }),
};

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    var FirebaseAppConfigToken;
    TestBed.configureTestingModule({
      providers: [
        AngularFireAuth,
        AngularFireDatabase,
        { provide: FirebaseOptionsToken, useValue: firebaseConfig }
        ],
      imports: [
        FormsModule,
        RouterTestingModule,
      ],
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
