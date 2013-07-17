var ListView = ParamsView.extend({
	defaults: {
		type: "list"
	},

	htmlString: "<div class='list'>{{content}}</div>",

	template: [
		{view: LinkThing, id: "linkThing"}
	],

	render: function () {
		this.model.content = "";

		// turn the subcards into embed calls
		for (var i = 0; i < this.linkThing.children.length; ++i) {
			this.model.content += "<card src='" + this.linkThing.children[i].model.id + "'></card>";
		}
		
		ListView.super(this, "render", arguments);
	}
});