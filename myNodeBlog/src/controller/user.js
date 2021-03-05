const { exec } = require('../db/mysql')
const login = (postData = {}) => {
  let sql = `select username, realname from users where password='${postData.password}' and username='${postData.username}' `
  return exec(sql).then(res => {
    // 其实查询语句查到的就是一个数组
    console.log('res....', res)
    return res[0] || {} // 防止报错~, 默认赋值为{}
  })

}
module.exports = {
  login
}