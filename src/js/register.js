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

function isRegisterUserName(s) {
    const pattern = /^[a-zA-Z]{1}([a-zA-Z0-9]|[_]){4,29}$/;
    if (!pattern.exec(s)) return false;
    return true;
}

function isPasswd(s) {
    const pattern = /^[\w]{8,30}$/;
    if (!pattern.exec(s)) return false;
    return true;
}

function isStrongPasswd(s) {
    const numberpattern = /[0-9]/;
    const letterpattern = /[a-z]|[A-Z]/;
    const test1 = s.search(numberpattern) != -1 && s.search(letterpattern) != -1;
    const test2 = s.search(numberpattern) != -1 && s.search(/_/) != -1;
    const test3 = s.search(letterpattern) != -1 && s.search(/_/) != -1;
    const finaltest = test1 || test2 || test3;
    if (!finaltest) return false;
    return true;

}

function isMailbox(s) {
    const pattern = /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}$/g;
    if (!pattern.exec(s)) return false;
    return true;
}

function checkForm() {
    if (!$('#username').val() || !$('#password1').val() || !$('#password2').val() || !$('#email').val()) {
        $.confirm({
            title: '提示',
            content: '请填写完整注册信息！',
            type: 'red',
        });
        return;
    }

    if (!isRegisterUserName($('#username').val())) {
        $.confirm({
            title: '提示',
            content: '用户名格式错误！',
            type: 'red',
        });
        return;
    }

    if (!isMailbox($('#email').val())) {
        $.confirm({
            title: '提示',
            content: '邮箱格式错误！',
            type: 'red',
        });
        return;
    }

    if ($('#password1').val() !== $('#password2').val()) {
        $.confirm({
            title: '提示',
            content: '两次密码输入不一致！',
            type: 'red',
        });
        return;
    }

    if (!isPasswd($('#password1').val())) {
        $.confirm({
            title: '提示',
            content: '密码格式错误！',
            type: 'red',
        });
        return;
    }

    if (!isStrongPasswd($('#password1').val())) {
        $.confirm({
            title: '提示',
            content: '密码强度过弱！',
            type: 'red',
        });
        return;
    }

    doRegister();
}

function doRegister() {
    $.ajax({
        url: '../php/register.php',
        type: 'POST',
        data: {
            username: $('#username').val(),
            password: $('#password1').val(),
            email: $('#email').val()
        },
        success:function(data){
                $.alert({
                    title: '提示',
                    content: '注册成功！',
                    buttons: {
                        "好的": function () {
                           window.location.href = "../html/login.html";
                        }
                    }
                });
        },
        error:function(err){
            if (err.status == 400) {
                $.dialog({
                    title: '提示',
                    content: '用户名已被注册！',
                    type: 'red',
                });
                return;
            } else if (err.status == 401) {
                $.dialog({
                    title: '提示',
                    content: '邮箱已被注册！',
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