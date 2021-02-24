class resModel {
  constructor(data, message) {
    // 判断data做兼容错误处理
    if(typeof data === 'string') {
      this.message = data
      data = null
      message = null
    }
    if(data) {
      this.data = data
    }
    if(message) {
      this.message = message
    }
  }
}
class SuccessModel extends resModel {
  constructor(data, message) {
    super(data, message)
    this.errno = 0
  }
}
class ErrorModel extends resModel {
  constructor(data, message) {
    super(data, message)
    this.errno = -1
  }
}
module.exports = {
  SuccessModel,
  ErrorModel
}