# node.js博客后台
## 项目结构分析

```js
-bin

	--www.js //总入口文件, 只处理端口, 和创建服务

-src
	--controller //处理数据关系, 根据给到(router)的数据, 去数据库索引数据, 负责数据控制
    	---*.js
    --model //后台返回数据标准化, 所有返回到前台的消息都需要它包裹一下
    	---*.js
    --router //只处理路由和返回, 数据从 controller 获取, 返回通过 model 返回, 他路由判断和数据中转
    	---*.js

-package.json

```



