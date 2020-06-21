let searchType = "";
let searchContent = "";
let totalPage = 0;
let currentPage = 1;

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

function goToPage(event) {
    let id = event.target.getAttribute('id').split('-')[1];
    getSearchResult(searchType, searchContent, id);
}

function goToPrevPage() {
    if(currentPage == 1) getSearchResult(searchType, searchContent, currentPage);
        else getSearchResult(searchType, searchContent, parseInt(currentPage) - 1);
}

function goToNextPage() {
    if(currentPage == totalPage) getSearchResult(searchType, searchContent, currentPage);
        else getSearchResult(searchType, searchContent, parseInt(currentPage) + 1);
}

function getSearchResult(type, content, pageNumber){
    let searchResult = document.getElementsByClassName("main-searchResult");
    searchResult[0].style.display = "block";

    let searchItem = document.getElementsByClassName("box-body-searchItem");
    let realPic = document.getElementsByClassName("realPic");
    let picTitle = document.getElementsByClassName("picDisplayBox-title");
    let picDescription = document.getElementsByClassName("description");
    let totalSize = document.getElementById("totalSize");
    let searchDisplay = document.getElementsByClassName("box-body-search");
    let turnPage = document.getElementsByClassName("turnPage");
    currentPage = pageNumber;

    $.ajax({
        url: '../php/search.php',
        type: 'POST',
        async: false,
        data: {
            type: type,
            content: content,
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
                nowSize++;
            }

            /* 处理搜索无结果情况 */
            if(nowSize == 0){
                searchDisplay[1].style.display = "none";
                turnPage[0].style.display = "none";
                totalSize.innerHTML = rtn.totalSize;
                return;
            }

            searchDisplay[1].style.display = "block";
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
                    searchItem[i].style.display = "block";
                }

                if(isLastPage) {
                    for (let i = nowSize; i < 5; i++) {
                        searchItem[i].style.display = "none";
                    }
                }
            } else if(pageNumber >= totalPage - 2) {
                for (let i = 0; i < pages.length; i++) {
                    pages[i].id = "page-" + (totalPage - 4 + i).toString();
                    pages[i].innerHTML = (totalPage - 4 + i).toString();
                    pages[i].className = "normalPage";
                }

                for (let i = 0; i < 5; i++) {
                    searchItem[i].style.display = "block";
                }

                if(isLastPage) {
                    for (let i = nowSize; i < 5; i++) {
                        searchItem[i].style.display = "none";
                    }
                }
            } else {
                for (let i = 0; i < pages.length; i++) {
                    pages[i].id = "page-" + (pageNumber - 2 + i).toString();
                    pages[i].innerHTML = (pageNumber - 2 + i).toString();
                    pages[i].className = "normalPage";
                }

                for (let i = 0; i < 5; i++) {
                    searchItem[i].style.display = "block";
                }

                if(isLastPage) {
                    for (let i = nowSize; i < 5; i++) {
                        searchItem[i].style.display = "none";
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

function doSearch() {
    let searchRatio = document.getElementsByClassName("searchRatio");

    if(searchRatio[0].checked) {
        if (!$('#TitleText').val()) {
            $.confirm({
                title: '提示',
                content: '请填写搜索标题信息！',
                type: 'red',
            });
            return;
        }
        if ($('#TitleText').val().length > 200) {
            $.confirm({
                title: '提示',
                content: '搜索标题过长！',
                type: 'red',
            });
            return;
        }
        searchContent = $('#TitleText').val();
        searchType = "title";
        getSearchResult(searchType, searchContent,1);
    } else {
        if (!$('#ContentText').val()) {
            $.confirm({
                title: '提示',
                content: '请填写搜索内容信息！',
                type: 'red',
            });
            return;
        }
        if ($('#ContentText').val().length > 1000) {
            $.confirm({
                title: '提示',
                content: '搜索内容过长！',
                type: 'red',
            });
            return;
        }
        searchContent = $('#ContentText').val();
        searchType = "description";
        getSearchResult(searchType, searchContent, 1);
    }

}

window.onload =	function () {
    checkIfLogin();
    let searchResult = document.getElementsByClassName("main-searchResult");
    searchResult[0].style.display = "none";
}