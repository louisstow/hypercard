var LinkThing = Spineless.View.extend({
	events: {
		"submit form": "add"
	},

	template: [
		{tag: "form", id: "form", children: [
			{tag: "label", children: [
				{tag: "input", id: "add-input"},
				{tag: "button", text: "Add", id: "add-button"}
			]},
		]},

		{tag: "ul", id: "list"}
	],

	add: function (e) {
		var id = this['add-input'].value;
		if (!/^[0-9a-z]+$/.test(id)) {
			this['add-input'].value = "";
			return false;
		}

		this.addChild(new LinkItem({
			superview: this.container,
			id: id
		}));

		this['add-input'].value = "";
		return false;
	}
});

var LinkItem = Spineless.View.extend({
	defaults: {
		id: -1
	},

	events: {
		"click remove-button": "removeFromParent"
	},

	template: [
		{tag: "li", children: [
			{tag: "span", id: "label"},
			{tag: "button", text: "x", id: "remove-button"}
		]}
	],

	render: function () {
		this.label.textContent = this.model.id;
	}
});