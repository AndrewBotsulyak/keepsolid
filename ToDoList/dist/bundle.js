/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _todoList = __webpack_require__(4);

var _todoList2 = _interopRequireDefault(_todoList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * class create all TodoLists
 * @param {HTMLElement} container - DOMElement container of TodoLists.
 *
 * @property {HTMLElement} containerElem - DOMElement container of TodoLists.
 * @property {Array} todosArr - array with all TodoLists.
 * @property {HTMLElement} btnAddTodo - btn which is added new TodoList.
 */
var TodoBuilder = function () {
	function TodoBuilder(container) {
		var _this = this;

		_classCallCheck(this, TodoBuilder);

		this.containerElem = container;
		this.todosArr = [];
		this.btnAddTodo = document.querySelector('.build-todo');

		this.state = {
			todosArr: []
		};

		this.btnAddTodo.addEventListener('click', function (event) {
			return _this.onBuild(event);
		});

		this.containerElem.addEventListener('TodoList.remove', function (event) {
			return _this.removeTodo(event);
		});

		this.containerElem.addEventListener('todostatechange', function (event) {
			return _this.updateStorage();
		});
	}

	_createClass(TodoBuilder, [{
		key: 'updateStorage',
		value: function updateStorage() {
			var _this2 = this;

			debugger;
			this.state.todosArr.forEach(function (todo, index) {
				todo.arrItems = _this2.todosArr[index].arrItems.map(function (el) {
					return el.state;
				});
				todo.title = _this2.todosArr[index].state.title;
			});

			localStorage.setItem('todos', JSON.stringify(this.state));
		}
	}, {
		key: 'onBuild',
		value: function onBuild(event) {
			this.createTodo();
		}
	}, {
		key: 'removeTodo',
		value: function removeTodo(event) {
			var elem = event.detail.item;
			var index = this.todosArr.findIndex(function (el) {
				return el === elem;
			});
			this.todosArr = this.todosArr.filter(function (el) {
				return el !== elem;
			});
			this.state.todosArr = this.state.todosArr.filter(function (el, i) {
				return i !== index;
			});
			if (this.todosArr.length === 0) {
				localStorage.removeItem('todos');
			} else {
				localStorage.setItem('todos', JSON.stringify(this.state));
			}
		}

		/**
   * @return {TodoList} just created.
   */

	}, {
		key: 'createTodo',
		value: function createTodo() {
			var todoElem = this.containerElem.appendChild(_todoList2.default.createElement());
			var todo = new _todoList2.default(todoElem);
			todo.createFromStorage();
			this.todosArr.push(todo);

			this.state.todosArr.push(todo.state);
			localStorage.setItem('todos', JSON.stringify(this.state));

			return todo;
		}
	}, {
		key: 'createTodoFromStorage',
		value: function createTodoFromStorage() {
			var _this3 = this;

			var state = JSON.parse(localStorage.getItem('todos'));
			this.state = state;

			this.state.todosArr.forEach(function (el) {
				var todoElem = _this3.containerElem.appendChild(_todoList2.default.createElement());
				var todo = new _todoList2.default(todoElem, el.title, el.arrItems);
				todo.createFromStorage();
				_this3.todosArr.push(todo);
			});
		}
	}, {
		key: 'hasLocalStorage',
		value: function hasLocalStorage() {
			return localStorage.getItem('todos') ? true : false;
		}

		/**
   * @param  {Number} count - quantity of new TodoLists.
   * @return {Array} array of elements which has just been added in DOM.
   */

	}, {
		key: 'createTodos',
		value: function createTodos(count) {
			var arr = [];
			for (var i = 0; i < count; i++) {
				arr.push(this.createTodo());
			}
			return arr;
		}
	}]);

	return TodoBuilder;
}();

exports.default = TodoBuilder;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _todoListItem = __webpack_require__(5);

var _todoListItem2 = _interopRequireDefault(_todoListItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class represents TodoList.
 * @param {HTMLElement} todo - DOMElement wrap of ToDo.
 *
 * @property {HTMLElement} todoElem - DOM Element container of ToDo App.
 * @property {HTMLElement} input - text field for creating new todo.
 * @property {HTMLElement} add - adding todo in list (<ul>).
 * @property {HTMLElement} ul - container of TodoListItems (<li>).
 * @property {Array} arrItems - array with TodoListItems. 
 */
var TodoList = function () {
	function TodoList() {
		var todo = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

		var _this = this;

		var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
		var arrItems = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

		_classCallCheck(this, TodoList);

		this.todoElem = todo;
		this.input = this.todoElem.querySelector('.main-input');
		this.add = this.todoElem.querySelector('.add-item');
		this.ul = this.todoElem.querySelector('.todo-list');
		this.clearList = this.todoElem.querySelector('.clearAll');
		this.titleElem = this.todoElem.querySelector('.title');
		this.deleteTodo = this.todoElem.querySelector('.delete-todo');

		this.titleElem.textContent = title;
		this.title = title;
		this.arrItems = [];

		this.parent = function () {
			var build = _this.todoElem.parentElement;
			while (!build.classList.contains('todo-container')) {
				build = build.parentElement;
			}
			return build;
		}();

		this.state = {
			title: title,
			arrItems: arrItems
		};

		this.deleteTodo.addEventListener('click', function (event) {
			return _this.onRemove(event);
		});

		this.titleElem.addEventListener('keyup', function (event) {
			return _this.onType(event);
		});

		//	subscribe on TodoListItem's 'closeItem' event
		this.ul.addEventListener('closeItem', function (event) {
			return _this.onDeleteItem(event);
		});

		this.todoElem.addEventListener('submit', function (event) {
			return _this.onAddItem(event);
		});

		this.clearList.addEventListener('click', function (event) {
			return _this.clearAll(event);
		});
	}

	_createClass(TodoList, [{
		key: 'setState',
		value: function setState(newState) {
			this.state = Object.assign({}, this.state, newState);
			this.dispStateChangeEvent();
		}
	}, {
		key: 'onRemove',
		value: function onRemove(event) {
			var closeEvent = new CustomEvent('TodoList.remove', {
				bubbles: true,
				cancelable: true,
				detail: {
					item: this
				}
			});
			this.todoElem.dispatchEvent(closeEvent);
			this.parent.removeChild(this.todoElem);
		}
	}, {
		key: 'onType',
		value: function onType(event) {
			this.title = this.titleElem.textContent;
			this.setState({ title: this.title });
		}
	}, {
		key: 'dispStateChangeEvent',
		value: function dispStateChangeEvent() {
			var stateEvent = new CustomEvent('todostatechange', {
				bubbles: true,
				detail: {
					item: this,
					state: this.state
				}
			});
			this.todoElem.dispatchEvent(stateEvent);
		}
	}, {
		key: 'createFromStorage',
		value: function createFromStorage() {
			var _this2 = this;

			this.state.arrItems.forEach(function (el) {
				var newElem = _this2.ul.appendChild(_todoListItem2.default.createElement());
				var objItem = new _todoListItem2.default(newElem, el.checked, el.content);
				_this2.arrItems.push(objItem);
			});
		}
	}, {
		key: 'onAddItem',
		value: function onAddItem(event) {
			event.preventDefault();
			if (!this.isInputEmpty()) {
				debugger;
				var newElem = this.ul.appendChild(_todoListItem2.default.createElement());
				var objItem = new _todoListItem2.default(newElem, null, this.input.textContent);
				this.arrItems.push(objItem);
				this.setState({ arrItems: this.arrItems.map(function (el) {
						return el.state;
					}) });
			}
		}
	}, {
		key: 'isInputEmpty',
		value: function isInputEmpty() {
			return this.input.textContent ? false : true;
		}

		/**
   * @param {Object} obj - obj with styles  
   */

	}, {
		key: 'setStyle',
		value: function setStyle(obj) {
			for (var prop in obj) {
				this.todoElem.style[prop] = obj[prop];
			}
		}
	}, {
		key: 'onDeleteItem',
		value: function onDeleteItem(event) {
			var elem = event.detail.item;
			this.arrItems = this.arrItems.filter(function (el) {
				return el !== elem;
			});

			this.setState({ arrItems: this.arrItems.map(function (el) {
					return el.state;
				}) });
		}

		// clear list of items

	}, {
		key: 'clearAll',
		value: function clearAll(event) {
			if (this.arrItems.length !== 0) {
				this.arrItems.forEach(function (elem) {
					return elem.remove();
				});
				this.arrItems = [];

				this.setState({ arrItems: [] });
			}
		}
	}], [{
		key: 'createElement',
		value: function createElement() {
			var div = document.createElement('div');
			div.classList.add('todo');
			div.innerHTML = '\n\t\t\t<form action="" class="todo-form">\n\t\t\t\t<div class="delete-todo">\xD7</div>\n\t\t\t\t<div class=\'title\' contenteditable="true"></div>\n\t\t\t\t<div class=\'main-input\' contenteditable="true" ></div>\n\t\t\t\t<input type="submit" class="add-item btn" value="Add" />\n\t\t\t\t<div class="clearAll btn">Clear</div>\n\t\t\t</form>\n\t\t\t<ul class="todo-list">\n\t\t\t</ul>\n\t\t';

			return div;
		}
	}]);

	return TodoList;
}();

exports.default = TodoList;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class represents TodoListItem.
 * @param {HTMLElement} item - DOM Element (<li>).
 * 
 * @property {HTMLElement} item - <li>.
 * @property {HTMLElement} delete - delete <li>.
 * @property {HTMLElement} check - checkbox inside <li>.
 * @property {HTMLElement} editElem -  btn for edit input
 */
var TodoListItem = function () {
	function TodoListItem() {
		var item = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

		var _this = this;

		var checked = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
		var content = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

		_classCallCheck(this, TodoListItem);

		this.itemElem = item;
		this.input = this.itemElem.querySelector('.edit-input');
		this.delete = this.itemElem.querySelector('.delete');
		this.check = this.itemElem.querySelector('.check');
		this.editElem = this.itemElem.querySelector('.edit');

		this.parent = function () {
			var todo = _this.itemElem.parentElement;
			while (!todo.classList.contains('todo-list')) {
				todo = todo.parentElement;
			}
			return todo;
		}();

		this.state = {
			checked: checked,
			content: content
		};

		this.setValue(content);
		this.setChecked(checked);

		// create Custom Event

		this.input.addEventListener('keyup', function (event) {
			return _this.onType(event);
		});

		this.editElem.addEventListener('click', function (event) {
			return _this.onEdit(event);
		});

		this.check.addEventListener('click', function (event) {
			return _this.ClickCheckbox(event);
		});

		this.delete.addEventListener('click', function (event) {
			return _this.onDelete(event);
		});
	}

	_createClass(TodoListItem, [{
		key: 'onType',
		value: function onType(event) {
			this.setState({ content: this.input.textContent });
		}
	}, {
		key: 'dispStateChangeEvent',
		value: function dispStateChangeEvent() {
			var stateEvent = new CustomEvent('todostatechange', {
				bubbles: true,
				detail: {
					item: this,
					state: this.state
				}
			});
			this.itemElem.dispatchEvent(stateEvent);
		}
	}, {
		key: 'createFromStorage',
		value: function createFromStorage() {
			this.setValue(content);
			this.check.checked = this.state.checked;
		}
	}, {
		key: 'setState',
		value: function setState(newState) {
			this.state = Object.assign({}, this.state, newState);
			this.dispStateChangeEvent();
		}
	}, {
		key: 'ClickCheckbox',
		value: function ClickCheckbox(event) {
			if (this.isEditable()) this.toggleEdit();
			if (this.isChecked()) {
				this.input.style.textDecoration = 'line-through';
				this.setEditable(false);
			} else {
				this.input.style.textDecoration = 'none';
			}

			this.setState({ checked: this.isChecked() });
		}
	}, {
		key: 'isChecked',
		value: function isChecked() {
			return this.check.checked;
		}
	}, {
		key: 'setChecked',
		value: function setChecked(bool) {
			this.check.checked = bool;
			if (bool) {
				this.input.style.textDecoration = 'line-through';
				this.setEditable(false);
			} else {
				this.input.style.textDecoration = 'none';
			}
		}
	}, {
		key: 'setEditable',
		value: function setEditable(bool) {
			if (bool) {
				this.input.contentEditable = 'true';
			} else {
				this.input.contentEditable = 'false';
			}
		}
	}, {
		key: 'isEditable',
		value: function isEditable() {
			return this.input.contentEditable === 'true';
		}
	}, {
		key: 'toggleEdit',
		value: function toggleEdit() {
			if (!this.isEditable()) {
				this.setEditable(true);
				this.input.style.outline = 'auto 5px rgb(77, 144, 254)';
			} else {
				this.setEditable(false);
				this.input.style.outline = 'none';
			}
		}

		// click on 'this.editElem' callback

	}, {
		key: 'onEdit',
		value: function onEdit(event) {
			if (this.isChecked()) return;

			this.toggleEdit();
		}

		// click on 'this.delete' callback, dispatch 'closeItem' event.

	}, {
		key: 'onDelete',
		value: function onDelete(event) {
			var closeEvent = new CustomEvent('closeItem', {
				bubbles: true,
				cancelable: true,
				detail: {
					item: this
				}
			});
			this.itemElem.dispatchEvent(closeEvent);
			this.remove();
		}
	}, {
		key: 'remove',
		value: function remove() {
			this.parent.removeChild(this.itemElem);
			return this;
		}
	}, {
		key: 'getItem',
		value: function getItem() {
			return this.itemElem;
		}

		/**
   * @param {Object} obj - obj with styles  
   */

	}, {
		key: 'setStyle',
		value: function setStyle(obj) {
			for (var prop in obj) {
				this.itemElem.style[prop] = obj[prop];
			}
		}

		/**
   * @param {string} text - input value.
   */

	}, {
		key: 'setValue',
		value: function setValue() {
			var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

			this.input.textContent = text;
		}
	}], [{
		key: 'createElement',
		value: function createElement() {
			var li = document.createElement('li');
			li.classList.add('todo-list--item');

			li.innerHTML = '\n\t\t\t<input type="checkbox" class=\'check\' />\n\t\t\t<div class="edit-input" contenteditable="false" ></div>\n\t\t\t<div class="edit"></div>\n\t\t\t<div class="delete">\xD7</div>\n\t\t';

			return li;
		}
	}]);

	return TodoListItem;
}();

exports.default = TodoListItem;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(3);

__webpack_require__(2);

__webpack_require__(1);

var _todoBuilder = __webpack_require__(0);

var _todoBuilder2 = _interopRequireDefault(_todoBuilder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var container = document.querySelector('.todo-container');

var build = new _todoBuilder2.default(container);
if (build.hasLocalStorage()) {
   build.createTodoFromStorage();
} else {
   build.createTodo();
}

/***/ })
/******/ ]);