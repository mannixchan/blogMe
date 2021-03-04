# mysql

# 介绍-安装-使用

> **优势**:smile:

1. 企业最常用的存储工具, 一般有人专门运维
2. 社区支持广泛, 有问题随时可以查
3. 要成为一个合格的后台人员, 必须会sql语句

> **劣势**:frowning:

[download mysql](https://dev.mysql.com/downloads/mysql/)

[download mysql workbench(可视化操作客户端)](https://dev.mysql.com/downloads/workbench/)

### 基础语句

```sql
-- 注释是 '-- '
-- 建库:
图形操作

-- 显示库: 
show databases;

-- 建表:图形操作
-- 右键table, 新建table
pk 主键为 Y 表示不能为空
INT 整数
--显示表
show tables;



-- 表操作
-- 第一步 use (数据库名字)
user myblog
-- 增 password为关键字用反引号包含
insert into users(username, `password`, realname) values('zhangsan', '123', '张三');

-- 查询
select * from users; -- 查询全部, 一般情况下不推荐使用*, 可能会有性能问题
select id, username from users; -- 查询某几列
select * from users where username='zhangsan' and `password`='123'; -- 多重条件查询
select * from users where username='zhangsan' or `password`='123'; -- 或者查询
select * from users where username like '%zhang%'; -- 模糊查询 like 语句
select * from users where username like '%zhang%' order by id; -- 排序查询, 倒序在结尾添加desc


--更新
update users set realname='李四2' where usernme='lisi'; -- 如果报安全问题, 可能需要执行下面的语句
SET SQL_SAFE_UPDATES=0


-- 删除
delete from users where username='lisi';
```

