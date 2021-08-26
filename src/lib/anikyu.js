import Anikyu from './anikyu_class.js';
import './polyfill/requestAnimationFrame.js';

import { version } from '../../package.json';

Object.assign(Anikyu, {
	VERSION: version
});

console.log(
	'%c Anikyu ', `
    font-size:5em;background-color:rgb(252,107,150);color:#fff;`,
	`\nVersion:${Anikyu.VERSION}`
);

export default Anikyu;