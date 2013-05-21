
Package.describe({
    summary: "Add tags to selected collections",
});

Package.on_use(function (api) {
    api.use(['underscore', 'bootstrap', 'templating', 'jquery'], 'client');

    api.add_files("lib/tags.js", ['client', 'server']);

    api.add_files([

      // HTML templates
      'lib/listOfTags.html',
      'lib/newTagDialog.html',

      // JS source
      'lib/listOfTags.js',
      'lib/newTagDialog.js',
      'lib/helpers.js',
      'lib/tags.css',

    ], 'client');
});
