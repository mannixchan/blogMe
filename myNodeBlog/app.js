const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const queryString = require('querystring')

const serverHandle = (req, res) => {
	const url = req.url
	req.path = url.split('?')[0]
	req.query = queryString.parse(url.split('?')[1])
	// 返回前设置一下返回格式
	res.setHeader('Content-type', 'application/json')
	let blogData = handleBlogRouter(req, res)
	if(blogData) {
		res.end(
			JSON.stringify(blogData)
		)
		return
	}
	let userData = handleUserRouter(req, res)
	if(userData) {
		res.end(JSON.stringify(userData))
		return
	}
	res.writeHead(404, {
		'Content-Type': 'text/plain'
	})
	res.write('404 Not Found')
	res.end()

}
module.exports = serverHandle

