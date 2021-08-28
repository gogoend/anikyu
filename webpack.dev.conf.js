const path = require('path');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack');

module.exports = {
	entry: {
		index: './src/index.js',
		another: './src/another.js',
		hmr: 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000'
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].bundle.js',
		chunkFilename: '[name].chunk.js' // 指定非入口js文件的名称
	},
	mode: 'development',
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
	plugins: [
		// https://github.com/ampedandwired/html-webpack-plugin
		new HtmlWebpackPlugin({
			filename: './index.html',
			template: './src/public/index.template.html',
			inject: true
		}),
		new webpack.HotModuleReplacementPlugin()
	],
	// optimization: {
	// 	splitChunks: {
	// 		chunks: 'all'
	// 	}
	// }
}