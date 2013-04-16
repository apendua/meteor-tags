
Package.describe({
    summary: "Add tags to selected collections",
});

Package.on_use(function (api) {
    api.use(['underscore', 'bootstrap', 'templating'], 'client');

    api.add_files("lib/tags.js", ['client', 'server']);

    api.add_files([
      'lib/tags.html',

      'lib/listOfTags.js',
      'lib/addTagButton.js',
      'lib/helpers.js',
      'lib/tags.css'], 'client');
});
