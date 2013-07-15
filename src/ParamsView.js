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
		this.template.shift();
	},

	htmlString: "<div class='card {{type}}' style='background-color: {{bgcolor}};'>{{content}}</div>",

	render: function () {
		console.log("RENDER")
		var compile = _.template(this.htmlString);
		this.model.content = compile(this.model);

		compile = _.template(this.super.htmlString);

		updatePreview(compile(this.model));
	}
});