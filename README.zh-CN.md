# Anikyu - Animation Queue

  <a href="https://npmcharts.com/compare/anikyu?minimal=true"><img src="https://img.shields.io/npm/dm/anikyu.svg" alt="Downloads"></a>
  <a href="https://www.jsdelivr.com/package/npm/anikyu"><img src="https://data.jsdelivr.com/v1/package/npm/anikyu/badge?style=rounded" alt="jsDelivr"/></a>
  <a href="https://www.npmjs.com/package/anikyu"><img src="https://img.shields.io/npm/v/anikyu.svg" alt="Version"></a>
  <a href="https://www.npmjs.com/package/anikyu"><img src="https://img.shields.io/npm/l/anikyu.svg" alt="License"></a>

## 介绍

anikyu 是一个补间动画库，基于JavaScript，可以为一个指定对象中的数值创建连续补间动画。


## 运行环境以及兼容性

### 在浏览器中

如果你使用script标签来引入Anikyu，推荐至少使用下列或更高版本浏览器：

| 浏览器名称 | 版本 |
| - | - |
| IE | 9 |
| Chrome | 49 |
| FireFox | 52 |

Anikyu或许可以在早期浏览器中意外地运行，但将来并不会有计划去实际地支持早期浏览器。

引入该文件以后，Anikyu将会成为一个全局变量。

此外，Anikyu支持以ES Module的方式来引入，有关其兼容性可参阅 [caniuse](https://caniuse.com/#feat=es6-module) 。

由于兼容性问题，补间动画可能会在不同浏览器之间具有不同效果，例如 IE 9 浏览器中的某些CSS规则，属性值必须携带单位，仅有数值是无效的。这些情况可能会导致补间效果不符合预期。

### 在Node.js中

Anikyu目前可以在Node.js中运行，但尚未经过严格测试，仅仅在下列环境中成功运行了demo文件：

| 操作系统 | Node.js环境 |
| - | - |
| Windows XP | v5.1.0 |
| Windows 10 | v10.16.0 |


## 引入到项目中

### 使用NPM
#### 从NPM安装
```shell
npm install anikyu
```

#### 在项目文件中引入
```JavaScript
import Anikyu from 'anikyu';
```

### 使用Script标签
```HTML
<script src="./dist/anikyu.js"></script>
```

### 使用Node.js
```JavaScript
let Anikyu = require('./dist/anikyu.js');
```


## 调用方式

```JavaScript
new Anikyu(
    el,
    animationQueue,
    config
)
```

el - 产生动画效果的对象

animationQueue - 动画队列，包含补间动画中每一个阶段配置的数组

config - 配置

你需要在构造函数中传入当前产生动画效果的对象以及作用到该对象的动画队列，若不传入配置，则使用Anikyu内部的默认设置。

animationQueue（动画队列）是一个数组，其中包含产生动画效果的对象在整个动画发生期间每个阶段的状态，补间将通过使用来自相邻两个状态的数据来创建。

动画队列中每个阶段的配置表示为如下对象：

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

props - （必须）产生动画效果的对象在当前动画阶段结束后的属性

delay - 当前动画阶段开始前的延迟时间，默认为0，即当前动画阶段将上一动画阶段结束后立即执行

duration - 当前动画阶段持续时间，若不设置则从实例的全局配置中继承

easeType - 当前动画阶段缓动函数，若不设置则从实例的全局配置中继承

name - 当前动画阶段的名称，由用户指定

step - 当前动画阶段分步播放的步骤数量，仅当 easeType 为 'step' 时有效，默认为 *10*

<br />

config（配置）是一个对象，包含对当前Anikyu实例的全局配置，表示为如下对象：

```JavaScript
{
    manualNext: Boolean,
    duration: Number,
    easeType: String
}
```

manualNext - 每一个动画阶段结束后是否手动播放下一个动画阶段。在当前动画阶段结束后，你需要手动调用 .next() 以继续播放下一个动画阶段，默认为false

duration - 每一个动画阶段默认的持续时间，默认为2000

easeType - 每一个动画阶段默认的缓动函数，默认为'quadraticInOut'，其它可选值请参阅本页面下方“[缓动函数](#缓动函数)”章节


## 方法

### 类方法

这些方法在Anikyu上。

- .getStyle( el:Element, attr:String )

el - 文档中的某个元素

attr - 该元素上某个CSS属性

获得指定元素已计算的某个CSS属性的值。

- .rand( min:Number, max:Number )

min - 区间最小值

max - 区间最大值

获得一个在 (min, max] 之间的随机数

- .clamp( value:Number, min:Number, max:Number )

value - 将会被限制的值

min - 区间最小值

max - 区间最大值

将value值限制在 [ max, min ] 之间。若 value 大于max/小于min，则最终返回的值为 max/min。

- .mixEaseFn( obj:Object )

obj - 用于存储函数的对象，类似：
    {
        functionName: function( percent ){ ... ; return percent}
    }

将用户自定义的缓动函数混合到Anikyu类中。该函数接收一个 [ 0, 1 ] 之间、表示当前动画进度的小数，返回经过缓动函数处理过的进度值。

### 实例方法

你可以在由Anikyu类产生的实例上调用下列方法。

- .pause()

暂停当前动画阶段

- .resume()

继续当前动画阶段

- .replay()

重播当前动画阶段

- .jump( index: Number, finishCallFlag: Boolean )

index - 要跳转的动画阶段的索引。

finishCallFlag - 如果你是在 finish 事件的处理函数中调用该函数的，则你应当传入该参数，并将其设为*true*

跳转到第index个动画阶段进行播放

- .prev()

跳转到上一动画阶段

- .next()

跳转到下一动画阶段

- .dispose()

废弃该实例，之后该实例将不再可用

### 事件方法

- .addEventListener( type: String, callback: Function )
- .removeEventListener( type: String, callback: Function )

type - 事件名称，目前可选值有：'animate' 、 'finish' 和 'dispose'

callback - 回调函数，对应事件被触发后将会调用，其参数包含有相关事件的细节，可参阅本页面下方“[事件](#事件)”章节

用于增加或移除对该实例的事件监听

- .fireEvent( name: String, detail: Object )

name - 事件名称

detail - 事件细节，传递给事件处理函数

用于触发该实例上的事件。该函数由Anikyu在内部进行调用，不建议手动调用

- .getListeners( name: String )

name - 事件名称

用于获得该实例上与事件名称对应的一系列事件处理函数。若不传入事件名称则返回所有事件处理函数


## 事件

该版本Anikyu是基于事件来实现的，你可以在由Anikyu类产生的实例上添加事件监听器。

例如，下列代码为Anikyu实例的animate事件增加了监听：

```JavaScript
anikyuInstance.addEventListener('animate',function(event){
    console.log(event)
})
```

此外，你也可以通过在Anikyu实例上调用 .removeEventListener() 来移除事件监听器。

### 事件回调函数

在早期版本（<=0.2.1）中，回调函数参数使用的是DOM原生事件对象（CustomEvent），升级到较新版本（>=0.2.2）时请注意兼容性问题。

在当前版本中，回调函数接收类似如下形式的事件对象作为参数：

```JavaScript
{
    type: String,
    detail: Object,
    target: Object
}
```

type - 事件类型

detail - 事件详情

target - 对当前对象的引用，包含了该对象在当前帧的所有值

### 事件分类

Anikyu支持以下事件：

- animate

每当请求一次动画帧时会触发一次animate事件。事件的回调函数接收下列对象作为其参数中的detail：

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

stageIndex - 当前动画阶段的索引

name - 当前动画阶段的名称，可以由用户指定

progress - 当前动画阶段进度

value - 当前帧该对象的值

stageDelta - 当前动画阶段与前一动画阶段的差值

frameDelta - 当前这一帧与前一帧的差值

- finish

当前动画阶段结束时会触发一次finish事件。事件的回调函数接收下列对象作为其参数中的detail：

```JavaScript
{
    stageIndex: Number,
    name: String
}
```

stageIndex - 当前动画阶段的索引

name - 当前动画阶段的名称，可以由用户指定

- dispose

当前Anikyu实例被废弃时会触发一次dispose事件。事件的回调函数接收下列对象作为其参数中的detail：

```JavaScript
{
    stageIndex: Number,
    name: String
}
```

stageIndex - 当前动画阶段的索引

name - 当前动画阶段的名称，可以由用户指定


## 缓动函数

请注意，下列函数是由用户在执行Anikyu构造函数时，以字符串的形式在 *easeType* 属性中传入的，由Anikyu在内部进行调用。

- 匀速变化函数

linear - 基本线性变化

- 非匀速变化函数

| 开始效果 | 结束效果 | 开始与结束效果 |
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

以上缓动函数来自ECharts，相关效果可以参见<a href="https://www.echartsjs.com/examples/en/editor.html?c=line-easing" target="">ECharts 缓动函数示例</a>。

这些函数接收一个在 [0, 1] 区间的 Number 值，该值表示当前动画阶段的播放进度。

- 阶梯变化函数

step

该函数表示阶梯形式的数值变化，除了可以类似以上函数接收一个 Number 值表示播放进度外，还可以再接收另一个 Number 值表示分段步数。该值值由用户在构造函数中的 *step* 属性里指定，若该值不是整数，则将通过 Math.ceil() 对其向上取整。


## Polyfill

Anikyu包含了一些Polyfill，以用于支持某些环境：

- requestAnimationFrame (for IE and Node.js)


## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2020, [gogoend](http://github.com/gogoend)


## 致谢

[秘易网络](http://www.mastereach.net/)
