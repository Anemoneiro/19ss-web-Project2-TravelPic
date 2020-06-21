<?php
session_start();
include 'config.php';
include 'http.php';

$imageID = $_POST['imageID'];

try {
    $pdo = new PDO(DBCONNSTRING,DBUSER,DBPASS);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sql = "SELECT * FROM travelimage WHERE ImageID='$imageID'";
    $result = $pdo->query($sql);
    $res = $result->fetch(PDO::FETCH_ASSOC);
    if(!$res) {
        https(404);
        return;
    }

    $UID = $res['UID'];
    $countryCode = $res['CountryCodeISO'];
    $cityCode = $res['CityCode'];

    //get author username from UID
    $sql_username = "SELECT UserName FROM traveluser WHERE UID='$UID'";
    $result_username = $pdo->query($sql_username);
    $row_username = $result_username->fetch(PDO::FETCH_ASSOC);
    $author = $row_username['UserName'];

    //get countryName from CountryCodeISO
    $sql_country = "SELECT CountryName FROM geocountries WHERE ISO='$countryCode'";
    $result_country = $pdo->query($sql_country);
    $row_country = $result_country->fetch(PDO::FETCH_ASSOC);
    $country = $row_country['CountryName'];

    //get cityName from CityCode
    $sql_city = "SELECT AsciiName FROM geocities WHERE GeoNameID='$cityCode'";
    $result_city = $pdo->query($sql_city);
    $row_city = $result_city->fetch(PDO::FETCH_ASSOC);
    if($row_city) $city = $row_city['AsciiName'];
        else $city = null;

    //get like numbers
    $sql_like = "SELECT COUNT(ImageID) FROM travelimagefavor WHERE ImageID='$imageID'";
    $result_like = $pdo->query($sql_like);
    $likes = $result_like->fetch(PDO::FETCH_ASSOC);

    $img = [
        'id' => $imageID,
        'src' => $res['PATH'],
        'title' => $res['Title'],
        'author' => $author == null ? 'null' : $author,
        'description' => $res['Description'] == null ? 'null' : $res['Description'],
        'content' => $res['Content'] == null ? 'null' : $res['Content'],
        'country' => $country == null ? 'null' : $country,
        'city' => $city == null ? 'null' : $city,
        'likes'=> $likes['COUNT(ImageID)'],
        'ISO' => $countryCode,
        'cityCode' => $cityCode = null ? 'null' : $cityCode,
    ];
    https(200);
    echo json_encode($img);
    $pdo = null;

}catch (PDOException $e) {
    die( $e->getMessage() );
}