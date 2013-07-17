var ParamsView = Spineless.View.extend({
	events: {
		"click save-button": "save"
	},

	init: function () {
		this.defaults.bgcolor = "#fff";
		this.defaults.password = "";
		
		var oldTemplate = this.template;
		this.template = [
			{tag: "label", children: [
				{tag: "span", text: "Background Color:"},
				{tag: "input", id: "bgcolor"}
			]},

			{tag: "label", children: [
				{tag: "span", text: "Password:"},
				{tag: "input", id: "password"}
			]},

			{tag: "div", className: "seperator"}
		].concat(this.template);
		
		this.template.push({tag: "button", id: "save-button", text: "Save"});
		ParamsView(this, "init", arguments);
		this.template = oldTemplate;
	},

	save: function () {
		this.post("/create", {
			html: this.compiled,
			pass: this.model.password
		});

		// creation complete
		this.once("sync:post", function (resp) {
			console.log("SAVED", resp);
		});
	},

	htmlString: "<div class='card {{type}}' style='background-color: {{bgcolor}};'>{{content}}</div>",

	render: function () {
		var compile = _.template(this.htmlString);
		this.model.content = compile(this.model);

		compile = _.template(this.super.htmlString);

		this.compiled = compile(this.model);
		updatePreview(this.compiled);
	}
});