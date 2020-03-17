import Anikyu from './anikyu_class.js';
import './polyfill/requestAnimationFrame.js';

// 判断文件是如何引入的，如果是通过模块引入则不在全局暴露Anikyu
// 直接在Webpack配置中改为UMD

export default Anikyu;