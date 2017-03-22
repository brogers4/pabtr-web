import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { BlogService } from './blog.service';

@Component({
  selector: 'my-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent {
  // constructor(private blogService: BlogService) { };
  blogs: FirebaseListObservable<any[]>;
  constructor(af: AngularFire){
    this.blogs = af.database.list('/blogs');
  }
}
