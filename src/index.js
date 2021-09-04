import './js/animation';

import './js/button-event';

import { cube } from './js/math';

import('lodash').then((_) => {
	console.log(_);
});
console.log(cube(1000));
