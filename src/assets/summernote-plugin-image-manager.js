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
            for(var i=0; i<imageList.length; i++){
              var $img = self.$dialog.find("#blogImages").append('<div class="image-container">'+
                '<img src="'+imageList[i].url+'" width="70" height="70"/>'+
                '<div class="image-title">'+imageList[i].name+'</div>'+
              '</div>');

            }
            $('#blogImages .image-container').css({
              "display": "inline-block",
              "background": "rgba(0,0,0,0.2)",
              "border-radius": "2px",
              "margin": "10px",
              "overflow": "hidden"
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
                '<div class="form-group">'+
                  '<button id="imageUploadBtn" class="btn btn-primary">Upload New Image</button>'+
                  '<input type="file" id="imageUploadInput" accept="image/*" style="display:none" onchange="handleImageUpload(this.files)">'+
                '</div>'+
                '<div class="form-group">'+
                  '<label for="urlInput">Image Source</label>'+
                  '<input class="form-control" type="text" placeholder="url" id="urlInput"/>'+
                '</div>',
          footer: '<button class="btn btn-primary">Add Image</button>',
          closeOnEscape: true
        };


        self.$dialog = ui.dialog(dialogOption).render().appendTo($container);
        self.$dialog.css({
          "height": "100%"
        });

        self.onUploadNewImage = function(e){
          console.log("onUploadNewImage");
          $('#blogImages #imageUploadInput').click();
          // e.preventDefault();
        }
        self.handleImageUpload = function(e){
          console.log("handleImageUpload");
        }
        $('#imageUploadBtn').click(function(e){
          console.log("Clicked!");
          self.onUploadNewImage(e);
        })
        $('#imageUploadInput').click(function(e){
          console.log("imageUploadInput clicked!");
          self.handleImageUpload();
        })

        // this.$panel = $('<div class="image-manager-panel"/>').css({
        //   position: 'absolute',
        //   width: 100,
        //   height: 100,
        //   left: '50%',
        //   top: '50%',
        //   background: 'red'
        // }).hide();
        //
        // this.$panel.appendTo('body');
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
