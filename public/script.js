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
	}

	// if type is found, add to form
	if (form) {
		document.getElementById("form").appendChild(form.el)
	}
}

function updatePreview (html) {
	document.getElementById("preview-area").innerHTML = html;
}