# nvm

安装nvm

进行node版本管理

# nodejs 和js的求别

es定义了语法

js使用了es语法外加 Web API(), 缺一不可

nodejs, 使用了es的语法规范, 外加nodejs的api

# node和前端的区别

1. 服务稳定性
   1. server端可能会遭受各种恶意攻击和误操作
   2. 单个客户端可以意外挂掉, 但是服务端不能
   3. pm2维护
2. cpu和内存对于serve端都是稀缺资源
3. 日志记录
4. 安全





# 开发接口

http请求

1. dns解析, 建立tcp链接, 发送http请求
2. server接收到http请求, 处理, 并返回
3. 客户端接收到返回数据, 处理数据
4. http默认端口: 80, https默认端口: 443

nodejs处理http请求

1. get请求和querystring
2. post请求和postdata
3. 路由

node处理get

1. get从server请求数据
2. 通过querystring传递数据
3. 浏览器发送get请求

node处理post

1. post, 客户端向服务端传递数据
2. 通过postdata传递数据
3. 浏览器无法直接模拟, 需要手写js, 或者使用postman
4. 使用chunk(stream), 一块块的接受

# 搭建开发环境

1. 使用nodemon检测文件内变化, 自动重启node
2. 使用cross-env设置环境变量, 兼容mac linux和windows



# 开发接口

初始化路由

返回假数据(将路由和数据处理分离, 以符合设计原则)\





# 连接数据库

 mysql, 是webServer中最流行的关系型数据库

* 如何建库建表
* 建表时候的常用数据类型
* sql语句实现增删改查

增删改查

##### 增

增加该

#### 增加

增删改查

```sql
-- 增加
insert into users(username, `password`, realname)values('zhangshan', '123', '张三');
-- 查询

select * from users;  -- 尽量不要使用✳号, 有可能会导致性能问题
select id, username from users;
select * from users where username='zhangsan' and `password`='123'; 
select * from users where username like '%zhang%' order by id;

--更新
update users set realname='李四' where usernmae='lisi'
-- 删除
delete from users where username='list'


--safe mode

 


```



#### nodejs操作mysql

```js
npm i mysql --registry=https...taobao
// index.js
const myusql = require('mysql')
const con = mysql.createCommection({
    host:
    user:
    password
    port:
    dataBase:
    
})
//开始链结
con.commect()
 
```







