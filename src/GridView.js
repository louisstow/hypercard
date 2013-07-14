var GridView = ParamsView.extend({
	defaults: {
		type: "grid",
		cols: 2
	},

	htmlString: "<div class='grid-{{cols}}'></div>",

	template: [
		{tag: "label", children: [
			{tag: "span", text: "Columns:"},
			{tag: "input", type: "number", id: "cols", value: 2}
		]}
	]
});