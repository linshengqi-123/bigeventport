// 创建服务器
const express = require('express')
const server = express()
// 跨域
const cors = require('cors')
server.use(cors())
// 路由中间件
const userRoluter = require('./roluter/user_roluter.js')
server.use('/user_roluter', userRoluter)


server.listen(3001, () => {
    console.log('托马斯3001启动');

})