const getList = (author, keyword) => {
  return [
    {id: 1,
    author: 'zhangshan',
    createTime: 122222222222,
    content: '内容A',
    title: '标题A'
    }
  ]
}
const getBlogDetail = (id) => {
  return {
    id: id,
    author: 'lisi',
    createTime: 234444444443,
    content: '内容b',
    title: '标题A'
  }
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