# Anikyu - Animation Queue

  <a href="https://npmcharts.com/compare/anikyu?minimal=true"><img src="https://img.shields.io/npm/dm/anikyu.svg" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/anikyu"><img src="https://img.shields.io/npm/v/anikyu.svg" alt="Version"></a>
  <a href="https://www.npmjs.com/package/anikyu"><img src="https://img.shields.io/npm/l/anikyu.svg" alt="License"></a>

## Introduction

Anikyu is a tween animation library, based on JavaScript, can create continuous tween animation for number values in one specified object.


## Browser Compatibility

If you prefer to import Anikyu by using ES Module, your browser needs using the following version at least.


| Browser | Version |
| - | - |
| Chrome | 61 |
| FireFox | 60 |
| IE | Not Support |

( The data is from [caniuse](https://caniuse.com/#feat=es6-module). )

However, if your current browser doesn't support ES Module, or you want to import Anikyu by script tag, you can use Anikyu.js in dist folder. 

This file supports IE 9 and later browsers. After importing this file, Anikyu will become a global variable.


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

animationQueue - An array of the configurations for every animation stage.

config - The global configuration for every animation stage.

You need to pass the object to be animated and the animation queue which will take effect on the passed object.

The animationQueue is an Array which contains the statuses of the animated object at every stage during the whole animation happening.The tween will be created by using data from the two adjacent statuses.

Every status in animationQueue is described as the following Object:

```JavaScript
{
    props: Object,
    delay: Number,
    duration: Number,
    easeType: String,
    name: String
}
```

props - (Required) The properties of the status after the animation stage is finished.

delay - Delay before the animation stage starts. Default is *0*, which means the current animation stage will start immediately after the previous one finished.

duration - The duration of animation stage. It will be replaced with the value in the instance global setting if it's not given.

easeType - The ease function which the animation stage use. It will be replaced with the value in the instance global setting if it's not given.

name - The name of current animation stage, specified by user.

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

manualNext - Whether play the next animation stage. It's very useful if you want to manually play the next animation stage after the pervious one finished. You need to call .next() manually to play the next animation stage when it's *true*. Default is *false*.

duration - The default value of every animation stage. Default is *2000*.

easeType - The default ease function of every animation stage. Default is *'quadraticInOut'*. For other possible values, you can visit <https://echarts.apache.org/examples/zh/editor.html?c=line-easing>.


## Instance Methods

You can call the following methods on the instance constructed by Anikyu.

- .pause()

Pause the current animation stage.

- .resume()

Resume the current animation stage.

- .jump( index: Number )

index - The index of the animation stage which to be jump.

Jump to the animation stage whose index is *index* and continue playing. 

- .prev()

Jump to pervious animation stage and continue playing.

- .next()

Jump to next animation stage and continue playing.

- .dispose()

Dispose the instance, then the instance will no longer can be used.


## Events

In this release, the Anikyu is based on EventTarget, which means you can add event listener on the instance constructed by Anikyu.

For example, the following code is aimed to add a listener to listen to the *animate* event for Anikyu instance.

```JavaScript
    anikyuInstance.addEventListener('animate',function(event){
        console.log(event)
    })
```

Besides, you can call .removeEventListener() on a Anikyu instance to remove the event listener.

Anikyu supports the following events:

- animate

Fire every time the frame being requested. The callback receives the following object as the argument.

```JavaScript
{
    stageIndex: Number,
    name: String,
    progress: Number,
    values: Object,
    stageDeltas: Object,
    frameDeltas: Object
}
```

stageIndex - The index of current animation stage.

name - The name of current animation stage, specified by user.

progress - The progress of current animation stage.

values - The values of the target object at current frame.

stageDeltas - The difference values between the current and the pervious animation stage.

frameDeltas - The difference values between the current and the pervious frame.

- finish

Fire when current animation stage finished. The callback receives the following object as the argument.


```JavaScript
{
    stageIndex: Number,
    name: String
}
```

stageIndex - The index of current animation stage.

name - The name of current animation stage, specified by user.


## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2020, [gogoend](http://github.com/gogoend)
