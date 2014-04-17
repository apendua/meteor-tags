if (Package.ui) {
  Package.ui.UI.registerHelper('renderTags', function (mayUpdate, collection, options) {
    if (options === undefined) { options = collection; collection = null }
    if (Template.listOfTags)
      return new UI.SafeString(Template.listOfTags({
          data : this, collection : collection, mayUpdate : mayUpdate
        }));
    return '';
  });

  Package.ui.UI.registerHelper('addTagButton', function () {
    console.log('warning! addTagButton helper is deprecated');
    return '';
  });
}
