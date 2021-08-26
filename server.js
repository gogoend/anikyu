const express = require('express')
const webpack = require('webpack')

const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const app = express()

const config = require('./webpack.dev.conf.js')

const compiler = webpack(config)

// 让express能够使用webpack打包出的文件（在内存中）
app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
}))

// 让网页可以热重载
app.use(webpackHotMiddleware(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000
}));

app.listen(3000, () => {
    console.log('跑在了3000端口')
})