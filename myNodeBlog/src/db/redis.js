const redis = require('redis')
const {REDIS_CONF} = require('../conf/db')

// 创建客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)
redisClient.on('error', err => {
  console.error(err)
})
// 后续函数接受的是一个 promise, 所以这边也需要 return 一个 promise, 先去上班~ 中午在搞
function set(key, val) {
  if (typeof val === 'object') {
    val = JSON.stringify(val)
  }
  redisClient.set(key, val, redis.print)
}
function get(key) {
 const promise = new Promise((resolve, reject) => {
   redisClient.get(key, (err, val) => {
     if (err) {
       console.error(err)
       return
     }
     if (val === null) {
       resolve(null)
       return
     }
     // 这里的 try catch 并不是为了抓取错误, 而是想兼容 JSON 转换的格式
     try {
      resolve(
        JSON.parse(val)
      )
     } catch(ex) {
       resolve(val)
     }
   })
 })
 return promise
}
module.exports =  {
  set,
  get
}