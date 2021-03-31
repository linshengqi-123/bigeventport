const { json } = require('express')
const express = require('express')
const router = express.Router()
const conn = require('../util/sql.js')

const multer = require('multer')
// 精细化去设置，如何去保存文件
const storage = multer.diskStorage({
    // 保存在哪里
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    // 保存时，文件名叫什么
    filename: function (req, file, cb) {
        // console.log('file', file)
        // 目标： 新名字是时间戳+后缀名
        const filenameArr = file.originalname.split('.');
        // filenameArr.length-1是找到最后一个元素的下标
        const fileName = Date.now() + "." + filenameArr[filenameArr.length - 1]
        cb(null, fileName) //
    }
})
const upload = multer({ storage })

router.use(express.urlencoded())

// 获取用户信息
router.get('/userinfo', (req, res) => {
    console.log(req.query);
    const { username } = req.query
    let sqlstr = `select * from users where username="${username}"`
    console.log(sqlstr);
    conn.query(sqlstr, (err, result) => {
        if (err) {
            res.json({ code: 400, msg: '服务器错误' })
        }
        res.json({
            "status": 0,
            "message": "获取用户基本信息成功！",
            "data": result
        })
        // console.log(result);



    })


})




//文件上传
router.post('/uploadPic', upload.single('file_data'), (req, res) => {
    let img = `http://127.0.0.1:3001/uploads/${req.file.filename}`
    const { id } = req.body
    let sqlstr = `update users set userPic="${img}" where id = ${id}`
    console.log(sqlstr);
    conn.query(sqlstr, (err, result) => {
        if (err) {
            res.json({ code: 400, msg: '服务器错误' })
            return
        }

        res.json({
            "code": 200,
            "msg": "上传成功",
            // 拼接
            "src": "http://127.0.0.1:3001/uploads/" + req.file.filename

        })
    })
})
//更新用户信息  //修改
router.post('/userinfo', (req, res) => {
    const { id, nickname, email, userPic } = req.body
    let sqlstr = `update users set nickname="${nickname}",email="${email}",userPic="${userPic}" where id = ${id}`
    console.log(sqlstr);
    conn.query(sqlstr, (err, result) => {
        if (err) {
            res.json({ code: 400, msg: '服务器错误' })
            return
        }
        res.json({
            "status": 0,
            "message": "修改用户信息成功！"
        })
        console.log(result);
    })
})


// 修改密码
//更新用户信息  //修改
router.post('/updatepwd', (req, res) => {
    // console.log(req.body);

    const { id, oldPwd, newPwd } = req.body
    // console.log(id, oldPwd, newPwd);

    if (oldPwd === newPwd) {
        res.json({ status: 1, message: '新旧密码相同' })
        return
    }
    if (newPwd === '') {
        res.json({ status: 1, message: '不能为空' })
        return
    }
    let sqlstr = `update users set password="${newPwd}" where id = ${id}`
    // console.log(sqlstr);
    conn.query(sqlstr, (err, result) => {
        if (err) {
            res.json({ code: 400, msg: '服务器错误' })
        }
        res.json({
            "status": 0,
            "message": "修改密码信息成功！"
        })
        // console.log(result);
    })
})
module.exports = router