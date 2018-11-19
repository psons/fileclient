import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectsComponent } from './objects.component';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase} from '@angular/fire/database';
import {FirebaseOptionsToken} from '@angular/fire';
import {firebaseConfig} from '../../environments/environment';
import {RouterTestingModule} from '@angular/router/testing';

describe('ObjectsComponent', () => {
  let component: ObjectsComponent;
  let fixture: ComponentFixture<ObjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectsComponent ],
      providers: [
        AngularFireAuth,
        AngularFireDatabase,
        { provide: FirebaseOptionsToken, useValue: firebaseConfig },
      ],
      imports: [
        RouterTestingModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
