import { easingFuncs as ease } from './easing_funcs.js';
import { clamp, getStyle } from './util.js';

class Animation {

	constructor(el, queue, duration = 2000, easeType = 'quadraticInOut', manualNext = false) {
		this.el = el;
		this.queue = queue;
		this.duration = duration;
		this.easeType = easeType;
		this.manualNext = manualNext;

		this.i = 0;

		this.status = {
			paused: false
		};

		this.status.paused = false;

		if (!queue[0]) {
			return;
		}
		if (!this.manualNext) {
			this.animationQueueHandler = this.go();
			setTimeout(() => this.animationQueueHandler.next(), this.queue[0].delay);
		}

		// debugger

	}
	pause() {
		let { startTime } = this.status;
		let duration = this.queue[this.i + 1].duration;
		this.status.paused = true;
		let pausedTime = new Date().getTime();
		this.status.passedTime = pausedTime - startTime;
	}
	resume() {
		let { status } = this;

		status.startTime = new Date().getTime() - status.passedTime;
		this.status.paused = false;

	}
	*go() {
		let { i, queue, executor } = this;
		while (i <= queue.length) {
			yield queue[i + 1] ? (
				executor(
					this
				),
				true
			)
				:
				undefined;
		}
	}
	executor(context) {
		// super();
		let { el, i, queue, duration, easeType, animationQueueHandler, next, manualNext, status } = context;
		if (!queue[i]) {
			return;
		}
		let perviousStatus = queue[i].props,
			finalStatus = queue[i + 1] ? queue[i + 1].props : undefined;
		let delay = (queue[i + 1] && queue[i + 1].delay) ? queue[i + 1].delay : undefined;
		if (!finalStatus) {
			return;
		}

		easeType = queue[i + 1].easeType ? queue[i + 1].easeType : easeType;
		duration = queue[i + 1].duration ? queue[i + 1].duration : duration;

		status.startTime = new Date().getTime();

		let totalDelta = {};

		for (let key in finalStatus) {
			totalDelta[key] = finalStatus[key] - parseInt(el.style[key]);
		}

		let loop = () => {

			if (!context.status.paused) {
				let endTime = status.startTime + duration;
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
						if (queue[i + 1].callback instanceof Function) {
							queue[i + 1].callback();
						}
						if (!manualNext) {
							next.call(context);
						}
					}, delay);
					// debugger
					return;
				}
			}

			requestAnimationFrame(loop);

		};
		loop();
	}

	next() {
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