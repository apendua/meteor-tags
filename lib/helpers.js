(function () {

  Handlebars.registerHelper('renderTags', function (collection, options) {
    if (options === undefined) { options = collection; collection = null }
    return Template.listOfTags.extend({
      data: {
        data       : this,
        collection : collection,
      }
    });
  });
  
  Handlebars.registerHelper('addTagButton', function () {
    console.log('warning! addTagButton helper is deprecated');
    /*if (Template.newTagPopoverToggle)
      return new Handlebars.SafeString(Template.newTagPopoverToggle(this));*/
    return '';
  });
  
})();
