
const express = require('express')
const router = express.Router()

const conn = require('../util/sql.js')
// 写接口

router.use(express.urlencoded())
// 注册
router.post('/reguser', (req, res) => {
    const { username, password } = req.body
    console.log(username, password);
    let sqlstr = ` insert into users(username,password) values ("${username}","${password}")`
    conn.query(sqlstr, (err, result) => {
        if (err) {
            res.json({ code: 400, msg: '注册成功' })
            return; 
        }
        res.json({ code: 200, msg: '注册成功' })
        // if (result.length > 0) {
        //     res.json({ code: 201, msg: "用户名已存在" })
        //     return
        // }
    })

})

module.exports = router