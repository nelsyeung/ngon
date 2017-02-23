(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Ngon", [], factory);
	else if(typeof exports === 'object')
		exports["Ngon"] = factory();
	else
		root["Ngon"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
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

exports.lengthToRadius = lengthToRadius;
exports.radiusToLength = radiusToLength;

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function lengthToRadius(sides, length) {
  return length / (2 * Math.sin(Math.PI / sides));
}

function radiusToLength(sides, radius) {
  return radius * 2 * Math.sin(Math.PI / sides);
}

var Ngon = exports.Ngon = function () {
  function Ngon() {
    _classCallCheck(this, Ngon);

    this.center = [0, 0];
    this.coords = [];
  }

  _createClass(Ngon, [{
    key: "translate",
    value: function translate(vector) {
      this.center[0] += vector[0];
      this.center[1] += vector[1];

      for (var i = 0; i < this.coords.length; i += 1) {
        this.coords[i][0] += vector[0];
        this.coords[i][1] += vector[1];
      }
    }
  }, {
    key: "rotate",
    value: function rotate(angle) {
      var center = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.center;

      for (var i = 0; i < this.coords.length; i += 1) {
        var x = this.coords[i][0] - center[0];
        var y = this.coords[i][1] - center[1];

        this.coords[i][0] = x * Math.cos(angle) - y * Math.sin(angle) + center[0];
        this.coords[i][1] = x * Math.sin(angle) + y * Math.cos(angle) + center[1];
      }
    }
  }, {
    key: "contains",
    value: function contains(x, y) {
      var j = this.coords.length - 1;
      var result = false;

      for (var i = 0; i < this.coords.length; j = i, i += 1) {
        if (this.coords[i][1] > y !== this.coords[j][1] > y && x < (this.coords[j][0] - this.coords[i][0]) * (y - this.coords[i][1]) / (this.coords[j][1] - this.coords[i][1]) + this.coords[i][0]) {
          result = !result;
        }
      }

      return result;
    }
  }]);

  return Ngon;
}();

var CustomPolygon = exports.CustomPolygon = function (_Ngon) {
  _inherits(CustomPolygon, _Ngon);

  function CustomPolygon(coords) {
    _classCallCheck(this, CustomPolygon);

    var _this = _possibleConstructorReturn(this, (CustomPolygon.__proto__ || Object.getPrototypeOf(CustomPolygon)).call(this));

    _this.coords = coords;
    return _this;
  }

  _createClass(CustomPolygon, [{
    key: "clone",
    value: function clone() {
      var clone = new CustomPolygon(this.coords.map(function (c) {
        return c.slice();
      }));
      clone.center = this.center.slice();
      return clone;
    }
  }]);

  return CustomPolygon;
}(Ngon);

var RegularPolygon = exports.RegularPolygon = function (_Ngon2) {
  _inherits(RegularPolygon, _Ngon2);

  function RegularPolygon(sides) {
    var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

    _classCallCheck(this, RegularPolygon);

    var _this2 = _possibleConstructorReturn(this, (RegularPolygon.__proto__ || Object.getPrototypeOf(RegularPolygon)).call(this));

    _this2.sides = sides;
    _this2.length = length;
    _this2.radius = lengthToRadius(sides, length);

    for (var i = 0; i < sides; i += 1) {
      _this2.coords.push([Math.sin(-(i / sides) * 2 * Math.PI) * _this2.radius, Math.cos(i / sides * 2 * Math.PI) * _this2.radius]);
    }
    return _this2;
  }

  _createClass(RegularPolygon, [{
    key: "clone",
    value: function clone() {
      var clone = new RegularPolygon(this.sides, this.length);
      clone.center = this.center.slice();
      clone.coords = this.coords.map(function (c) {
        return c.slice();
      });
      return clone;
    }
  }]);

  return RegularPolygon;
}(Ngon);

/***/ })
/******/ ]);
});
//# sourceMappingURL=ngon.js.map