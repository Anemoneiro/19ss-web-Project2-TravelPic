<?php
session_start();
include 'config.php';
include 'http.php';

try {
    $pdo = new PDO(DBCONNSTRING,DBUSER,DBPASS);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sql = "SELECT CountryName, ISO FROM geocountries ORDER BY CountryName ASC";
    $result = $pdo->query($sql);
    $countries = array();

    while ($res = $result->fetch(PDO::FETCH_ASSOC)) {
        array_push($countries, [
            'CountryName' => $res['CountryName'],
            'ISO' => $res['ISO'],
        ]);
    }

    https(200);
    echo json_encode($countries);
    $pdo = null;
}catch (PDOException $e) {
    die( $e->getMessage() );
}
