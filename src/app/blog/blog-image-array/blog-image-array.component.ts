import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { AuthService } from '../../login/auth.service';

@Component({
  selector: 'my-blog-image-array',
  template: '<p>My Blog Image Array</p>'
})
export class BlogImageArrayComponent {
  images: FirebaseListObservable<any[]>;

  constructor(
    private af: AngularFire
  ){
    // this.images = af.database.list('/')
  }
}
