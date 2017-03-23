import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../login/auth.service';
import { BlogService } from './blog.service';

@Component({
  selector: 'my-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent {
  // constructor(private blogService: BlogService) { };
  blogs: FirebaseListObservable<any[]>;
  loggedIn: Observable<Boolean>;

  constructor(
    private af: AngularFire,
    private authService: AuthService
  ){
    this.blogs = af.database.list('/blogs');
  }

  ngOnInit(){
    this.loggedIn = this.authService.loggedIn;
  }
}
