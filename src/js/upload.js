let uploadType;

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

                /* 未登录无法上传图片，此处需要注意直接退出，跳转登录页面 */
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

function getPicID() {
    const url = window.location.search;
    return url.split('=')[1];
}

function showPic(source, imgId) {
    let file = source.files[0];
    if(window.FileReader) {
        let fileReader = new FileReader();
        fileReader.onloadend = function(e) {
            document.getElementById(imgId).src = e.target.result;
        }
        fileReader.readAsDataURL(file);
        document.getElementById("Preview-noPic").style.display="none";
    }
}

function getCountries() {
    let countryFilter = document.getElementById("country-filter");

    $.ajax({
        url: '../php/getCountries.php',
        type: 'POST',
        async: false,
        success:function(data){
            let countries = JSON.parse(data);
            for (let i in countries) {
                let option = $(`<option value="${countries[i].ISO}">${countries[i].CountryName}</option>`);
                $(countryFilter).append(option);
            }
        },
        error:function(err){
            $.dialog({
                title: '错误',
                content: '无法连接数据库！',
                type: 'red',
            });
        }
    });
}

function getCitiesOfCountry() {
    let countryFilter = document.getElementById("country-filter");
    let cityFilter = document.getElementById("city-filter");

    let index = countryFilter.selectedIndex; // 选中索引
    let countryCode = countryFilter.options[index].value;

    $(cityFilter).empty();
    $.ajax({
        url: '../php/getCitiesOfCountry.php',
        type: 'POST',
        async: false,
        data: {
            country: countryCode,
        },
        success:function(data){
            let cities = JSON.parse(data);
            let option = $(`<option value="null">null</option>`);
            $(cityFilter).append(option);
            for (let i in cities) {
                let option = $(`<option value="${cities[i].CityCode}">${cities[i].CityName}</option>`);
                $(cityFilter).append(option);
            }
        },
        error:function(err){
            $.dialog({
                title: '错误',
                content: '无法连接数据库！',
                type: 'red',
            });
        }
    });
}

function getPicInfo() {
    let picID = getPicID();
    let description = document.getElementById("DescriptionText");
    let displayPic = document.getElementById("Preview-Pic");
    let uploadPicText = document.getElementById("uploadBtn-text");

    $.ajax({
        url: '../php/details.php',
        type: 'POST',
        data: {
            imageID: picID,
        },
        success: function (data) {
            let img = JSON.parse(data);
            if(img.src !== 'null'){
                displayPic.src = "../../img/travel-images/large/" + img.src;
                document.getElementById("Preview-noPic").style.display="none";
            }

            if(img.title !== 'null') $('#PicTitleText').val(img.title);
            else $('#PicTitleText').val('')
            if(img.description !== 'null') description.innerHTML = img.description;
            else description.innerHTML = '';
            uploadPicText.innerHTML = '修改';

            /*$(`#content-filter option[value=${img.content}]`).attr("selected", true);

            let countryOptions = document.getElementById("country-filter").options;
            for (let i = 0; i < countryOptions.length; i++) {
                if (countryOptions[i].innerHTML == img.country) {
                    countryOptions[i].selected = true;
                    getCitiesOfCountry();

                    let cityOptions = document.getElementById("city-filter").options;
                    for (let i = 0; i < cityOptions.length; i++) {
                        if (cityOptions[i].innerHTML == img.city)
                            cityOptions[i].selected = true;
                    }
                }
            }*/

            $(`#content-filter option[value=${img.content}]`).attr("selected", true);
            $(`#country-filter option[value=${img.ISO}]`).attr("selected", true);
            getCitiesOfCountry();
            $(`#city-filter option[value=${img.cityCode}]`).attr("selected", true);

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

function uploadAll(){
    let title = $('#PicTitleText').val();
    let description = $('#DescriptionText').val();
    let content = $('#content-filter').val();
    let country = $('#country-filter').val();
    let city = $('#city-filter').val();

    if(!city) city = "null";

    if (!title) {
        $.alert({
            title: '提示',
            content: '请填写图片标题！',
            type: 'red',
        });
        return;
    }

    if (title.length > 200) {
        $.alert({
            title: '提示',
            content: '图片标题过长，请修改！',
            type: 'red',
        });
        return;
    }

    if (description && description.length > 1000) {
        $.alert({
            title: '提示',
            content: '图片描述过长，请修改！',
            type: 'red',
        });
        return;
    }

    if (!content) {
        $.alert({
            title: '提示',
            content: '请选择图片主题！',
            type: 'red',
        });
        return;
    }

    if (!country) {
        $.alert({
            title: '提示',
            content: '请选择图片拍摄国家！',
            type: 'red',
        });
        return;
    }

    if (!$("#upLoadImgFile").val() && uploadType == "new") {
        $.alert({
            title: '提示',
            content: '请上传图片！',
            type: 'red',
        });
        return;
    }

    let file = $("#upLoadImgFile")[0].files[0];

    if (file.type !== 'image/png' && file.type !== 'image/jpeg' && file.type !== 'image/jpg' && file.type !== 'image/gif' && file.type !== 'image/bmp') {
        $.alert({
            title: '提示',
            content: '图片格式错误：仅支持jpg/jpeg/png/bmp/gif！',
            type: 'red',
        });
        return;
    }

    //图片大小有限制吗？
    if (file !== undefined && file.size > 41943040) {
        $.dialog({
            title: '提示',
            content: '图片过大，请压缩至5M以下！',
            type: 'red',
        });
        return;
    }

    let formData = new FormData();
    if(file !== undefined) {
        formData.append('file', file);
        formData.append('haveFile', "1");
    } else formData.append('haveFile', "0");
    formData.append('title', title);
    formData.append('description', description);
    formData.append('content', content);
    formData.append('country', country);
    formData.append('city', city);
    formData.append('uploadType', uploadType)
    if(uploadType == "modify") formData.append('imageID', getPicID());

    $.ajax({
        url: '../php/upload.php',
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        success:function(data){
            let message;
            if(uploadType == "new") message = '图片上传成功！';
                else message = '图片修改成功！'
            $.alert({
                title: '提示',
                content: message,
                buttons: {
                    "好的": function () {
                        window.location.href = "../html/myphotos.html";
                    }
                }
            });
        },
        error:function(err){
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

window.onload =	function () {
    checkIfLogin();
    getCountries();

    if(getPicID() != undefined) {
        uploadType = "modify";
        getPicInfo();
    } else {
            uploadType = "new";
    }

}

