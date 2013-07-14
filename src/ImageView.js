var ImageView = ParamsView.extend({
	defaults: {
		type: "image",
		src: "",
		caption: ""
	},

	htmlString: "<div class='caption'>{{caption}}</div><img src={{src}} />",

	template: [
		{tag: "label", children: [
			{tag: "span", text: "Image URL:"},
			{tag: "input", id: "src", placeholder: "http://"}
		]},

		{tag: "label", children: [
			{tag: "span", text: "Caption:"},
			{tag: "input", id: "caption"}
		]}
	]
});
