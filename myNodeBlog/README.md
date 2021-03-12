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

## 用 nodejs 操作 mysql

```js

npm i mysql
// 创建连接对象
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '9630qazqaz',
    port: '3306',
    database: 'myblog',
})
//开始链结
con.connect()
// 执行 sql 语句
const sql = 'select * from users;'
con.query(sql, (err, result) => {
    if(err) {
        console.error(err)
        return
    }
    console.log(result)
})
// 关闭连接
con.end()
```



## 和前端联调

* 登录以来 cookie, 需要用浏览器联调

* cookie 跨域不共享, 前端和 server 端必须同域

* 需要使用 nginx 做代理, 以便同域

  ```nginx
  # 1. 对静态页面, 和后台服务都启动本地服务
  # 2. 然后配置指定端口号监听, ' / '路径匹配到静态页面服务
  # 3. ' /api ' 匹配到后台服务
  # 4. 然后通过指定的端口, proxy_pass 到对应的前台和后台服务上~
  ```

  

 