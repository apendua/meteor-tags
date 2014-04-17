
// newTagDialog

Template.newTagDialog.rendered = function () {
	//TODO: maybe we should cache this list (?)
	//TODO: limit query to the most popular tags
	var listOfTags = Meteor.tags.find({}, {reactive:false}).map(function (tag) {return tag.name});
	$(this.find('input')).typeahead({
		source: listOfTags
	});
};

// newTagPopoverToggle

Template.newTagPopoverToggle.rendered = function () {
	var data = this.data;
	$(this.firstNode).popover({
		html: true,
		trigger: 'manual',
		placement: "right",
		animation: false,
		content: function () {
			return Meteor.render(function () {
				return Template.newTagDialog(data);
			});
		},
	});
};

Template.newTagPopoverToggle.events({
	'click button': function (event) {
		//TODO: find a way to tell Spark that we are
		//      actually removing the DOM elements
		var $node = $(event.target);
		$node.toggleClass('btn-primary');
		if ($node.hasClass('btn-primary')) {
			$node.popover('hide');
		} else {
			$node.popover('show');
		}
	}
});
