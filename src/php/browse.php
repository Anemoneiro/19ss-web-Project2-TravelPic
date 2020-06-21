<?php
session_start();
include 'config.php';
include 'http.php';

$type = $_POST['type'];
$content = $_POST['content'];
$page = $_POST['page'];

try {
    $pdo = new PDO(DBCONNSTRING,DBUSER,DBPASS);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $picContent = "null";
    $ISO = "null";
    $cityCode = "null";

    if($type === "title") {
        $sql = "SELECT * FROM travelimage WHERE Title LIKE '%$content%'";
    } else if($type === "filter") {
        $filter_arr = explode("@",$content);
        $picContent = $filter_arr[0];
        $ISO = $filter_arr[1];
        $cityCode = $filter_arr[2];

        //虽然理论上城市与国家实现二级联动，一共是五种，但是为了防止直接修改后端的错误，设置七种查询组合
        if($picContent !== "null" && $ISO !== "null" && $cityCode !== "null") {
            $sql = "SELECT * FROM travelimage WHERE Content ='$picContent' AND CountryCodeISO ='$ISO' AND CityCode='$cityCode'";
        } else if($picContent !== "null" && $ISO !== "null") {
            $sql = "SELECT * FROM travelimage WHERE Content ='$picContent' AND CountryCodeISO ='$ISO'";
        } else if($picContent !== "null" && $cityCode !== "null") {
            $sql = "SELECT * FROM travelimage WHERE Content ='$picContent' AND CityCode='$cityCode'";
        } else if($ISO !== "null" && $cityCode !== "null") {
            $sql = "SELECT * FROM travelimage WHERE CountryCodeISO ='$ISO' AND CityCode='$cityCode'";
        } else if($picContent !== "null") {
            $sql = "SELECT * FROM travelimage WHERE Content ='$picContent'";
        } else if($ISO !== "null") {
            $sql = "SELECT * FROM travelimage WHERE CountryCodeISO ='$ISO'";
        } else {
            $sql = "SELECT * FROM travelimage WHERE CityCode='$cityCode'";
        }
    } else if($type === "hotContent") {
        $sql = "SELECT * FROM travelimage WHERE Content ='$content'";
    } else if($type === "hotCountry") {
        $sql = "SELECT * FROM travelimage WHERE CountryCodeISO ='$content'";
    } else {
        $sql = "SELECT * FROM travelimage WHERE CityCode ='$content'";
    }

    $result = $pdo->query($sql);
    $imgs = array();
    while ($res = $result->fetch(PDO::FETCH_ASSOC)) {
        array_push($imgs, [
            'src' => $res['PATH'] == null ? 'null' : $res['PATH'],
            'id' => $res['ImageID'],
        ]);
    }

    //假设每次发过来的页数都是合理的
    $pageSize = 12;
    $pageStart = ($page-1)*$pageSize;
    if($type === "title") {
        $sql_page = "SELECT * FROM travelimage WHERE Title LIKE '%$content%' limit $pageStart, $pageSize";
    } else if($type === "filter") {
        //一共有7种查询组合
        if($picContent !== "null" && $ISO !== "null" && $cityCode !== "null") {
            $sql_page = "SELECT * FROM travelimage WHERE Content ='$picContent' AND CountryCodeISO ='$ISO' AND CityCode='$cityCode' limit $pageStart, $pageSize";
        } else if($picContent !== "null" && $ISO !== "null") {
            $sql_page = "SELECT * FROM travelimage WHERE Content ='$picContent' AND CountryCodeISO ='$ISO' limit $pageStart, $pageSize";
        } else if($picContent !== "null" && $cityCode !== "null") {
            $sql_page = "SELECT * FROM travelimage WHERE Content ='$picContent' AND CityCode='$cityCode' limit $pageStart, $pageSize";
        } else if($ISO !== "null" && $cityCode !== "null") {
            $sql_page = "SELECT * FROM travelimage WHERE CountryCodeISO ='$ISO' AND CityCode='$cityCode' limit $pageStart, $pageSize";
        } else if($picContent !== "null") {
            $sql_page = "SELECT * FROM travelimage WHERE Content ='$picContent' limit $pageStart, $pageSize";
        } else if($ISO !== "null") {
            $sql_page = "SELECT * FROM travelimage WHERE CountryCodeISO ='$ISO' limit $pageStart, $pageSize";
        } else {
            $sql_page = "SELECT * FROM travelimage WHERE CityCode='$cityCode' limit $pageStart, $pageSize";
        }
    } else if($type === "hotContent") {
        $sql_page = "SELECT * FROM travelimage WHERE Content ='$content' limit $pageStart, $pageSize";
    } else if($type === "hotCountry") {
        $sql_page = "SELECT * FROM travelimage WHERE CountryCodeISO ='$content' limit $pageStart, $pageSize";
    } else {
        $sql_page = "SELECT * FROM travelimage WHERE CityCode ='$content' limit $pageStart, $pageSize";
    }

    $result_page = $pdo->query($sql_page);
    $imgrtn = array();
    while ($res = $result_page->fetch(PDO::FETCH_ASSOC)) {
        array_push($imgrtn, [
            'src' => $res['PATH'] == null ? 'null' : $res['PATH'],
            'id' => $res['ImageID'],
        ]);
    }

    https(200);
    $ret = ["totalSize" => sizeof($imgs),"imgs" => $imgrtn];
    echo json_encode($ret);
    $pdo = null;

}catch (PDOException $e) {
    die( $e->getMessage() );
}