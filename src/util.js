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
	
	let theEvent = new CustomEvent(eName, {
		detail: Object.assign({},eDetail)
	});
	obj.dispatchEvent(theEvent);
}

export {clamp,getStyle,trigger};