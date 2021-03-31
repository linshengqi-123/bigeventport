const express = require('express')
const router = express.Router()
const conn = require('../util/sql.js')
router.use(express.urlencoded())


// 获取
router.get('/cates', (req, res) => {
    // console.log(req);
    let sqlstr = `select name from categories`

    conn.query(sqlstr, (err, result) => {
        if (err) {
            res.json({ code: 400, msg: '服务器错误' })
            return
        }
        // console.log(result);

        res.json({
            "status": 0,
            "message": "获取文章分类列表成功！",
            "data": result
        })
    })

})

// 新增
// `/my/article/addcates`
router.post('/addcates', (req, res) => {
    const { name, slug } = req.body
    // console.log(username, password);
    // 查询判断用户名是否存在
    let sqlstrselect = `select name from categories where name="${name}"`
    // console.log(sqlstrselect);

    conn.query(sqlstrselect, (err, result) => {
        if (err) {
            res.json({ code: 400, msg: '服务器错误' })
            return
        }
        // console.log(result);

        if (result.length > 0) {
            res.json({ code: 201, msg: '列表存在' })
            return
        }
        // 添加内容
        let sqlstr = `insert into categories(name,slug) values ("${name}","${slug}")`
        console.log(sqlstr);

        conn.query(sqlstr, (err, result) => {
            if (err) {
                // console.log(err);

                res.json({ code: 400, msg: '添加失败' })
                return;
            }


            res.json({
                "status": 0,
                "message": "新增文章分类成功！"
            })

        })
    })


})


// 删除
// `/my/article/deletecate`
router.get('/deletecate', (req, res) => {
    const { id } = req.body
    let sqlstr = `DELETE from categories where id = ${id}`
    conn.query(sqlstr, (err, result) => {
        if (err) {
            res.json({ code: 400, msg: '服务器错误' })
            return
        }
        res.json({
            "status": 0,
            "message": "删除文章分类成功！"
        })
    })


})

// id获取
router.get('/getCatesById', (req, res) => {
    const { id } = req.body
    let sqlstr = `select * from categories where id= ${id}`
    conn.query(sqlstr, (err, result) => {
        if (err) {
            res.json({ code: 400, msg: '服务器错误' })
            return
        }
        res.json({
            "status": 0,
            "message": "获取文章分类数据成功！",
            "data": result
        })
    })


})

router.post('/updatecate', (req, res) => {
    console.log(req.body);

    const { id, name, slug } = req.body
    let sqlstr = `update categories set name="${name}",slug="${slug}" where id = ${id}`
    conn.query(sqlstr, (err, result) => {
        if (err) {
            res.json({ code: 400, msg: '服务器错误' })
            return
        }
        res.json({
            "status": 0,
            "message": "更新分类信息成功！"
        })
    })


})

module.exports = router