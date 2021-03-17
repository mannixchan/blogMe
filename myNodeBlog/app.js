const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const queryString = require('querystring')
// 定义一个用来存储 session 的对象
let SESSION_DATA = {}
// 设置 cookie 到期时间
const getExpireTime = () => {
  const d = new Date()
  const dStamp = d.getTime() + (24 * 60 * 60 * 1000)
  d.setTime(dStamp)
  console.log('expired time is.........' , d.toGMTString())
  return d.toGMTString()
}
// 此函数用来获取postdata的请求体
const getPostdata = function (req) {
	const promise = new Promise((resolve, reject) => {
		// 如果请求方式是get, 则用不到postData所以直接返回一个{}
		if (req.method == 'GET') {
			resolve({})
			return
		}
		// 如果请求头的content-type不是json格式也直接返回空
		if (req.headers['content-type'] !== 'application/json') {
			resolve({})
			return
		}
		let postData = ''
		// 监听req的data事件, 可以收集到发送来的postdata
		req.on('data', chunk => {
			postData += chunk.toString()
		})
		req.on('end', () => {
			// 如果postdata没有数据也返回空
			if (!postData) {
				resolve({})
				return
			}
			resolve(
				JSON.parse(postData)
			)
		})
	})
	return promise
}

const serverHandle = (req, res) => {
	const url = req.url

	// 获取path, ?前面的
	req.path = url.split('?')[0]

	// 解析 query, ?后面的
	req.query = queryString.parse(url.split('?')[1])
	// 解析客户端携带的 cookie
	req.cookie = {}
	const cookieStr = req.headers.cookie || '' // 防空做兼容处理, 本来 cookie 也就是有规律的字符串而已
	cookieStr.split(';').forEach(item => {
		if (!item) {
			return
		}
		const arr = item.split('=')
		const key = arr[0].trim()
		const val = arr[1].trim()
		req.cookie[key] = val

	})
	// 解析 session
	let needSetCookie = false
	let userId = req.cookie.userId
	console.log('userId is... ' , userId)
	if(userId) { // 如果有userId
		if(!SESSION_DATA[userId]) { 
			SESSION_DATA[userId] = {}
		}
		req.session = SESSION_DATA[userId]
	} else { 
		needSetCookie = true
		// 如果没有 userId 则生成一个 userId
		userId = `${new Date().getTime()}_${Math.random()}`
		SESSION_DATA[userId] = {}
	}
	req.session = SESSION_DATA[userId]
	// 返回前设置一下返回格式
	res.setHeader('Content-type', 'application/json')

	// 获取postdata
	getPostdata(req).then(postData => {

		// 把 postData 放到 req.body 中, 这样下面的路由都可以访问到 postdata 
		req.body = postData

		// 处理 blog 路由
		let blogResult = handleBlogRouter(req, res)
		if (blogResult) {
			blogResult.then(blogData => {
				if(needSetCookie) {
					res.setHeader('Set-Cookie', `userId=${userId}; path=/; httpOnly; expires=${getExpireTime()}`)  // httpOnly表示只允许后端修改
				}
				console.log(blogData)
				res.end(
					JSON.stringify(blogData)
				)

			})
			return
		}

		// 处理 user 路由
		let userDataResult = handleUserRouter(req, res)
		if (userDataResult) {

			userDataResult.then(userData => {
				if(needSetCookie) {
					res.setHeader('Set-Cookie', `userId=${userId}; path=/; httpOnly; expires=${getExpireTime()}`)  // httpOnly表示只允许后端修改
				}
				if (userData) {
					res.end(JSON.stringify(userData))

				}
			})
			return
		}


		res.writeHead(404, {
			'Content-Type': 'text/plain'
		})
		res.write('404 Not Found')
		res.end()
	})


}
module.exports = serverHandle

