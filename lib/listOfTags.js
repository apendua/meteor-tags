
// listOfTags

Template.listOfTags.helpers({
	listOfTags: function () {
		var tags = [];
		if (this && this.tags) {
			for (var i=0; i<this.tags.length; i++)
				tags.push({docId:this._id, tagName:this.tags[i]});
		}
		return tags;
	},
});

//TODO: add supply for other collections
Template.listOfTags.events({
	// remove tag
	'click button[name=delete]': function (event) {
		//TODO: also allow different collections
		Tags._getCollection().removeTag({_id:this.docId}, this.tagName);
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


