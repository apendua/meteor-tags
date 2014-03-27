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

  var tagsinput = UI.Component.extend();

  tagsinput.events({
    'change *': function (event, template) {
      if (template.tags) {
        // TODO: trigger addTag or removeTag event
        console.log('CHANGE', $(event.target).val());
      }
    }
  });

  Handlebars.registerHelper('tagsinput', tagsinput.extend({
    render: function () {
      var self = this;
      return HTML.SELECT({
        'data-role' : 'tagsinput',
        'multiple'  : '',
      });
    },
    parented: function () {
      // TODO: allow source to be a cursor
      // TODO: create autorun routine in init hook :P
      var $node = $(this.find('[data-role="tagsinput"]'));
      $node.tagsinput();
      $node.tagsinput('refresh');
      _.each(this.data.source, function (tagName) {
        $node.tagsinput('add', tagName);
      });
      this.tags = $node.val();
    },
  }));
  
})();
