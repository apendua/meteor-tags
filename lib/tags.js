/*
  @author: apendua / apendua@gmail.com
*/

Tags = {};

Meteor.tags = new Meteor.Collection("tags");

var _ = Package.underscore._;
var tagsInterface = {};
var collections = {};
var validators = {};
var defaultCollection = null;

var safe = function (userId, collection, selector, action) {
  var count = 0;
  if (!_.isFunction(action))
    return;

  collection.find(selector).forEach(function (doc) {
    var allow = Meteor.isClient || _.some(validators[collection._name].allow, function (callback) {
      return callback.call(undefined, userId, doc);
    });
    var deny = !Meteor.isClient && _.some(validators[collection._name].deny, function (callback) {
      return callback.call(undefined, userId, doc);
    });
    if (!allow || deny)
      throw new Meteor.Error(403, 'Action not allowed');
    if (action.call(undefined, doc))
      count++;
  });
  return count;
};

_.extend(Tags, {

  TagsMixin: function (collection) {

    if (!collection._name)
      throw new Error('tags mixin may only be used with named collections')

    // for further reference
    collections[collection._name] = collection;
    validators[collection._name] = { allow: [], deny: [] };

    if (!defaultCollection)
      defaultCollection = collection;

    // prepare methods object
    var methods = {}, prefix = '/' + collection._name + '/';

    // server methods

    methods[prefix + 'addTag'] = function (selector, tagName) {
      if (!tagName)
        throw new Meteor.Error(400, 'tagName must be non-empty');

      var userId = this.userId;

      //TODO: optimize this
      var nRefs = safe(userId, collection, selector, function (doc) {
        // first add tagName to tag's list of selected documents
        if (doc.tags && doc.tags.indexOf(tagName) >= 0)
          // this tag is already there so don't update
          return false;
        collection.update({_id:doc._id}, {$addToSet:{tags:tagName}});
        return true;
      });//safe

      if (nRefs) {
        // if at least one tag was added, update tags collection
        var tag = Meteor.tags.findOne({name:tagName,collection:collection._name});
        if (tag) {
          Meteor.tags.update({_id:tag._id}, {
            $inc : { nRefs     : nRefs },
            $set : { changedAt : new Date },
          });
          return tag._id;
        }
        return Meteor.tags.insert({
          collection : collection._name,
          createdBy  : userId,
          createdAt  : new Date,
          nRefs      : nRefs,
          name       : tagName,
        });
      }// if (nRefs)
    };//addTag

    methods[prefix + 'removeTag'] = function (selector, tagName) {
      var nRefs = safe(this.userId, collection, selector, function (doc) {
        if (!doc.tags || doc.tags.indexOf(tagName) < 0)
          return false;
        collection.update({_id:doc._id}, {$pull:{tags:tagName}});
        return true;
      });
      if (nRefs) {
        Meteor.tags.update({name:tagName,collection:collection._name}, {
          $inc : { nRefs     : -nRefs },
          $set : { changedAt : new Date },
        });
      }
    };

    // client methods

    collection.addTag = function (tagName, selector) {
      Meteor.call(prefix + 'addTag', selector, tagName, function (err) {
        //TODO: handle errors
      });
    };

    collection.removeTag = function (tagName, selector) {
      Meteor.call(prefix + 'removeTag', selector, tagName, function (err) {
        //TODO: handle errors
      });
    };

    //TODO: use allow/deny pattern

    collection.allowTags = function (callback) {
      if (!_.isFunction(callback))
        throw new Error('allow callback must be a function');
      validators[collection._name].allow.push(callback);
    };

    collection.denyTags = function (callback) {
      if (!_.isFunction(callback))
        throw new Error('dany callback must be a function');
      validators[collection._name].deny.push(callback);
    };

    // define meteor methods

    Meteor.methods(methods);
  },

  _getCollection: function (name) {
    if (!name)
      return defaultCollection;
    return collections[name];
  },

});
