import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFire } from 'angularfire2';

import { Blog } from '../blog';

@Component({
  selector: 'my-blog-new',
  templateUrl: 'blog-new.component.html',
  styleUrls: ['blog-new.component.scss']
})
export class BlogNewComponent implements AfterViewInit, OnDestroy {

  editor;
  content: string;

  constructor(private af: AngularFire, private router: Router){ }

  ngAfterViewInit(){
    tinymce.init({
      selector: '#editor',
      skin_url: '../../assets/skins/lightgray',
      setup: editor => {
        this.editor = editor;
        editor.on('keyup', () => {
          this.content = editor.getContent();
        })
      }
    })
  }

  ngOnDestroy(){
    tinymce.remove(this.editor);
  }

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
      content: this.editor.getContent()
    });
  }
}
