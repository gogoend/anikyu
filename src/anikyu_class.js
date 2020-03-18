import { easingFuncs as ease } from './easing_funcs.js';
import { clamp, getStyle, trigger, rand, now } from './util.js';
import EventDoer from './event_doer.js';

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
						}else{
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
					newValue[key] = perviousStatus[key] + totalDelta[key] * ease[easeType].call(this, currentProgress, step);

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
for(var key in anikyuInstanceFunc){
	Anikyu.prototype[key] = anikyuInstanceFunc[key];
}

var anikyuStaticFunc = {
	getStyle:getStyle,
	rand:rand,
	clamp:clamp
};
for(var key in anikyuStaticFunc){
	Anikyu[key] = anikyuStaticFunc[key];
}

export default Anikyu;