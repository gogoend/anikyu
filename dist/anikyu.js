(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Anikyu"] = factory();
	else
		root["Anikyu"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 57);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(7)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(6);
var IE8_DOM_DEFINE = __webpack_require__(24);
var toPrimitive = __webpack_require__(15);
var dP = Object.defineProperty;

exports.f = __webpack_require__(1) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 4 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 5 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(3);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(29);
var defined = __webpack_require__(31);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 9 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.11' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(9);
var global = __webpack_require__(0);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(13) ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(28);
var enumBugKeys = __webpack_require__(19);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 12 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = false;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(10)('wks');
var uid = __webpack_require__(5);
var Symbol = __webpack_require__(0).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(3);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);
var core = __webpack_require__(9);
var hide = __webpack_require__(17);
var redefine = __webpack_require__(26);
var ctx = __webpack_require__(27);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(2);
var createDesc = __webpack_require__(18);
module.exports = __webpack_require__(1) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 19 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 20 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(16);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(55) });


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);
var core = __webpack_require__(9);
var LIBRARY = __webpack_require__(13);
var wksExt = __webpack_require__(23);
var defineProperty = __webpack_require__(2).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(14);


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(1) && !__webpack_require__(7)(function () {
  return Object.defineProperty(__webpack_require__(25)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(3);
var document = __webpack_require__(0).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);
var hide = __webpack_require__(17);
var has = __webpack_require__(4);
var SRC = __webpack_require__(5)('src');
var $toString = __webpack_require__(39);
var TO_STRING = 'toString';
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__(9).inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(40);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(4);
var toIObject = __webpack_require__(8);
var arrayIndexOf = __webpack_require__(44)(false);
var IE_PROTO = __webpack_require__(33)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(30);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 30 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 31 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 32 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(10)('keys');
var uid = __webpack_require__(5);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(31);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(28);
var hiddenKeys = __webpack_require__(19).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(12);
var createDesc = __webpack_require__(18);
var toIObject = __webpack_require__(8);
var toPrimitive = __webpack_require__(15);
var has = __webpack_require__(4);
var IE8_DOM_DEFINE = __webpack_require__(24);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(1) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(22)('asyncIterator');


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(0);
var has = __webpack_require__(4);
var DESCRIPTORS = __webpack_require__(1);
var $export = __webpack_require__(16);
var redefine = __webpack_require__(26);
var META = __webpack_require__(41).KEY;
var $fails = __webpack_require__(7);
var shared = __webpack_require__(10);
var setToStringTag = __webpack_require__(42);
var uid = __webpack_require__(5);
var wks = __webpack_require__(14);
var wksExt = __webpack_require__(23);
var wksDefine = __webpack_require__(22);
var enumKeys = __webpack_require__(43);
var isArray = __webpack_require__(47);
var anObject = __webpack_require__(6);
var isObject = __webpack_require__(3);
var toObject = __webpack_require__(34);
var toIObject = __webpack_require__(8);
var toPrimitive = __webpack_require__(15);
var createDesc = __webpack_require__(18);
var _create = __webpack_require__(48);
var gOPNExt = __webpack_require__(51);
var $GOPD = __webpack_require__(36);
var $GOPS = __webpack_require__(20);
var $DP = __webpack_require__(2);
var $keys = __webpack_require__(11);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function' && !!$GOPS.f;
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(35).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(12).f = $propertyIsEnumerable;
  $GOPS.f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(13)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443
var FAILS_ON_PRIMITIVES = $fails(function () { $GOPS.f(1); });

$export($export.S + $export.F * FAILS_ON_PRIMITIVES, 'Object', {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return $GOPS.f(toObject(it));
  }
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(17)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(10)('native-function-to-string', Function.toString);


/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(5)('meta');
var isObject = __webpack_require__(3);
var has = __webpack_require__(4);
var setDesc = __webpack_require__(2).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(7)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(2).f;
var has = __webpack_require__(4);
var TAG = __webpack_require__(14)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(11);
var gOPS = __webpack_require__(20);
var pIE = __webpack_require__(12);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(8);
var toLength = __webpack_require__(45);
var toAbsoluteIndex = __webpack_require__(46);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(32);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(32);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(30);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(6);
var dPs = __webpack_require__(49);
var enumBugKeys = __webpack_require__(19);
var IE_PROTO = __webpack_require__(33)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(25)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(50).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(2);
var anObject = __webpack_require__(6);
var getKeys = __webpack_require__(11);

module.exports = __webpack_require__(1) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(0).document;
module.exports = document && document.documentElement;


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(8);
var gOPN = __webpack_require__(35).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(16);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(53).set });


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(3);
var anObject = __webpack_require__(6);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(27)(Function.call, __webpack_require__(36).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(2).f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || __webpack_require__(1) && dP(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var DESCRIPTORS = __webpack_require__(1);
var getKeys = __webpack_require__(11);
var gOPS = __webpack_require__(20);
var pIE = __webpack_require__(12);
var toObject = __webpack_require__(34);
var IObject = __webpack_require__(29);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(7)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS || isEnum.call(S, key)) T[key] = S[key];
    }
  } return T;
} : $assign;


/***/ }),
/* 56 */
/***/ (function(module, exports) {

// requestAnimationFrame
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
// MIT license
(function () {
  var lastTime = 0;
  var vendors = ['ms', 'moz', 'webkit', 'o'];

  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame) window.requestAnimationFrame = function (callback) {
    var currTime = new Date().getTime();
    var timeToCall = Math.max(0, 16 - (currTime - lastTime));
    var id = window.setTimeout(function () {
      callback(currTime + timeToCall);
    }, timeToCall);
    lastTime = currTime + timeToCall;
    return id;
  };
  if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function (id) {
    clearTimeout(id);
  };
})();

/***/ }),
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es7.symbol.async-iterator.js
var es7_symbol_async_iterator = __webpack_require__(37);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.symbol.js
var es6_symbol = __webpack_require__(38);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.set-prototype-of.js
var es6_object_set_prototype_of = __webpack_require__(52);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.function.name.js
var es6_function_name = __webpack_require__(54);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.assign.js
var es6_object_assign = __webpack_require__(21);

// CONCATENATED MODULE: ./src/easing_funcs.js
var easingFuncs = {
  linear: function linear(k) {
    return k;
  },
  step: function step(k, _step) {
    _step = !_step ? 10 : Math.ceil(_step);
    var s = 1;

    while (k > s * (1 / _step)) {
      s++;
    }

    return s * (1 / _step);
  },
  quadraticIn: function quadraticIn(k) {
    return k * k;
  },
  quadraticOut: function quadraticOut(k) {
    return k * (2 - k);
  },
  quadraticInOut: function quadraticInOut(k) {
    if ((k *= 2) < 1) {
      return 0.5 * k * k;
    }

    return -0.5 * (--k * (k - 2) - 1);
  },
  cubicIn: function cubicIn(k) {
    return k * k * k;
  },
  cubicOut: function cubicOut(k) {
    return --k * k * k + 1;
  },
  cubicInOut: function cubicInOut(k) {
    if ((k *= 2) < 1) {
      return 0.5 * k * k * k;
    }

    return 0.5 * ((k -= 2) * k * k + 2);
  },
  quarticIn: function quarticIn(k) {
    return k * k * k * k;
  },
  quarticOut: function quarticOut(k) {
    return 1 - --k * k * k * k;
  },
  quarticInOut: function quarticInOut(k) {
    if ((k *= 2) < 1) {
      return 0.5 * k * k * k * k;
    }

    return -0.5 * ((k -= 2) * k * k * k - 2);
  },
  quinticIn: function quinticIn(k) {
    return k * k * k * k * k;
  },
  quinticOut: function quinticOut(k) {
    return --k * k * k * k * k + 1;
  },
  quinticInOut: function quinticInOut(k) {
    if ((k *= 2) < 1) {
      return 0.5 * k * k * k * k * k;
    }

    return 0.5 * ((k -= 2) * k * k * k * k + 2);
  },
  sinusoidalIn: function sinusoidalIn(k) {
    return 1 - Math.cos(k * Math.PI / 2);
  },
  sinusoidalOut: function sinusoidalOut(k) {
    return Math.sin(k * Math.PI / 2);
  },
  sinusoidalInOut: function sinusoidalInOut(k) {
    return 0.5 * (1 - Math.cos(Math.PI * k));
  },
  exponentialIn: function exponentialIn(k) {
    return k === 0 ? 0 : Math.pow(1024, k - 1);
  },
  exponentialOut: function exponentialOut(k) {
    return k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
  },
  exponentialInOut: function exponentialInOut(k) {
    if (k === 0) {
      return 0;
    }

    if (k === 1) {
      return 1;
    }

    if ((k *= 2) < 1) {
      return 0.5 * Math.pow(1024, k - 1);
    }

    return 0.5 * (-Math.pow(2, -10 * (k - 1)) + 2);
  },
  circularIn: function circularIn(k) {
    return 1 - Math.sqrt(1 - k * k);
  },
  circularOut: function circularOut(k) {
    return Math.sqrt(1 - --k * k);
  },
  circularInOut: function circularInOut(k) {
    if ((k *= 2) < 1) {
      return -0.5 * (Math.sqrt(1 - k * k) - 1);
    }

    return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
  },
  elasticIn: function elasticIn(k) {
    var s;
    var a = 0.1;
    var p = 0.4;

    if (k === 0) {
      return 0;
    }

    if (k === 1) {
      return 1;
    }

    if (!a || a < 1) {
      a = 1;
      s = p / 4;
    } else {
      s = p * Math.asin(1 / a) / (2 * Math.PI);
    }

    return -(a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
  },
  elasticOut: function elasticOut(k) {
    var s;
    var a = 0.1;
    var p = 0.4;

    if (k === 0) {
      return 0;
    }

    if (k === 1) {
      return 1;
    }

    if (!a || a < 1) {
      a = 1;
      s = p / 4;
    } else {
      s = p * Math.asin(1 / a) / (2 * Math.PI);
    }

    return a * Math.pow(2, -10 * k) * Math.sin((k - s) * (2 * Math.PI) / p) + 1;
  },
  elasticInOut: function elasticInOut(k) {
    var s;
    var a = 0.1;
    var p = 0.4;

    if (k === 0) {
      return 0;
    }

    if (k === 1) {
      return 1;
    }

    if (!a || a < 1) {
      a = 1;
      s = p / 4;
    } else {
      s = p * Math.asin(1 / a) / (2 * Math.PI);
    }

    if ((k *= 2) < 1) {
      return -0.5 * (a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
    }

    return a * Math.pow(2, -10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p) * 0.5 + 1;
  },
  // 在某一动画开始沿指示的路径进行动画处理前稍稍收回该动画的移动
  backIn: function backIn(k) {
    var s = 1.70158;
    return k * k * ((s + 1) * k - s);
  },
  backOut: function backOut(k) {
    var s = 1.70158;
    return --k * k * ((s + 1) * k + s) + 1;
  },
  backInOut: function backInOut(k) {
    var s = 1.70158 * 1.525;

    if ((k *= 2) < 1) {
      return 0.5 * (k * k * ((s + 1) * k - s));
    }

    return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
  },
  // 创建弹跳效果
  bounceIn: function bounceIn(k) {
    return 1 - easingFuncs.bounceOut(1 - k);
  },
  bounceOut: function bounceOut(k) {
    if (k < 1 / 2.75) {
      return 7.5625 * k * k;
    } else if (k < 2 / 2.75) {
      return 7.5625 * (k -= 1.5 / 2.75) * k + 0.75;
    } else if (k < 2.5 / 2.75) {
      return 7.5625 * (k -= 2.25 / 2.75) * k + 0.9375;
    } else {
      return 7.5625 * (k -= 2.625 / 2.75) * k + 0.984375;
    }
  },
  bounceInOut: function bounceInOut(k) {
    if (k < 0.5) {
      return easingFuncs.bounceIn(k * 2) * 0.5;
    }

    return easingFuncs.bounceOut(k * 2 - 1) * 0.5 + 0.5;
  }
};
// CONCATENATED MODULE: ./src/util.js


function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function getStyle(obj, attr) {
  if (obj.currentStyle) {
    return obj.currentStyle[attr];
  } else {
    return getComputedStyle(obj, false)[attr];
  }
}

function trigger(obj, eName, eDetail) {
  var theEvent;

  try {
    theEvent = new CustomEvent(eName, {
      detail: Object.assign({}, eDetail)
    });
  } catch (e) {
    // 这里的代码用于兼容IE 9-11等无法使用CustomEvent构造函数的浏览器
    theEvent = document.createEvent('CustomEvent'); // theEvent.initEvent(eName, true, true);
    // initEvent无法传递detail，若直接对事件对象中的detail赋值会直接报错
    // 因此需要使用initCustomEvent

    theEvent.initCustomEvent(eName, true, true, eDetail);
  }

  obj.dispatchEvent(theEvent);
}

function rand(min, max) {
  return Math.random() * (max - min) + min;
}


// CONCATENATED MODULE: ./src/polyfill/EventTargetConstructor.js


var EventTarget = function EventTarget() {
  this.listeners = {};
};

EventTarget.prototype = Object.assign({}, {
  listeners: {},
  addEventListener: function addEventListener(type, callback) {
    if (!(type in this.listeners)) {
      this.listeners[type] = [];
    }

    this.listeners[type].push(callback);
  },
  removeEventListener: function removeEventListener(type, callback) {
    if (!(type in this.listeners)) return;
    var typeHandlers = this.listeners[type];

    for (var i = 0; i < typeHandlers.length; i++) {
      if (typeHandlers[i] === callback) {
        typeHandlers.splice(i, 1);
        return;
      }
    }
  },
  dispatchEvent: function dispatchEvent(event) {
    if (!(event.type in this.listeners)) {
      return true;
    }

    var typeHandlers = this.listeners[event.type].concat();

    for (var i = 0; i < typeHandlers.length; i++) {
      typeHandlers[i].call(this, event);
    }
  }
});
/* harmony default export */ var EventTargetConstructor = (EventTarget);
// CONCATENATED MODULE: ./src/animation.js






function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



 // let EventTarget;
// try{
// 	new EventTarget;
// } catch(err){
// 	EventTarget = EventTargetPolyfill;
// }

var animation_Animation =
/*#__PURE__*/
function (_AnikyuEventTarget) {
  _inherits(Animation, _AnikyuEventTarget);

  function Animation(el, queue, config) {
    var _this;

    _classCallCheck(this, Animation);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Animation).call(this));
    _this.el = el;
    _this.queue = queue;
    var defaultConfig = {
      duration: 2000,
      easeType: 'quadraticInOut',
      manualNext: false
    };
    _this.config = Object.assign(JSON.parse(JSON.stringify(defaultConfig)), config);
    _this.i = 0;
    _this.status = {
      paused: false
    };

    if (!_this.queue[0]) {
      return _possibleConstructorReturn(_this);
    }

    if (!_this.config.manualNext) {
      _this.executor();
    }

    _this.executor = _this.executor.bind(_assertThisInitialized(_this));
    _this.reqAniHandler = null;
    return _this;
  } // 动画执行器，用于在前后一对补间动画阶段之间进行补间


  _createClass(Animation, [{
    key: "executor",
    value: function executor(index) {
      var _this2 = this;

      if (!isNaN(parseInt(index))) {
        this.i = index;
      }

      var el = this.el,
          i = this.i,
          queue = this.queue,
          next = this.next,
          status = this.status,
          config = this.config,
          reqAniHandler = this.reqAniHandler;
      cancelAnimationFrame(reqAniHandler);

      if (!queue[i] || !queue[i + 1]) {
        return;
      }

      var perviousStatus = queue[i].props,
          finalStatus = queue[i + 1].props;
      var delay = queue[i + 1].delay !== undefined ? queue[i + 1].delay : 0;
      var currentStageIndex = this.i + 1; // 确保每一次的初始状态都和前一对象中的属性相等
      // 修复重播当前、跳转到、上一个、下一个函数不正常工作的问题

      for (var key in perviousStatus) {
        el[key] = perviousStatus[key];
      }

      var easeType = queue[i + 1].easeType ? queue[i + 1].easeType : config.easeType;
      var duration = queue[i + 1].duration ? queue[i + 1].duration : config.duration;
      var step = queue[i + 1].step ? queue[i + 1].step : undefined;
      status.startTime = new Date().getTime() + delay;
      var totalDelta = {};

      for (var _key in finalStatus) {
        if (perviousStatus[_key] === undefined) {
          // 当前一个状态不存在时首先尝试向前搜索，直到第0个
          for (var j = i; j >= 0; j--) {
            if (queue[j].props[_key] !== undefined) {
              perviousStatus[_key] = queue[j].props[_key];
              continue;
            } // 若到第0个仍然找不到则直接访问原始对象中相关属性


            if (j === 0 && queue[j].props[_key] === undefined) {
              if (el[_key] !== undefined && !isNaN(parseFloat(el[_key]))) {
                perviousStatus[_key] = parseFloat(el[_key]);
              } else {
                // 若依然访问不到，则直接设置该值为0
                perviousStatus[_key] = 0;
              }
            }
          }
        }

        totalDelta[_key] = finalStatus[_key] - parseFloat(perviousStatus[_key]); // console.table ? 
        // 	console.table({'final':finalStatus[key],'pervious':perviousStatus[key],'delta':totalDelta[key]})
        // 	:
        // 	console.log({'final':finalStatus[key],'pervious':perviousStatus[key],'delta':totalDelta[key]})
        // ;
      }

      var loop = function loop() {
        if (!status.paused) {
          // let endTime = status.startTime + duration;
          var currentTime = new Date().getTime();
          var currentProgress = clamp((currentTime - status.startTime) / duration, 0, 1);
          var newValue = {},
              stageDelta = {},
              frameDelta = {};

          for (var _key2 in perviousStatus) {
            newValue[_key2] = perviousStatus[_key2] + totalDelta[_key2] * easingFuncs[easeType].call(_this2, currentProgress, step);
            stageDelta[_key2] = (newValue[_key2] === undefined ? 0 : newValue[_key2]) - (perviousStatus[_key2] === undefined ? 0 : perviousStatus[_key2]);
            frameDelta[_key2] = (newValue[_key2] === undefined ? 0 : newValue[_key2]) - (el[_key2] === undefined ? 0 : parseFloat(el[_key2]));
          }

          Object.assign(el, newValue);

          if (currentProgress == 1) {
            // clearInterval(timer)
            // cancelAnimationFrame(this.reqAniHandler);
            // 如何执行下一步？
            setTimeout(function () {
              // if (queue[i + 1].onFinished instanceof Function) {
              // 	queue[i + 1].onFinished(this);
              // }
              trigger(_this2, 'finish', {
                stageIndex: currentStageIndex,
                name: queue[currentStageIndex].name
              });

              if (!config.manualNext) {
                next.call(_this2);
              }
            }, delay); // debugger

            return;
          }

          trigger(_this2, 'animate', {
            stageIndex: _this2.i,
            name: queue[currentStageIndex].name ? queue[currentStageIndex].name : '',
            progress: currentProgress,
            target: el,
            value: newValue,
            stageDelta: stageDelta,
            frameDelta: frameDelta
          }); // if (queue[i + 1].onAnimating instanceof Function) {
          // 	queue[i + 1].onAnimating(this);
          // }
        }

        _this2.reqAniHandler = requestAnimationFrame(loop);
      };

      setTimeout(loop, delay); // loop();
    } // 动画流程控制
    // 暂停、继续、重播当前

  }, {
    key: "pause",
    value: function pause() {
      var status = this.status;
      if (status.paused) return;
      var pausedTime = new Date().getTime();
      status.passedTime = pausedTime - status.startTime;
      status.paused = true;
    }
  }, {
    key: "resume",
    value: function resume() {
      var status = this.status;
      if (!status.paused) return;
      var startTime = new Date().getTime();
      status.startTime = startTime - status.passedTime;
      status.paused = false;
    }
  }, {
    key: "replay",
    value: function replay() {
      var status = this.status,
          queue = this.queue,
          i = this.i,
          executor = this.executor,
          resume = this.resume;
      if (!queue[i]) return;
      if (status.paused) resume.bind(this)();
      executor(i);
    } // 跳转到、上一个、下一个

  }, {
    key: "jump",
    value: function jump(index, finishCallFlag) {
      var status = this.status,
          queue = this.queue,
          executor = this.executor,
          resume = this.resume;
      if (!queue[index]) return;
      if (status.paused) resume.bind(this)();
      executor(finishCallFlag ? index - 2 : index - 1); // executor(index - 2);
    }
  }, {
    key: "prev",
    value: function prev() {
      var status = this.status,
          queue = this.queue,
          i = this.i,
          executor = this.executor,
          resume = this.resume;
      if (!queue[i - 1]) return;
      if (status.paused) resume.bind(this)();
      this.i--;
      executor();
    }
  }, {
    key: "next",
    value: function next() {
      var status = this.status,
          queue = this.queue,
          i = this.i,
          executor = this.executor,
          resume = this.resume;
      if (!queue[i + 1]) return;
      if (status.paused) resume.bind(this)();
      this.i++;
      executor();
    } // 废弃

  }, {
    key: "dispose",
    value: function dispose() {
      cancelAnimationFrame(this.reqAniHandler);
      trigger(this, 'dispose');

      for (var key in this) {
        this[key] = undefined;
        delete this[key];
      }
    }
  }]);

  return Animation;
}(EventTargetConstructor);

Object.assign(animation_Animation, {
  getStyle: getStyle,
  rand: rand,
  clamp: clamp
});
/* harmony default export */ var animation = (animation_Animation);
// EXTERNAL MODULE: ./src/polyfill/requestAnimationFrame.js
var polyfill_requestAnimationFrame = __webpack_require__(56);

// CONCATENATED MODULE: ./src/anikyu.js

 // 判断文件是如何引入的，如果是通过模块引入则不在全局暴露Anikyu
// 直接在Webpack配置中改为UMD

/* harmony default export */ var anikyu = __webpack_exports__["default"] = (animation);

/***/ })
/******/ ])["default"];
});