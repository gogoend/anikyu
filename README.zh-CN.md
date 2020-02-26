# Anikyu - Animation Queue

  <a href="https://npmcharts.com/compare/anikyu?minimal=true"><img src="https://img.shields.io/npm/dm/anikyu.svg" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/anikyu"><img src="https://img.shields.io/npm/v/anikyu.svg" alt="Version"></a>
  <a href="https://www.npmjs.com/package/anikyu"><img src="https://img.shields.io/npm/l/anikyu.svg" alt="License"></a>

## 介绍

anikyu 是一个补间动画库，基于JavaScript，可以为一个指定对象中的数值创建连续补间动画。


## 浏览器兼容性

如果你希望通过以ES Module的方式引入Anikyu，浏览器的最低版本需求是：

浏览器名称 | 版本
- | -
Chrome | 61
FireFox | 60
IE | 不支持

（数据来自 [caniuse](https://caniuse.com/#feat=es6-module) ）

如果你当前浏览器不支持ES Module，或希望通过script标签直接引入Anikyu，则可以使用dist文件夹中的Anikyu.js。

该文件兼容IE 9或更高版本浏览器。引入该文件以后，Anikyu将会成为一个全局变量。


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
<script src="https://unpkg.com/anikyu/dist/anikyu.js"></script>
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
    name: String
}
```

props - （必须）产生动画效果的对象在当前动画阶段结束后的属性

delay - 当前动画阶段开始前的延迟时间，默认为0，即当前动画阶段将上一动画阶段结束后立即执行

duration - 当前动画阶段持续时间，若不设置则从实例的全局配置中继承

easeType - 当前动画阶段缓动函数，若不设置则从实例的全局配置中继承

name - 当前动画阶段的名称，由用户指定

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

easeType - 每一个动画阶段默认的缓动函数，默认为'quadraticInOut'，其他可选值参见 <https://echarts.apache.org/examples/zh/editor.html?c=line-easing>


## 实例方法

你可以在由Anikyu类产生的实例上调用下列方法。

- .pause()

暂停当前动画阶段

- .resume()

继续当前动画阶段

- .replay()

重播当前动画阶段

- .jump( index: Number )

index - 要跳转的动画阶段的索引。

跳转到第index个动画阶段进行播放

- .prev()

跳转到上一动画阶段

- .next()

跳转到下一动画阶段

- .dispose()

废弃该实例，之后该实例将不再可用


## 事件

该版本Anikyu是基于EventTarget来实现的，你可以在由Anikyu类产生的实例上添加事件监听器。

例如，下列代码为Anikyu实例的animate事件增加了监听：

```JavaScript
    anikyuInstance.addEventListener('animate',function(event){
        console.log(event)
    })
```

此外，你也可以通过在Anikyu实例上调用 .removeEventListener() 来移除事件监听器。

Anikyu支持以下事件：

- animate

每当请求一次动画帧时会触发一次animate事件。事件的回调函数接收下列对象作为参数：

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

stageIndex - 当前动画阶段的索引

name - 当前动画阶段的名称，可以由用户指定

progress - 当前动画阶段进度

values - 当前帧该对象的值

stageDeltas - 当前动画阶段与前一动画阶段的差值

frameDeltas - 当前这一帧与前一帧的差值

- finish

当前动画阶段结束时会触发一次finish事件。事件的回调函数接收下列对象作为参数：

```JavaScript
{
    stageIndex: Number,
    name: String
}
```

stageIndex - 当前动画阶段的索引

name - 当前动画阶段的名称，可以由用户指定


## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2020, [gogoend](http://github.com/gogoend)
