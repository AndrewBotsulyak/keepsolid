(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// the whatwg-fetch polyfill installs the fetch() function
// on the global object (window or self)
//
// Return that as the export for use in Webpack, Browserify etc.
require('whatwg-fetch');
module.exports = self.fetch.bind(self);

},{"whatwg-fetch":2}],2:[function(require,module,exports){
(function(self) {
  'use strict';

  if (self.fetch) {
    return
  }

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob: 'FileReader' in self && 'Blob' in self && (function() {
      try {
        new Blob()
        return true
      } catch(e) {
        return false
      }
    })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  }

  if (support.arrayBuffer) {
    var viewClasses = [
      '[object Int8Array]',
      '[object Uint8Array]',
      '[object Uint8ClampedArray]',
      '[object Int16Array]',
      '[object Uint16Array]',
      '[object Int32Array]',
      '[object Uint32Array]',
      '[object Float32Array]',
      '[object Float64Array]'
    ]

    var isDataView = function(obj) {
      return obj && DataView.prototype.isPrototypeOf(obj)
    }

    var isArrayBufferView = ArrayBuffer.isView || function(obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
    }
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name)
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value)
    }
    return value
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function() {
        var value = items.shift()
        return {done: value === undefined, value: value}
      }
    }

    if (support.iterable) {
      iterator[Symbol.iterator] = function() {
        return iterator
      }
    }

    return iterator
  }

  function Headers(headers) {
    this.map = {}

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value)
      }, this)
    } else if (Array.isArray(headers)) {
      headers.forEach(function(header) {
        this.append(header[0], header[1])
      }, this)
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name])
      }, this)
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name)
    value = normalizeValue(value)
    var oldValue = this.map[name]
    this.map[name] = oldValue ? oldValue+','+value : value
  }

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)]
  }

  Headers.prototype.get = function(name) {
    name = normalizeName(name)
    return this.has(name) ? this.map[name] : null
  }

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  }

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = normalizeValue(value)
  }

  Headers.prototype.forEach = function(callback, thisArg) {
    for (var name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this)
      }
    }
  }

  Headers.prototype.keys = function() {
    var items = []
    this.forEach(function(value, name) { items.push(name) })
    return iteratorFor(items)
  }

  Headers.prototype.values = function() {
    var items = []
    this.forEach(function(value) { items.push(value) })
    return iteratorFor(items)
  }

  Headers.prototype.entries = function() {
    var items = []
    this.forEach(function(value, name) { items.push([name, value]) })
    return iteratorFor(items)
  }

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result)
      }
      reader.onerror = function() {
        reject(reader.error)
      }
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsArrayBuffer(blob)
    return promise
  }

  function readBlobAsText(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsText(blob)
    return promise
  }

  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf)
    var chars = new Array(view.length)

    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i])
    }
    return chars.join('')
  }

  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0)
    } else {
      var view = new Uint8Array(buf.byteLength)
      view.set(new Uint8Array(buf))
      return view.buffer
    }
  }

  function Body() {
    this.bodyUsed = false

    this._initBody = function(body) {
      this._bodyInit = body
      if (!body) {
        this._bodyText = ''
      } else if (typeof body === 'string') {
        this._bodyText = body
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString()
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer)
        // IE 10-11 can't handle a DataView body.
        this._bodyInit = new Blob([this._bodyArrayBuffer])
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body)
      } else {
        throw new Error('unsupported BodyInit type')
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8')
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type)
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
        }
      }
    }

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      }

      this.arrayBuffer = function() {
        if (this._bodyArrayBuffer) {
          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
        } else {
          return this.blob().then(readBlobAsArrayBuffer)
        }
      }
    }

    this.text = function() {
      var rejected = consumed(this)
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text')
      } else {
        return Promise.resolve(this._bodyText)
      }
    }

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      }
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    }

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

  function normalizeMethod(method) {
    var upcased = method.toUpperCase()
    return (methods.indexOf(upcased) > -1) ? upcased : method
  }

  function Request(input, options) {
    options = options || {}
    var body = options.body

    if (input instanceof Request) {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url
      this.credentials = input.credentials
      if (!options.headers) {
        this.headers = new Headers(input.headers)
      }
      this.method = input.method
      this.mode = input.mode
      if (!body && input._bodyInit != null) {
        body = input._bodyInit
        input.bodyUsed = true
      }
    } else {
      this.url = String(input)
    }

    this.credentials = options.credentials || this.credentials || 'omit'
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers)
    }
    this.method = normalizeMethod(options.method || this.method || 'GET')
    this.mode = options.mode || this.mode || null
    this.referrer = null

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body)
  }

  Request.prototype.clone = function() {
    return new Request(this, { body: this._bodyInit })
  }

  function decode(body) {
    var form = new FormData()
    body.trim().split('&').forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=')
        var name = split.shift().replace(/\+/g, ' ')
        var value = split.join('=').replace(/\+/g, ' ')
        form.append(decodeURIComponent(name), decodeURIComponent(value))
      }
    })
    return form
  }

  function parseHeaders(rawHeaders) {
    var headers = new Headers()
    rawHeaders.split(/\r?\n/).forEach(function(line) {
      var parts = line.split(':')
      var key = parts.shift().trim()
      if (key) {
        var value = parts.join(':').trim()
        headers.append(key, value)
      }
    })
    return headers
  }

  Body.call(Request.prototype)

  function Response(bodyInit, options) {
    if (!options) {
      options = {}
    }

    this.type = 'default'
    this.status = 'status' in options ? options.status : 200
    this.ok = this.status >= 200 && this.status < 300
    this.statusText = 'statusText' in options ? options.statusText : 'OK'
    this.headers = new Headers(options.headers)
    this.url = options.url || ''
    this._initBody(bodyInit)
  }

  Body.call(Response.prototype)

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  }

  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''})
    response.type = 'error'
    return response
  }

  var redirectStatuses = [301, 302, 303, 307, 308]

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  }

  self.Headers = Headers
  self.Request = Request
  self.Response = Response

  self.fetch = function(input, init) {
    return new Promise(function(resolve, reject) {
      var request = new Request(input, init)
      var xhr = new XMLHttpRequest()

      xhr.onload = function() {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        }
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
        var body = 'response' in xhr ? xhr.response : xhr.responseText
        resolve(new Response(body, options))
      }

      xhr.onerror = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.ontimeout = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.open(request.method, request.url, true)

      if (request.credentials === 'include') {
        xhr.withCredentials = true
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob'
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value)
      })

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
    })
  }
  self.fetch.polyfill = true
})(typeof self !== 'undefined' ? self : this);

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaultOptions = {
	onSelectItem: function onSelectItem(event) {
		//callback function, call on item select
		alert(this.input.value);
	},
	maxMatches: 5,
	sort: 'ASC'

	/*
 Class represents form with autocomplete option.
 @param {HTMLElement} form - DOM Element (form with input).
 @param {Array} arr - Array with information.
 @param {Object} options - obj with user settings.
 @property {HTMLElement} form - form.
 @property {HTMLElement} input - form's input.
 @property {HTMLElement} ul - form's ul with all matches.
 @property {HTMLElement} items - ul's items.
 @property {Array} copyArr - array for showing current result of search.
 @readonly
 @property {Array} mainArr - array with all information.
 */
};
var Autocomplete = function () {
	function Autocomplete(form, arr, options) {
		var _this = this;

		_classCallCheck(this, Autocomplete);

		this.form = form;
		this.input = form.querySelector('.search-input');
		this.ul = form.querySelector('.result');
		this.items = form.querySelectorAll('.item');
		this.mainArr = arr.slice();
		this.options = Object.assign({}, defaultOptions, options);

		this.onSelectItem = this.options.onSelectItem;

		this.sortData(this.options.sort);

		this.copyArr = this.mainArr.map(function (el) {
			return el;
		});
		this.mainArr = this.mainArr.map(function (el) {
			return '\n\t\t\t\t<li class="item" data-name=\'' + el + '\'>\n\t\t\t\t\t' + el + '\n\t\t\t\t</li>\n\t\t\t';
		});

		//    input
		this.input.addEventListener('keyup', function (event) {
			return _this.keyUPInput(event);
		});
		this.input.addEventListener('focusin', function (event) {
			return _this.displaySort(event);
		});

		// form
		this.form.addEventListener('click', function (event) {
			return _this.clickSearchForm(event);
		});
		this.form.addEventListener('keydown', function (event) {
			if (event.keyCode == 13 && _this.form.querySelector('.item.active')) event.preventDefault();
		});

		//document
		document.documentElement.addEventListener('click', function (event) {
			return _this.documClick(event);
		});
	}

	_createClass(Autocomplete, [{
		key: 'keyControl',
		value: function keyControl(event) {
			if (event.keyCode == 40 || event.keyCode == 38) {

				var elem = this.form.querySelector('.item.active');
				var prev = void 0,
				    next = void 0;

				if (!elem) {
					elem = this.form.querySelector('.item');
					elem.classList.toggle('active');
					return false;
				}

				prev = elem.previousElementSibling;
				next = elem.nextElementSibling;

				if (event.keyCode == 38) {
					if (prev) prev.classList.toggle('active');else return false;
				} else {
					if (next) next.classList.toggle('active');else return false;
				}
				elem.classList.toggle('active');
				return false;
			}
			if (event.keyCode == 13) {
				var _elem = this.form.querySelector('.item.active');
				if (_elem) {

					var event2 = Object.assign({}, event, { target: _elem });
					this.selectItem(_elem);
					this.onSelectItem(event2);
				}
			}
			return true;
		}
	}, {
		key: 'selectItem',
		value: function selectItem(elem) {
			this.input.value = elem.dataset.name;
		}
	}, {
		key: 'sortData',
		value: function sortData(key) {
			switch (key) {
				case 'ASC':
					this.mainArr.sort(function (a, b) {
						return a.toLowerCase().localeCompare(b.toLowerCase());
					});
					break;
				case 'DESC':
					this.mainArr.sort(function (a, b) {
						return -a.toLowerCase().localeCompare(b.toLowerCase());
					}); // reverse	
					break;
				default:
					break;
			}
		}
	}, {
		key: 'lostFocus',
		value: function lostFocus(event) {
			var forms = document.querySelectorAll('.search-form');
			forms.forEach(function (el) {
				return el.querySelector('.result').innerHTML = '';
			});
		}
	}, {
		key: 'keyUPInput',
		value: function keyUPInput(event) {
			if (this.keyControl(event)) this.displayResult(this.input.value);
		}
	}, {
		key: 'clickSearchForm',
		value: function clickSearchForm(event) {
			console.log(event);
			var elem = event.target;
			if (elem.classList.contains('item') && elem.dataset.name) {
				this.selectItem(elem);
				this.onSelectItem(event);
			}
		}
	}, {
		key: 'documClick',
		value: function documClick(event) {
			var elem = event.target;
			if (!elem.classList.contains('item') && !elem.classList.contains('search-input') && !elem.classList.contains('w-style')) this.ul.innerHTML = '';
		}
	}, {
		key: 'displaySort',
		value: function displaySort(event) {
			var forms = document.querySelectorAll('.search-form');
			forms.forEach(function (el) {
				return el.querySelector('.result').innerHTML = '';
			});

			if (this.input.value !== '') {
				this.displayResult(this.input.value);
				return;
			}

			this.renderItems(this.mainArr);
		}
	}, {
		key: 'renderItems',
		value: function renderItems(arr) {
			this.ul.innerHTML = arr.join('');
		}
	}, {
		key: 'displayResult',
		value: function displayResult(value) {
			var matches = this.findMatch(value, this.copyArr);
			var reg = new RegExp(value, 'gi');
			var count = 0,
			    arr = void 0;

			if (value === '') {
				this.displaySort();
				return;
			}
			if (matches.length == 0) {
				this.input.classList.add('nofind');
				this.ul.innerHTML = "<li class='item'>Нет совпадений</li>";
				return;
			} else {
				this.input.classList.remove('nofind');
			}

			arr = this.makeDOMList(matches, reg, value, count, this.options.maxMatches);

			this.renderItems(arr);
		}
	}, {
		key: 'makeDOMList',
		value: function makeDOMList(matchesArr, reg, value) {
			var count = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
			var max = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 5;

			return matchesArr.map(function (country) {
				if (count < max) count++;else return;

				var str = country.replace(reg, '<span class=\'w-style\'>' + value.toLowerCase() + '</span>');
				return '\n\t\t\t\t<li class="item" data-name=\'' + country + '\'>\n\t\t\t\t\t' + str + '\n\t\t\t\t</li>\n\t\t\t';
			});
		}
	}, {
		key: 'findMatch',
		value: function findMatch(search, arr) {
			search = search.toLowerCase();
			return arr.filter(function (item) {
				return item.toLowerCase().includes(search);
			});
		}
	}]);

	return Autocomplete;
}();

exports.default = Autocomplete;

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _autocomplete = require('./autocomplete.js');

var _autocomplete2 = _interopRequireDefault(_autocomplete);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultOptions = {
	onSelectItem: function onSelectItem(event) {
		console.log('add new chip, value: ', event.target.dataset.name);
	},
	repeat: false // bool, allows to click one or more(true) times on item .


	/*
 Class represents chips over Autocomplete class.
 @extends Autocomplete.
 @param {HTMLElement} form - DOM Element (form with input).
 @param {Array} arr - Array with information.
 @property {HTMLElement} chipsElem - container for all chips-item.
 @property {HTMLElement} chipsResult - string with all chips names.
 @property {Array} chipsArr - array with all chips names.
 */
};
var Chips = function (_Autocomplete) {
	_inherits(Chips, _Autocomplete);

	function Chips(form, arr, options) {
		_classCallCheck(this, Chips);

		var _this = _possibleConstructorReturn(this, (Chips.__proto__ || Object.getPrototypeOf(Chips)).call(this, form, arr, options));

		_this.chipsElem = _this.form.querySelector('.chips');
		_this.chipsResult = _this.form.querySelector('.chips-result');
		_this.chipsArr = [];
		_this.chipsArrElements = new Map();
		_this.options = Object.assign({}, defaultOptions, options);
		_this.onSelectItem = _this.options.onSelectItem; // option callback to select items    

		return _this;
	}

	_createClass(Chips, [{
		key: 'addChip',
		value: function addChip(name) {
			if (this.options.repeat || !this.chipsArr.includes(name)) {
				this.chipsArr.push(name);
				return true;
			}
			return false;
		}
	}, {
		key: 'removeChip',
		value: function removeChip(chip) {
			var name = chip.dataset.name;

			this.chipsArrElements.delete(chip); // delete current chip
			this.chipsArr = []; // reset array of strings with names
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = this.chipsArrElements.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var value = _step.value;

					this.chipsArr.push(value); // save current order for chipsResult															
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			chip.parentNode.removeChild(chip);

			this.displayChipResult(this.chipsArr);
		}
	}, {
		key: 'selectItem',
		value: function selectItem(elem) {
			//  default behaviour on select items.
			var name = elem.dataset.name;

			if (this.addChip(name)) {
				var newItem = this.chipTemplate(name); // return DOM Element
				this.chipsArrElements.set(newItem, name); // add element (Map())
				this.chipsElem.insertBefore(newItem, this.chipsElem.lastElementChild); // add in DOM
				this.displayChipResult(this.chipsArr);
			}
		}
	}, {
		key: 'displayChipResult',
		value: function displayChipResult(arr) {
			this.chipsResult.innerHTML = arr.join(', ');
		}
	}, {
		key: 'chipTemplate',
		value: function chipTemplate(name) {
			var item = document.createElement('li');
			item.className = 'chips-item';
			item.dataset.name = name;
			item.innerHTML = '\n\t\t\t<span class="chips-item--name">' + name + '</span>\n\t\t\t<div class="chips-item--close">\xD7</div>\n\t\t';
			return item;
		}
	}, {
		key: 'clickSearchForm',
		value: function clickSearchForm(event) {
			// override method
			var elem = event.target;

			if (event.target.classList.contains('chips-item--close')) {
				var chip = elem.parentNode;
				this.removeChip(chip);
			}
			_get(Chips.prototype.__proto__ || Object.getPrototypeOf(Chips.prototype), 'clickSearchForm', this).call(this, event);
		}
	}]);

	return Chips;
}(_autocomplete2.default);

exports.default = Chips;

},{"./autocomplete.js":3}],5:[function(require,module,exports){
'use strict';

var _chips = require('./js/chips.js');

var _chips2 = _interopRequireDefault(_chips);

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//let strJson = '{"BD": "Bangladesh", "BE": "Belgium", "BF": "Burkina Faso", "BG": "Bulgaria", "BA": "Bosnia and Herzegovina", "BB": "Barbados", "WF": "Wallis and Futuna", "BL": "Saint Barthelemy", "BM": "Bermuda", "BN": "Brunei", "BO": "Bolivia", "BH": "Bahrain", "BI": "Burundi", "BJ": "Benin", "BT": "Bhutan", "JM": "Jamaica", "BV": "Bouvet Island", "BW": "Botswana", "WS": "Samoa", "BQ": "Bonaire, Saint Eustatius and Saba ", "BR": "Brazil", "BS": "Bahamas", "JE": "Jersey", "BY": "Belarus", "BZ": "Belize", "RU": "Russia", "RW": "Rwanda", "RS": "Serbia", "TL": "East Timor", "RE": "Reunion", "TM": "Turkmenistan", "TJ": "Tajikistan", "RO": "Romania", "TK": "Tokelau", "GW": "Guinea-Bissau", "GU": "Guam", "GT": "Guatemala", "GS": "South Georgia and the South Sandwich Islands", "GR": "Greece", "GQ": "Equatorial Guinea", "GP": "Guadeloupe", "JP": "Japan", "GY": "Guyana", "GG": "Guernsey", "GF": "French Guiana", "GE": "Georgia", "GD": "Grenada", "GB": "United Kingdom", "GA": "Gabon", "SV": "El Salvador", "GN": "Guinea", "GM": "Gambia", "GL": "Greenland", "GI": "Gibraltar", "GH": "Ghana", "OM": "Oman", "TN": "Tunisia", "JO": "Jordan", "HR": "Croatia", "HT": "Haiti", "HU": "Hungary", "HK": "Hong Kong", "HN": "Honduras", "HM": "Heard Island and McDonald Islands", "VE": "Venezuela", "PR": "Puerto Rico", "PS": "Palestinian Territory", "PW": "Palau", "PT": "Portugal", "SJ": "Svalbard and Jan Mayen", "PY": "Paraguay", "IQ": "Iraq", "PA": "Panama", "PF": "French Polynesia", "PG": "Papua New Guinea", "PE": "Peru", "PK": "Pakistan", "PH": "Philippines", "PN": "Pitcairn", "PL": "Poland", "PM": "Saint Pierre and Miquelon", "ZM": "Zambia", "EH": "Western Sahara", "EE": "Estonia", "EG": "Egypt", "ZA": "South Africa", "EC": "Ecuador", "IT": "Italy", "VN": "Vietnam", "SB": "Solomon Islands", "ET": "Ethiopia", "SO": "Somalia", "ZW": "Zimbabwe", "SA": "Saudi Arabia", "ES": "Spain", "ER": "Eritrea", "ME": "Montenegro", "MD": "Moldova", "MG": "Madagascar", "MF": "Saint Martin", "MA": "Morocco", "MC": "Monaco", "UZ": "Uzbekistan", "MM": "Myanmar", "ML": "Mali", "MO": "Macao", "MN": "Mongolia", "MH": "Marshall Islands", "MK": "Macedonia", "MU": "Mauritius", "MT": "Malta", "MW": "Malawi", "MV": "Maldives", "MQ": "Martinique", "MP": "Northern Mariana Islands", "MS": "Montserrat", "MR": "Mauritania", "IM": "Isle of Man", "UG": "Uganda", "TZ": "Tanzania", "MY": "Malaysia", "MX": "Mexico", "IL": "Israel", "FR": "France", "IO": "British Indian Ocean Territory", "SH": "Saint Helena", "FI": "Finland", "FJ": "Fiji", "FK": "Falkland Islands", "FM": "Micronesia", "FO": "Faroe Islands", "NI": "Nicaragua", "NL": "Netherlands", "NO": "Norway", "NA": "Namibia", "VU": "Vanuatu", "NC": "New Caledonia", "NE": "Niger", "NF": "Norfolk Island", "NG": "Nigeria", "NZ": "New Zealand", "NP": "Nepal", "NR": "Nauru", "NU": "Niue", "CK": "Cook Islands", "XK": "Kosovo", "CI": "Ivory Coast", "CH": "Switzerland", "CO": "Colombia", "CN": "China", "CM": "Cameroon", "CL": "Chile", "CC": "Cocos Islands", "CA": "Canada", "CG": "Republic of the Congo", "CF": "Central African Republic", "CD": "Democratic Republic of the Congo", "CZ": "Czech Republic", "CY": "Cyprus", "CX": "Christmas Island", "CR": "Costa Rica", "CW": "Curacao", "CV": "Cape Verde", "CU": "Cuba", "SZ": "Swaziland", "SY": "Syria", "SX": "Sint Maarten", "KG": "Kyrgyzstan", "KE": "Kenya", "SS": "South Sudan", "SR": "Suriname", "KI": "Kiribati", "KH": "Cambodia", "KN": "Saint Kitts and Nevis", "KM": "Comoros", "ST": "Sao Tome and Principe", "SK": "Slovakia", "KR": "South Korea", "SI": "Slovenia", "KP": "North Korea", "KW": "Kuwait", "SN": "Senegal", "SM": "San Marino", "SL": "Sierra Leone", "SC": "Seychelles", "KZ": "Kazakhstan", "KY": "Cayman Islands", "SG": "Singapore", "SE": "Sweden", "SD": "Sudan", "DO": "Dominican Republic", "DM": "Dominica", "DJ": "Djibouti", "DK": "Denmark", "VG": "British Virgin Islands", "DE": "Germany", "YE": "Yemen", "DZ": "Algeria", "US": "United States", "UY": "Uruguay", "YT": "Mayotte", "UM": "United States Minor Outlying Islands", "LB": "Lebanon", "LC": "Saint Lucia", "LA": "Laos", "TV": "Tuvalu", "TW": "Taiwan", "TT": "Trinidad and Tobago", "TR": "Turkey", "LK": "Sri Lanka", "LI": "Liechtenstein", "LV": "Latvia", "TO": "Tonga", "LT": "Lithuania", "LU": "Luxembourg", "LR": "Liberia", "LS": "Lesotho", "TH": "Thailand", "TF": "French Southern Territories", "TG": "Togo", "TD": "Chad", "TC": "Turks and Caicos Islands", "LY": "Libya", "VA": "Vatican", "VC": "Saint Vincent and the Grenadines", "AE": "United Arab Emirates", "AD": "Andorra", "AG": "Antigua and Barbuda", "AF": "Afghanistan", "AI": "Anguilla", "VI": "U.S. Virgin Islands", "IS": "Iceland", "IR": "Iran", "AM": "Armenia", "AL": "Albania", "AO": "Angola", "AQ": "Antarctica", "AS": "American Samoa", "AR": "Argentina", "AU": "Australia", "AT": "Austria", "AW": "Aruba", "IN": "India", "AX": "Aland Islands", "AZ": "Azerbaijan", "IE": "Ireland", "ID": "Indonesia", "UA": "Ukraine", "QA": "Qatar", "MZ": "Mozambique"}';
//const countries = JSON.parse(strJson);

var arrCountries = [];

var form1 = document.querySelector('.country1');
var form2 = document.querySelector('.country2');

var obj1 = void 0,
    obj2 = void 0;

(0, _isomorphicFetch2.default)('https://crossorigin.me/http://country.io/names.json').then(function (response) {
	return response.json();
}).then(function (data) {

	for (var prop in data) {
		arrCountries.push(data[prop]);
	}
	return arrCountries;
}).then(function (arr) {

	obj1 = new _chips2.default(form1, arr, { repeat: true });
	obj2 = new _chips2.default(form2, arr);
}).catch(function (error) {
	return console.log('"country request". ' + error.message);
});

},{"./js/chips.js":4,"isomorphic-fetch":1}]},{},[5]);
