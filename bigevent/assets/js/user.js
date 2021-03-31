$(function () {
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    });
    // 登录页面
    $('#link_login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    })
    var form = layui.form;
    form.verify({
        // 密码规则
        pwd: [
            /^[\S]{6,12}$/,
            "密码必须6-12位，且不能输入空格"
        ],
        repwd: function (value, item) {
            // 获取两个密码框的val
            console.log($(".reg-box input[name=password]").val());
            console.log($(".reg-box input[name=repassword]").val());


            // 比较
            if (value != $(".reg-box input[name=password]").val()) {
                return "两次输入的密码不一致"
            }
        }

    })

    //3. 注册功能
    var layer = layui.layer;
    $("#form_reg").on("submit", function (e) {
        // 阻止表单提交
        e.preventDefault();
        $.ajax({
            type: 'POST',
            // method: 'POST',
            url: 'http://127.0.0.1:3001/user_roluter/reguser',
            data: {
                // 获取用户名和密码
                username: $(".reg-box input[name=username]").val(),
                password: $(".reg-box input[name=password]").val(),
            },
            success: (res) => {
                console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message, { icon: 5 });
                }
                // 提交成功后处理代码
                layer.msg('恭喜您!用户名创建成功,请登录!');
                // 手动切换到登录表单
                $("#link_login").click();
                // 重置form表单
                $("#form_reg")[0].reset();
            }
        })
    })




})