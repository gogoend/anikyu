import { clamp, getStyle, trigger, rand, now } from './util.js';
import EventDoer from './event_doer.js';
import executor,{ ease } from './executor.js';

function mixEaseFn (obj){
	for(let key in obj){
		ease[key] = obj[key];
	}
}

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
		this.config = Object.assign(JSON.parse(JSON.stringify(defaultConfig)), config);

		this.i = 0;

		this.status = {
			paused: false
		};

		if (!this.queue[0]) {
			return;
		}
		if (!this.config.manualNext) {
			executor.call(this);
		}

		// this.executor = this.executor.bind(this);

		this.reqAniHandler = null;

	}

	// 动画流程控制
	// 暂停、继续、重播当前
	pause () {
		let { status } = this;

		if (status.paused) return;

		let pausedTime = now();
		status.passedTime = pausedTime - status.startTime;
		status.paused = true;
	}
	resume () {
		let { status } = this;

		if (!status.paused) return;

		let startTime = now();
		status.startTime = startTime - status.passedTime;
		status.paused = false;
	}

	replay () {
		let { status, queue, i, resume } = this;

		if (!queue[i]) return;
		if (status.paused) (resume.bind(this))();

		executor.call(this, i);
	}

	// 跳转到、上一个、下一个
	jump (index, finishCallFlag) {
		let { status, queue, resume } = this;

		if (!queue[index]) return;
		if (status.paused) (resume.bind(this))();

		executor.call(this, finishCallFlag ? index - 2 : index - 1);

	}
	prev () {
		let { status, queue, i, resume } = this;
		if (!queue[i - 1]) return;

		if (status.paused) (resume.bind(this))();

		this.i--;
		executor.call(this);
	}
	next () {
		let { status, queue, i, resume } = this;
		if (!queue[i + 1]) return;

		if (status.paused) (resume.bind(this))();

		this.i++;
		executor.call(this);
	}

	// 废弃
	dispose () {
		let { queue, i, reqAniHandler, el } = this;

		let currentStageIndex = i + 1;
		cancelAnimationFrame(reqAniHandler);
		trigger(this, 'dispose', el, {
			stageIndex: i,
			name: queue[currentStageIndex].name ? queue[currentStageIndex].name : ''
		});
	}
}

Object.assign(Anikyu, {
	getStyle, rand, clamp, mixEaseFn
});

export default Anikyu;