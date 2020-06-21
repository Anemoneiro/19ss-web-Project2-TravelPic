function getPicID() {
    const url = window.location.search;
    return url.split('=')[1];
}

function getUserFavorStatus() {
    let favorBtn = document.getElementById("favorBtn");
    let picID = getPicID();

    $.ajax({
        url: '../php/details_userFavorStatus.php',
        type: 'POST',
        data: {
            imageID: picID,
        },
        success: function (data) {
            if(data == 1) favorBtn.innerHTML = '♡ 取消';
                else favorBtn.innerText = '♥ 收藏';
        },
        error: function (err) {
            if(err.status == 403) {
                $.dialog({
                    title: '错误',
                    content: '用户未登录，禁止操作！',
                    type: 'red',
                });
                return;
            } else if(err.status == 404) {
                $.confirm({
                    title: '错误',
                    content: '抱歉，该图片已被删除……',
                    type: 'red',
                    buttons: {
                        "好的": function () {
                            window.location.href = "../html/homepage.html";
                        }
                    }
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

function checkIfLogin() {
    const upload = document.getElementById("Upload");
    const myphoto = document.getElementById("MyPhoto");
    const myfavor = document.getElementById("MyFavor");
    const login = document.getElementById("Login");
    const logout = document.getElementById("Logout");
    const favorBtn = document.getElementById("favorBtn");
    const personal = document.getElementById("Personal");

    $.ajax({
        url: '../php/checkIfLogin.php',
        type: 'POST',
        success:function(data){
            if (data !='') {
                login.style.display = "none";
                personal.style.display = "block";
                getUserFavorStatus();
            } else {
                logout.style.display = "none";
                upload.style.display = "none";
                myphoto.style.display = "none";
                myfavor.style.display = "none";
                favorBtn.style.display = "none";
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

function getPicInfo() {
    let picID = getPicID();
    let title = document.getElementById('photoName');
    let author = document.getElementById('photoOwner');
    let realPic = document.getElementsByClassName('realPicDetail');
    let likeNumbers = document.getElementsByClassName('box-body-content-likeNumbers');
    let topic = document.getElementById('photoTopic');
    let country = document.getElementById('photoCountry');
    let city = document.getElementById('photoCity');
    let description = document.getElementsByClassName('box-body-content-discription');

    $.ajax({
        url: '../php/details.php',
        type: 'POST',
        data: {
            imageID: picID,
        },
        success: function (data) {
            let img = JSON.parse(data);
            if(img.src !== 'null'){
                eval("realPic[0].style.backgroundImage = 'url(../../img/travel-images/large/" + img.src + ")';");
                realPic[0].id = picID;
            }
            if(img.title !== 'null') title.innerHTML = img.title;
                else title.innerHTML = 'Anonymous';
            if(img.author !== 'null') author.innerHTML = img.author;
                else author.innerHTML = 'Anonymous';
            if(img.description !== 'null') description[0].innerHTML = img.description;
                else description[0].innerHTML = '';
            if(img.content !== 'null') topic.innerHTML = img.content;
                else topic.innerHTML = 'Anonymous';
            if(img.country !== 'null') country.innerHTML = img.country;
                else country.innerHTML = 'Anonymous';
            if(img.city !== 'null') city.innerHTML = img.city;
                else city.innerHTML = 'Anonymous';
            likeNumbers[0].innerHTML = img.likes;
        },
        error: function (err) {
            if(err.status == 404) {
                $.confirm({
                    title: '错误',
                    content: '抱歉，该图片已被删除……',
                    type: 'red',
                    buttons: {
                        "好的": function () {
                            window.location.href = "../html/homepage.html";
                        }
                    }
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

function favorThePic(){
    let favorBtn = document.getElementById("favorBtn");
    let likeNumbers = document.getElementsByClassName('box-body-content-likeNumbers');
    let picID = getPicID();

    $.ajax({
        url: '../php/details_userFavor.php',
        type: 'POST',
        data: {
            imageID: picID,
        },
        success: function (data) {
            if(data == 0) {
                favorBtn.innerHTML = '♥ 收藏';
                likeNumbers[0].innerHTML--;
                $.alert({
                    title: '提示',
                    content: '取消收藏成功！',
                    buttons: {
                        "好的": function () {
                        }
                    }
                });
                return;
            }
            favorBtn.innerHTML = '♡ 取消';
            likeNumbers[0].innerHTML++;
            $.alert({
                title: '提示',
                content: '收藏成功！',
                buttons: {
                    "好的": function () {
                    }
                }
            });
        },
        error: function (err) {
            if(err.status == 403) {
                $.dialog({
                    title: '错误',
                    content: '用户未登录，禁止操作！',
                    type: 'red',
                });
                return;
            } else if(err.status == 404) {
                $.confirm({
                    title: '错误',
                    content: '抱歉，该图片已被删除……',
                    type: 'red',
                    buttons: {
                        "好的": function () {
                            window.location.href = "../html/homepage.html";
                        }
                    }
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

window.onload =	function () {
    checkIfLogin();
    getPicInfo();
}