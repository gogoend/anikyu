var _isObject = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

var _anObject = function (it) {
  if (!_isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

var _fails = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

// Thank's IE8 for his funny defineProperty
var _descriptors = !_fails(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, basedir, module) {
	return module = {
	  path: basedir,
	  exports: {},
	  require: function (path, base) {
      return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
    }
	}, fn(module, module.exports), module.exports;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

var _global = createCommonjsModule(function (module) {
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
});

var document = _global.document;
// typeof document.createElement is 'object' in old IE
var is = _isObject(document) && _isObject(document.createElement);
var _domCreate = function (it) {
  return is ? document.createElement(it) : {};
};

var _ie8DomDefine = !_descriptors && !_fails(function () {
  return Object.defineProperty(_domCreate('div'), 'a', { get: function () { return 7; } }).a != 7;
});

// 7.1.1 ToPrimitive(input [, PreferredType])

// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
var _toPrimitive = function (it, S) {
  if (!_isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

var dP = Object.defineProperty;

var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  _anObject(O);
  P = _toPrimitive(P, true);
  _anObject(Attributes);
  if (_ie8DomDefine) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var _objectDp = {
	f: f
};

var dP$1 = _objectDp.f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || _descriptors && dP$1(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});

var _core = createCommonjsModule(function (module) {
var core = module.exports = { version: '2.6.11' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
});

var _propertyDesc = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var _hide = _descriptors ? function (object, key, value) {
  return _objectDp.f(object, key, _propertyDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var hasOwnProperty = {}.hasOwnProperty;
var _has = function (it, key) {
  return hasOwnProperty.call(it, key);
};

var id = 0;
var px = Math.random();
var _uid = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

var _shared = createCommonjsModule(function (module) {
var SHARED = '__core-js_shared__';
var store = _global[SHARED] || (_global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: _core.version,
  mode:  'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});
});

var _functionToString = _shared('native-function-to-string', Function.toString);

var _redefine = createCommonjsModule(function (module) {
var SRC = _uid('src');

var TO_STRING = 'toString';
var TPL = ('' + _functionToString).split(TO_STRING);

_core.inspectSource = function (it) {
  return _functionToString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) _has(val, 'name') || _hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) _has(val, SRC) || _hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === _global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    _hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    _hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || _functionToString.call(this);
});
});

var _aFunction = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

// optional / simple context binding

var _ctx = function (fn, that, length) {
  _aFunction(fn);
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

var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] || (_global[name] = {}) : (_global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? _ctx(out, _global) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
    // extend global
    if (target) _redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) _hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
_global.core = _core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
var _export = $export;

var toString = {}.toString;

var _cof = function (it) {
  return toString.call(it).slice(8, -1);
};

// fallback for non-array-like ES3 and non-enumerable old V8 strings

// eslint-disable-next-line no-prototype-builtins
var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return _cof(it) == 'String' ? it.split('') : Object(it);
};

// 7.2.1 RequireObjectCoercible(argument)
var _defined = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

// to indexed object, toObject with fallback for non-array-like ES3 strings


var _toIobject = function (it) {
  return _iobject(_defined(it));
};

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
var _toInteger = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

// 7.1.15 ToLength

var min = Math.min;
var _toLength = function (it) {
  return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

var max = Math.max;
var min$1 = Math.min;
var _toAbsoluteIndex = function (index, length) {
  index = _toInteger(index);
  return index < 0 ? max(index + length, 0) : min$1(index, length);
};

// false -> Array#indexOf
// true  -> Array#includes



var _arrayIncludes = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = _toIobject($this);
    var length = _toLength(O.length);
    var index = _toAbsoluteIndex(fromIndex, length);
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

var shared = _shared('keys');

var _sharedKey = function (key) {
  return shared[key] || (shared[key] = _uid(key));
};

var arrayIndexOf = _arrayIncludes(false);
var IE_PROTO = _sharedKey('IE_PROTO');

var _objectKeysInternal = function (object, names) {
  var O = _toIobject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) _has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (_has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

// IE 8- don't enum bug keys
var _enumBugKeys = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

// 19.1.2.14 / 15.2.3.14 Object.keys(O)



var _objectKeys = Object.keys || function keys(O) {
  return _objectKeysInternal(O, _enumBugKeys);
};

var f$1 = Object.getOwnPropertySymbols;

var _objectGops = {
	f: f$1
};

var f$2 = {}.propertyIsEnumerable;

var _objectPie = {
	f: f$2
};

// 7.1.13 ToObject(argument)

var _toObject = function (it) {
  return Object(_defined(it));
};

// 19.1.2.1 Object.assign(target, source, ...)






var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
var _objectAssign = !$assign || _fails(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = _toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = _objectGops.f;
  var isEnum = _objectPie.f;
  while (aLen > index) {
    var S = _iobject(arguments[index++]);
    var keys = getSymbols ? _objectKeys(S).concat(getSymbols(S)) : _objectKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!_descriptors || isEnum.call(S, key)) T[key] = S[key];
    }
  } return T;
} : $assign;

// 19.1.3.1 Object.assign(target, source)


_export(_export.S + _export.F, 'Object', { assign: _objectAssign });

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

// 用于对数值进行钳制
function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
} // 用于获得DOM元素computedStyle


function getStyle(obj, attr) {
  if (obj.currentStyle) {
    return obj.currentStyle[attr];
  } else {
    return getComputedStyle(obj, false)[attr];
  }
} // 用于手动触发对象的事件


function trigger(obj, type, target, detail) {
  obj.fireEvent(type, {
    type: type,
    target: target,
    detail: detail
  });
} // 用于处理获得时间函数的兼容性，performance.now() 更为精准


function now() {
  if (typeof performance !== 'undefined' && performance.now) {
    return performance.now();
  }

  return Date.now ? Date.now() : new Date().getTime();
} // 产生范围内随机数


function rand(min, max) {
  return Math.random() * (max - min) + min;
}

var EventDoer = function EventDoer() {
  this.listeners = {};
};

EventDoer.prototype = Object.assign({}, {
  listeners: null,
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
  fireEvent: function fireEvent(name, detail) {
    if (!(name in this.listeners)) {
      return true;
    }

    var typeHandlers = this.listeners[name].concat();

    for (var i = 0; i < typeHandlers.length; i++) {
      typeHandlers[i].call(this, detail);
    }
  },
  getListeners: function getListeners(name) {
    if (name) {
      return this.listeners[name];
    }

    return this.listeners;
  }
});

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

var ease = Object.assign(easingFuncs); // 获得动画在当前进度时的变化增量

function getAddedValue(from, to, percent, easeFn, step) {
  return (to - from) * easeFn(percent, step);
} // 动画执行器，用于在前后一对补间动画阶段之间进行补间


function executor(index) {
  var _this = this;

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
  status.startTime = now() + delay; // let totalDelta = {};

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
    } // totalDelta[key] = finalStatus[key] - parseFloat(perviousStatus[key]);
    // console.table ? 
    // 	console.table({'final':finalStatus[key],'pervious':perviousStatus[key],'delta':totalDelta[key]})
    // 	:
    // 	console.log({'final':finalStatus[key],'pervious':perviousStatus[key],'delta':totalDelta[key]})
    // ;

  }

  var loop = function loop() {
    if (!status.paused) {
      // let endTime = status.startTime + duration;
      var currentTime = now();
      var currentProgress = clamp((currentTime - status.startTime) / duration, 0, 1);
      var newValue = {},
          stageDelta = {},
          frameDelta = {};

      for (var _key2 in perviousStatus) {
        var perviousVal = parseFloat(perviousStatus[_key2]);
        var finalVal = parseFloat(finalStatus[_key2]);
        newValue[_key2] = perviousVal + getAddedValue(perviousVal, finalVal, currentProgress, ease[easeType], step); // totalDelta[key] * ease[easeType].call(this, currentProgress, step);

        stageDelta[_key2] = (newValue[_key2] === undefined ? 0 : newValue[_key2]) - (perviousVal === undefined ? 0 : perviousVal);
        frameDelta[_key2] = (newValue[_key2] === undefined ? 0 : newValue[_key2]) - (el[_key2] === undefined ? 0 : parseFloat(el[_key2]));
      }

      Object.assign(el, newValue);
      trigger(_this, 'animate', el, {
        stageIndex: _this.i,
        name: queue[currentStageIndex].name ? queue[currentStageIndex].name : '',
        progress: currentProgress,
        // target:el,
        value: newValue,
        stageDelta: stageDelta,
        frameDelta: frameDelta
      }); // if (queue[i + 1].onAnimating instanceof Function) {
      // 	queue[i + 1].onAnimating(this);
      // }

      if (currentProgress == 1) {
        // clearInterval(timer)
        // cancelAnimationFrame(this.reqAniHandler);
        // 如何执行下一步？
        setTimeout(function () {
          // if (queue[i + 1].onFinished instanceof Function) {
          // 	queue[i + 1].onFinished(this);
          // }
          for (var _key3 in finalStatus) {
            el[_key3] = finalStatus[_key3];
          }

          trigger(_this, 'finish', el, {
            stageIndex: currentStageIndex,
            name: queue[currentStageIndex].name ? queue[currentStageIndex].name : ''
          });

          if (!config.manualNext) {
            next.call(_this);
          }
        }, delay); // debugger

        return;
      }
    }

    _this.reqAniHandler = requestAnimationFrame(loop);
  };

  setTimeout(loop, delay); // loop();
}

function mixEaseFn(obj) {
  for (var key in obj) {
    ease[key] = obj[key];
  }
}

var Anikyu = /*#__PURE__*/function (_EventDoer) {
  _inherits(Anikyu, _EventDoer);

  var _super = _createSuper(Anikyu);

  function Anikyu(el, queue, config) {
    var _this;

    _classCallCheck(this, Anikyu);

    _this = _super.call(this);
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
      executor.call(_assertThisInitialized(_this));
    } // this.executor = this.executor.bind(this);


    _this.reqAniHandler = null;
    return _this;
  } // 动画流程控制
  // 暂停、继续、重播当前


  _createClass(Anikyu, [{
    key: "pause",
    value: function pause() {
      var status = this.status;
      if (status.paused) return;
      var pausedTime = now();
      status.passedTime = pausedTime - status.startTime;
      status.paused = true;
    }
  }, {
    key: "resume",
    value: function resume() {
      var status = this.status;
      if (!status.paused) return;
      var startTime = now();
      status.startTime = startTime - status.passedTime;
      status.paused = false;
    }
  }, {
    key: "replay",
    value: function replay() {
      var status = this.status,
          queue = this.queue,
          i = this.i,
          resume = this.resume;
      if (!queue[i]) return;
      if (status.paused) resume.bind(this)();
      executor.call(this, i);
    } // 跳转到、上一个、下一个

  }, {
    key: "jump",
    value: function jump(index, finishCallFlag) {
      var status = this.status,
          queue = this.queue,
          resume = this.resume;
      if (!queue[index]) return;
      if (status.paused) resume.bind(this)();
      executor.call(this, finishCallFlag ? index - 2 : index - 1);
    }
  }, {
    key: "prev",
    value: function prev() {
      var status = this.status,
          queue = this.queue,
          i = this.i,
          resume = this.resume;
      if (!queue[i - 1]) return;
      if (status.paused) resume.bind(this)();
      this.i--;
      executor.call(this);
    }
  }, {
    key: "next",
    value: function next() {
      var status = this.status,
          queue = this.queue,
          i = this.i,
          resume = this.resume;
      if (!queue[i + 1]) return;
      if (status.paused) resume.bind(this)();
      this.i++;
      executor.call(this);
    } // 废弃

  }, {
    key: "dispose",
    value: function dispose() {
      var queue = this.queue,
          i = this.i,
          reqAniHandler = this.reqAniHandler,
          el = this.el;
      var currentStageIndex = i + 1;
      cancelAnimationFrame(reqAniHandler);
      trigger(this, 'dispose', el, {
        stageIndex: i,
        name: queue[currentStageIndex].name ? queue[currentStageIndex].name : ''
      });
    }
  }]);

  return Anikyu;
}(EventDoer);

Object.assign(Anikyu, {
  getStyle: getStyle,
  rand: rand,
  clamp: clamp,
  mixEaseFn: mixEaseFn
});

// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
// MIT license

(function (window) {
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
})(typeof window === 'undefined' ? commonjsGlobal : window);

export default Anikyu;
