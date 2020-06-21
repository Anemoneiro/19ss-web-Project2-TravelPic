<?php
session_start();
include 'config.php';
include 'http.php';

try {
    $pdo = new PDO(DBCONNSTRING,DBUSER,DBPASS);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $countryIS0 = $_POST['country'];

    //get cities from CountryISO
    $sql_city = "SELECT AsciiName, GeoNameID FROM geocities WHERE CountryCodeISO='$countryIS0' AND AsciiName IS NOT NULL ORDER BY AsciiName ASC";
    $result_city = $pdo->query($sql_city);

    $cities = array();
    while ($res = $result_city->fetch(PDO::FETCH_ASSOC)) {
        array_push($cities, [
            'CityName' => $res['AsciiName'],
            'CityCode' => $res['GeoNameID'],
        ]);
    }

    https(200);
    echo json_encode($cities);
    $pdo = null;
}catch (PDOException $e) {
    die( $e->getMessage() );
}