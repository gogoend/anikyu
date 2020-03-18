var easingFuncs = {
	linear: function (k) {
		return k;
	},
	step: function (k, step){
		step = !step ? 10 : Math.ceil(step);
		var s = 1;

		while(k > s * (1 / step)){
			s++;
		}

		return s * (1 / step);
	},
	quadraticIn: function (k) {
		return k * k;
	},
	quadraticOut: function (k) {
		return k * (2 - k);
	},
	quadraticInOut: function (k) {
		if ((k *= 2) < 1) { return 0.5 * k * k; }
		return -0.5 * (--k * (k - 2) - 1);
	},
	cubicIn: function (k) {
		return k * k * k;
	},
	cubicOut: function (k) {
		return --k * k * k + 1;
	},
	cubicInOut: function (k) {
		if ((k *= 2) < 1) { return 0.5 * k * k * k; }
		return 0.5 * ((k -= 2) * k * k + 2);
	},
	quarticIn: function (k) {
		return k * k * k * k;
	},
	quarticOut: function (k) {
		return 1 - (--k * k * k * k);
	},
	quarticInOut: function (k) {
		if ((k *= 2) < 1) { return 0.5 * k * k * k * k; }
		return -0.5 * ((k -= 2) * k * k * k - 2);
	},
	quinticIn: function (k) {
		return k * k * k * k * k;
	},
	quinticOut: function (k) {
		return --k * k * k * k * k + 1;
	},
	quinticInOut: function (k) {
		if ((k *= 2) < 1) { return 0.5 * k * k * k * k * k; }
		return 0.5 * ((k -= 2) * k * k * k * k + 2);
	},
	sinusoidalIn: function (k) {
		return 1 - Math.cos(k * Math.PI / 2);
	},
	sinusoidalOut: function (k) {
		return Math.sin(k * Math.PI / 2);
	},
	sinusoidalInOut: function (k) {
		return 0.5 * (1 - Math.cos(Math.PI * k));
	},
	exponentialIn: function (k) {
		return k === 0 ? 0 : Math.pow(1024, k - 1);
	},
	exponentialOut: function (k) {
		return k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
	},
	exponentialInOut: function (k) {
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
	circularIn: function (k) {
		return 1 - Math.sqrt(1 - k * k);
	},
	circularOut: function (k) {
		return Math.sqrt(1 - (--k * k));
	},
	circularInOut: function (k) {
		if ((k *= 2) < 1) { return -0.5 * (Math.sqrt(1 - k * k) - 1); }
		return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
	},
	elasticIn: function (k) {
		var s;
		var a = 0.1;
		var p = 0.4;
		if (k === 0) { return 0; }
		if (k === 1) { return 1; }
		if (!a || a < 1) { a = 1; s = p / 4; }
		else { s = p * Math.asin(1 / a) / (2 * Math.PI); }
		return -(a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
	},
	elasticOut: function (k) {
		var s;
		var a = 0.1;
		var p = 0.4;
		if (k === 0) { return 0; }
		if (k === 1) { return 1; }
		if (!a || a < 1) { a = 1; s = p / 4; }
		else { s = p * Math.asin(1 / a) / (2 * Math.PI); }
		return (a * Math.pow(2, -10 * k) * Math.sin((k - s) * (2 * Math.PI) / p) + 1);
	},
	elasticInOut: function (k) {
		var s;
		var a = 0.1;
		var p = 0.4;
		if (k === 0) { return 0; }
		if (k === 1) { return 1; }
		if (!a || a < 1) { a = 1; s = p / 4; }
		else { s = p * Math.asin(1 / a) / (2 * Math.PI); }
		if ((k *= 2) < 1) {
			return -0.5 * (a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
		}
		return a * Math.pow(2, -10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p) * 0.5 + 1;

	},

	// 在某一动画开始沿指示的路径进行动画处理前稍稍收回该动画的移动
	backIn: function (k) {
		var s = 1.70158;
		return k * k * ((s + 1) * k - s);
	},
	backOut: function (k) {
		var s = 1.70158;
		return --k * k * ((s + 1) * k + s) + 1;
	},
	backInOut: function (k) {
		var s = 1.70158 * 1.525;
		if ((k *= 2) < 1) { return 0.5 * (k * k * ((s + 1) * k - s)); }
		return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
	},

	// 创建弹跳效果
	bounceIn: function (k) {
		return 1 - easingFuncs.bounceOut(1 - k);
	},
	bounceOut: function (k) {
		if (k < (1 / 2.75)) { return 7.5625 * k * k; }
		else if (k < (2 / 2.75)) { return 7.5625 * (k -= (1.5 / 2.75)) * k + 0.75; }
		else if (k < (2.5 / 2.75)) { return 7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375; }
		else { return 7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375; }
	},
	bounceInOut: function (k) {
		if (k < 0.5) { return easingFuncs.bounceIn(k * 2) * 0.5; }
		return easingFuncs.bounceOut(k * 2 - 1) * 0.5 + 0.5;
	}
};

// 用于对数值进行钳制
function clamp (value, min, max) {
	return Math.max(min, Math.min(max, value));
}

// 用于获得DOM元素computedStyle
function getStyle (obj, attr) {
	if (obj.currentStyle) {
		return obj.currentStyle[attr];
	}
	else {
		return getComputedStyle(obj, false)[attr];
	}
}

// 用于手动触发对象的事件
function trigger (obj, eDetail) {
	obj.fireEvent( eDetail.type, eDetail);
}

// 用于处理获得时间函数的兼容性，performance.now() 更为精准
function now () {
	if (typeof performance !== 'undefined' && performance.now) {
		return performance.now();
	}
	return Date.now ? Date.now() : (new Date()).getTime();
}

// 产生范围内随机数
function rand (min,max){
	return Math.random() * (max - min) + min;
}

var EventDoer = function () {
	this.listeners = {};
};

var eventDoerInstanceFunc = {
	listeners:{},
	addEventListener: function (type, callback){
		if(!(type in this.listeners)){
			this.listeners[type] = [];
		}
		this.listeners[type].push(callback);
	},
	removeEventListener: function (type, callback){
		if(!(type in this.listeners)) return;
		var typeHandlers = this.listeners[type];
		for(var i = 0;i < typeHandlers.length;i++){
			if(typeHandlers[i] === callback){
				typeHandlers.splice(i,1);
				return;
			}
		}
	},
	fireEvent: function (name, detail){
		if(!(name in this.listeners)){
			return true;
		}
		var typeHandlers = this.listeners[name].concat();

		for(var i = 0;i < typeHandlers.length;i++){
			typeHandlers[i].call(this,detail);
		}
	},
	getListeners: function (name){
		if(name){
			return this.listeners[name];
		}
		return this.listeners;
	}
};

for( var key in eventDoerInstanceFunc){
	EventDoer.prototype[key] = eventDoerInstanceFunc[key];
}

function Anikyu (el, queue, config){
	EventDoer.call(this);
	this.el = el;
	this.queue = queue;

	var defaultConfig = {
		duration: 2000,
		easeType: 'quadraticInOut',
		manualNext: false
	};
	this.config = JSON.parse(JSON.stringify(defaultConfig));
	for(var key in config){
		this.config[key] = config[key];
	}
	this.i = 0;

	this.status = {
		paused: false
	};

	if (!this.queue[0]) {
		return;
	}
	if (!this.config.manualNext) {
		this.executor();
	}

	this.executor = this.executor.bind(this);

	this.reqAniHandler = null;
}
Anikyu.prototype = (function (o){
	function fn (){}
	fn.prototype = o;
	return new fn;
})(EventDoer.prototype);
Anikyu.prototype.constructor = Anikyu;

var anikyuInstanceFunc = {
	// 动画执行器，用于在前后一对补间动画阶段之间进行补间
	executor: function (index) {

		if(!isNaN(parseInt(index))) {
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

		var totalDelta = {};

		for (var key in finalStatus) {
			if(perviousStatus[key] === undefined){
				// 当前一个状态不存在时首先尝试向前搜索，直到第0个
				for(var j = i;j >= 0;j--){
					if(queue[j].props[key] !== undefined) {
						perviousStatus[key] = queue[j].props[key];
						continue;
					}
					// 若到第0个仍然找不到则直接访问原始对象中相关属性
					if(j === 0 && queue[j].props[key] === undefined){
						if(el[key] !== undefined && !isNaN(parseFloat(el[key]))){
							perviousStatus[key] = parseFloat(el[key]);
						}else {
							// 若依然访问不到，则直接设置该值为0
							perviousStatus[key] = 0;
						}
					}
				}

			}
			totalDelta[key] = finalStatus[key] - parseFloat(perviousStatus[key]);

			// console.table ? 
			// 	console.table({'final':finalStatus[key],'pervious':perviousStatus[key],'delta':totalDelta[key]})
			// 	:
			// 	console.log({'final':finalStatus[key],'pervious':perviousStatus[key],'delta':totalDelta[key]})
			// ;
			
		}
		var _this = this;

		var loop = function () {

			if (!status.paused) {
				// var endTime = status.startTime + duration;
				var currentTime = now();
				var currentProgress = clamp((currentTime - status.startTime) / duration, 0, 1);

				var newValue = {},stageDelta = {},frameDelta = {};
				for (var key in perviousStatus) {
					newValue[key] = perviousStatus[key] + totalDelta[key] * easingFuncs[easeType].call(this, currentProgress, step);

					stageDelta[key] = (newValue[key] === undefined ? 0 : newValue[key]) - (perviousStatus[key] === undefined ? 0 : perviousStatus[key]);

					frameDelta[key] = (newValue[key] === undefined ? 0 : newValue[key]) - (el[key] === undefined ? 0 : parseFloat(el[key]));
				}

				if(Object.assign){
					Object.assign(el,newValue);
				} else {
					for(var key in newValue){
						el[key] = newValue[key];
					}
				}

				if (currentProgress == 1) {
					// clearInterval(timer)
					// cancelAnimationFrame(this.reqAniHandler);
					// 如何执行下一步？

					setTimeout(function (){
						// if (queue[i + 1].onFinished instanceof Function) {
						// 	queue[i + 1].onFinished(this);
						// }
						trigger(_this,{
							type:'finish',
							stageIndex:currentStageIndex,
							name:queue[currentStageIndex].name
						});
						if (!config.manualNext) {
							next.call(_this);
						}
					}, delay);
					// debugger
					return;
				}
				trigger(_this,{
					type:'animate',
					stageIndex:_this.i,
					name:queue[currentStageIndex].name ? queue[currentStageIndex].name : '',
					progress:currentProgress,
					target:el,
					value:newValue,
					stageDelta:stageDelta,
					frameDelta:frameDelta
				});
				// if (queue[i + 1].onAnimating instanceof Function) {
				// 	queue[i + 1].onAnimating(this);
				// }
			}
			_this.reqAniHandler = requestAnimationFrame(loop);
		};
		setTimeout(loop,delay);
		// loop();
	},

	// 动画流程控制
	// 暂停、继续、重播当前
	pause: function () {
		var status = this.status;

		if(status.paused) return;

		var pausedTime = now();
		status.passedTime = pausedTime - status.startTime;
		status.paused = true;
	},
	resume: function () {
		var status = this.status;

		if(!status.paused) return;

		var startTime =  now();
		status.startTime = startTime - status.passedTime;
		status.paused = false;
	},

	replay: function () {
		var status = this.status,
			queue = this.queue,
			i = this.i,
			executor = this.executor,
			resume = this.executor;

		if(!queue[i]) return;
		if(status.paused) (resume.bind(this))();

		executor(i);
	},

	// 跳转到、上一个、下一个
	jump: function (index,finishCallFlag) {
        
		var status = this.status,
			queue = this.queue,
			executor = this.executor,
			resume = this.executor;

		if(!queue[index]) return;
		if(status.paused) (resume.bind(this))();

		executor(finishCallFlag ? index - 2 : index - 1);
		// executor(index - 2);

	},
	prev: function () {
		var status = this.status,
			queue = this.queue,
			i = this.i,
			executor = this.executor,
			resume = this.executor;
		if(!queue[i - 1]) return;

		if(status.paused) (resume.bind(this))();

		this.i--;
		executor();
	},
	next: function () {
		var status = this.status,
			queue = this.queue,
			i = this.i,
			executor = this.executor,
			resume = this.executor;
		if(!queue[i + 1]) return;

		if(status.paused) (resume.bind(this))();

		this.i++;
		executor();
	},
	// 废弃
	dispose: function () {
		cancelAnimationFrame(this.reqAniHandler);
		trigger(this,{
			type: 'dispose'
		});
		for(var key in this){
			this[key] = undefined;
			delete this[key];
		}
	}
};
for(var key$1 in anikyuInstanceFunc){
	Anikyu.prototype[key$1] = anikyuInstanceFunc[key$1];
}

var anikyuStaticFunc = {
	getStyle:getStyle,
	rand:rand,
	clamp:clamp
};
for(var key$1 in anikyuStaticFunc){
	Anikyu[key$1] = anikyuStaticFunc[key$1];
}

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
}(typeof window === 'undefined' ? global : window));

export default Anikyu;
