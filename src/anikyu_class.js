import { easingFuncs as ease } from './easing_funcs.js';
import { clamp, getStyle, trigger, rand, now } from './util.js';
import EventDoer from './event_doer.js';

class Anikyu extends EventDoer {

	constructor (el, queue, config) {
		super();
		this.el = el;
		this.queue = queue;

		let defaultConfig = {
			duration: 2000,
			easeType: 'quadraticInOut',
			manualNext: false
		};
		this.config = Object.assign(JSON.parse(JSON.stringify(defaultConfig)),config);

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

	// 动画执行器，用于在前后一对补间动画阶段之间进行补间
	executor (index) {

		if(!isNaN(parseInt(index))) {
			this.i = index;
		}

		let { el, i, queue, next, status, config,reqAniHandler } = this;

		cancelAnimationFrame(reqAniHandler);

		if (!queue[i] || !queue[i + 1]) {
			return;
		}
		let perviousStatus = queue[i].props,
			finalStatus = queue[i + 1].props;

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

		status.startTime = now() + delay;

		let totalDelta = {};

		for (let key in finalStatus) {
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

		let loop = () => {

			if (!status.paused) {
				// let endTime = status.startTime + duration;
				let currentTime = now();
				let currentProgress = clamp((currentTime - status.startTime) / duration, 0, 1);

				let newValue = {},stageDelta = {},frameDelta = {};
				for (let key in perviousStatus) {
					newValue[key] = perviousStatus[key] + totalDelta[key] * ease[easeType].call(this, currentProgress, step);

					stageDelta[key] = (newValue[key] === undefined ? 0 : newValue[key]) - (perviousStatus[key] === undefined ? 0 : perviousStatus[key]);

					frameDelta[key] = (newValue[key] === undefined ? 0 : newValue[key]) - (el[key] === undefined ? 0 : parseFloat(el[key]));
				}

				Object.assign(el,newValue);

				if (currentProgress == 1) {
					// clearInterval(timer)
					// cancelAnimationFrame(this.reqAniHandler);
					// 如何执行下一步？

					setTimeout(()=>{
						// if (queue[i + 1].onFinished instanceof Function) {
						// 	queue[i + 1].onFinished(this);
						// }
						trigger(this,{
							type:'finish',
							stageIndex:currentStageIndex,
							name:queue[currentStageIndex].name ? queue[currentStageIndex].name : ''
						});
						if (!config.manualNext) {
							next.call(this);
						}
					}, delay);
					// debugger
					return;
				}
				trigger(this,{
					type:'animate',
					stageIndex:this.i,
					name:queue[currentStageIndex].name ? queue[currentStageIndex].name : '',
					progress:currentProgress,
					target:el,
					value:newValue,
					stageDelta,
					frameDelta
				});
				// if (queue[i + 1].onAnimating instanceof Function) {
				// 	queue[i + 1].onAnimating(this);
				// }
			}
			this.reqAniHandler = requestAnimationFrame(loop);
		};
		setTimeout(loop,delay);
		// loop();
	}

	// 动画流程控制
	// 暂停、继续、重播当前
	pause () {
		let { status } = this;

		if(status.paused) return;

		let pausedTime = now();
		status.passedTime = pausedTime - status.startTime;
		status.paused = true;
	}
	resume () {
		let { status } = this;

		if(!status.paused) return;

		let startTime =  now();
		status.startTime = startTime - status.passedTime;
		status.paused = false;
	}

	replay () {
		let {status,queue,i,executor,resume} = this;

		if(!queue[i]) return;
		if(status.paused) (resume.bind(this))();

		executor(i);
	}

	// 跳转到、上一个、下一个
	jump (index,finishCallFlag) {
		let {status,queue,executor,resume} = this;

		if(!queue[index]) return;
		if(status.paused) (resume.bind(this))();

		executor(finishCallFlag ? index - 2 : index - 1);
		// executor(index - 2);

	}
	prev () {
		let {status,queue,i,executor,resume} = this;
		if(!queue[i - 1]) return;

		if(status.paused) (resume.bind(this))();

		this.i--;
		executor();
	}
	next () {
		let {status,queue,i,executor,resume} = this;
		if(!queue[i + 1]) return;

		if(status.paused) (resume.bind(this))();

		this.i++;
		executor();
	}

	// 废弃
	dispose () {
		let { queue, i, reqAniHandler } = this;

		let currentStageIndex = i + 1;
		cancelAnimationFrame(reqAniHandler);
		trigger(this,{
			type: 'dispose',
			stageIndex: i,
			name: queue[currentStageIndex].name ? queue[currentStageIndex].name : ''
		});
		// for(let key in this){
		// 	this[key] = undefined;
		// 	delete this[key];
		// }
	}
}

Object.assign(Anikyu, {
	getStyle,rand,clamp
});

export default Anikyu;