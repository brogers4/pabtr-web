(function (factory) {
  /* global define */
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['jquery'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // Node/CommonJS
    module.exports = factory(require('jquery'));
  } else {
    // Browser globals
    factory(window.jQuery);
  }
}(function ($) {

  // Extends plugins for adding hello.
  //  - plugin is external module for customizing.
  $.extend($.summernote.plugins, {
    /**
     * @param {Object} context - context object has status of editor.
     */
    'image-manager': function (context) {
      var self = this;

      // ui has renders to build ui elements.
      //  - you can create a button with `ui.button`
      var ui = $.summernote.ui;
      var $editor = context.layoutInfo.editor;
      var options = context.options;
      var imageList = [];
      var newFile = null;

      // add hello button
      context.memo('button.image-manager', function () {
        // create button
        var button = ui.button({
          contents: '<i class="fa fa-picture"/> Image Manager',
          tooltip: 'Image Manager',
          click: function () {
            self.showDialog();
            // self.$panel.hide(500);
            // invoke insertText method with 'hello' on editor module.
            // context.invoke('editor.insertText', 'hello');
          }
        });

        // create jQuery object from button instance.
        var $imageManager = button.render();
        return $imageManager;
      });

      // This events will be attached when editor is initialized.
      // this.events = {
      //   // This will be called after modules are initialized.
      //   'summernote.init': function (we, e) {
      //     console.log('summernote initialized', we, e);
      //   },
      //   // This will be called when user releases a key on editable.
      //   'summernote.keyup': function (we, e) {
      //     console.log('summernote keyup', we, e);
      //   }
      // };

      // This method will be called when editor is initialized by $('..').summernote();
      // You can create elements for plugin
      this.initialize = function () {
        window["angularComponentRef"].zone.run(() => {
          var imageListObs = window["angularComponentRef"].component.getImageListObs();
          // console.log("imageListObs:",imageListObs);
          imageListObs.subscribe(function(imageList) {
            console.log("imageList:",imageList);
            // self.$dialog.find("#blogImages").html(JSON.stringify(imageList));
            self.$dialog.find("#blogImages").html("");
            for(var i=0; i<imageList.length; i++){
              var $img = self.$dialog.find("#blogImages").append('<div class="image-container">'+
                '<img src="'+imageList[i].url+'" width="70" height="70"/>'+
                '<div class="image-title">'+imageList[i].name+'</div>'+
              '</div>');
            }
            $('#blogImages .image-container').click(function(e){
              var images = $('#blogImages .image-container');
              for(var i=0; i<images.length; i++){
                $(images[i]).css({
                  "background": "rgba(0,0,0,0.2)",
                  "color": "inherit",
                  "border": "2px solid transparent"
                })
              }
              $(e.currentTarget).css({
                "background": "black",
                "color": "white",
                "border": "2px solid black"
              })
              // console.log(e.currentTarget);
              var src = $(e.currentTarget).find("img")[0].src;
              $("#urlInput").val(src);
            })
            $('#blogImages .image-container').css({
              "display": "inline-block",
              "background": "rgba(0,0,0,0.2)",
              "border-radius": "2px",
              "margin": "10px",
              "overflow": "hidden",
              "cursor": "pointer",
              "border": "2px solid transparent"
            });
            $('#blogImages img').css({
              "object-fit": "cover"
            })
            $('#blogImages .image-title').css({
              "width": "70px",
              "height": "3.5em",
              "padding": "4px",
              "font-size": "0.8em",
              "box-sizing": "border-box",
              "display": "-webkit-box",
              "-webkit-line-clamp": "2",
              "-webkit-box-orient": "vertical",
              "overflow": "hidden",
              "text-overflow": "ellipsis"
            })


          })
        })
        var $container = options.dialogsInBody ? $(document.body) : $editor;
        var dialogOption = {
          title: 'Image Manager',
          body: '<div id="blogImages"></div>'+
                '<div id="imagePreviewContainer">'+
                  '<img id="imagePreview" height="100" src="#" style="display:inline-block;">'+
                  '<div style="display:inline-block">'+
                    '<div id="imagePreviewForm" class="form-group form-inline">'+
                      '<label for="newImageTitle">Image Name</label>'+
                      '<input class="form-control" type="text" id="newImageTitle"/>'+
                      '<button id="imageUploadBtn" class="btn btn-primary">Upload Image</button>'+
                    '</div>'+
                  '</div>'+
                '</div>'+
                '<div class="form-group">'+
                  '<label id="imageSelectBtn" class="btn btn-primary">'+
                    'Select New Image'+
                    '<input type="file" id="imageUploadInput" accept="image/*" style="display:none;">'+
                  '</label>'+
                '</div>'+
                '<div class="form-group">'+
                  '<label for="urlInput">Image Source</label>'+
                  '<input class="form-control" type="text" placeholder="url" id="urlInput"/>'+
                '</div>',
          footer: '<button class="btn btn-primary" id="addImageButton">Add Image</button>',
          closeOnEscape: true
        };


        self.$dialog = ui.dialog(dialogOption).render().appendTo($container);
        self.$dialog.css({
          "height": "100%"
        });


        self.handleImageUpload = function(blob,file){
          $("#imageUploadBtn").click(function(){
            var name = $("#newImageTitle").val();
            if(typeof name === "undefined"){
              console.log("ERROR: Undefined name.");
              return;
            }

            window["angularComponentRef"].zone.run(() => {
              window["angularComponentRef"].component.uploadImage(blob,name,file.name);
            });
          })
        }

        $('#imageUploadInput').change(function(e){
          var file = $("#imageUploadInput").get(0).files[0];
          var reader = new FileReader();
          reader.onload = function(e){
            $('#imagePreview').attr('src', e.target.result);
            $('#imagePreviewContainer').css({
              "display": "block"
            })
            $("#newImageTitle").val(file.name);
            var img = new Image();
            img.src = e.target.result;
            var canvas = document.createElement("canvas");
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img,0,0);
            var MAX_WIDTH = 800;
            var MAX_HEIGHT = 800;
            var width = img.width;
            var height = img.height;

            if (width > height) {
              if (width > MAX_WIDTH) {
                height *= MAX_WIDTH / width;
                width = MAX_WIDTH;
              }
            } else {
              if (height > MAX_HEIGHT) {
                width *= MAX_HEIGHT / height;
                height = MAX_HEIGHT;
              }
            }
            canvas.width = width;
            canvas.height = height;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, width, height);
            canvas.toBlob(function(blob){
              self.handleImageUpload(blob,file);
            })
          }
          reader.readAsDataURL(file);
        });

        $('#addImageButton').click(function(){
          var url = $('#urlInput').val();
          context.invoke('editor.insertImage',url);
        })

      };

      this.showDialog = function(){
        ui.showDialog(self.$dialog);
      };

      // This methods will be called when editor is destroyed by $('..').summernote('destroy');
      // You should remove elements on `initialize`.
      this.destroy = function () {
        this.$panel.remove();
        this.$panel = null;
      };
    }
  });
}));
