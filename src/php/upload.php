<?php
session_start();
include 'config.php';
include 'http.php';

function get_file_name($len) {
    $new_file_name = '';
    $chars = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-";
    for ($i = 0; $i < $len; $i++) {
        $new_file_name .= $chars[mt_rand(0, strlen($chars) - 1)];
    }
    return $new_file_name;
}

if (isset($_SESSION['Username'])) {
    try {
        $pdo = new PDO(DBCONNSTRING, DBUSER, DBPASS);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $username = $_SESSION['Username'];
        $userID = $_SESSION['UserID'];

        $uploadType = $_POST['uploadType'];
        $title = $_POST['title'];
        $content = $_POST['content'];
        $description = $_POST['description'];
        $countryCodeISO = $_POST['country'];
        $cityCode = $_POST['city'];

        if($_POST['haveFile'] == 1) {
            /* 得到上传至后端的临时文件名 */
            $tmp = $_FILES['file']['tmp_name'];

            /* 得到新文件名 */
            $filename = get_file_name(24);

            $picNameArr = explode(".",$_FILES['file']['name']);
            $len = count($picNameArr);

            /* 得到图片扩展名 */
            $picPath = $filename . "." . $picNameArr[$len - 1];
            //$picPath = implode($filename . "." . $picNameArr[$len - 1];

            $sql_filePath = "SELECT PATH FROM travelimage WHERE PATH = '$picPath'";
            $result_filePath = $pdo->query($sql_filePath);
            $row_filePath = $result_filePath->fetch(PDO::FETCH_ASSOC);

            /* 检查是否有重名 */
            while ($row_filePath) {
                $filename = get_file_name(24);
                $picPath = $filename . "." . $picNameArr[$len - 1];

                $sql_filePath = "SELECT PATH FROM travelimage WHERE PATH = '$picPath'";
                $result_filePath = $pdo->query($sql_filePath);
                $row_filePath = $result_filePath->fetch(PDO::FETCH_ASSOC);
            }

            $root = dirname(__FILE__,3);
            $uploadPath = $root . '/img/travel-images/large/' . $picPath;
            //$uploadPath = '/var/www/html/img/travel-images/large/' . $picPath; //部署用
            //echo $uploadPath;

            //之后部署可能要改成绝对路径!!
            $move = move_uploaded_file($tmp, $uploadPath);

            $sql_imgID = "SELECT ImageID FROM travelimage ORDER BY ImageID DESC LIMIT 1";
            $result_imgID = $pdo->query($sql_imgID);
            $maxID = $result_imgID->fetchColumn();
            $newImageID = strval(intval($maxID) + 1);

            if($uploadType == "new") {
                if($cityCode != 'null' && $description != '') {
                    $sql_insert = "INSERT INTO travelimage (ImageID, Title, Description, CityCode, CountryCodeISO, UID, Content, PATH) VALUES ('$newImageID', '$title', '$description', '$cityCode', '$countryCodeISO', '$userID', '$content', '$picPath')";
                } else if ($cityCode == 'null') {
                    $sql_insert = "INSERT INTO travelimage (ImageID, Title, Description, CityCode, CountryCodeISO, UID, Content, PATH) VALUES ('$newImageID', '$title', '$description', NULL, '$countryCodeISO', '$userID', '$content', '$picPath')";
                } else {
                    $sql_insert = "INSERT INTO travelimage (ImageID, Title, Description, CityCode, CountryCodeISO, UID, Content, PATH) VALUES ('$newImageID', '$title', NULL, '$cityCode', '$countryCodeISO', '$userID', '$content', '$picPath')";
                }
                $result_insert = $pdo->query($sql_insert);
            } else {
                $imageID = $_POST['imageID'];

                $sql_check = "SELECT * FROM travelimage WHERE ImageID='$imageID'";
                $result_check = $pdo->query($sql_check);
                $res_check = $result_check->fetch(PDO::FETCH_ASSOC);
                if(!$res_check) {
                    https(404);
                    return;
                }

                if($cityCode != 'null' && $description != '') {
                    $sql_modify = "UPDATE travelimage SET PATH='$picPath', Title='$title', Description='$description', CityCode='$cityCode', CountryCodeISO='$countryCodeISO', Content='$content' WHERE ImageID='$imageID'";
                } else if ($cityCode == 'null') {
                    $sql_modify = "UPDATE travelimage SET PATH='$picPath', Title='$title', Description='$description', CityCode=NULL, CountryCodeISO='$countryCodeISO', Content='$content' WHERE ImageID='$imageID'";
                } else {
                    "UPDATE travelimage SET PATH='$picPath', Title='$title', Description=NULL, CityCode='$cityCode', CountryCodeISO='$countryCodeISO', Content='$content' WHERE ImageID='$imageID'";
                }

                $result_modify = $pdo->query($sql_modify);
            }
            https(200);

        } else {
            $imageID = $_POST['imageID'];

            $sql_check = "SELECT * FROM travelimage WHERE ImageID='$imageID'";
            $result_check = $pdo->query($sql_check);
            $res_check = $result_check->fetch(PDO::FETCH_ASSOC);
            if(!$res_check) {
                https(404);
                return;
            }

            if($cityCode != 'null' && $description != '') {
                $sql_modify = "UPDATE travelimage SET Title='$title', Description='$description', CityCode='$cityCode', CountryCodeISO='$countryCodeISO', Content='$content' WHERE ImageID='$imageID'";
            } else if ($cityCode == 'null') {
                $sql_modify = "UPDATE travelimage SET Title='$title', Description='$description', CityCode=NULL, CountryCodeISO='$countryCodeISO', Content='$content' WHERE ImageID='$imageID'";
            } else {
                "UPDATE travelimage SET Title='$title', Description=NULL, CityCode='$cityCode', CountryCodeISO='$countryCodeISO', Content='$content' WHERE ImageID='$imageID'";
            }

            $result_modify = $pdo->query($sql_modify);
            https(200);
        }
    } catch (PDOException $e) {
        die($e->getMessage());
    }
} else {
    https(403);
}