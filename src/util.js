function clamp (value, min, max) {
	return Math.max(min, Math.min(max, value));
}
function getStyle (obj, attr) {
	if (obj.currentStyle) {
		return obj.currentStyle[attr];
	}
	else {
		return getComputedStyle(obj, false)[attr];
	}
}

function trigger (obj, eName ,eDetail) {
	let theEvent;
	try {
		theEvent = new CustomEvent(eName, {
			detail: Object.assign({},eDetail),
		});
	} catch (e){
		// 这里的代码用于兼容IE 9-11等无法使用CustomEvent构造函数的浏览器
		theEvent = document.createEvent('CustomEvent');

		// theEvent.initEvent(eName, true, true);
		// initEvent无法传递detail，若直接对事件对象中的detail赋值会直接报错
		// 因此需要使用initCustomEvent
		theEvent.initCustomEvent(eName, true, true, eDetail);
	}

	obj.dispatchEvent(theEvent);
}


function rand (min,max){
	return Math.random() * (max - min) + min;
}

export {clamp,getStyle,trigger,rand};