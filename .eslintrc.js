module.exports = {
	'env': {
		'browser': true,
		'es6': true,
		'node': true
	},
	'extends': 'eslint:recommended',
	'globals': {
		'Atomics': 'readonly',
		'SharedArrayBuffer': 'readonly'
	},
	'parserOptions': {
		'ecmaVersion': 2018,
		'sourceType': 'module'
	},
	'rules': {
		'indent': [
			'error',
			'tab'
		],
		'linebreak-style': [
			'error',
			'windows'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'always'
		],
		'space-before-function-paren': 1,
		'space-infix-ops': 1,
		'spaced-comment': 1
	},
	"parser": "babel-eslint",
	"parserOptions": {
		"sourceType": "module",
		"allowImportExportEverywhere": false,
		"codeFrame": true
	  }
};