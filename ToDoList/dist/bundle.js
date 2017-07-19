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

		this.btnAddTodo.addEventListener('click', function (event) {
			return _this.onBuild(event);
		});
	}

	_createClass(TodoBuilder, [{
		key: 'onBuild',
		value: function onBuild(event) {
			this.createTodo();
		}

		/**
   * @return {TodoList} just created.
   */

	}, {
		key: 'createTodo',
		value: function createTodo() {
			var todo = new _todoList2.default();
			var todoElem = todo.createElement();
			todoElem = this.renderTodo(todoElem);
			todo.init(todoElem); // initialize 
			this.todosArr.push(todo);
			return todo;
		}

		/**
   * @param  {HTMLElement} todoElem - TodoLIst.
   * @return {HTMLElement} elem in DOM.
   */

	}, {
		key: 'renderTodo',
		value: function renderTodo(todoElem) {
			return this.containerElem.appendChild(todoElem);
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
		_classCallCheck(this, TodoList);
	}

	_createClass(TodoList, [{
		key: 'init',
		value: function init(todo) {
			var _this = this;

			this.todoElem = todo;
			this.input = this.todoElem.querySelector('.main-input');
			this.add = this.todoElem.querySelector('.add-item');
			this.ul = this.todoElem.querySelector('.todo-list');
			this.clearList = this.todoElem.querySelector('.clearAll');
			this.arrItems = [];

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
	}, {
		key: 'onAddItem',
		value: function onAddItem(event) {
			event.preventDefault();
			if (!this.isInputEmpty()) {
				var objItem = new _todoListItem2.default();

				var newElem = objItem.createElement();

				objItem.init(this.ul.appendChild(newElem));

				objItem.setValue(this.input.textContent);

				this.arrItems.push(objItem);
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

			var elem = event.target;

			this.ul.removeChild(elem);

			this.arrItems = this.arrItems.filter(function (el) {
				return el.getItem() !== elem;
			});
		}

		// clear list of items

	}, {
		key: 'clearAll',
		value: function clearAll(event) {
			this.ul.innerHTML = '';
			this.arrItems = [];
		}
	}, {
		key: 'createElement',
		value: function createElement() {
			var div = document.createElement('div');
			div.classList.add('todo');
			div.innerHTML = '\n\t\t\t<form action="" class="todo-form">\n\t\t\t\t<div class=\'main-input\' contenteditable="true" ></div>\n\t\t\t\t<input type="submit" class="add-item btn" value="Add" />\n\t\t\t\t<div class="clearAll btn">Clear</div>\n\t\t\t</form>\n\t\t\t<ul class="todo-list">\n\n\t\t\t</ul>\n\t\t';

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
		_classCallCheck(this, TodoListItem);
	}

	_createClass(TodoListItem, [{
		key: 'init',
		value: function init(item) {
			var _this = this;

			this.itemElem = item;
			this.input = this.itemElem.querySelector('.edit-input');
			this.delete = this.itemElem.querySelector('.delete');
			this.check = this.itemElem.querySelector('.check');
			this.editElem = this.itemElem.querySelector('.edit');

			// create Custom Event
			this.closeEvent = new CustomEvent('closeItem', { bubbles: true, cancelable: true });

			this.editElem.addEventListener('click', function (event) {
				return _this.onEdit(event);
			});

			this.check.addEventListener('click', function (event) {
				return _this.onClickCheckbox(event);
			});

			this.delete.addEventListener('click', function (event) {
				return _this.onDelete(event);
			});
		}
	}, {
		key: 'onClickCheckbox',
		value: function onClickCheckbox(event) {
			if (this.isEditable()) this.toggleEdit();
			if (this.isChecked()) {
				this.input.style.textDecoration = 'line-through';
				this.setEditable(false);
			} else {
				this.input.style.textDecoration = 'none';
			}
		}
	}, {
		key: 'isChecked',
		value: function isChecked() {
			return this.check.checked;
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
			this.itemElem.dispatchEvent(this.closeEvent);
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
		value: function setValue(text) {
			this.input.textContent = text;
		}
	}, {
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
var todos = build.createTodos(2);

/***/ })
/******/ ]);