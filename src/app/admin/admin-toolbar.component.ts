import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../login/auth.service';

@Component({
  selector: 'admin-toolbar',
  templateUrl: './admin-toolbar.component.html',
  styleUrls: ['./admin-toolbar.component.scss']
})
export class AdminToolbarComponent {
  loggedIn: Observable<Boolean>;

  constructor(private authService: AuthService){}

  ngOnInit(){
    this.loggedIn = this.authService.loggedIn;
  }
}
