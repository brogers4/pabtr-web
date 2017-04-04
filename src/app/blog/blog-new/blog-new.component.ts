import { Component, AfterViewInit, OnDestroy, Inject, NgZone } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFire, FirebaseApp, FirebaseListObservable } from 'angularfire2';

import { Blog } from '../blog';

@Component({
  selector: 'my-blog-new',
  templateUrl: 'blog-new.component.html',
  styleUrls: ['blog-new.component.scss']
})
export class BlogNewComponent implements AfterViewInit, OnDestroy {

  editor;
  content: string;
  imageList: any[];
  imageListObs: FirebaseListObservable<any[]>;
  fbStorageRef: any;

  constructor(
    private af: AngularFire,
    @Inject(FirebaseApp) firebaseApp: any,
    private router: Router,
    private zone: NgZone
  ){
    this.fbStorageRef = firebaseApp.storage().ref().child('blog/images');
    this.imageListObs = this.af.database.list('storage/blog/images');
    // this.af.database.list('storage/blog/images').subscribe(imageList => {
    //   this.imageList = imageList;
    //   console.log("DEBUG imageList:",this.imageList);
    // });
    window["angularComponentRef"] = {
      zone: this.zone,
      component: this
    };
  }

  getImageList(){
    return this.imageList;
  }

  getImageListObs(){
    console.log("In getImageListObs:",this.imageListObs);
    return this.imageListObs;
  }

  ngAfterViewInit(){
    $('#summernote').summernote({
      height: 400,
      toolbar: [
        ['style', ['bold','italic','underline','strikethrough','clear']],
        ['images', ['picture','image-manager']]
      ],
      callbacks: {
        onImageUpload: function(files){
          console.log("Summernote onImageUpload files:",files);
        }
      }
    });
  }

  ngOnDestroy(){
    
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
      // content: this.editor.getContent()
      content: $('#summernote').summernote('code')
    });
  }
}
