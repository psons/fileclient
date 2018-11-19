import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from './login.service';
import {MessagesService} from '../messages.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {UserDataService} from './user-data.service';
declare var gtag: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  logOutButtonActive: boolean;
  logInButtonActive: boolean;
  constructor(
    private loginService: LoginService,
    private afAuth: AngularFireAuth,  // needed for logout
    private userDataService: UserDataService, // to reset on logout
    private router: Router,
    private messageService: MessagesService,
  ) {}
  ngOnInit() {
    // just for ngClass on buttons.
    if (this.loginService.userUid !== '') {
      this.logInButtonActive = false;
      this.logOutButtonActive = true;
    } else {
      this.logInButtonActive = true;
      this.logOutButtonActive = false;
    }
  }

  onLoginEmail(): void {
    if (this.userDataService.userAwsObjectIsSet) {
      console.error(
        'WARNING: userDataService.userAwsObjectIsSet prior to login.' +
        'This means that keys are not reset() from prior user.');
    }
    if (this.validateForm(this.email, this.password)) {
      this.emailLogin(this.email, this.password);
    }
  }

  emailLogin(email: string, password: string) {
    console.log(`emailLogin(email: string, password: string): ${email}, ${password}`);
    this.loginService.loginWithEmail(this.email, this.password)
      .then(() => this.router.navigate(['/Objects']))
      .catch( error => {
        console.log(error);
        this.router.navigate(['/Login']);
      });
  }

  validateForm(email: string, password: string): boolean {
    if (email.length === 0) {
      return false;
    }

    if (password.length === 0) {
      return false;
    }

    if (password.length < 6) {
      return false;
    }
    return true;
  }

  logout() {
    // this.loginService.user is an observable.
    const msgEvent1 = 'Logout UID';
    const msg1 = `${this.loginService.userUid}`;
    console.log(`${msgEvent1} ${msg1}`);
    gtag('event', 'logout', {
      'event_category': 'user',
      'event_label': 'logout',
      'value': 'test'
    });
    this.messageService.add(msgEvent1, msg1);
    // TODO Bug: the session key is actually the Uid.
    // this.log(msg1);
    // const msg2 = `End Session: ${this.loginService.sessionKey}`;
    // console.log(msg2);
    //   // TODO Cleanup: This allways throws ERROR: ... Client doesn't have permission to access the desired data
    this.afAuth.auth.signOut();
    this.userDataService.reset();
    this.loginService.reset();
    this.router.navigate(['/']);
    this.logInButtonActive = true;
    this.logOutButtonActive = false;
  }




}

