var LinkThing = Spineless.View.extend({

	template: [
		{tag: "button", text: "Add"},
		{tag: "ul", id: "list"}
	]
});

var LinkItem = Spineless.View.extend({
	defaults: {
		id: -1
	},

	template: [
		{tag: "li", id: "li"}
	],

	render: function () {
		this.li.textContent = this.model.id;
	}
});