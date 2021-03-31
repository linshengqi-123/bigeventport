
const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()

const conn = require('../util/sql.js')
// 写接口

router.use(express.urlencoded())
// 注册
router.post('/reguser', (req, res) => {
    const { username, password } = req.body
    // console.log(username, password);
    // 查询判断用户名是否存在
    let sqlstrselect = `select username from users where username="${username}"`
    conn.query(sqlstrselect, (err, result) => {
        if (err) {
            res.json({ code: 400, msg: '服务器错误' })
            return
        }
        // console.log(result);

        if (result.length > 0) {
            res.json({ code: 201, msg: '用户名存在' })
            return
        }
        // 添加内容
        let sqlstr = `insert into users(username,password) values ("${username}","${password}")`
        // console.log(sqlstr);

        conn.query(sqlstr, (err, result) => {
            if (err) {
                // console.log(err);

                res.json({ code: 400, msg: '注册失败' })
                return;
            }
            // console.log(result);

            res.json({ code: 200, msg: '注册成功' })

        })
    })


})

//登录
router.post('/login', (req, res) => {
    console.log(req.body);
    const { username, password } = req.body
    let sqlstr = `select * from users where username="${username}" and password="${password}"`
    // console.log(sqlstr);
    conn.query(sqlstr, (err, result) => {
        if (err) {
            res.json({ code: 400, msg: '登录失败' })
            return
        }
        if (result.length > 0) {
            const token = 'Bearer' + jwt.sign(
                { name: username },
                'gz61',
                { expiresIn: 60 * 60 * 60 }
            )
            res.json({
                "status": 0,
                "message": "登录成功！",
                token
            })
        } else {
            res.json({ code: 201, msg: '密码或用户名错误' })
        }

    })


})

module.exports = router