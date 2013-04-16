(function () {

  Handlebars.registerHelper('renderTags', function () {
    //TODO: use hash to set:
    //        * draggable (?)
    //        * curent model
    if (Template.listOfTags)
      return new Handlebars.SafeString(Template.listOfTags(this));
    return '';
  });

  Handlebars.registerHelper('addTagButton', function () {
    if (Template.newTagPopoverToggle)
      return new Handlebars.SafeString(Template.newTagPopoverToggle(this));
    return '';
  });

})();
