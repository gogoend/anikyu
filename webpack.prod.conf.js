const path = require('path');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const EsmWebpackPlugin = require('@purtuga/esm-webpack-plugin');

module.exports = {
	entry: './src/anikyu.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'anikyu.js',
		library: 'Anikyu',
		libraryTarget: 'umd',
		libraryExport: 'default',
		globalObject: 'this'
	},
	mode: 'production',
	optimization:{
		minimize: false
	},
	module: {
		rules: [
			{
                enforce: "pre",
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: "eslint-loader"
            },
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
			},
		],
	},
}