
var tagButton = UI.Component.extend();

tagButton.events({
  'dragstart': function (event) {
    // TODO: use callback privided by user
    event.originalEvent.dataTransfer.setData('tags', EJSON.stringify(this));
  },
  'dragover': function (event) {
    event.preventDefault();
    return false;
  },
  'click button[data-action=click]': function () {
    $(event.target).trigger('clickTag');
  },
  'click button[data-action=close]': function () {
    $(event.target).trigger('closeTag');
  },
});

Handlebars.registerHelper('tagsAsListOfButtons', function () {
  var options = this,
      defaults = {
        tagClass  : options.tagClass || 'btn btn-default btn-xs',
        close     : options.close !== undefined ? options.close : false,
        itemValue : options.itemValue || '.',
      };

  return UI.Each(function () {
      return Spacebars.call(options.source);
    }, tagButton.extend({
      render: function () {
        var self = this;
        return HTML.LI(HTML.DIV({
          'class'     : 'btn-group',
          'draggable' : options.draggable ? 'true' : '',
        }, [
          HTML.BUTTON({
            // TODO: using heleprs seems to be a very bad way of solving this issue
            'class': function () {
              return Spacebars.mustache(self.lookup('tagClass')) || defaults.tagClass;
            },
            'data-action': 'click',
          }, function () {
            return Spacebars.mustache(self.lookup(defaults.itemValue));
          }),
          UI.If(function () {
            var showCloseButton;
            if (_.isString(defaults.close)) {
              showCloseButton = Spacebars.mustache(self.lookup(defaults.close));
            }
            return showCloseButton !== undefined ? showCloseButton : defaults.close;
          }, UI.block(function () {
            return HTML.BUTTON({
              'class': function () {
                return Spacebars.mustache(self.lookup('tagClass')) || defaults.tagClass;
              },
              'data-action': 'close',
            }, HTML.Raw('x'));
          })),
        ]));
      }
    })
  );
});

Handlebars.registerHelper('tagsAsListOfSpans', function () {

});

Handlebars.registerHelper('renderTags', function (collection, options) {
  console.log('warning! renderTags helper is deprecated; use tagsAsListOfButtons or tagsAsListOfSpans');
  return UI.Component;
});

Handlebars.registerHelper('addTagButton', function () {
  console.log('warning! addTagButton helper is deprecated');
  return UI.Component;
});
