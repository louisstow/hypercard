//store HTML strings in the cache
//to avoid spamming the server
var CardCache = {};

function getCard (id, next) {
	if (CardCache[id]) {
		return next(CardCache[id]);
	}

	$.ajax({
		method: "GET",
		url: "/" + id + "?raw=1",
		dataType: "text",

		success: function (html) {
			CardCache[id] = html;
			next(html);
		}
	})
}

xtag.register('card', {
	lifecycle: {
		inserted: function () {
			var el = this;
			var id = el.getAttribute("src");

			getCard(id, function (html) {
				el.innerHTML = html;	
			});
		},

		attributeChanged: function (key, value) {
			var el = this;
			value = this.getAttribute("src");
			
			if (key === "src") {
				getCard(value, function (html) {
					console.log(el, html)
					el.innerHTML = html;	
				});
			}
		}
	}
});