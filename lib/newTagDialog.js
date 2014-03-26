
// newTagDialog

Template.newTagDialog.rendered = function () {
	//TODO: use bloodhound for caching
	var listOfTags = Meteor.tags.find({}, {reactive:false}).map(function (tag) {return tag.name});
	$(this.find('input')).typeahead({
		source: listOfTags,
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
			return UI.toHTML(Template.newTagDialog.extend({data: data}));
		},
	});
};

var click = function () {
	var $node = $(event.target).closest('button');
	$node.toggleClass('btn-primary');
	if ($node.hasClass('btn-primary')) {
		$node.popover('hide');
	} else {
		$node.popover('show');
	}
}

Template.newTagPopoverToggle.events({
	'click button' : click,
	'click span'   : click, // funny :P
});
