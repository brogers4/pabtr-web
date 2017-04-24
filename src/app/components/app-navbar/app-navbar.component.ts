import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../../login/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.scss']
})
export class AppNavbarComponent {
  loggedIn: Observable<Boolean>;

  constructor(private authService: AuthService){}

  ngOnInit(){
    this.loggedIn = this.authService.loggedIn;
  }
}
