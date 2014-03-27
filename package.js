
Package.describe({
    summary: "Add tags to selected collections",
});

Package.on_use(function (api) {
    api.use(['underscore', 'ui', 'templating', 'jquery', 'handlebars'], 'client');
    
    // this is required since Meteor 0.6.5
    api.use(['livedata', 'mongo-livedata'], ['client', 'server']);

    api.add_files("tags.js", ['client', 'server']);

    api.add_files([

      // JS source
      'startup.js',
      'helpers.js',

    ], 'client');

    if (api.export !== undefined) {
      api.export('Tags');
    }
});
