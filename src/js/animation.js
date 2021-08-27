import Anikyu from '../lib/anikyu.js';

var el = document.querySelector('.target');

var obj = {};

var ani = new Anikyu(obj, [
	{
		props: {
			top: 100,
			left: 100,
			rotate: 0
		}
	},
	{
		delay: 1000,
		props: {
			top: 200,
			left: 700,
			rotate: 359
		}
	},
	{
		props: {
			top: 100,
			left: 100,
			rotate: 0
		}
	},
], {
	easeType: 'elasticInOut'
});
ani.addEventListener('animate', function () {
	el.style.top = obj.top + 'px';
	el.style.left = obj.left + 'px';
	el.style.transform = 'rotate(' + Math.round(obj.rotate) + 'deg)';
});
ani.addEventListener('finish', function (e) {
	if (e.detail.stageIndex === 2) {
		ani.jump(0);
	}
});