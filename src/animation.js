import { easingFuncs as ease } from './easing_funcs.js';
import { clamp, getStyle } from './util.js';

class Animation {

	constructor(el, queue, config) {

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
			this.animationQueueHandler = this.go();
			setTimeout(() => this.animationQueueHandler.next(), this.queue[0].delay);
		}

		// debugger

	}
	pause() {
		if(this.status.paused) return;
		let { startTime } = this.status;
		this.status.paused = true;
		let pausedTime = new Date().getTime();
		this.status.passedTime = pausedTime - startTime;
	}
	resume() {
		if(!this.status.paused) return;
		let { status } = this;
		status.startTime = new Date().getTime() - status.passedTime;
		this.status.paused = false;
	}
	*go() {
		let { i, queue, executor } = this;
		while (i <= queue.length) {
			yield queue[i + 1] ? (
				executor.call(this),
				true
			)
				:
				undefined;
		}
	}
	executor() {
		// super();
		let { el, i, queue, next, status, config } = this;
		if (!queue[i]) {
			return;
		}
		let perviousStatus = queue[i].props,
			finalStatus = queue[i + 1] ? queue[i + 1].props : undefined;
		let delay = (queue[i + 1] && queue[i + 1].delay) ? queue[i + 1].delay : undefined;
		if (!finalStatus) {
			return;
		}

		let easeType = queue[i + 1].easeType ? queue[i + 1].easeType : config.easeType;
		let duration = queue[i + 1].duration ? queue[i + 1].duration : config.duration;

		status.startTime = new Date().getTime();

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
					cancelAnimationFrame(loop);
					//如何执行下一步？

					setTimeout(() => {
						if (queue[i + 1].onFinished instanceof Function) {
							queue[i + 1].onFinished();
						}
						if (!config.manualNext) {
							next.call(this);
						}
					}, delay);
					// debugger
					return;
				}
				if (queue[i + 1].onAnimating instanceof Function) {
					queue[i + 1].onAnimating({
						percent: currentProgress
					});
				}
			}
			requestAnimationFrame(loop);
		};
		loop();
	}

	next() {
		// TODO: when call next, skip everyting in last queue item.

		if(this.status.paused) this.resume();

		if (!this.animationQueueHandler) {
			this.animationQueueHandler = this.go();
			setTimeout(() => this.animationQueueHandler.next(), this.queue[0].delay);
		} else {
			this.i++;
			this.animationQueueHandler.next();
		}
	}
}

Object.assign(Animation, {
	getStyle
});

export default Animation;