import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AngularFire } from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'My App';
  loggedIn = false;

  constructor(public af: AngularFire, private router: Router, private location: Location) {
    this.af.auth.subscribe(auth => {
      if(auth !== null){
        this.loggedIn = true;
        // Redirect somewhere?
      } else {
        this.loggedIn = false;
      }
    })
  }
}
