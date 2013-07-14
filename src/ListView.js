var ListView = ParamsView.extend({
	defaults: {
		type: "list"
	},

	htmlString: "<div class='list'></div>",

	template: [
		{view: LinkThing}
	]
});