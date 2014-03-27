
// listOfTags

Template.listOfTags.helpers({
	listOfTags: function () {
		// TODO: get rid of this 'docId'
		var tags = [], data = this && this.data;
		if (data && data.tags) {
			for (var i=0; i<data.tags.length; i++)
				tags.push({docId:data._id, name:data.tags[i]});
		}
		return tags;
	},
});

//TODO: add supply for other collections
Template.listOfTags.events({
	'submit form': function (event, template) {
		event.preventDefault();
		var node = $(event.target).find('input');
		Tags._getCollection(template.data.collection)
			.addTag(node.val(), {_id:this.data._id});
	},
	// remove tag
	'click button[name=delete]': function (event, template) {
		Tags._getCollection(template.data.collection)
			.removeTag(this.name, {_id:this.docId});
	},
	// drag & drop tags
	'dragstart .tag': function (event) {
		//TODO: use callback defined by user
		//setDataTransfer(event, 'tag', this.name);
	},
	'dragover .tag': function (event) {
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
