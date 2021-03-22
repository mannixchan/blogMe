const { SuccessModel, ErrorModel } = require('../model/resModel')
const { getList, getBlogDetail, getAddNew, updateBlog, delBlog } = require('../controller/blog')

// 设置同意登录验证函数
const loginCheck = (req) => {
  if (!req.session.username) {
    return Promise.resolve(new ErrorModel(
      '尚未登录'
    ))
  }
}
const handleBlogRouter = (req, res) => {
  const method = req.method
  const url = req.url // 路由+queryString
  const path = url.split('?')[0] // 获取路由
  if (method == 'GET' && path == '/api/blog/list') { // path这边前面必须要加/, 要不然报错
    console.log(req.query)
    let author = req.query.author || ''
    const keyword = req.query.keyword || ''
    if(req.query.isadmin) {
      const loginCheckResult = loginCheck(req)
      if(loginCheckResult) {
        return loginCheckResult
      }
      author = req.session.username
    }
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
  if (method == 'POST' && path == '/api/blog/new') {
    const loginCheckResult = loginCheck(req)
    if (loginCheckResult) {
      return loginCheckResult
    }
    req.body.username = req.session.username
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
    const loginCheckResult = loginCheck(req)
    if (loginCheckResult) {
      return loginCheckResult
    }
    req.body.username = req.session.username
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
    const loginCheckResult = loginCheck(req)
    if (loginCheckResult) {
      return loginCheckResult
    }
    const author = req.session.username // 修改用户必须是自己, 所以, 要做 id 和作者双重认证
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