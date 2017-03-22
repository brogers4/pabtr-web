import { Component } from '@angular/core';
import { AngularFire } from 'angularfire2';

@Component({
  selector: 'my-logout',
  templateUrl: 'logout.component.html',
  styleUrls: ['logout.component.scss']
})
export class LogoutComponent {
  loggedIn = true;
  constructor(public af: AngularFire){
    this.af.auth.logout();
    this.af.auth.subscribe(auth => {
      if(auth !== null){
        this.loggedIn = true;
        // this.router.navigate(['home']);
      } else {
        this.loggedIn = false;
        // this.resetForm();
      }
    })
  }
}
