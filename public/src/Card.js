//store HTML strings in the cache
//to avoid spamming the server
var CardCache = {};

xtag.register('card', {
	lifecycle: {
		inserted: function () {
			var el = this;
			var id = el.getAttribute("src");

			if (CardCache[id]) {
				el.innerHTML = CardCache[id];
				return;
			}

			$.ajax({
				method: "GET",
				url: "/" + id + "?raw=1",
				dataType: "text",

				success: function (html) {
					el.innerHTML = html;
					CardCache[id] = html;
				}
			})
		}
	}
});