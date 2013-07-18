//create a global event proxy
var GlobalEvent = new Spineless.Event();
document.body.addEventListener("click", function (e) {
	GlobalEvent.emit(e.target.className, e);
}, false);

//stack left
GlobalEvent.on("prev", function (e) {
	console.log("PREV", e)

	var stack = Stack.get($(e.target).parent().parent());
	stack.prev();
});

GlobalEvent.on("next", function (e) {
	console.log("NEXT", e)

	var stack = Stack.get($(e.target).parent().parent());
	stack.next();
});

//Stack definition
function Stack (elem) {
	this.elem = elem;
	this.children = $(this.elem).children("card");
	this.length = this.children.length;

	this.index = 0;
}

//Stack methods
Stack.prototype = {
	next: function () {
		this.go(this.index + 1);
	},

	prev: function () {
		this.go(this.index - 1);
	},

	go: function (index) {
		var lastIndex = this.index;
		this.index = index % this.length;
		if (this.index < 0) { this.index = this.length + this.index; }

		$(this.children[lastIndex]).removeClass("visible");
		$(this.children[this.index]).addClass("visible");
	}
}

//Stack Class vars
Stack.id = 0;
Stack.table = {};
Stack.get = function (stackElem) {
	var id = stackElem.data("id");
	if (!id) {
		console.log(stackElem)
		stackElem.data("id", id = "s" + Stack.id++);
		Stack.table[id] = new Stack(stackElem);
	}

	return Stack.table[id];
}