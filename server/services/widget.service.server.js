/*Use the following url pattern for a webservice endpoint to modify the order
of widgets on the server -
PUT /page/:pageId/widget?initial=index1&final=index=2
where
pageId = id of the page whose widgets are being displayed
initial = initial index of widget before being reordered
final = final index of widget after being reordered

JQuery directive to implement reordering behaviour, apply JQueryUI sortable
wbdv-sortable
include JQuery cdn in index.html
class - SortableDirective from
/server/directives/sortable.directive.js
Implement sortable inside lifecycle hook AfterViewInit which is called after
component view has been fully initialized

Send the new indexes of the moved widget back to the component which is using
the directive. This type of component interaction is achieved using @Input
and @Output decorators in Angular App

Use @Output to emit data to parent component i.e. widget-list which will use the
dortable directive

use the directive appSortable and th emitted event(newIndexes) to update the
index positions of the widgets on the server side

Store uploaded images in Only publically available directory is src/assets,
in src/assets/uploads, file should have unique name and no extension, use
random name to create the image urlfor the widgets url field, updated code
can be found in widget-image.component.html*/

module.exports = function (app) {

  var WIDGETS = require("./widget.mock");

  app.get('/api/widget', findAllWidgets);

  function findAllWidgets(req, res) {
    res.send(WIDGETS);
  }

  /*var multer = require('multer'); //npm install multer --save
  var upload = multer({dest: _dirname + '/../../public/uploads'});

  app.post("/api/upload", upload.single('myFile'), uploadImage);

  function uploadImage(req, res) {
    var widgetId = req.body.widgetId;
    var width = req.body.width;
    var myFile = req.File;

    var uid = req.body.uid;
    var pageId = req.body.pageId;
    var websiteId = req.body.websiteId;

    var originalName = myFile.originalName; // file name on users computer
    var fileName = myFile.fileName;         //new filename in upload folder
    var path = myFile.path;                 //full path of uploaded file
    var destination = myFile.destination;   //folder where file is saved
    var size = myFile.size;
    var mimeType = myFile.mimeType;

    widget = getWidgetById(widgetId);
    widget.url = '/uploads/' + filename;

    var callbackUrl = "/server/#/user/" + uid + "/website/" + websiteId + "/page/" + pageId + "/widget-list";

    res.redirect(callbackUrl);
  }

  function selectPhotos(pic){
    let url = 'https://farm' + pic.farm + '.staticFlickr.com/' + pic.server;
    url += '/' + pic.id + '_' + pic.secret + '_b.jpg';
    const widget = {
      websiteId : this.websiteId,
      pageId : this.pageId;
      url: url
    };
  }*/
}
