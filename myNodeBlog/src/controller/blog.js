const { exec } = require('../db/mysql')
const getList = (author, keyword) => {
// sql 语句拼接的时候, 后面一定要留空格, 否则会报错
let sql = `select * from blogs where 1=1 ` // 此处用1=1是为了拼接后面
if(author) {
  sql += `and author='${author}' `
}
if(keyword) {
  sql += `and title like '%${keyword}%' `
}
sql += `order by createtime desc `
// 此处返回一个 promise, 接数据的时候也要小心, 进行promise处理
return exec(sql)
}
const getBlogDetail = (id) => {
let sql = `select * from blogs where id='${id}' `
return exec(sql).then(rows => {
  return rows[0]
})

}
const getAddNew = (postData = {}) => { // 此处将 postdata 默认为{} 做一下兼容
  // postData是新建 blog 的内容
  return {
    id: 3 // 反回一个, 新建博客后的一个id
  }
}
// 更新博客需要 id, 和 postdata;
const updateBlog = (id, postData = {}) => {
  return true
}
const delBlog = (id) => {
  return false
}

module.exports = {
  getList,
  getBlogDetail,
  getAddNew,
  updateBlog,
  delBlog
}