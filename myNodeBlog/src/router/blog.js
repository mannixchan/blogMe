const { SuccessModel, ErrorModel } = require('../model/resModel')
const { getList, getBlogDetail, getAddNew, updateBlog, delBlog } = require('../controller/blog')

const handleBlogRouter = (req, res) => {
  const method = req.method
  const url = req.url // 路由+queryString
  const path = url.split('?')[0] // 获取路由
  if (method == 'GET' && path == '/api/blog/list') { // path这边前面必须要加/, 要不然报错
    console.log(req.query)
    const author = req.query.author
    const keyword = req.query.keyword
    let result = getList(author, keyword) // 此处结果为promise
    return result.then(dataList => {
      return new SuccessModel(dataList)
    })
  }
  if (method == 'GET' && path == '/api/blog/detail') {
    const id = req.query.id
    let blogDetailResult = getBlogDetail(id)
    return blogDetailResult.then(blogDetail => {
      return new SuccessModel(blogDetail)
    })
  }
  if (method == 'POST' && path == '/api/blog/addNew') {
    const data = getAddNew(req.body) //req.body, 就是传进来的postdata
    // return new SuccessModel(data)
    return data.then(res => {
      return new SuccessModel(res)
    })
    // return {
    //   message: '新建博客接口'
    // }
  }
  if (method == 'POST' && path == '/api/blog/update') {
    const result = updateBlog(req.query.id, req.body)
    return result.then(flag => {
      console.log(flag)
      if (flag) {
        return new SuccessModel() //这边不需要添加任何参数
      }
      return new ErrorModel()
    })


  }
  if (method == 'POST' && path == '/api/blog/del') {
    const result = delBlog(req.query.id)
    return result.then(flag => {
      if (flag) {
        return new SuccessModel(null, '删除成功')
      }
      return new ErrorModel(null, '删除失败')
    })


  }

}
module.exports = handleBlogRouter