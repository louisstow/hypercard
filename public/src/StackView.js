var StackView = ParamsView.extend({
	defaults: {
		type: "stack"
	},

	htmlString: "<div class='stack'><div class='controls'><a class='prev'>&lt;</a> <a class='next'>&gt;</a></div>{{content}}</div>",

	template: [
		{view: LinkThing, id: "linkThing"}
	],

	render: function () {
		this.model.content = "";

		// turn the subcards into embed calls
		for (var i = 0; i < this.linkThing.children.length; ++i) {
			var visible = "";
			if (i === 0) { visible = "visible" }
			this.model.content += "<card class='"+visible+"' src='" + this.linkThing.children[i].model.id + "'></card>";
		}
		
		ListView.super(this, "render", arguments);
	},

	parse: function (root) {
		StackView.super(this, "parse", arguments);

		var cards = root.querySelectorAll(".stack > card");
		for (var i = 0; i < cards.length; ++i) {
			this.linkThing.addChild(new LinkItem({
				superview: this.linkThing.container,
				id: cards[i].getAttribute("src")
			}));
		}
	}
});