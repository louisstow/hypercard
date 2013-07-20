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
		case "grid":
			form = new GridView();
			break;
		case "list":
			form = new ListView();
			break;
		case "stack":
			form = new StackView();
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

function showError (err) {
	$("strong.message").text(err.error);
	$("span.tip").text(err.tip);
	$(".error").show();
}

function hideError () {
	$(".error").hide();
}

$(function () {
	if (location.href.indexOf("/edit") > 0) {
		var root = document.getElementById("preview-area").childNodes[0];
		var type = root.className.split(" ")[1];
		var idMatch = location.pathname.match(/\/(.+)\/edit\/?/);

		$(".id").text("/" + idMatch[1]);
		chooseType(type);
		form.parse(root);
		$("#type").val(type);
	}
});