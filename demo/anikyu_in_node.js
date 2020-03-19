'use strict';
let Anikyu = require('../dist/anikyu.min.js');
let obj = {};
let aniArr = [{
	props: { s: 0 }
}, {
	easeType: 'elasticOut',
	duration: 10000,
	props: { s: 360 }
}];
let ani = new Anikyu(obj,aniArr);
ani.addEventListener('animate',function (e){
	if(console.clear) console.clear();
	console.log(e);
});
