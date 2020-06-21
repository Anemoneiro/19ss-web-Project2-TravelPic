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

    if ($type === "title")
        $sql = "SELECT * FROM travelimage WHERE Title LIKE '%$content%'";
    else
        $sql = "SELECT * FROM travelimage WHERE Description LIKE '%$content%'";

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

    //echo json_encode($imgs);

    //假设每次发过来的页数都是合理的
    $pageSize = 5;
    $pageStart = ($page-1)*$pageSize;
    if ($type === "title")
        $sql_page = "SELECT * FROM travelimage WHERE Title LIKE '%$content%' limit $pageStart, $pageSize";
    else
        $sql_page = "SELECT * FROM travelimage WHERE Description LIKE '%$content%' limit $pageStart, $pageSize";

    $result_page = $pdo->query($sql_page);
    $imgrtn = array();
    while ($res = $result_page->fetch(PDO::FETCH_ASSOC)) {
        array_push($imgrtn, [
            'src' => $res['PATH'] == null ? 'null' : $res['PATH'],
            'id' => $res['ImageID'],
            'title' => $res['Title'] == null ? 'null' : $res['Title'],
            'description' => $res['Description'] == null ? 'null' : $res['Description']
        ]);
    }

    https(200);
    $ret = ["totalSize" => sizeof($imgs),"imgs" => $imgrtn];
    echo json_encode($ret);
    $pdo = null;

}catch (PDOException $e) {
    die( $e->getMessage() );
}