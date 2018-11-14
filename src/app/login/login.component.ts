import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from './login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  constructor(
    private loginService: LoginService,
    private router: Router,
  ) { }
  ngOnInit() {
  }

  onLoginEmail(): void {
    if (this.validateForm(this.email, this.password)) {
      this.emailLogin(this.email, this.password);
    }
  }

  emailLogin(email: string, password: string) {
    console.log(`emailLogin(email: string, password: string): ${email}, ${password}`)
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
    console.log(`logout for userUid: ${this.loginService.userUid} sessionKey: ${this.loginService.sessionKey}`)
    this.loginService.signOut();
  }

}

