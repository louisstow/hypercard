xtag.register('card', {
	lifecycle: {
		created: function () {
			console.log("CREATED")
		},

		inserted: function () {
			var el = this;
			var id = el.getAttribute("src");
			console.log("INSERTED", id)

			$.ajax({
				method: "GET",
				url: "/" + id + "?raw=1",
				dataType: "text",

				success: function (html) {
					console.log(html);
					el.innerHTML = html;
				}
			})
		}
	}
});