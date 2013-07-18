var GridView = ParamsView.extend({
	defaults: {
		type: "grid",
		cols: 2,
		spacing: 5
	},

	htmlString: "<div class='grid-{{cols}}'>{{content}}</div><div class='clearer'></div>",

	template: [
		{tag: "label", children: [
			{tag: "span", text: "Columns:"},
			{tag: "input", type: "number", id: "cols", value: 2}
		]},

		{tag: "label", children: [
			{tag: "span", text: "Spacing:"},
			{tag: "input", type: "number", id: "spacing", value: 5}
		]},

		{view: LinkThing, id: "linkThing"}
	],

	render: function () {
		this.model.content = "";

		// turn the subcards into embed calls
		for (var i = 0; i < this.linkThing.children.length; ++i) {
			this.model.content += "<card src='" + this.linkThing.children[i].model.id + "' style='padding: "+this.model.spacing+"px'></card>";
		}
		
		ListView.super(this, "render", arguments);
	},

	parse: function (root) {
		GridView.super(this, "parse", arguments);

		var cols = root.childNodes[0].className.split("-")[1];
		var cards = root.querySelectorAll("div > card");
		
		this.set({
			cols: cols || 2,
			spacing: parseInt(cards[0].style.paddingLeft, 10) || 5
		});
		

		for (var i = 0; i < cards.length; ++i) {
			this.linkThing.addChild(new LinkItem({
				superview: this.linkThing.container,
				id: cards[i].getAttribute("src")
			}));
		}
	}
});