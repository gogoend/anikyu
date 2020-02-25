import { easingFuncs as ease } from './easing_funcs.js';
import { clamp, getStyle ,trigger } from './util.js';

class Animation extends EventTarget {

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

		let { el, i, queue, next, status, config,reqAniHandler } = this;

		cancelAnimationFrame(reqAniHandler);

		if(!isNaN(parseInt(index))) this.i = index;

		if (!queue[i] || !queue[i + 1]) {
			return;
		}
		let perviousStatus = queue[i].props,
			finalStatus = queue[i + 1].props;

		let delay = queue[i].delay !== undefined ? queue[i].delay : 0;
		let currentStageIndex = this.i;

		// 确保每一次的初始状态都和前一对象中的属性相等
		// 修复重播当前、跳转到、上一个、下一个函数不正常工作的问题
		for (let key in perviousStatus) {
			el[key] = perviousStatus[key];
		}

		let easeType = queue[i + 1].easeType ? queue[i + 1].easeType : config.easeType;
		let duration = queue[i + 1].duration ? queue[i + 1].duration : config.duration;

		status.startTime = new Date().getTime() + delay;

		let totalDelta = {};

		for (let key in finalStatus) {
			totalDelta[key] = finalStatus[key] - parseInt(perviousStatus[key]);
		}

		let loop = () => {

			if (!status.paused) {
				// let endTime = status.startTime + duration;
				let currentTime = new Date().getTime();
				let currentProgress = clamp((currentTime - status.startTime) / duration, 0, 1);

				let newValue = {},stageDeltas = {},frameDeltas = {};
				for (let key in perviousStatus) {
					newValue[key] = perviousStatus[key] + totalDelta[key] * ease[easeType](currentProgress);

					stageDeltas[key] = (newValue[key] === undefined ? 0 : newValue[key]) - (perviousStatus[key] === undefined ? 0 : perviousStatus[key]);

					frameDeltas[key] = (newValue[key] === undefined ? 0 : newValue[key]) - (el[key] === undefined ? 0 : parseFloat(el[key]));
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
						trigger(this,'finish',{
							stageIndex:currentStageIndex,
							name:queue[currentStageIndex].name
						});
						if (!config.manualNext) {
							next.call(this);
						}
					}, delay);
					// debugger
					return;
				}
				trigger(this,'animate',{
					stageIndex:this.i,
					name:queue[currentStageIndex].name ? queue[currentStageIndex].name : '',
					progress:currentProgress,
					values:el,
					stageDeltas,
					frameDeltas
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

		let pausedTime = new Date().getTime();
		status.passedTime = pausedTime - status.startTime;
		status.paused = true;
	}
	resume () {
		let { status } = this;

		if(!status.paused) return;

		let startTime =  new Date().getTime();
		status.startTime = startTime - status.passedTime;
		status.paused = false;
	}

	replay () {
		let {status,queue,i,executor,resume} = this;

		if(!queue[i]) return;
		if(status.paused) resume();

		executor(i);
	}

	// 跳转到、上一个、下一个
	jump (index) {
		let {status,queue,executor,resume} = this;

		if(!queue[index]) return;
		if(status.paused) resume();

		executor(index);
	}
	prev () {
		let {status,queue,i,executor,resume} = this;
		if(!queue[i - 1]) return;

		if(status.paused) resume();

		this.i--;
		executor();
	}
	next () {
		let {status,queue,i,executor,resume} = this;
		if(!queue[i + 1]) return;

		if(status.paused) resume();

		this.i++;
		executor();
	}

	// 废弃
	dispose () {
		cancelAnimationFrame(this.reqAniHandler);
		trigger(this,'dispose');
		for(let key in this){
			this[key] = undefined;
			delete this[key];
		}
	}
}

Object.assign(Animation, {
	getStyle
});

export default Animation;