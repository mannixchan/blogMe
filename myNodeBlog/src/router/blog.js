const {SuccessModel, ErrorModel} = require('../model/resModel')
const {getList, getBlogDetail, getAddNew} = require('../controller/blog')

const handleBlogRouter = (req, res) => {
  const method = req.method
  const url = req.url // 路由+queryString
  const path = url.split('?')[0] // 获取路由
  if(method == 'GET' && path == '/api/blog/list') { // path这边前面必须要加/, 要不然报错
    console.log(req.query)
    const author = req.query.author
    const keyword = req.query.keyword
    let dataList = getList(author, keyword)
    return new SuccessModel(dataList)
    // return {
    //   message: '获取博客列表'
    // }
  }
  if(method == 'GET' && path == '/api/blog/detail') {

    // return {
    //   message: '获取博客详情接口'
    // }
    const id = req.query.id
    let blogDetail = getBlogDetail(id)
    return new SuccessModel(blogDetail)
  }
  if(method == 'POST' && path == '/api/blog/addNew'){
    const data = getAddNew(req.body) //req.body, 就是传进来的postdata
    return new SuccessModel(data)
    // return {
    //   message: '新建博客接口'
    // }
  }
  if(method == 'POST' && path == '/api/blog/update'){
    return {
      message: '修改博客接口'
    }
  }
  if(method == 'POST' && path == '/api/blog/del'){
    return {
      message: '删除博客接口'
    }
  }

}
module.exports = handleBlogRouter