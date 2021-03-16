const {login} = require('../controller/user')
const {SuccessModel, ErrorModel} = require('../model/resModel')
// 设置 cookie 到期时间
const getExpireTime = () => {
  const d = new Date()
  const dStamp = d.getTime() + (24 * 60 * 60 * 1000)
  d.setTime(dStamp)
  console.log('expired time is.........' , d.toGMTString())
  return d.toGMTString()
}
const handleUserRouter = (req, res) => {
  let method = req.method
  let url = req.url // 路由+queryString
  let path = url.split('?')[0] // 获取路由
  
  if(method == 'GET' && path == '/api/user/login'){  // 借来下来要做的是改成 get 请求方法, 来做先做测试 todo...
    const {username, password} = req.query
    let result = login({username, password})
    // let result = login(req.body)
    return result.then(data => {
      if(data.username) {
        res.setHeader('Set-Cookie', `username=${data.username}; path=/; httpOnly; expires=${getExpireTime()}`)  // httpOnly表示只允许后端修改
        return new SuccessModel('登陆成功')
      }
      return new ErrorModel('登陆失败')
    })

    // return {
    //   message: '登录博客博客接口'
    // }
  }
  if (method = 'GET' && req.path === '/api/user/login-test') {
    if (req.cookie.username) {
      return Promise.resolve(new SuccessModel(
        {username: req.cookie.username}
      ))
    }
    return Promise.resolve(new ErrorModel('尚未登录'))
  }

}
module.exports = handleUserRouter