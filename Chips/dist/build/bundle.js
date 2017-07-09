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

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _autocomplete = __webpack_require__(5);

var _autocomplete2 = _interopRequireDefault(_autocomplete);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
Class represents chips over Autocomplete class.
@extends Autocomplete.
@param {HTMLElement} form - DOM Element (form with input).
@param {Array} arr - Array with information.
@property {HTMLElement} chipsElem - container for all chips-item.
@property {HTMLElement} chipsResult - string with all chips names.
@property {Array} chipsArr - array with all chips names.
*/
var Chips = function (_Autocomplete) {
	_inherits(Chips, _Autocomplete);

	function Chips(form, arr) {
		_classCallCheck(this, Chips);

		var _this = _possibleConstructorReturn(this, (Chips.__proto__ || Object.getPrototypeOf(Chips)).call(this, form, arr));

		_this.chipsElem = _this.form.querySelector('.chips');
		_this.chipsResult = _this.form.querySelector('.chips-result');
		_this.chipsArr = [];

		return _this;
	}

	_createClass(Chips, [{
		key: 'addChip',
		value: function addChip(name) {
			if (!this.chipsArr.includes(name)) {
				this.chipsArr.push(name);
				return true;
			}
			return false;
		}
	}, {
		key: 'removeChip',
		value: function removeChip(chip) {
			var name = chip.dataset.name;

			this.chipsArr = this.chipsArr.filter(function (item) {
				return item != name;
			});

			chip.parentNode.removeChild(chip);

			this.displayChipResult(this.chipsArr);
		}
	}, {
		key: 'displayItem',
		value: function displayItem(elem) {
			// override method
			var name = elem.dataset.name;

			if (this.addChip(name)) {
				var newItem = this.chipTemplate(name); // return DOM Element
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
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
Class represents form with autocomplete option.
@param {HTMLElement} form - DOM Element (form with input).
@param {Array} arr - Array with information.
@property {HTMLElement} form - form.
@property {HTMLElement} input - form's input.
@property {HTMLElement} ul - form's ul with all matches.
@property {HTMLElement} items - ul's items.
@property {Array} copyArr - array for showing current result of search.
@readonly
@property {Array} mainArr - array with all information.
*/
var Autocomplete = function () {
	function Autocomplete(form, arr) {
		var _this = this;

		_classCallCheck(this, Autocomplete);

		this.form = form;
		this.input = form.querySelector('.search-input');
		this.ul = form.querySelector('.result');
		this.items = form.querySelectorAll('.item');
		this.copyArr = arr.slice();
		this.mainArr = arr.slice();
		this.copyArr.sort(function (a, b) {
			return a.toLowerCase().localeCompare(b.toLowerCase());
		});
		this.mainArr.sort(function (a, b) {
			return a.toLowerCase().localeCompare(b.toLowerCase());
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
					this.displayItem(_elem);
				}
			}
			return true;
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
			var elem = event.target;
			if (elem.classList.contains('item')) {
				this.displayItem(elem);
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
		key: 'displayItem',
		value: function displayItem(elem) {
			var _this2 = this;

			this.input.value = elem.dataset.name;
			this.ul.innerHTML = '';
			setTimeout(function () {
				return alert(_this2.input.value);
			}, 10);
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
			var max = 5,
			    count = 0;
			var arr = void 0;
			if (value === '') {
				this.displaySort();
				max = matches.length;
				return;
			}
			if (matches.length == 0) {
				this.input.classList.add('nofind');
				this.ul.innerHTML = "<li class='item'>Нет совпадений</li>";
				return;
			} else {
				this.input.classList.remove('nofind');
			}

			arr = this.makeDOMList(matches, reg, value);

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

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(2);

__webpack_require__(1);

__webpack_require__(4);

__webpack_require__(3);

var _chips = __webpack_require__(0);

var _chips2 = _interopRequireDefault(_chips);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var arrCountries = []; //let strJson = '{"BD": "Bangladesh", "BE": "Belgium", "BF": "Burkina Faso", "BG": "Bulgaria", "BA": "Bosnia and Herzegovina", "BB": "Barbados", "WF": "Wallis and Futuna", "BL": "Saint Barthelemy", "BM": "Bermuda", "BN": "Brunei", "BO": "Bolivia", "BH": "Bahrain", "BI": "Burundi", "BJ": "Benin", "BT": "Bhutan", "JM": "Jamaica", "BV": "Bouvet Island", "BW": "Botswana", "WS": "Samoa", "BQ": "Bonaire, Saint Eustatius and Saba ", "BR": "Brazil", "BS": "Bahamas", "JE": "Jersey", "BY": "Belarus", "BZ": "Belize", "RU": "Russia", "RW": "Rwanda", "RS": "Serbia", "TL": "East Timor", "RE": "Reunion", "TM": "Turkmenistan", "TJ": "Tajikistan", "RO": "Romania", "TK": "Tokelau", "GW": "Guinea-Bissau", "GU": "Guam", "GT": "Guatemala", "GS": "South Georgia and the South Sandwich Islands", "GR": "Greece", "GQ": "Equatorial Guinea", "GP": "Guadeloupe", "JP": "Japan", "GY": "Guyana", "GG": "Guernsey", "GF": "French Guiana", "GE": "Georgia", "GD": "Grenada", "GB": "United Kingdom", "GA": "Gabon", "SV": "El Salvador", "GN": "Guinea", "GM": "Gambia", "GL": "Greenland", "GI": "Gibraltar", "GH": "Ghana", "OM": "Oman", "TN": "Tunisia", "JO": "Jordan", "HR": "Croatia", "HT": "Haiti", "HU": "Hungary", "HK": "Hong Kong", "HN": "Honduras", "HM": "Heard Island and McDonald Islands", "VE": "Venezuela", "PR": "Puerto Rico", "PS": "Palestinian Territory", "PW": "Palau", "PT": "Portugal", "SJ": "Svalbard and Jan Mayen", "PY": "Paraguay", "IQ": "Iraq", "PA": "Panama", "PF": "French Polynesia", "PG": "Papua New Guinea", "PE": "Peru", "PK": "Pakistan", "PH": "Philippines", "PN": "Pitcairn", "PL": "Poland", "PM": "Saint Pierre and Miquelon", "ZM": "Zambia", "EH": "Western Sahara", "EE": "Estonia", "EG": "Egypt", "ZA": "South Africa", "EC": "Ecuador", "IT": "Italy", "VN": "Vietnam", "SB": "Solomon Islands", "ET": "Ethiopia", "SO": "Somalia", "ZW": "Zimbabwe", "SA": "Saudi Arabia", "ES": "Spain", "ER": "Eritrea", "ME": "Montenegro", "MD": "Moldova", "MG": "Madagascar", "MF": "Saint Martin", "MA": "Morocco", "MC": "Monaco", "UZ": "Uzbekistan", "MM": "Myanmar", "ML": "Mali", "MO": "Macao", "MN": "Mongolia", "MH": "Marshall Islands", "MK": "Macedonia", "MU": "Mauritius", "MT": "Malta", "MW": "Malawi", "MV": "Maldives", "MQ": "Martinique", "MP": "Northern Mariana Islands", "MS": "Montserrat", "MR": "Mauritania", "IM": "Isle of Man", "UG": "Uganda", "TZ": "Tanzania", "MY": "Malaysia", "MX": "Mexico", "IL": "Israel", "FR": "France", "IO": "British Indian Ocean Territory", "SH": "Saint Helena", "FI": "Finland", "FJ": "Fiji", "FK": "Falkland Islands", "FM": "Micronesia", "FO": "Faroe Islands", "NI": "Nicaragua", "NL": "Netherlands", "NO": "Norway", "NA": "Namibia", "VU": "Vanuatu", "NC": "New Caledonia", "NE": "Niger", "NF": "Norfolk Island", "NG": "Nigeria", "NZ": "New Zealand", "NP": "Nepal", "NR": "Nauru", "NU": "Niue", "CK": "Cook Islands", "XK": "Kosovo", "CI": "Ivory Coast", "CH": "Switzerland", "CO": "Colombia", "CN": "China", "CM": "Cameroon", "CL": "Chile", "CC": "Cocos Islands", "CA": "Canada", "CG": "Republic of the Congo", "CF": "Central African Republic", "CD": "Democratic Republic of the Congo", "CZ": "Czech Republic", "CY": "Cyprus", "CX": "Christmas Island", "CR": "Costa Rica", "CW": "Curacao", "CV": "Cape Verde", "CU": "Cuba", "SZ": "Swaziland", "SY": "Syria", "SX": "Sint Maarten", "KG": "Kyrgyzstan", "KE": "Kenya", "SS": "South Sudan", "SR": "Suriname", "KI": "Kiribati", "KH": "Cambodia", "KN": "Saint Kitts and Nevis", "KM": "Comoros", "ST": "Sao Tome and Principe", "SK": "Slovakia", "KR": "South Korea", "SI": "Slovenia", "KP": "North Korea", "KW": "Kuwait", "SN": "Senegal", "SM": "San Marino", "SL": "Sierra Leone", "SC": "Seychelles", "KZ": "Kazakhstan", "KY": "Cayman Islands", "SG": "Singapore", "SE": "Sweden", "SD": "Sudan", "DO": "Dominican Republic", "DM": "Dominica", "DJ": "Djibouti", "DK": "Denmark", "VG": "British Virgin Islands", "DE": "Germany", "YE": "Yemen", "DZ": "Algeria", "US": "United States", "UY": "Uruguay", "YT": "Mayotte", "UM": "United States Minor Outlying Islands", "LB": "Lebanon", "LC": "Saint Lucia", "LA": "Laos", "TV": "Tuvalu", "TW": "Taiwan", "TT": "Trinidad and Tobago", "TR": "Turkey", "LK": "Sri Lanka", "LI": "Liechtenstein", "LV": "Latvia", "TO": "Tonga", "LT": "Lithuania", "LU": "Luxembourg", "LR": "Liberia", "LS": "Lesotho", "TH": "Thailand", "TF": "French Southern Territories", "TG": "Togo", "TD": "Chad", "TC": "Turks and Caicos Islands", "LY": "Libya", "VA": "Vatican", "VC": "Saint Vincent and the Grenadines", "AE": "United Arab Emirates", "AD": "Andorra", "AG": "Antigua and Barbuda", "AF": "Afghanistan", "AI": "Anguilla", "VI": "U.S. Virgin Islands", "IS": "Iceland", "IR": "Iran", "AM": "Armenia", "AL": "Albania", "AO": "Angola", "AQ": "Antarctica", "AS": "American Samoa", "AR": "Argentina", "AU": "Australia", "AT": "Austria", "AW": "Aruba", "IN": "India", "AX": "Aland Islands", "AZ": "Azerbaijan", "IE": "Ireland", "ID": "Indonesia", "UA": "Ukraine", "QA": "Qatar", "MZ": "Mozambique"}';
//const countries = JSON.parse(strJson);

var form1 = document.querySelector('.country1');
var form2 = document.querySelector('.country2');

var obj1 = void 0,
    obj2 = void 0;

fetch('https://crossorigin.me/http://country.io/names.json').then(function (response) {
	return response.json();
}).then(function (data) {

	for (var prop in data) {
		arrCountries.push(data[prop]);
	}
	return arrCountries;
}).then(function (arr) {

	obj1 = new _chips2.default(form1, arr);
	obj2 = new _chips2.default(form2, arr);
}).catch(function (error) {
	return console.log('"country request". ' + error.message);
});

/***/ })
/******/ ]);