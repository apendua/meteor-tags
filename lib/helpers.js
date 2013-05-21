(function () {

  Handlebars.registerHelper('renderTags', function (collection, options) {
    if (options === undefined) { options = collection; collection = null }
    if (Template.listOfTags)
      return new Handlebars.SafeString(Template.listOfTags({
          data : this, collection : collection
        }));
    return '';
  });
  
  Handlebars.registerHelper('addTagButton', function () {
    console.log('warning! addTagButton helper is deprecated');
    /*if (Template.newTagPopoverToggle)
      return new Handlebars.SafeString(Template.newTagPopoverToggle(this));*/
    return '';
  });
  
})();
