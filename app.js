var express = require("express");
var app = express();
app.use(express.bodyParser());
app.use(express.static("public"));

var path = require("path");
app.set('views', path.resolve('./views'));
app.set('view engine', 'jade');
app.set('view options', {layout: false});

var redis = require("redis");
var client = redis.createClient();

var ff = require("ff");

function getUniqID (next) {
	ff(function () {
		client.incr("ID", this.slot());	
	}, function (id) {
		this.pass(id.toString(36));
	}).cb(next);
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
	});
});

app.post("/edit", function (req, res) {
	ff(function () {
		var id = req.body.id;

		client.get(id+":pass", this.slot());
	}, function (pass) {
		//password protected and mismatch
		if (pass && pass !== req.body.pass) {
			res.send(500);
			return this.fail();
		}

		client.set(req.body.id, req.body.html);
		res.send(200);
	});
});

app.get("/:id/edit", function (req, res) {
	ff(function () {
		client.get(req.params.id, this.slot());
	}, function (html) {
		res.render("edit", {content: html});
	});
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
	});
});

app.listen(8080);