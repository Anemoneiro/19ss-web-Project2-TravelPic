let totalPage = 0;
let currentPage = 1;

function checkIfLogin() {
    const upload = document.getElementById("Upload");
    const myphoto = document.getElementById("MyPhoto");
    const myfavor = document.getElementById("MyFavor");
    const login = document.getElementById("Login");
    const logout = document.getElementById("Logout");
    const personal = document.getElementById("Personal");
    const boxBody = document.getElementsByClassName("box-body");
    boxBody[0].style.display = "none";

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

                /* 未登录无法获取我的图片，此处需要注意直接退出，跳转登录页面 */
                $.confirm({
                    title: '提示',
                    content: '请先登录！',
                    type: 'red',
                    buttons: {
                        "好的": function () {
                            window.location.href = "../html/login.html";
                        }
                    }
                });
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

function goToPage(event) {
    let id = event.target.getAttribute('id').split('-')[1];
    getMyPhotos(id);
}

function goToPrevPage() {
    if(currentPage == 1) getSearchResult(currentPage);
    else getMyPhotos(parseInt(currentPage) - 1);
}

function goToNextPage() {
    if(currentPage == totalPage) getSearchResult(currentPage);
    else getMyPhotos(parseInt(currentPage) + 1);
}

function getMyPhotos(pageNumber) {
    const boxBody = document.getElementsByClassName("box-body");
    boxBody[0].style.display = "inline";

    let myItem = document.getElementsByClassName("box-body-myItem");
    let realPic = document.getElementsByClassName("realPic");
    let picTitle = document.getElementsByClassName("picDisplayBox-title");
    let picDescription = document.getElementsByClassName("description");
    let totalSize = document.getElementById("totalSize");
    let myPhotoDisplay = document.getElementsByClassName("box-body-myphotos");
    let modifyBtn = document.getElementsByClassName("modifyBtn");
    let deleteBtn = document.getElementsByClassName("deleteBtn");
    let turnPage = document.getElementsByClassName("turnPage");
    currentPage = pageNumber;

    $.ajax({
        url: '../php/myphotos.php',
        type: 'POST',
        data: {
            page: pageNumber,
        },
        success: function (data) {
            let rtn = JSON.parse(data);
            let imgs = rtn.imgs;
            let nowSize = 0;
            for (const i in imgs) {
                if(imgs[i].src !== 'null'){
                    eval("realPic[i].style.backgroundImage = 'url(../../img/travel-images/large/" + imgs[i].src + ")';");
                    realPic[i].id = imgs[i].id;
                }
                if(imgs[i].title !== 'null') picTitle[i].innerHTML = imgs[i].title;
                else picTitle[i].innerHTML = 'Anonymous';
                if(imgs[i].description !== 'null') picDescription[i].innerHTML = imgs[i].description;
                else picDescription[i].innerHTML = '';
                modifyBtn[i].id = "modify-" + realPic[i].id;
                deleteBtn[i].id = "delete-" + realPic[i].id;
                myItem[i].id ="myItem-" + realPic[i].id;
                nowSize++;
            }

            /* 处理无结果情况 */
            if(nowSize == 0) {
                myPhotoDisplay[0].style.display = "none";
                turnPage[0].style.display = "none";
                totalSize.innerHTML = rtn.totalSize;
                let hint = document.getElementById("hint");
                hint.style.display = "block";
                return;
            }

            myPhotoDisplay[0].style.display = "block";
            turnPage[0].style.display = "block";
            totalSize.innerHTML = rtn.totalSize;

            /* 计算总页数，向上取整 */
            totalPage = Math.ceil(rtn.totalSize / 5);

            let isLastPage = false;
            if(totalPage == pageNumber) isLastPage = true;

            /* 处理翻页 */
            let pages = document.getElementsByName("page");
            if(totalPage <= 5 || pageNumber <= 3) {
                for (let i = 0; i < pages.length; i++) {
                    pages[i].id = "page-" + (i + 1).toString();
                    pages[i].innerHTML = (i + 1).toString();
                    pages[i].className = "normalPage";
                }

                for(let i = 0; i < pages.length; i++) {
                    pages[i].style.display = "inline";
                }

                if(totalPage < pages.length) {
                    for(let i = totalPage; i < pages.length; i++) {
                        pages[i].style.display = "none";
                    }
                }

                for (let i = 0; i < 5; i++) {
                    myItem[i].style.display = "block";
                }

                if(isLastPage) {
                    for (let i = nowSize; i < 5; i++) {
                        myItem[i].style.display = "none";
                    }
                }
            } else if(pageNumber >= totalPage - 2) {
                for (let i = 0; i < pages.length; i++) {
                    pages[i].id = "page-" + (totalPage - 4 + i).toString();
                    pages[i].innerHTML = (totalPage - 4 + i).toString();
                    pages[i].className = "normalPage";
                }

                for (let i = 0; i < 5; i++) {
                    myItem[i].style.display = "block";
                }

                if(isLastPage) {
                    for (let i = nowSize; i < 5; i++) {
                        myItem[i].style.display = "none";
                    }
                }
            } else {
                for (let i = 0; i < pages.length; i++) {
                    pages[i].id = "page-" + (pageNumber - 2 + i).toString();
                    pages[i].innerHTML = (pageNumber - 2 + i).toString();
                    pages[i].className = "normalPage";
                }

                for (let i = 0; i < 5; i++) {
                    myItem[i].style.display = "block";
                }

                if(isLastPage) {
                    for (let i = nowSize; i < 5; i++) {
                        myItem[i].style.display = "none";
                    }
                }
            }

            /* 处理高亮 */
            if(pageNumber <= 3 || totalPage <= 5) {
                pages[pageNumber - 1].className = "activePage";
            } else if(pageNumber == totalPage) {
                pages[4].className = "activePage";
            } else if(pageNumber == totalPage - 1) {
                pages[3].className = "activePage";
            } else {
                pages[2].className = "activePage";
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

function goToDetail(event) {
    const id = event.target.getAttribute('id');
    window.location.href = `../html/details.html?id=${id}`;
}

function modifyPhoto(event){
    let id = event.target.getAttribute('id').split('-')[1];
    window.location.href = `../html/upload.html?id=${id}`;
}

function deletePhoto(event){
    let id = event.target.getAttribute('id').split('-')[1];

    /* 二次确认 */
    $.alert({
        title: '提示',
        content: '请问您确定要删除吗？',
        type: 'red',
        buttons: {
            "好的": function () {
                $.ajax({
                    url: '../php/myphotos_delete.php',
                    type: 'POST',
                    data: {
                        imageID: id,
                    },
                    success: function (data) {
                        /* 删除后将该图片信息隐藏 */
                        let myItemId = "myItem-" + id;
                        let myItem = document.getElementById(myItemId);
                        myItem.style.display = "none";
                        $.alert({
                            title: '提示',
                            content: '删除成功！',
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
                        } else if(err.status == 401){
                            $.dialog({
                                title: '错误',
                                content: '无权删除非本人上传图片！',
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
            },
            "取消": function () {
            }
        }
    });
}

window.onload =	function () {
    checkIfLogin();
    getMyPhotos(1);
}