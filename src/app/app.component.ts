import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFire } from 'angularfire2';
import { AuthService } from './login/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'My App';
  subtitle = 'by Brandon Rogers';
  loggedIn: Observable<Boolean>;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(){
    this.loggedIn = this.authService.loggedIn;
  }
}
