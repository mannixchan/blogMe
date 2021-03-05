const {login} = require('../controller/user')
const {SuccessModel, ErrorModel} = require('../model/resModel')
const handleUserRouter = (req, res) => {
  const method = req.method
  const url = req.url // 路由+queryString
  const path = url.split('?')[0] // 获取路由
  
  if(method == 'POST' && path == '/api/user/login'){
    const result = login(req.body)
    return result.then(res => {
      if(res.username) {
        return new SuccessModel('登陆成功')
      }
      return new ErrorModel('登陆失败')
    })

    // return {
    //   message: '登录博客博客接口'
    // }
  }

}
module.exports = handleUserRouter