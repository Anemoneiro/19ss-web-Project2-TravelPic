<?php
session_start();
include 'config.php';
include 'http.php';

try {
    $pdo = new PDO(DBCONNSTRING,DBUSER,DBPASS);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sql = "SELECT * FROM travelimage AS t1 JOIN (SELECT ROUND(RAND() * ((SELECT MAX(imageid) FROM travelimage) - (SELECT MIN(imageid) FROM travelimage)) + (SELECT MIN(imageid) FROM travelimage)) AS imageid) AS t2
            WHERE t1.imageid >= t2.imageid ORDER BY t1.imageid LIMIT 1";

    $result = $pdo->query($sql);
    $imgs = array();
    while ($res = $result->fetch(PDO::FETCH_ASSOC)) {
        array_push($imgs, [
            'src' => $res['PATH'] == null ? 'null' : $res['PATH'],
            'id' => $res['ImageID'],
            'title' => $res['Title'] == null ? 'null' : $res['Title'],
            'description' => $res['Description'] == null ? 'null' : $res['Description']
        ]);
    }
    https(200);
    echo json_encode($imgs);
    $pdo = null;

}catch (PDOException $e) {
    die( $e->getMessage() );
}