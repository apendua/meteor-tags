
// listOfTags

Template.listOfTags.helpers({
	listOfTags: function () {
		var tags = [], data = this && this.data;
		var result = {};
		if (data && data.tags) {
			for (var i=0; i<data.tags.length; i++)
				tags.push({docId:data._id, tagName:data.tags[i], mayRemove: this.mayUpdate});
		}
		result.tags = tags;
		result.readwrite = this.mayUpdate;
		return result;
	}
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
			.removeTag(this.tagName, {_id:this.docId});
	},
	// drag & drop tags
	'dragstart .tag': function (event) {
		//TODO: use callback defined by user
		//setDataTransfer(event, 'tag', this.tagName);
	},
	'dragover .tag': function (event) {
		event.preventDefault();
		return false;
	}
});
