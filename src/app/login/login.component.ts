import { Component } from '@angular/core';

@Component({
  selector: 'my-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string;
  password: string;
  submitted = false;

  onSubmit(){
    this.submitted = true;
  }
}
