# meteor-tags

The package defines helpers that allow you to
add tags to documents in your collections
and render a list of tags within a template.
Please note, that this package is still a work in progress
and the API is very likely to change in the nearest future.

## Installation

Supposing that you're developing your app with `meteorite`
the only thing you need to do is:
```
mrt add tags
```

## Collection API

To add tags to selected collection use the `Tags.TagsMixin` routine:
```javascript
MyCollection = new Meteor.Collection("myCollection");
Tags.TagsMixin(MyCollection);
```
You can now do stuff like this:
```javascript
MyCollection.addTag('tagName', selector);
MyCollection.removeTag('tagName', selector);
```
By default the above actions are not allowed. To change this behavior
you will need to allow actions on tags:
```javascript
MyCollection.allowTags(function (userId) {
    // only allow if user is logged in
    return !!userId;
});
```
To search for all documents with a given tag use:
```javascript
MyCollection.find({tags:'tagName'});
```

## Template API

Now, you're ready to use tags within your views. Supposing you have a helper:
```javacript
Template.myTeplate.data = function () {
    return MyCollection.findOne({...});
}
```
you can render tags attached to your data with `{{renderTags}}` helper:
```html
{{#with data}}
  <ul class="...">
    {{renderTags}}
  </ul>
{{/with}}
```

## Meteor.tags

Additionally, you have a read only access to `Meteor.tags` collection
that keeps record about all tags existing in your database. The records
are documents consisting of the following fields:
```javascript
{
    collection : // name of the corresponding collection
    createdAt  : // the date, this tag was first used
    createdBy  : // userId
    nRefs      : // number of references
    name       : // name of this tag
}
```


