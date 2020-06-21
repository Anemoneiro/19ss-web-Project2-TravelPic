# Web Project2 Doc

This is Xinran Duan's project doc for Web pj2.



## 基本信息

- 姓名：段欣然
- 学号：18307130295
- Github 地址：https://github.com/Anemoneiro/19ss-web-Project2-TravelPic/
- 项目部署地址：http://182.92.167.230/
- 开发编辑器：PHPStorm + VS Code
- 开发系统：Windows 10，分辨率1920*1280
- 测试浏览器：Google Chrome



## 项目简介



#### 项目功能

- 实现一个旅游图片分享平台，包括其基本的登录注册、图片浏览、图片搜索、上传收藏等多种功能。
- 项目共有主页、浏览页、搜索页、上传页、我的收藏页、我的图片页、登录页、注册页、图片详情页，共计九个功能页面。在PJ2中，进一步使用JS完善前台页面，并且实现一个后台用以支持用户和系统之间的交互。
- 功能页面基本做到布局合理，视觉效果较为符合图片分享网站的标准，配色简洁大方而又富有活力，在不过分改变页面宽度和高度的情况下能够实现响应式布局。
- 所有页面一致使用UTF-8编码，做到正确支持中英文字符的显示和输入，任何页面的任何位置都不出现乱码。
- 代码功能区分明确，实现前后端代码分离，有简要的注释。



#### 项目目录

```
.
├── PJ2
|   ├── index.html
|   ├── readme.md
|   ├── img
|		├── background
|			├── ornamental-cherry.jpg
|			├── ....
|		├── icons
|			├── arrow-up.png
|			├── ....
|		├── travel-images
|			├── ....
|		├── mdimg
|			├── ....
│   └── src
|		├── css
|			├── browse.css
|			├── ....
|		├── html
|			├── browse.html
|			├── ....
|		├── js
|			├── browse.js
|			├── ....
|		├── php
|			├── browse.php
|			├── ....
|		├── sql
|			├── wep-pj2.sql
|			├── ....
.
```




## 项目完成情况



#### 基本要求

##### 首页

- 登录逻辑 ：

  1、个人中心在用户未登录时，显示“登录”字样，提示用户登录。此时，鼠标移动到个人中心部分无下拉菜单，点击个人中心跳转到登录界面。 

  2、个人中心在用户登录时，类似于PJ 1显示下拉菜单，菜单中包括上传、我的照片、我的收藏、登出四个部分。用户在点击登出时清除用户的登录状态，给出提示框，点击确认后跳转到登录界面。 

  3、将index.html设置为主页，用户可以通过主页导航栏中的登录按钮进行登录。

- 刷新逻辑：

  点击页面右下角的辅助图标 “刷新图片素材”按钮，可以更新主页的图片展示区域。刷新图片素材会随机从数据库中读取，更新到主页中。

- 图片逻辑：

  1、从后端数据库中读取收藏最多的图片，并正确展示在页面中图片展示区域内。

  2、点击图片后跳转到相应图片的详细信息界面。 

##### 浏览页

- 筛选逻辑：

  支持五种筛选图片的方式，并彼此不影响。

  1、输入文字的单字段标题筛选，支持模糊筛选

  2、多级筛选栏主题、国家、城市的多级筛选

  3、热门主题的点击筛选，单字段主题筛选

  4、热门国家的点击筛选，单字段国家筛选

  5、热门城市的点击筛选，单字段城市筛选

- 图片逻辑：

  1、图片展示区域根据筛选条件进行筛选后，展示相应的图片。

  2、点击图片跳转到相应的图片详情页。 

  3、实现【页码】部分的实际功能。 

  ​	实现获取到筛选结果后，展示【符合条件的图片数量】，即筛选结果数。

  ​	实现根据 【每页展示图片的数量】和【符合条件的图片数量】计算【页数】，点击【页码】按钮可以浏览不同页面的图片。 

  ​	实现【向前一页】的按钮 < 和【向后一页】的按钮 >，实现页码的跳转

  ​	实现对于所有【页码】的展示及点击逻辑，即不限于5页的大小。

  ​	实现将当前【页码】高亮，帮助用户理解。 

##### 搜索页

- 搜索逻辑：

  实现搜索功能并支持模糊查询，在用户输入框内给出输入提示，并在用户没有输入/输入不符合格式时给出弹窗提示。

- 图片逻辑：

  同浏览页，展示搜索结果。

##### 登录页面

- 登录逻辑：

  1、实现用户通过用户名、密码进行登录。点击登录之后登录成功，有弹框提示，点击确认后跳转到主页。

  2、错误的用户名密码无法登录，为用户提供用户名/密码错误对应的提示，以便用户判断用户名/密码输入是否存在错误。

  3、登录界面提供用户以游客身份访问主页的链接。

##### 注册页面

- 注册逻辑 ：

  1、实现用户通过用户名、邮箱、密码进行注册，登陆密码不得显示明文，需要用户确认密码，验证相同后才可以注册。

  2、进行合法性检验，对于非法用户名、重复的用户名/邮箱、两次输入密码不一致、邮箱无效、弱密码等不合法动作，拒绝用户的注册，并分别给出对应的提示，告知用户是哪一种错误。

  3、用户名格式：5-30字符，以字母开头，仅包含数字、字母、下划线；邮箱格式：登录名 + @ + 域名；密码格式：8-30字符，仅包含字母、数字、下划线，且至少包含其中2种。

##### 我的照片

- 图片逻辑：

  1、增加没有图片时的文字提示部分。

  2、点击修改按钮跳转【上传页面】，此时上传页面中应填充原本的照片信息用来方便用户进行修改。

  3、其余同浏览页，展示用户上传的所有图片。

- 删除逻辑：

  点击删除按钮可以正确删除照片，并删除其相关的收藏记录。在删除图片时，增加二次确认按钮，以防止用户误操作。

##### 我的收藏

- 展示逻辑：

  1、增加没有图片时的文字提示部分。

  2、其余同浏览页，展示用户收藏的所有图片。

- 删除逻辑：

  点击删除按钮会将图片从我的收藏中移出（但不移除照片本身）。在删除收藏时，增加二次确认按钮，以防止用户误操作。

##### 上传页面

- 合法性校验 ：

  对表单提交增加合法性校验。

  在信息完整的情况下可以上传图片和信息到数据库。 对于信息完整的定义：图片标题、图片主题、图片拍摄国家不为空，拍摄城市和描述可以为空。在用户输入框内给出输入提示，并在用户输入不符合格式/信息不完整时，针对不符合格式的部分给出特定弹窗提示。

- 修改逻辑：

  对已上传的图片进行修改。

  上传界面也是用户点击【我的照片】==> 【修改】所进入的界面，通过传入的图片id获得用户想要修改照片的原本内容，并在页面中填充，并将【上传】按钮应变为【修改】按钮。修改的图像或者图像信息覆盖原有的图像内容，而不是新增图像。

##### 详细图片页面

- 信息展示：

  可以根据点击图片的imageID，正确显示照片和相关信息；若用户通过url强行访问不存在的id对应的界面，会给出错误提示并返回主页。

- 收藏功能：

  用户点击收藏/取消收藏按钮，即可收藏/取消收藏图片，同时按钮在收藏/未收藏状态上切换。

  未登录用户可进入详细图片展示页面，但不能看到收藏/取消收藏按钮，也不能进行收藏/取消收藏操作。



#### Bonus要求

- 密码加盐
- 前端框架
- 部署服务器
- 其他优化



##### 密码加盐

在本次实验中，我对密码使用md5算法进行加密处理，对每一个用户的密码生成一个随机的encrypt加密字段，并保存在数据库之中，数据库中不存储原生密码，仅存储加密后的密码和encrypt加密字段。这样可以避免数据库泄露，密码暴露的风险。

对后端数据库内原生数据进行修改，添加Password、Encrypt列，删除Pass列：

```php
try {
    $pdo = new PDO(DBCONNSTRING,DBUSER,DBPASS);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sql = "ALTER TABLE traveluser add column Encrypt varchar(255) NOT NULL after PASS";
    $result = $pdo->query($sql);

    $sql = "ALTER TABLE traveluser add column Password varchar(255) NOT NULL after Encrypt";
    $result = $pdo->query($sql);

    $sql_modify = "SELECT * FROM traveluser WHERE 1";
    $result_modify = $pdo->query($sql_modify);
    while ($res = $result_modify->fetch(PDO::FETCH_ASSOC)) {
        $username = $res['UserName'];
        $password = $res['Pass'];
        $encode = createRandomStr();
        $newPass = encodePassword($password, $encode)['password'];

        $sql_salt = "UPDATE traveluser SET Password='$newPass', Encrypt='$encode' WHERE username='$username'";
        $result_salt = $pdo->query($sql_salt);
    }

    $sql = "ALTER TABLE traveluser drop column PASS";
    $result = $pdo->query($sql);

    $pdo = null;
}catch (PDOException $e) {
    die( $e->getMessage() );
}
```

生成encrypt，对密码进行加密：

```php
function encodePassword($password, $encrypt) {
    $pwd = array();
    $pwd['encrypt'] =  $encrypt ? $encrypt : createRandomstr();
    $pwd['password'] = md5(md5(trim($password)).$pwd['encrypt']);
    return $pwd;
}

function createRandomStr($len = 6) {
    $encrypt = '';
    $chars = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for ($i = 0; $i < $len; $i++) {
        $encrypt .= $chars[mt_rand(0, strlen($chars) - 1)];
    }
    return $encrypt;
}
```

登陆时，将用户输入的密码基于encrypt字段加密后，与数据库内密码比较：

```php
$newPass = encodePassword($password, $row['Encrypt'])['password'];

$sql_pw = "SELECT * FROM traveluser WHERE username = '$username' AND password = '$newPass'";
$result_pw = $pdo->query($sql_pw);
$row_pw = $result_pw->fetch();
```



##### 前端框架

在本次PJ之中，为了优化弹窗功能，使用jquery-confirm框架代替原生alert。

jquery-confirm是一款功能强大的jQuery对话框和确认框插件。它提供多种内置的主题效果，可以实现ajax远程加载内容，提供动画效果和丰富的配置参数等。

需要引入的依赖：

###### css依赖

```html
<link href="https://cdn.bootcss.com/jquery-confirm/3.2.3/jquery-confirm.min.css" rel="stylesheet">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<link href="https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.css" rel="stylesheet">
```

###### js依赖

```html
<script src="https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"></script>
<script src="https://cdn.bootcss.com/jquery-confirm/3.2.3/jquery-confirm.min.js"></script>
<script src="https://cdn.bootcss.com/jquery.form/4.2.1/jquery.form.js"></script>
```

###### 依赖引入顺序

```html
<link href="https://cdn.bootcss.com/jquery-confirm/3.2.3/jquery-confirm.min.css" rel="stylesheet">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<link href="https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.css" rel="stylesheet">
<link href="../css/reset.css" rel="stylesheet" type="text/css">
<link href="../css/header&footer.css" rel="stylesheet" type="text/css">
<link href="../css/piccss.css" rel="stylesheet" type="text/css">
<link href="../css/homepage.css" rel="stylesheet" type="text/css">
<script src="https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"></script>
<script src="https://cdn.bootcss.com/jquery-confirm/3.2.3/jquery-confirm.min.js"></script>
<script src="https://cdn.bootcss.com/jquery.form/4.2.1/jquery.form.js"></script>
```

###### 使用示例

```javascript
$.alert({
    title: '提示',
    content: '注销成功！',
    buttons: {
        "好的": function () {
            window.location.href = "../html/homepage.html";
        }
    }
});
```

<img src="img/mdimg/jquery-confirm-example.png" alt="jquery-confirm-example" style="zoom:50%;" />

###### 缺陷

jquery-confirm的div是在整个页面div之下，在页面资源加载完成之后才能进行，这使得对于部分登录用户专属页面的拦截限制存在展示缺陷，即：未登录用户通过url强行访问页面，”请先登录“的弹窗会在页面资源加载完成之后显示，这会导致未登录用户也会看到部分登录用户专属页面的样式。



##### 部署服务器

我对项目在阿里云上进行了部署，通过ip地址可以访问。在项目部署后，要注意将上传图片的相对路径改为绝对路径，将localhost改为`127.0.0.1`，同时修改相应的password。对于5.7版本的mysql，由于我使用了GROUP BY，需要更改全局变量：

`set @@global.sql_mode=(select replace(@@global.sql_mode,'ONLY_FULL_GROUP_BY', ''));`



##### 其他优化

1、我实现了对于所有【页码】的展示及点击逻辑，即不限于5页的大小。

对于页码部分，我的分析如下：

一般情况：`<  i-2 i-1 i i+1 i+2  >` ，其中i为当前页面，高亮。

第一页、第二页情况：`<  1 2 3 4 5  >`  ，若不足5页，则展示应有页数。

倒数第二页、倒数第一页情况：`<  last-4 last-3 last-2 last-1 last  >`  ，对当前页面设置高亮。

对于这三种情况，我进行了不同的处理，实现了动态展示页码。

js代码如下所示：

```javascript
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
```

2、我实现了对于用户通过url强行访问页面的拦截，即对于个人中心内的三个页面【上传页面】【我的收藏】【我的照片】进行用户登录信息的检测，如果未登录则会强行弹窗，用户点击确认后会跳转到登录页面；对于登录用户，若访问【登录】【注册】页面，则会直接跳转到主页。



## 意见和建议



这次的PJ体量比较大，最初做的时候有些手忙脚乱，不知从何入手。后来从登录、注册页面入手，尝试使用PDO进行数据库操作，到了后期做得也算是得心应手。在本次的PJ之中，我对于js和php有了更进一步的理解，基本掌握了利用ajax进行前后端交互的方式、利用js对页面进行动态显示、利用php进行数据库查询的方法。

同时，我也深深意识到了前后端分离的开发方式的必要性。最初我尝试将html迁移到php之中，但php的前后端混合的语法实在难以理解，且不利于功能模块的区分。将前后端分离之后，后端php只需要进行数据查询，所有与展示相关的方法均由js操作，功能模块的划分十分清晰。

当然，这次PJ我开工较晚，最初进度较慢，以至于到了最后时间有些紧张，无法修复例如jquery-confirm带来的不影响功能的小bug，也是一个遗憾。

最后，很感谢老师和助教一学期以来的辛苦付出！
