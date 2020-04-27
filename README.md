# Anikyu - Animation Queue

  <a href="https://npmcharts.com/compare/anikyu?minimal=true"><img src="https://img.shields.io/npm/dm/anikyu.svg" alt="Downloads"></a>
  <a href="https://www.jsdelivr.com/package/npm/anikyu"><img src="https://data.jsdelivr.com/v1/package/npm/anikyu/badge?style=rounded" alt="jsDelivr"/></a>
  <a href="https://www.npmjs.com/package/anikyu"><img src="https://img.shields.io/npm/v/anikyu.svg" alt="Version"></a>
  <a href="https://www.npmjs.com/package/anikyu"><img src="https://img.shields.io/npm/l/anikyu.svg" alt="License"></a>

## Introduction

Anikyu is a tween animation library, based on JavaScript, can create continuous tween animation for number values in one specified object.


## Environment and compatibility

### In Browser

If you import Anikyu via script tag, it is recommended to using at least the following or higher browsers:

| Browser | Version |
| - | - |
| IE | 9 |
| Chrome | 49 |
| FireFox | 52 |

Anikyu may be run in obsolete browsers unexpectedly, but there won't be any plan to actually support them.

After importing this file, Anikyu will become a global variable.

Besides, Anikyu can be imported via ES Module. For more information about the compatibility of ES Module, you can click [caniuse](https://caniuse.com/#feat=es6-module) .

Due to some compatibility issues, the tween animation may have different effects on different browsers. For example, some CSS rules don't directly accept a number as its value in IE 9, because they needs a unit. Those situations may result in unexpected effects.

### In Node.js

In this version, Anikyu can run in Node.js. However, it has not been rigorously tested yet. There is only a simple demo, which can be run in following environment:

| OS | Node.js Version |
| - | - |
| Windows XP | v5.1.0 |
| Windows 10 | v10.16.0 |


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
<script src="./dist/anikyu.js"></script>
```

### Using Node.js
```JavaScript
let Anikyu = require('./dist/anikyu.js');
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
    name: String,
    step: Number
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

### Class Methods

Those methods is provide by Anikyu self.

- .getStyle( el:Element, attr:String )

el - A Element in the document.

attr - A CSS property name of the Element. 

Get a computed CSS style of the specified Element.

- .rand( min:Number, max:Number )

min - The minimum of the interval.

max - The maximum of the interval.

Get a random number from (min, max].

- .clamp( value:Number, min:Number, max:Number )

value - The value to be clamped.

min - The minimum of the interval.

max - The maximum of the interval.

Clamp the value in [ max, min ].


- .mixEaseFn( obj:Object )

obj - The object for storing the customized easing functions. It looks like :
    {
        functionName: function( percent ){ ... ; return percent}
    }

Attach the customized easing functions to Anikyu class. The easing functions receive a float number, which is represents the current animation progress and in the range [0, 1]. The function returns an another float which is represents the current animation progress processed by easing function.

### Instance Methods

You can call the following methods on the instance constructed by Anikyu.

- .pause()

Pause the current animation stage.

- .resume()

Resume the current animation stage.

- .replay()

Replay the current animation stage.

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

### Event Callback

In older pervious release ( <=0.2.1 ), the argument of callback is a CustomEvent from DOM. To update to newer release ( >=0.2.2 ), please take care of the compatibility issue. 

In this release, the callback receives the following object as the argument.

```JavaScript
{
    type: String,
    detail: Object,
    target: Object
}
```

type - Event type.

detail - Event detail.

target - The reference to the current Object, which contains all values at current frame of the Object.

### Event Types

Anikyu supports the following events:

- animate

Fire when every time the frame being requested. The callback receives the following object as .detail in the argument:

```JavaScript
{
    stageIndex: Number,
    name: String,
    progress: Number,
    value: Object,
    stageDelta: Object,
    frameDelta: Object
}
```

stageIndex - The index of current animation stage.

name - The name of current animation stage, specified by user.

progress - The progress of current animation stage.

value - The values of the target object at current frame.

stageDelta - The difference values between the current and the pervious animation stage.

frameDelta - The difference values between the current and the pervious frame.

- finish

Fire when current animation stage finished. The callback receives the following object as .detail in the argument:

```JavaScript
{
    stageIndex: Number,
    name: String
}
```

stageIndex - The index of current animation stage.

name - The name of current animation stage, specified by user.

- dispose

Fire when the Anikyu instance being disposed. The callback receives the following object as .detail in the argument:

```JavaScript
{
    stageIndex: Number,
    name: String
}
```

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


## Polyfill

In order to support some environments, there are some polyfills included in Anikyu:

- requestAnimationFrame (for IE and Node.js)


## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2020, [gogoend](http://github.com/gogoend)


## Thanks

[MasterEach](http://www.mastereach.net/)
