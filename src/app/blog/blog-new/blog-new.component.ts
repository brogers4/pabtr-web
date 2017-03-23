import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFire } from 'angularfire2';

import { Blog } from '../blog';

@Component({
  selector: 'my-blog-new',
  templateUrl: 'blog-new.component.html',
  styleUrls: ['blog-new.component.scss']
})
export class BlogNewComponent {

  constructor(private af: AngularFire, private router: Router){ }

  createBlog(blog: Object){
    this.af.database.list('/blogs').push(blog).then(value => {
        let key = value.getKey();
        console.log("Successfully created blog:",key);
        this.router.navigate(['/blog',key]);
      }).catch(err => {
        console.log("Unable to create blog:",err);
      })
  }

  onSubmit(newBlogForm) {
    this.createBlog({
      title: newBlogForm.value.title,
      content: newBlogForm.value.content
    });
  }
}
