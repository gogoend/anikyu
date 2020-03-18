const pkg = require('./package.json');

export default {
	input: 'src/anikyu.js',
	output: [
		{
			file: 'dist/anikyu.js',
			name: 'Anikyu',
			format: 'umd'
		},
		// {
		// 	file: 'dist/anikyu.amd.js',
		// 	format: 'amd'
		// },
		// {
		// 	file: 'dist/anikyu.cjs.js',
		// 	format: 'cjs'
		// },
		{
			file: 'dist/anikyu.esm.js',
			format: 'es'
		}
	]
};