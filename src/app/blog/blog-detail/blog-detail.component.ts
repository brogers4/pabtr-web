import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { Subscription } from 'rxjs';

import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'my-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {
  id: number;
  blog: FirebaseObjectObservable<any>;

  private sub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private af: AngularFire
  ){}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.sub = this.af.database.object('/blogs/'+params['id'])
        .subscribe(blog => this.blog = blog);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
