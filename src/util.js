// 用于对数值进行钳制
function clamp (value, min, max) {
	return Math.max(min, Math.min(max, value));
}

// 用于获得DOM元素computedStyle
function getStyle (obj, attr) {
	if (obj.currentStyle) {
		return obj.currentStyle[attr];
	}
	else {
		return getComputedStyle(obj, false)[attr];
	}
}

// 用于手动触发对象的事件
function trigger (obj, type, target,detail) {
	obj.fireEvent( type, {
		type,
		target,
		detail
	});
}

// 用于处理获得时间函数的兼容性，performance.now() 更为精准
function now () {
	if (typeof performance !== 'undefined' && performance.now) {
		return performance.now();
	}
	return Date.now ? Date.now() : (new Date()).getTime();
}

// 产生范围内随机数
function rand (min,max){
	return Math.random() * (max - min) + min;
}

export {clamp, getStyle, trigger, rand, now};