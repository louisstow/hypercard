var express = require("express");
var app = express();
app.use(express.bodyParser());
app.use(express.static("public"));

var path = require("path");
app.set('views', path.resolve('./views'));
app.set('view engine', 'jade');
app.set('view options', {layout: false});

var redis = require("redis-url");
var client = redis.connect(process.env.REDISTOGO_URL);

var ff = require("ff");

function getUniqID (next) {
	ff(function () {
		client.incr("_ID_", this.slot());	
	}, function (id) {
		this.pass(id.toString(36));
	}).cb(next);
}

function errorHandler (err) {
	console.error("FF Error", err);
	if (err.stack) console.error(err.stack);
}

app.get("/", function(req, res) {
	res.render("home");
});

app.post("/create", function (req, res) {
	ff(function () {
		getUniqID(this.slot());
	}, function (id) {
		client.set(id, req.body.html);
		if (req.body.pass) {
			client.set(id + ":pass", req.body.pass);
		}

		res.json({id: id});
	}).error(errorHandler);
});

app.post("/edit", function (req, res) {
	ff(function () {
		var id = req.body.id;
		if (!id || !id.trim() || isNaN(parseInt(id, 36))) {
			res.send(500);
			return this.fail();
		}

		client.get(id+":pass", this.slot());
	}, function (pass) {
		//password protected and mismatch
		if (pass && pass !== req.body.pass) {
			res.send(500);
			return this.fail();
		}

		client.set(req.body.id, req.body.html);
		res.send(200);
	}).error(errorHandler);
});

app.get("/:id/edit", function (req, res) {
	ff(function () {
		client.get(req.params.id, this.slot());
	}, function (html) {
		res.render("edit", {content: html});
	}).error(errorHandler);
});

app.get("/:id", function (req, res) {
	ff(function () {
		client.get(req.params.id, this.slot());
	}, function (html) {
		if (req.query.raw) {
			res.send(html);
		} else {
			res.render("frame", {content: html});
		}
	}).error(errorHandler);
});

app.listen(process.env.PORT || 8080);
