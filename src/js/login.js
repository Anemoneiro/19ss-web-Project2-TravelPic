function checkIfLogin() {
    $.ajax({
        url: '../php/checkIfLogin.php',
        type: 'POST',
        success:function(data){
            if (data !='') {
                /* 如果已经登录，则跳转主页 */
                window.location.href = "../html/homepage.html";
            }
        },
        error:function(err){
            $.dialog({
                title: '错误',
                content: '无法连接后台！',
                type: 'red',
            });
        }
    });
}

function checkForm() {
    if (!$('#username').val() || !$('#password').val()) {
        $.confirm({
            title: '提示',
            content: '请填写完整登录信息！',
            type: 'red',
        });
        return;
    }

    doLogin();
}

function doLogin() {
    $.ajax({
        url: '../php/login.php',
        type: 'POST',
        data: {
            username: $('#username').val(),
            password: $('#password').val(),
        },
        success:function(data){
            $.alert({
                title: '提示',
                content: '登录成功！',
                buttons: {
                    "好的": function () {
                        window.location.href = "../html/homepage.html";
                    }
                }
            });
        },
        error:function(err){
            if (err.status == 400) {
                $.dialog({
                    title: '提示',
                    content: '密码错误！',
                    type: 'red',
                });
                return;
            } else if (err.status == 404) {
                $.dialog({
                    title: '提示',
                    content: '用户名不存在！',
                    type: 'red',
                });
                return;
            }
            $.dialog({
                title: '错误',
                content: '无法连接数据库！',
                type: 'red',
            });
        }
    });
}

document.getElementById("submitBtn").addEventListener("click", function() {
    checkForm();
});

window.onload =	function () {
    checkIfLogin();
}