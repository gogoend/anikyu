# Anikyu - Animation Queue

  <a href="https://npmcharts.com/compare/anikyu?minimal=true"><img src="https://img.shields.io/npm/dm/anikyu.svg" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/anikyu"><img src="https://img.shields.io/npm/v/anikyu.svg" alt="Version"></a>
  <a href="https://www.npmjs.com/package/anikyu"><img src="https://img.shields.io/npm/l/anikyu.svg" alt="License"></a>

## Introduction

Anikyu is a simple tween animation library, based on JavaScript, can create continuous tween animation for number values in one specified object.

Current version temporarily only support the tween animation of CSS property whose unit is *px*.


## Browser Compatibility
At least IE 9 if you use anikyu.js in dist folder.

The Anikyu uses some features or functions, like ES Module, Generator and requestAnimationFrame, which are not support in Internet Explorer and some older browsers. As for this, you can use Anikyu.js in dist folder, which is built with Webpack and Babel, and import via script tag, then Anikyu will become a global variable.


## Import to your project

### Using NPM
#### Install from NPM
```shell
npm install anikyu
```

#### Include in your files
```JavaScript
import Anikyu from 'anikyu';
```

### Using script Tag
```HTML
<script src="https://unpkg.com/anikyu/dist/anikyu.js"></script>
```


## Usage

```JavaScript
new Anikyu(
    el,
    animationQueue,
    config
)
```

el - The object to be animated.
animationQueue - An array of the configurations for every tween animation stage.

You need to pass the object to be animated and the animation queue which will take effect on the passed object.

The animationQueue is an Array which contains the statuses of the animated object at every stage during the whole animation happening.The tween will be created by using data from the two adjacent statuses.

Every status in animationQueue is described as the following Object:

```JavaScript
{
    props: Object,
    delay: Number,
    duration: Number,
    easeType: String,
    callback: Function
}
```

props - (Required) The properties of the status after the tween animation stage is finished.

delay - Delay before the tween animation stage starts. Default is *0*, which means the current animation stage will start immediately after the previous one finished.

duration - The duration of tween animation stage. It will be replaced with the value in the instance global setting if it's not given.

easeType - The ease function which the tween animation stage use. It will be replaced with the value in the instance global setting if it's not given.

callback - The Function to be called after the tween animation stage finished.

<br />

The config is a Object which includes the global config for the Anikyu instance.
It's described as the following Object:

```JavaScript
{
    manualNext: Boolean,
    duration: Number,
    easeType: String
}
```

manualNext - Whether play the next tween animation stage. It's very useful if you want to manually play the next tween animation stage after the pervious one finished. You need to call .next() manually to play the next tween animation stage when it's *true*. Default is *false*.

duration - The default value of every tween animation stage. Default is *2000*.

easeType - The default ease function of every tween animation stage. Default is *'quadraticInOut'*. For other possible values, you can visit <https://echarts.apache.org/examples/zh/editor.html?c=line-easing>.


## Instance Methods

You can call the following methods on the instance constructed by Anikyu.

- .pause()

Pause the current tween animation stage.

- .resume()

Resume the current tween animation stage.

- .replay()

Replay the current tween animation stage.

- .next()

Play the next tween animation stage when pervious one finished.


## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2020, [gogoend](http://github.com/gogoend)
