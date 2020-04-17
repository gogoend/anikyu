// 用于对数值进行钳制
function clamp(value, min, max) {
	return Math.max(min, Math.min(max, value));
}

// 用于获得DOM元素computedStyle
function getStyle(obj, attr) {
	if (obj.currentStyle) {
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj, false)[attr];
	}
}

// 用于手动触发对象的事件
function trigger(obj, type, target, detail) {
	obj.fireEvent(type, {
		type: type,
		target: target,
		detail: detail
	});
}

// 用于处理获得时间函数的兼容性，performance.now() 更为精准
function now() {
	if (typeof performance !== 'undefined' && performance.now) {
		return performance.now();
	}
	return Date.now ? Date.now() : new Date().getTime();
}

// 产生范围内随机数
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
			a = 1;s = p / 4;
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
			a = 1;s = p / 4;
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
			a = 1;s = p / 4;
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

var ease = Object.assign(easingFuncs);

// 获得动画在当前进度时的变化增量
function getAddedValue(from, to, percent, easeFn, step) {
	return (to - from) * easeFn(percent, step);
}

// 动画执行器，用于在前后一对补间动画阶段之间进行补间
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
	var currentStageIndex = this.i + 1;

	// 确保每一次的初始状态都和前一对象中的属性相等
	// 修复重播当前、跳转到、上一个、下一个函数不正常工作的问题
	for (var key in perviousStatus) {
		el[key] = perviousStatus[key];
	}

	var easeType = queue[i + 1].easeType ? queue[i + 1].easeType : config.easeType;
	var duration = queue[i + 1].duration ? queue[i + 1].duration : config.duration;

	var step = queue[i + 1].step ? queue[i + 1].step : undefined;

	status.startTime = now() + delay;

	// let totalDelta = {};

	for (var _key in finalStatus) {
		if (perviousStatus[_key] === undefined) {
			// 当前一个状态不存在时首先尝试向前搜索，直到第0个
			for (var j = i; j >= 0; j--) {
				if (queue[j].props[_key] !== undefined) {
					perviousStatus[_key] = queue[j].props[_key];
					continue;
				}
				// 若到第0个仍然找不到则直接访问原始对象中相关属性
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
		// totalDelta[key] = finalStatus[key] - parseFloat(perviousStatus[key]);

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
			});
			// if (queue[i + 1].onAnimating instanceof Function) {
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
				}, delay);
				// debugger
				return;
			}
		}
		_this.reqAniHandler = requestAnimationFrame(loop);
	};
	setTimeout(loop, delay);
	// loop();
}

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

function mixEaseFn(obj) {
	for (var key in obj) {
		ease[key] = obj[key];
	}
}

var Anikyu = function (_EventDoer) {
	inherits(Anikyu, _EventDoer);

	function Anikyu(el, queue, config) {
		classCallCheck(this, Anikyu);

		var _this = possibleConstructorReturn(this, (Anikyu.__proto__ || Object.getPrototypeOf(Anikyu)).call(this));

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
			return possibleConstructorReturn(_this);
		}
		if (!_this.config.manualNext) {
			executor.call(_this);
		}

		// this.executor = this.executor.bind(this);

		_this.reqAniHandler = null;

		return _this;
	}

	// 动画流程控制
	// 暂停、继续、重播当前


	createClass(Anikyu, [{
		key: 'pause',
		value: function pause() {
			var status = this.status;


			if (status.paused) return;

			var pausedTime = now();
			status.passedTime = pausedTime - status.startTime;
			status.paused = true;
		}
	}, {
		key: 'resume',
		value: function resume() {
			var status = this.status;


			if (!status.paused) return;

			var startTime = now();
			status.startTime = startTime - status.passedTime;
			status.paused = false;
		}
	}, {
		key: 'replay',
		value: function replay() {
			var status = this.status,
			    queue = this.queue,
			    i = this.i,
			    resume = this.resume;


			if (!queue[i]) return;
			if (status.paused) resume.bind(this)();

			executor.call(this, i);
		}

		// 跳转到、上一个、下一个

	}, {
		key: 'jump',
		value: function jump(index, finishCallFlag) {
			var status = this.status,
			    queue = this.queue,
			    resume = this.resume;


			if (!queue[index]) return;
			if (status.paused) resume.bind(this)();

			executor.call(this, finishCallFlag ? index - 2 : index - 1);
		}
	}, {
		key: 'prev',
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
		key: 'next',
		value: function next() {
			var status = this.status,
			    queue = this.queue,
			    i = this.i,
			    resume = this.resume;

			if (!queue[i + 1]) return;

			if (status.paused) resume.bind(this)();

			this.i++;
			executor.call(this);
		}

		// 废弃

	}, {
		key: 'dispose',
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
	getStyle: getStyle, rand: rand, clamp: clamp, mixEaseFn: mixEaseFn
});

// requestAnimationFrame
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
})(typeof window === 'undefined' ? global : window);

export default Anikyu;
