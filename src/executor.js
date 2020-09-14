import { clamp, trigger, now } from './util.js';
import { easingFuncs } from './easing_funcs.js';

export let ease = Object.assign(easingFuncs);

// 获得动画在当前进度时的变化增量
function getAddedValue (from, to, percent, easeFn, step) {
	return (to - from) * easeFn(percent, step);
}

// 动画执行器，用于在前后一对补间动画阶段之间进行补间
export default function executor (index, { getNextOneFrame, ignoreDelay = false } = {} ) {

	let percent = index - Math.floor(index);
	index = Math.floor(index);

	let {queue} = this;
	if (!isNaN(index)) {
		this.i = index;
	}

	percent = isNaN(percent) ? 0 : percent;
	let { el, i, status, config, reqAniHandler } = this;

	cancelAnimationFrame(reqAniHandler);
	this.reqAniHandler = undefined;

	if (!queue[i] || !queue[i + 1]) {
		return;
	}
	let perviousStatus = queue[i].props, finalStatus = queue[i + 1].props;

	// 确保每一次的初始状态都和前一对象中的属性相等
	// 修复重播当前、跳转到、上一个、下一个函数不正常工作的问题
	for (let key in perviousStatus) {
		el[key] = perviousStatus[key];
	}

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

	let getAnimationFrame = (percent) => {

		let { i } = this;
		let currentIndex = i + 1;

		if (!queue[i] || !queue[currentIndex]) {
			return;
		}

		// 防止当前时间早于开始时间（进度小于 0 ）时请求帧 —— animationStage 包含 delay 时会发生这种情况
		if(now() < status.startTime) return;

		let perviousStatus = queue[i].props, finalStatus = queue[currentIndex].props;

		let easeType = queue[currentIndex].easeType ? queue[currentIndex].easeType : config.easeType;
	
		let step = queue[currentIndex].step ? queue[currentIndex].step : undefined;

		let currentProgress = percent;
		console.log(currentProgress);

		let newValue = {}, stageDelta = {}, frameDelta = {};
		for (let key in perviousStatus) {

			let perviousVal = parseFloat(perviousStatus[key]);
			let finalVal = parseFloat(finalStatus[key]);

			newValue[key] = perviousVal + getAddedValue(perviousVal, finalVal, currentProgress, ease[easeType], step);

			stageDelta[key] = (newValue[key] === undefined ? 0 : newValue[key]) - (perviousVal === undefined ? 0 : perviousVal);

			frameDelta[key] = (newValue[key] === undefined ? 0 : newValue[key]) - (el[key] === undefined ? 0 : parseFloat(el[key]));
		}

		Object.assign(el, newValue);
		trigger(this, 'animate', el, {
			stageIndex: currentIndex,
			name: queue[currentIndex].name ? queue[currentIndex].name : '',
			progress: currentProgress,
			// target:el,
			value: newValue,
			stageDelta,
			frameDelta
		});
		if (currentProgress == 1) {
			// 如何进入下一阶段
			for (let key in finalStatus) {
				el[key] = finalStatus[key];
			}
			trigger(this, 'finish', el, {
				stageIndex: currentIndex,
				name: queue[currentIndex].name ? queue[currentIndex].name : ''
			});
			if (!config.manualNext) {
				loop = ()=> void 0;
				executor.call(this, this.i += 1);
			}
			return;
		}
		
	};

	let duration = queue[i + 1].duration ? queue[i + 1].duration : config.duration;
	let delay = queue[i + 1].delay !== undefined ? queue[i + 1].delay : 0;

	if( ignoreDelay ){
		delay = 0;
	}
	
	// 把传入的percent带入计算
	let passedTime = percent * duration;
	status.startTime = now() - passedTime + delay;
	
	if( getNextOneFrame ){
		getAnimationFrame(percent);
	}

	let loop = () => {
		if (!status.paused) {
			let currentProgress = percent ? percent : clamp((now() - status.startTime) / duration, 0, 1);
			percent = undefined;
			getAnimationFrame(currentProgress);
		}
		this.reqAniHandler = requestAnimationFrame(loop);
	};
	if(!this.reqAniHandler){
		loop();
	}
}