import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Blog } from './blog';

@Injectable()
export class BlogService {
  blogs: FirebaseListObservable<any[]>;
  constructor(af: AngularFire){
    this.blogs = af.database.list('/blogs');
  }
  getBlogs(): FirebaseListObservable<any[]> {
    return this.blogs;
  };
}
