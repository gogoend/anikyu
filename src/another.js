import _ from 'lodash';

console.log(_.cloneDeep);

// 接收热更新输出，只有accept才能被更新
if (module.hot) {
	module.hot.accept();
}

console.log(11211);