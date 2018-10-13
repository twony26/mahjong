import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from "../core/auth.service";
// import * as firebase from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  user: any;
  loginError: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
  }


  signInWithTwitter() {
    this.authService.signInWithTwitter()
      .then((res) => {
        this.router.navigate(['phone'])
      })
      .catch((err) => console.log(err));
  }


  signInWithFacebook() {
    this.authService.signInWithFacebook()
      .then((res) => {
        this.router.navigate(['phone'])
      })
      .catch((err) => console.log(err));
  }


  signInWithGoogle() {
    this.authService.signInWithGoogle()
      .then((res) => {
        console.log(res);
        if (res.user.email === 'twonytwony@gmail.com' || res.user.email === 'boytwony@gmail@gmail.com') {
          this.user = res.user;
          this.router.navigate(['/']);
          this.loginError = false;
        }
        else {
          this.loginError = true;
        }

      })
      .catch((err) => console.log(err));
  }


  tryGoogleLogin() {
    this.authService.doGoogleLogin()
      .then(res => {
        if (res.additionalUserInfo.profile.email === 'twonytwony@gmail.com' ||
          res.additionalUserInfo.profile.email === 'boytwony@gmail.com') {
          this.router.navigate(['/home']);
          this.loginError = false;
        }
        else {
          this.loginError = true;
        }
      })
  }


  ngOnInit() {
  }
}
