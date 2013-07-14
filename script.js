var form;
_.templateSettings = {
  interpolate : /\{\{(.+?)\}\}/g
};

document.getElementById("type").onchange = function () {
	console.log("Change Type", this.value);

	chooseType(this.value);
}

function chooseType (type) {
	// clear the existing form
	if (form) { 
		form.container.parentNode.removeChild(form.container); 
		form = null;
	}

	switch (type) {
		case "image":
			form = new ImageView();
			break;
		case "text":
			form = new TextView();
			break;
	}

	// if type is found, add to form
	if (form) {
		document.getElementById("form").appendChild(form.el)
	}
}

function updatePreview (html) {
	document.getElementById("preview-area").innerHTML = html;
}

var ParamsView = Spineless.View.extend({
	init: function () {
		this.defaults.bgcolor = "#fff";
		
		this.template.unshift({
			tag: "label", children: [
				{tag: "span", text: "Background Color:"},
				{tag: "input", id: "bgcolor"}
			]
		});
		ParamsView(this, "init", arguments);
	},

	htmlString: "<div class='card {{type}}' style='background-color: {{bgcolor}};'>{{content}}</div>",

	render: function () {
		var compile = _.template(this.htmlString);
		this.model.content = compile(this.model);

		compile = _.template(this.super.htmlString);

		updatePreview(compile(this.model));
	}
});

var ImageView = ParamsView.extend({
	defaults: {
		src: ""
	},

	template: [
		{tag: "label", children: [
			{tag: "span", text: "Image URL:"},
			{tag: "input", id: "src"}
		]}
	]
});

var TextView = ParamsView.extend({
	defaults: {
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
	]
});
