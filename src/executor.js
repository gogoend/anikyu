import { clamp, trigger, now } from './util.js';
import { easingFuncs } from './easing_funcs.js';

export let ease = Object.assign(easingFuncs);

// 获得动画在当前进度时的变化增量
function getAddedValue (from, to, percent, easeFn, step) {
	return (to - from) * easeFn(percent, step);
}

// 动画执行器，用于在前后一对补间动画阶段之间进行补间
export default function executor (index, percent = 0 ) {
	console.log(this,'zzz');

	let {queue} = this;
	if (!isNaN(parseInt(index))) {
		this.i = index;
	}

	if(percent >= 1){
		this.i = clamp(this.i + 1,0,queue.length);
		percent = 0;
	}
	let { el, i, status, config, reqAniHandler } = this;

	cancelAnimationFrame(reqAniHandler);
	this.reqAniHandler = 0;

	if (!queue[i] || !queue[i + 1]) {
		return;
	}
	let perviousStatus = queue[i].props, finalStatus = queue[i + 1].props;

	let delay = queue[i + 1].delay !== undefined ? queue[i + 1].delay : 0;
	let currentStageIndex = this.i + 1;

	// 确保每一次的初始状态都和前一对象中的属性相等
	// 修复重播当前、跳转到、上一个、下一个函数不正常工作的问题
	for (let key in perviousStatus) {
		el[key] = perviousStatus[key];
	}

	let easeType = queue[i + 1].easeType ? queue[i + 1].easeType : config.easeType;
	let duration = queue[i + 1].duration ? queue[i + 1].duration : config.duration;

	let step = queue[i + 1].step ? queue[i + 1].step : undefined;


	// 考虑一下如何把传入的percent给算进来
	// // eslint-disable-next-line no-debugger
	// debugger;
	let passedTime = percent * duration;
	status.startTime = now() - passedTime + delay;

	// let totalDelta = {};

	for (let key in finalStatus) {
		if (perviousStatus[key] === undefined) {
			// 当前一个状态不存在时首先尝试向前搜索，直到第0个
			for (var j = i; j >= 0; j--) {
				if (queue[j].props[key] !== undefined) {
					perviousStatus[key] = queue[j].props[key];
					continue;
				}
				// 若到第0个仍然找不到则直接访问原始对象中相关属性
				if (j === 0 && queue[j].props[key] === undefined) {
					if (el[key] !== undefined && !isNaN(parseFloat(el[key]))) {
						perviousStatus[key] = parseFloat(el[key]);
					} else {
						// 若依然访问不到，则直接设置该值为0
						perviousStatus[key] = 0;
					}
				}
			}

		}
	}

	let getNextFrame = (percent) => {

		let perviousStatus = queue[this.i].props, finalStatus = queue[this.i + 1].props;
		
		let currentProgress = percent;// ? percent : clamp((currentTime - status.startTime) / duration, 0, 1);
		console.log(currentProgress);

		let newValue = {}, stageDelta = {}, frameDelta = {};
		for (let key in perviousStatus) {

			let perviousVal = parseFloat(perviousStatus[key]);
			let finalVal = parseFloat(finalStatus[key]);

			newValue[key] = perviousVal + getAddedValue(perviousVal, finalVal, currentProgress, ease[easeType], step); // totalDelta[key] * ease[easeType].call(this, currentProgress, step);

			stageDelta[key] = (newValue[key] === undefined ? 0 : newValue[key]) - (perviousVal === undefined ? 0 : perviousVal);

			frameDelta[key] = (newValue[key] === undefined ? 0 : newValue[key]) - (el[key] === undefined ? 0 : parseFloat(el[key]));
		}

		Object.assign(el, newValue);
		trigger(this, 'animate', el, {
			stageIndex: this.i,
			name: queue[currentStageIndex].name ? queue[currentStageIndex].name : '',
			progress: currentProgress,
			// target:el,
			value: newValue,
			stageDelta,
			frameDelta
		});
		// if (queue[i + 1].onAnimating instanceof Function) {
		// 	queue[i + 1].onAnimating(this);
		// }
		if (currentProgress == 1) {
			// clearInterval(timer)
			// cancelAnimationFrame(this.reqAniHandler);
			// 如何执行下一步？

			// setTimeout(() => {
			// if (queue[i + 1].onFinished instanceof Function) {
			// 	queue[i + 1].onFinished(this);
			// }
			for (let key in finalStatus) {
				el[key] = finalStatus[key];
			}
			trigger(this, 'finish', el, {
				stageIndex: currentStageIndex,
				name: queue[currentStageIndex].name ? queue[currentStageIndex].name : ''
			});
			if (!config.manualNext) {
				// debugger
				// next.call(this);
				executor.call(this,this.i += 1);
			}
			// }, delay);
			// debugger
			return;
		}
		
	};

	let loop = () => {
		if (!status.paused) {
			// let endTime = status.startTime + duration;
			let currentTime = now();
			let currentProgress = percent ? percent : clamp((currentTime - status.startTime) / duration, 0, 1);
			getNextFrame(currentProgress);
		}
		this.reqAniHandler = requestAnimationFrame(loop);
	};
	if(!this.reqAniHandler){
		loop();
	}
	// setTimeout(loop, delay);
	// loop();
}