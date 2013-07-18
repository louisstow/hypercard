var TextView = ParamsView.extend({
	defaults: {
		type: "text",
		text: "",
		fontSize: 12,
		fontFamily: "Helvetica",
		color: "#000",
		align: "left"
	},

	htmlString: "<div style='font: {{fontSize}}px {{fontFamily}}; color: {{color}}; text-align: {{align}}'>\
				{{text}}</div>",

	template: [
		{tag: "label", children: [
			{tag: "textarea", id: "text"}
		]},

		{tag: "label", children: [
			{tag: "span", text: "Font:"},
			{tag: "input", type: "number", id: "fontSize", value: 12},
			{tag: "select", id: "fontFamily", children: [
				{tag: "option", value: "Helvetica, sans-serif", text: "Helvetica"},
				{tag: "option", value: "Comic Sans MS, cursive", text: "Comic Sans"},
				{tag: "option", value: "Times New Roman, serif", text: "Times New Roman"},
			]}
		]},

		{tag: "label", children: [
			{tag: "span", text: "Color:"},
			{tag: "input", id: "color"}
		]},

		{tag: "label", children: [
			{tag: "span", text: "Align:"},
			{tag: "select", id: "align", children: [
				{tag: "option", value: "left", text: "Left"},
				{tag: "option", value: "center", text: "Center"},
				{tag: "option", value: "right", text: "Right"}
			]}
		]},
	],

	parse: function (root) {
		TextView.super(this, "parse", arguments);
		var container = root.childNodes[0];
		console.log(container.style.fontFamily.replace(/'/g, "" ))
		this.set({
			"fontSize": parseInt(container.style.fontSize, 10),
			"color": container.style.color,
			"fontFamily": container.style.fontFamily.replace(/'/g, ""),
			"align": container.style.textAlign,
			"text": container.innerHTML.trim()
		});
	}
});