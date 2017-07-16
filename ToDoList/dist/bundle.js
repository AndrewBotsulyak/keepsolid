(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _todoListItem = require('./todoListItem.js');

var _todoListItem2 = _interopRequireDefault(_todoListItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
Class represents TodoList.
@param {HTMLElement} todo - DOM Element container of ToDo App.

@property {HTMLElement} todo - DOM Element container of ToDo App.
@property {HTMLElement} input - text field for writing a new todo.
@property {HTMLElement} add - adding todo in list (<ul>).
@property {HTMLElement} ul - container of <li>.
@property {Array} arr - array with TodoListItems.
*/
var TodoList = function () {
	function TodoList(todo) {
		var _this = this;

		_classCallCheck(this, TodoList);

		this.todo = todo;
		this.input = this.todo.querySelector('.main-input');
		this.add = this.todo.querySelector('.add-item');
		this.ul = this.todo.querySelector('.todo-list');
		this.arr = [];

		this.add.addEventListener('click', function (event) {
			return _this.onAddItem(event);
		});
	}

	_createClass(TodoList, [{
		key: 'onAddItem',
		value: function onAddItem(event) {
			var _this2 = this;

			if (!this.isInputEmpty()) {
				var newItem = _todoListItem2.default.createDOMElement(); // create new HTMLElement -> li
				var newElem = this.ul.appendChild(newItem);

				var objItem = new _todoListItem2.default(newElem);

				// subscribe on TodoListItem event
				newElem.addEventListener('closeItem', function (event) {
					return _this2.onDeleteItem(objItem);
				});

				objItem.setValue(this.input.value);

				this.arr.push(objItem);
			}
		}
	}, {
		key: 'isInputEmpty',
		value: function isInputEmpty() {
			return this.input.value ? false : true;
		}

		/*
  @param {TodoListItem} obj - TodoListItem which will be delete from DOM.
  */

	}, {
		key: 'onDeleteItem',
		value: function onDeleteItem(obj) {

			this.ul.removeChild(obj.getItem());

			this.arr = this.arr.filter(function (el) {
				return el !== obj;
			});
		}
	}]);

	return TodoList;
}();

exports.default = TodoList;

},{"./todoListItem.js":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
Class represents TodoListItem.
@param {HTMLElement} item - DOM Element (<li>).

@property {HTMLElement} item - <li>.
@property {HTMLElement} parentElem - <ul>.
@property {HTMLElement} input - text field.
@property {HTMLElement} delete - delete <li>.
@property {HTMLElement} check - checkbox inside <li>.
@property {function} changeState - will call when li is deleted.
*/
var TodoListItem = function () {
	function TodoListItem(item) {
		var _this = this;

		_classCallCheck(this, TodoListItem);

		this.item = item;
		this.parentElem = this.item.parentNode;
		this.input = this.item.querySelector('.edit-input');
		this.delete = this.item.querySelector('.delete');
		this.check = this.item.querySelector('.check');

		// create Custom Event
		this.closeEvent = new CustomEvent('closeItem', { cancelable: true });

		this.check.addEventListener('click', function (event) {
			return _this.onClickCheckbox(event);
		});

		this.delete.addEventListener('click', function (event) {
			return _this.onDelete(event);
		});
	}

	_createClass(TodoListItem, [{
		key: 'onClickCheckbox',
		value: function onClickCheckbox(event) {

			if (this.isChecked()) {
				this.input.style.textDecoration = 'line-through';
				this.input.setAttribute('disabled', 'disabled');
			} else {
				this.input.style.textDecoration = 'none';
				this.input.removeAttribute('disabled');
			}
		}
	}, {
		key: 'isChecked',
		value: function isChecked() {
			return this.check.checked;
		}
	}, {
		key: 'onDelete',
		value: function onDelete(event) {
			this.item.dispatchEvent(this.closeEvent);
		}

		// return DOMElement 

	}, {
		key: 'getItem',
		value: function getItem() {
			return this.item;
		}
	}, {
		key: 'setValue',
		value: function setValue(text) {
			this.input.value = text;
		}
	}], [{
		key: 'createDOMElement',
		value: function createDOMElement() {
			var li = document.createElement('li');
			li.classList.add('todo-list--item');

			li.innerHTML = '\n\t\t\t<input type="checkbox" class=\'check\'/>\n\t\t\t<input type="text" class=\'edit-input\' />\n\t\t\t<div class="delete">\xD7</div>\n\t\t';

			return li;
		}
	}]);

	return TodoListItem;
}();

exports.default = TodoListItem;

},{}],3:[function(require,module,exports){
'use strict';

var _todoList = require('./js/todoList.js');

var _todoList2 = _interopRequireDefault(_todoList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var todo1 = new _todoList2.default(document.querySelector('.first'));
var todo2 = new _todoList2.default(document.querySelector('.second'));

},{"./js/todoList.js":1}]},{},[3]);
