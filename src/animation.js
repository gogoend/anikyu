import { easingFuncs as ease } from './easing_funcs.js';
import { clamp, getStyle ,trigger } from './util.js';

class Animation extends EventTarget {

	constructor(el, queue, config) {
		super();
		this.el = el;
		this.queue = queue;

		let defaultConfig={
			duration: 2000,
			easeType: 'quadraticInOut',
			manualNext: false
		};
		this.config=Object.assign(JSON.parse(JSON.stringify(defaultConfig)),config);

		this.i = 0;

		this.status = {
			paused: false
		};

		if (!this.queue[0]) {
			return;
		}
		if (!this.config.manualNext) {
			this.executor();
			// setTimeout(() => this.executor(), this.queue[0].delay);
		}

		this.reqAniHandler = null;

	}

	// 动画执行器，用于在前后一对补间动画阶段之间进行补间
	executor(index) {

		cancelAnimationFrame(this.reqAniHandler);

		if(!isNaN(parseInt(index))) this.i=index;

		let { el, i, queue, next, status, config } = this;

		if (!queue[i]) {
			return;
		}
		let perviousStatus = queue[i].props,
			finalStatus = queue[i + 1] ? queue[i + 1].props : undefined;
		let delay = (queue[i + 1] && queue[i + 1].delay) ? queue[i + 1].delay : 0;
		if (!finalStatus) {
			return;
		}

		// 确保每一次的初始状态都和前一对象中的属性相等
		// 修复重播当前、跳转到、上一个、下一个函数不正常工作的问题
		for (let key in perviousStatus) {
			el.style[key] = perviousStatus[key];
		}

		let easeType = queue[i + 1].easeType ? queue[i + 1].easeType : config.easeType;
		let duration = queue[i + 1].duration ? queue[i + 1].duration : config.duration;

		status.startTime = new Date().getTime()+delay;

		let totalDelta = {};

		for (let key in finalStatus) {
			totalDelta[key] = finalStatus[key] - parseInt(el.style[key]);
		}

		let loop = () => {

			if (!status.paused) {
				// let endTime = status.startTime + duration;
				let currentTime = new Date().getTime();
				let currentProgress = clamp((currentTime - status.startTime) / duration, 0, 1);

				// console.log(el.style.width)

				for (let key in perviousStatus) {
					el.style[key] = perviousStatus[key] + totalDelta[key] * ease[easeType](currentProgress) + 'px';
				}

				if (currentProgress == 1) {
					// clearInterval(timer)
					// cancelAnimationFrame(this.reqAniHandler);
					//如何执行下一步？

					setTimeout(() => {
						// if (queue[i + 1].onFinished instanceof Function) {
						// 	queue[i + 1].onFinished(this);
						// }
						trigger(this,'finished',{
							stageIndex:this.i
						});
						if (!config.manualNext) {
							next.call(this);
						}
					}, delay);
					// debugger
					return;
				}
				trigger(this,'animating',{
					stageIndex:this.i,
					progress:currentProgress
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
	// 预期实现的功能：暂停、继续、重播当前、跳转到、上一个、下一个
	pause() {
		if(this.status.paused) return;
		let { startTime } = this.status;
		this.status.paused = true;
		let pausedTime = new Date().getTime();
		this.status.passedTime = pausedTime - startTime;
	}
	resume() {
		let { status } = this;

		if(!this.status.paused) return;
		status.startTime = new Date().getTime() - status.passedTime;
		this.status.paused = false;
	}
	replay() {
		if(!this.queue[this.i]) return;
		if(this.status.paused) this.resume();

		this.executor(this.i);
	}
	jump(index) {
		if(!this.queue[index]) return;
		if(this.status.paused) this.resume();

		this.executor(index);
	}
	prev() {
		if(!this.queue[this.i-1]) return;
		if(this.status.paused) this.resume();

		this.i--;
		this.executor();
	}
	next() {
		// TODO: when call next, skip everyting in last queue item.

		if(this.status.paused) this.resume();

		if(!this.queue[this.i+1]) return;

		this.i++;
		this.executor();

	}
	dispose() {
		cancelAnimationFrame(this.reqAniHandler);
	}
}

Object.assign(Animation, {
	getStyle
});

export default Animation;