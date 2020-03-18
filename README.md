# Anikyu - Animation Queue

  <a href="https://npmcharts.com/compare/anikyu?minimal=true"><img src="https://img.shields.io/npm/dm/anikyu.svg" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/anikyu"><img src="https://img.shields.io/npm/v/anikyu.svg" alt="Version"></a>
  <a href="https://www.npmjs.com/package/anikyu"><img src="https://img.shields.io/npm/l/anikyu.svg" alt="License"></a>

## Introduction

Anikyu is a tween animation library, based on JavaScript, can create continuous tween animation for number values in one specified object.


## Browser Compatibility

If you import Anikyu via script tag, it is recommended to using at least the following or higher browsers:

| Browser | Version |
| - | - |
| IE | 9 |
| Chrome | 49 |
| FireFox | 52 |

Anikyu don't plan to support obsolete browsers.
After importing this file, Anikyu will become a global variable.

Besides, Anikyu can be imported via ES Module. For more information about the compatibility of ES Module, you can click [caniuse](https://caniuse.com/#feat=es6-module) .


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

The animationQueue is an Array which contains the statuses of the animated object at every stage during the whole animation happening. The tween will be created by using data from the two adjacent statuses.

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

delay - Delay before the animation stage starts. Default is *0*, which means the animation stage will start immediately after the previous one finished.

duration - The duration of animation stage. It will be replaced with the value in the instance global setting if it's not given.

easeType - The ease function which the animation stage use. It will be replaced with the value in the instance global setting if it's not given.

name - The name of animation stage, specified by user.

step - The step count of the animation stage. It only takes effect when the *easeType* value is 'step'. Default is *10*.

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

manualNext - Whether play the next animation stage manually. It's very useful if you want to manually play the next animation stage after the pervious one finished. You need to call .next() manually to play the next animation stage when it's *true*. Default is *false*.

duration - The default value of every animation stage. Default is *2000*.

easeType - The default ease function of every animation stage. Default is *'quadraticInOut'*. For other possible values, please view the [*Easing Functions*](#Easing-Functions) section.


## Methods

### Instance Methods

You can call the following methods on the instance constructed by Anikyu.

- .pause()

Pause the current animation stage.

- .resume()

Resume the current animation stage.

- .jump( index: Number, finishCallFlag: Boolean )

index - The index of the animation stage which to be jump.

finishCallFlag - If you're calling the function in finish event handler, you need to pass the argument and set it to *true*.

Jump to the animation stage whose index is *index* and continue playing. 

- .prev()

Jump to pervious animation stage and continue playing.

- .next()

Jump to next animation stage and continue playing.

- .dispose()

Dispose the instance, then the instance will no longer can be used.

### Event Methods

- .addEventListener( type: String, callback: Function )
- .removeEventListener( type: String, callback: Function )

type - Event type. The possible values are 'animate', 'finish' and 'dispose'.

callback - The function to be call after the corresponding event being fired. Its argument contains the event detail. For details, please view the [Events](#Events) section.

Used for adding or removing the event listener on the instance.


- .fireEvent( name: String, detail: Object )

name - Event name. At present the possible values are 'animate', 'finish' and 'dispose'.

detail - Event detail. It will be passed to event handler.

Used for firing the event listener on the instance. This function is called by Anikyu internally, and not recommended to call manually.


- .getListeners( name: String )

name - Event name.

Used for getting event handlers corresponding to the event name on this instance. If the event name is not passed, all of the event handlers on the instance will be returned.


## Events

In this release, the Anikyu is based on event, which means you can add event listener on the instance constructed by Anikyu.

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
    type: String,
    stageIndex: Number,
    name: String,
    progress: Number,
    target: Object,
    value: Object,
    stageDelta: Object,
    frameDelta: Object
}
```
type - Event type.

stageIndex - The index of current animation stage.

name - The name of current animation stage, specified by user.

progress - The progress of current animation stage.

target - The reference to the current Object, which contains all values at current frame of the Object.

value - The values of the target object at current frame.

stageDelta - The difference values between the current and the pervious animation stage.

frameDelta - The difference values between the current and the pervious frame.

- finish

Fire when current animation stage finished. The callback receives the following object as the argument:

```JavaScript
{
    type: String,
    stageIndex: Number,
    name: String
}
```
type - Event type.

stageIndex - The index of current animation stage.

name - The name of current animation stage, specified by user.

- dispose

Fire when the Anikyu instance being disposed. The callback receives the following object as the argument:

```JavaScript
{
    type: String,
    stageIndex: Number,
    name: String
}
```
type - Event type.

stageIndex - The index of current animation stage.

name - The name of current animation stage, specified by user.


## Easing Functions

Note: Those functions are passed as String via the easeType in the argument of the constructor of Anikyu, and called by Anikyu internally.

- Constant rate function

linear

- Variable rate function

| In | Out | InOut |
| - | - | - |
| quadraticIn | quadraticOut | quadraticInOut |
| cubicIn | cubicOut | cubicInOut |
| quarticIn | quarticOut | quarticInOut |
| quinticIn | quinticOut | quinticInOut |
| sinusoidalIn | sinusoidalOut | sinusoidalInOut |
| exponentialIn | exponentialOut | exponentialInOut |
| circularIn | circularOut | circularInOut |
| elasticIn | elasticOut | elasticInOut |
| backIn | backOut | backInOut |
| bounceIn | bounceOut | bounceInOut |

The above easing functions are from ECharts. You can watch their effects by <a href="https://www.echartsjs.com/examples/en/editor.html?c=line-easing" target="">click here</a>.

Those functions receive a Number between *0* and *1* which represents the progress of the current progress of the animation stage.

- Step function

step

This function represents a ladder-like change trend. In addition to receiving a Number value represent the progress of the animation stage similar to the above functions, it can also receive the another integer Number that represent the number of step of the functions. The value is specified via *step* in the argument of Anikyu constructor. If the value is not an integer, it will be rounded up by Math.ceil().


## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2020, [gogoend](http://github.com/gogoend)

## Thanks

[MasterEach](http://www.mastereach.net/)
