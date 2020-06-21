<?php
session_start();
include 'config.php';
include 'http.php';

try {
    $pdo = new PDO(DBCONNSTRING,DBUSER,DBPASS);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $ret = array();

    //get hot contents <= 4
    $sql_content = "SELECT Content FROM travelimage WHERE ImageID IN 
            (SELECT t.ImageID FROM (SELECT ImageID FROM travelimage GROUP BY Content ORDER BY COUNT(*) DESC LIMIT 4)
             AS t)";
    $result_content = $pdo->query($sql_content);
    $contentNum = 0;

    while ($res = $result_content->fetch(PDO::FETCH_ASSOC)) {
        array_push($ret, [
            'type' => 'content',
            'valueCode' => $res['Content'],
            'name' => $res['Content'],
        ]);
        $contentNum++;
    }

    //get hot countries <= 4
    $sql_ISO = "SELECT CountryCodeISO FROM travelimage WHERE ImageID IN 
            (SELECT t.ImageID FROM (SELECT ImageID FROM travelimage GROUP BY CountryCodeISO ORDER BY COUNT(*) DESC LIMIT 4)
             AS t)";
    $result_ISO = $pdo->query($sql_ISO);
    $ISO = array();
    while ($res = $result_ISO->fetch(PDO::FETCH_ASSOC)) {
        array_push($ISO, $res['CountryCodeISO']);
    }

    for($i = 0; $i < count($ISO); $i++) {
        $sql_countryName = "SELECT CountryName FROM geocountries WHERE ISO ='$ISO[$i]'";
        $result_countryName = $pdo->query($sql_countryName);
        $res = $result_countryName->fetch(PDO::FETCH_ASSOC);
        array_push($ret, [
            'type' => 'country',
            'valueCode' => $ISO[$i],
            'name' => $res['CountryName'],
        ]);
    }

    //get hot cities <= 4
    $sql_cityCode = "SELECT CityCode FROM travelimage WHERE ImageID IN 
            (SELECT t.ImageID FROM (SELECT ImageID FROM travelimage GROUP BY CityCode ORDER BY COUNT(*) DESC LIMIT 4)
             AS t) AND CityCode IS NOT NULL";

    $result_cityCode = $pdo->query($sql_cityCode);
    $CityCode = array();
    while ($res = $result_cityCode->fetch(PDO::FETCH_ASSOC)) {
        array_push($CityCode, $res['CityCode']);
    }

    for($i = 0; $i < count($CityCode); $i++) {
        $sql_cityName = "SELECT AsciiName FROM geocities WHERE GeoNameID ='$CityCode[$i]'";
        $result_cityName = $pdo->query($sql_cityName);
        $res = $result_cityName->fetch(PDO::FETCH_ASSOC);
        array_push($ret, [
            'type' => 'city',
            'valueCode' => $CityCode[$i],
            'name' => $res['AsciiName'],
        ]);
    }

    https(200);

    $finalRtn = ["contentSize" => $contentNum, "countrySize" => sizeof($ISO), "citySize" => sizeof($CityCode), "hotResult" => $ret];
    echo json_encode($finalRtn);
    $pdo = null;

}catch (PDOException $e) {
    die( $e->getMessage() );
}