const handleUserRouter = (req, res) => {
  const method = req.method
  const url = req.url // 路由+queryString
  const path = url.split('?')[0] // 获取路由
  
  if(method == 'POST' && path == '/api/user/login'){
    return {
      message: '登录博客博客接口'
    }
  }

}
module.exports = handleUserRouter