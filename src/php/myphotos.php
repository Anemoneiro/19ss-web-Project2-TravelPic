<?php
session_start();
include 'config.php';
include 'http.php';

if (isset($_SESSION['Username'])) {
    $page = $_POST['page'];
    $userID = $_SESSION['UserID'];

    try {
        $pdo = new PDO(DBCONNSTRING,DBUSER,DBPASS);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $sql = "SELECT * FROM travelimage WHERE UID = '$userID'";

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

        //假设每次发过来的页数都是合理的
        $pageSize = 5;
        $pageStart = ($page-1)*$pageSize;
        $sql_page = "SELECT * FROM travelimage WHERE UID = '$userID' limit $pageStart, $pageSize";

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
} else {
    https(403);
}