// 获取环境参数
const env = process.env.NODE_ENV

// 配置
let MYSQL_CONF
if (env === 'dev') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: '9630qazqaz',
    port: '3306',
    database: 'myblog',
  }
}
if (env === 'prod') {

}
module.exports = {
  MYSQL_CONF
}