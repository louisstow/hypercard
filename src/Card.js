xtag.register('card', {
	lifecycle: {
		created: function () {
			console.log("CREATED")
		},

		inserted: function () {
			console.log("INSERTED", this.id)
		}
	}
});