import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire } from 'angularfire2';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  submitted = false;
  room;
  email;
  password;
  warningMessage: string;
  name: string;
  constructor(private router: Router, public af: AngularFire, private authService: AuthService) { }

  ngOnInit() {
    this.af.auth.subscribe(auth => {
      console.log(auth);
    });
  }

  onSubmitRegister() {
    this.authService.createUser(
      this.email,
      this.password,
      this.name
    ).then(() => {
      this.submitted = true;
      this.router.navigate([this.authService.redirectUrl]);
    }).catch((error) => {
      this.warningMessage = error.message;
      console.log(error);
    });
  }

  onSubmitLogin() {
    this.authService.signIn(
      this.email,
      this.password
    ).then(() => {
      this.submitted = true;
      this.router.navigate([this.authService.redirectUrl]);
    })
      .catch((error) => {
        this.warningMessage = error.message;
        console.log(error);
      });
  }
}
