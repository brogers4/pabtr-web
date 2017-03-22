import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFire } from 'angularfire2';

@Component({
  selector: 'my-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string;
  password: string;
  submitted = false;
  loggedIn = false;

  @ViewChild('loginForm') loginForm;

  constructor(public af: AngularFire, private router: Router) {
    this.af.auth.subscribe(auth => {
      if(auth !== null){
        this.loggedIn = true;
        // this.router.navigate(['home']);
      } else {
        this.loggedIn = false;
        this.resetForm();
      }
    })
  }

  onSubmit(){
    this.af.auth.login({email: this.email, password: this.password})
    this.submitted = true;
  }

  onLogout(){
    this.af.auth.logout();
  }

  resetForm(){
    if(this.loginForm) this.loginForm.reset();
    this.submitted = false;
  }
}
