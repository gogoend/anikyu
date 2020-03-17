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

function trigger (obj, eDetail) {
	obj.fireEvent( eDetail.type, eDetail);
}


function rand (min,max){
	return Math.random() * (max - min) + min;
}

export {clamp,getStyle,trigger,rand};