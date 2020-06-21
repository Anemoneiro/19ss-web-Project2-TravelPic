<?php
session_start();
include 'config.php';
include 'http.php';

try {
    $pdo = new PDO(DBCONNSTRING,DBUSER,DBPASS);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sql = "SELECT PATH, ImageID, Title, Description FROM travelimage WHERE ImageID IN 
            (SELECT t.ImageID FROM (SELECT ImageID FROM travelimagefavor GROUP BY ImageID ORDER BY COUNT(*) DESC LIMIT 6)
             AS t) AND PATH IS NOT NULL";
    $result = $pdo->query($sql);
    $imgs = array();
    while ($res = $result->fetch(PDO::FETCH_ASSOC)) {
        array_push($imgs, [
            'src' => $res['PATH'],
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