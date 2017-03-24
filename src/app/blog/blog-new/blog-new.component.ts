import { Component, AfterViewInit, OnDestroy, Inject } from '@angular/core';
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

  constructor(
    private af: AngularFire,
    @Inject(FirebaseApp) firebaseApp: any,
    private router: Router
  ){
    const fbStorageRef = firebaseApp.storage().ref().child('blog/images');
    // this.af.database.list('storage/blog/images').map((list) => {
    //   var newList = [];
    //   for(var i=0; i<list.length; i++){
    //     newList[i] = {
    //       title: list[i].name,
    //       value: list[i].url
    //     }
    //   }
    //   return newList;
    // }).subscribe(imageList => {
    //   this.imageList = imageList;
    //   console.log("DEBUG imageList:",this.imageList);
    // });
  }

  ngAfterViewInit(){
    tinymce.init({
      selector: '#editor',
      // NOTE: Plugins must be added to .angular-cli.json in root
      plugins: ['link','image', 'lists'],
      skin_url: '../../assets/skins/lightgray',
      image_list: success => {
        this.af.database.list('storage/blog/images').map((list) => {
          var newList = [];
          for(var i=0; i<list.length; i++){
            newList[i] = {
              title: list[i].name,
              value: list[i].url
            }
          }
          return newList;
        }).subscribe(imageList => {
          this.imageList = imageList;
          console.log("DEBUG 2 imageList:",this.imageList);
          success(imageList);
        });
      },
      toolbar: 'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | outdent indent | bullist numlist | link image | uploadImage',
      setup: editor => {
        this.editor = editor;
        editor.on('keyup', () => {
          this.content = editor.getContent();
        })

        editor.addButton('uploadImage',{
          icon: 'upload',
          text: 'Upload Image',
          tooltip: 'Upload Image',
          onclick: function() {
            console.log("On Upload Image Click!");
            editor.windowManager.open({
              title: 'Upload Image to Firebase',
              // type: 'form',
              // items: [
              //   {
              //     name: 'fn',
              //     type: 'textbox',
              //     label: 'First Name'
              //   }, {
              //     name: 'ln',
              //     type: 'textbox',
              //     label: 'Last Name'
              //   }
              // ],
              url: './assets/uploadImageDialog.html',
              width: 400,
              height: 400
            })
          }
        })
      }
    })
    $('#summernote').summernote({
      height: 400
    });
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
      // content: this.editor.getContent()
      content: $('#summernote').summernote('code')
    });
  }
}
