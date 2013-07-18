var ParamsView = Spineless.View.extend({
	events: {
		"click save-button": "save"
	},

	init: function () {
		this.defaults.bgcolor = "transparent";
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

		// if edit in the URL, change the POST destination
		// and create a Remix button
		if (window.location.href.indexOf("/edit") > 0) {
			this.url = "/edit";
			this.template.push({tag: "button", id: "remix-button", text: "Remix"})
		} else {
			this.url = "/create";
		}

		ParamsView(this, "init", arguments);
		this.template = oldTemplate;
	},

	save: function () {
		this.post(this.url, {
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
	},

	parse: function (root) {
		this.set("bgcolor", root.style.backgroundColor);
	}
});