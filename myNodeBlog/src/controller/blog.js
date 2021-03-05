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
  const title = postData.title
  const content = postData.content
  const author = postData.author
  const createTime = Date.now()
  // postData是新建 blog 的内容
  let sql = `insert into blogs(author, content, createTime, title) values('${author}','${content}',${createTime}, '${title}') `
  return exec(sql).then(res => {
    if(res.insertId) {
      return  {
        id: res.insertId
      }
    }
  })

}
// 更新博客需要 id, 和 postdata;
const updateBlog = (id, postData = {}) => {
  const title = postData.title
  const content = postData.content
  const author = postData.author
  let sql = `update blogs set title='${title}', content='${content}', author='${author}' where id='${id}'`
  // return true
  return exec(sql).then(res => {
        if(res.affectedRows > 0) {
          return true
        }
  })
}
const delBlog = (id) => {
  // return false
  let sql = `delete from blogs where id=${id} `
  return exec(sql).then(res => {
    if(res.affectedRows> 0) {
      return true
    }
  })
}

module.exports = {
  getList,
  getBlogDetail,
  getAddNew,
  updateBlog,
  delBlog
}