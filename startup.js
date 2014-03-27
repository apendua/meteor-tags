
Meteor.startup(function () {
  $('body').on('drop', function (event) {
    var dt = event.originalEvent.dataTransfer;
    if (dt) {
      // XXX currently the extra parameters are not suported by meteor,
      //     but PR is on its way ;)
      $(event.target).trigger('dropTag', EJSON.parse(dt.getData('tags')));
    }
    return true; // do not block
  });
});

