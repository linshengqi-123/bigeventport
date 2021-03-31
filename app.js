// 创建服务器
const express = require('express')

const jwt = require('express-jwt');
const server = express()
// 跨域
const cors = require('cors')
server.use(cors())
server.use('/uploads', express.static('uploads'))


// app.use(jwt().unless());
// jwt() 用于解析token，并将 token 中保存的数据 赋值给 req.user
// unless() 约定某个接口不需要身份认证
server.use(jwt({
    secret: 'gz61', // 生成token时的 钥匙，必须统一
    algorithms: ['HS256'] // 必填，加密算法，无需了解
}).unless({
    path: ['/api/login', '/api/register', /^\/uploads\/.*/] // 除了这两个接口，其他都需要认证
}));
// 路由中间件
const userRoluter = require('./roluter/user.js')
server.use('/api', userRoluter)
const contentRoluter = require('./roluter/content.js')
server.use('/my', contentRoluter)
const articleRoluter = require('./roluter/article.js')
server.use('/my/article', articleRoluter)

// 错误处理中间件
server.use((err, req, res, next) => {
    console.log('有错误', err)
    if (err.name === 'UnauthorizedError') {
        // res.status(401).send('invalid token...');
        res.status(401).send({ code: 1, message: '身份认证失败！' });
    }
});

server.listen(3001, () => {
    console.log('托马斯3001启动');

})