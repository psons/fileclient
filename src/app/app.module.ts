import { BrowserModule } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';

import { AppComponent } from './app.component';
import { ObjectsComponent } from './objects/objects.component';
import { AdminComponent } from './admin/admin.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import {FormsModule} from '@angular/forms';
import {LoginService} from './login/login.service';
import {AngularFireAuth, AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireModule} from '@angular/fire';
import {firebaseConfig} from '../environments/environment';
import {CommonModule} from '@angular/common';
import {AuthGuard} from './login/auth.guard';
import {AdminGuard} from './login/admin.guard';
import {RouterModule} from '@angular/router';
import { MessageDetailComponent } from './admin/message-detail/message-detail.component';
import {UserDataService} from './login/user-data.service';

@NgModule({
  declarations: [
    AppComponent,
    ObjectsComponent,
    AdminComponent,
    LoginComponent,
    MessageDetailComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  providers: [
    AngularFireAuth,
    LoginService,
    UserDataService,
    AuthGuard,
    AdminGuard,
    AngularFireAuth,
  ],
  bootstrap: [AppComponent, ]
})
export class AppModule { }
