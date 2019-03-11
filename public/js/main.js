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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/main.js":
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var formEl = get('.form');
var filterButtons = getAll('.filter > button');
var entriesContainer = get('.entries');
var totalEl = get('.total__num');
var topicEl = get('[name="topic"]', formEl);
var hoursEl = get('[name="hours"]', formEl);
var selectedFilter = 'all';
var entries = [{
  topic: 'css',
  hours: 3.5
}, {
  topic: 'html',
  hours: 2.5
}, {
  topic: 'js',
  hours: 12
}, {
  topic: 'shell',
  hours: 1.5
}, {
  topic: 'css',
  hours: 2.5
}, {
  topic: 'js',
  hours: 4.5
}, {
  topic: 'html',
  hours: 1.5
}, {
  topic: 'html',
  hours: 1.0
}, {
  topic: 'html',
  hours: 3.0
}, {
  topic: 'shell',
  hours: 3.5
}];
formEl.addEventListener('submit', onSubmit);
filterButtons.forEach(addFilterButtonLogic);
render();

function onSubmit(event) {
  event.preventDefault();
  var topic = topicEl.value;
  var hours = Number(hoursEl.value);
  addEntry(topic, hours);
  resetForm();
  render();
  updateTotal();
}

function addFilterButtonLogic(btn) {
  btn.addEventListener('click', function () {
    var topic = btn.dataset.topic;
    selectedFilter = topic;
    activateFilterButton(topic);
    render();
  });
}

function activateFilterButton(topic) {
  filterButtons.forEach(function (btn) {
    return btn.dataset.topic === topic ? btn.classList.add('active') : btn.classList.remove('active');
  });
}

function addEntry(topic, hours) {
  if (topic !== '' && hours > 0) {
    entries = [].concat(_toConsumableArray(entries), [{
      topic: topic,
      hours: hours
    }]);
  }
}

function render() {
  entriesContainer.innerHTML = '';
  getFilteredEntries().forEach(renderSingleEntry);
  updateTotal();
}

function getFilteredEntries() {
  return selectedFilter === 'all' ? entries : entries.filter(function (entry) {
    return entry.topic === selectedFilter;
  });
}

function renderSingleEntry(entry) {
  var el = document.createElement('div');
  var hours = entry.hours,
      topic = entry.topic;
  el.className = 'entry';
  el.innerHTML = "\n    <em>".concat(topic, "</em>\n    <strong>").concat(hours, "</strong>\n  ");
  entriesContainer.insertAdjacentElement('beforeend', el);
}

function resetForm() {
  topicEl.value = '';
  hoursEl.value = '';
  topicEl.focus();
}

function updateTotal() {
  var total = getFilteredEntries().reduce(function (prev, curr) {
    return prev + curr.hours;
  }, 0);
  totalEl.innerHTML = total;
}

function get(sel) {
  var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  return target.querySelector(sel);
}

function getAll(sel) {
  var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  return Array.from(target.querySelectorAll(sel));
}

/***/ })

/******/ });
//# sourceMappingURL=main.js.map