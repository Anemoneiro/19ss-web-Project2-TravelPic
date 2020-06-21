function toTop() {
    scrollTo(0,0);
}

function homepage_start() {
    let hotLen = 0;
    let realPic = document.getElementsByClassName("realPic");
    let title = document.getElementsByClassName("picDisplayBox-title");
    let description = document.getElementsByClassName("description");

    $.ajax({
        url: '../php/homepage_start.php',
        type: 'POST',
        success: function (data) {
            let imgs = JSON.parse(data);
            hotLen = 0;
            for (const i in imgs) {
                if(imgs[i].src !== 'null'){
                    eval("realPic[i].style.backgroundImage = 'url(../../img/travel-images/large/" + imgs[i].src + ")';");
                    realPic[i].id = imgs[i].id;
                }
                if(imgs[i].title !== 'null') title[i].innerHTML = imgs[i].title;
                else title[i].innerHTML = 'Anonymous';
                if(imgs[i].description !== 'null') description[i].innerHTML = imgs[i].description;
                else description[i].innerHTML = '';
                hotLen++;
            }

            if(hotLen < 6) {
                for(let i = hotLen; i < 6; i++) {
                    $.ajax({
                        url: '../php/homepage_refresh.php',
                        type: 'POST',
                        success: function (data) {
                            let restimgs = JSON.parse(data);
                            if(restimgs[0].src !== 'null'){
                                eval("realPic[i].style.backgroundImage = 'url(../../img/travel-images/large/" + restimgs[0].src + ")';");
                                realPic[i].id = restimgs[0].id;
                            }
                            if(restimgs[0].title !== 'null') title[i].innerHTML = restimgs[0].title;
                                else title[i].innerHTML = 'Anonymous';
                            if(restimgs[0].description !== 'null') description[i].innerHTML = restimgs[0].description;
                                else description[i].innerHTML = '';
                        },
                        error: function (err) {
                            $.dialog({
                                title: '错误',
                                content: '无法连接数据库！',
                                type: 'red',
                            });
                        }
                    });
                }
            }
        },
        error: function (err) {
            $.dialog({
                title: '错误',
                content: '无法连接数据库！',
                type: 'red',
            });
        }
    });
}

function refresh() {
    let len = 6;
    let realPic = document.getElementsByClassName("realPic");
    let title = document.getElementsByClassName("picDisplayBox-title");
    let description = document.getElementsByClassName("description");
    for(let i = 0; i < len; i++) {
        $.ajax({
            url: '../php/homepage_refresh.php',
            type: 'POST',
            success: function (data) {
                let imgs = JSON.parse(data);
                if(imgs[0].src !== 'null'){
                    eval("realPic[i].style.backgroundImage = 'url(../../img/travel-images/large/" + imgs[0].src + ")';");
                    realPic[i].id = imgs[0].id;
                }
                if(imgs[0].title !== 'null') title[i].innerHTML = imgs[0].title;
                    else title[i].innerHTML = 'Anonymous';
                if(imgs[0].description !== 'null') description[i].innerHTML = imgs[0].description;
                    else description[i].innerHTML = '';
            },
            error: function (err) {
                $.dialog({
                    title: '错误',
                    content: '无法连接数据库！',
                    type: 'red',
                });
            }
        });
    }
}

function checkIfLogin() {
    const upload = document.getElementById("Upload");
    const myphoto = document.getElementById("MyPhoto");
    const myfavor = document.getElementById("MyFavor");
    const login = document.getElementById("Login");
    const logout = document.getElementById("Logout");
    const personal = document.getElementById("Personal");

    $.ajax({
        url: '../php/checkIfLogin.php',
        type: 'POST',
        success:function(data){
            if (data !='') {
                login.style.display = "none";
                personal.style.display = "block";
            } else {
                upload.style.display = "none";
                myphoto.style.display = "none";
                myfavor.style.display = "none";
                logout.style.display = "none";
                personal.style.display = "none";
                login.style.display = "block";
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

    logout.addEventListener("click",function () {
        $.ajax({
            url: '../php/logout.php',
            type: 'POST',
            success:function(data){
                $.alert({
                    title: '提示',
                    content: '注销成功！',
                    buttons: {
                        "好的": function () {
                            window.location.href = "../html/login.html";
                        }
                    }
                });
            },
            error:function(err){
                $.dialog({
                    title: '错误',
                    content: '无法连接后台！',
                    type: 'red',
                });
            }
        });
    })
}

function goToDetail(event) {
    const id = event.target.getAttribute('id');
    window.location.href = `../html/details.html?id=${id}`;
}

window.onload =	function () {
    checkIfLogin();
    homepage_start();
}