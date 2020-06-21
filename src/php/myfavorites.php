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

        $sql_img = "SELECT ImageID FROM travelimagefavor WHERE UID = '$userID'";
        $result_img = $pdo->query($sql_img);
        $imgIDs = array();
        while ($res = $result_img->fetch(PDO::FETCH_ASSOC)) {
            array_push($imgIDs, $res['ImageID']);
        }

        $imgs = array();

        for($i = 0; $i < count($imgIDs); $i++) {
            $sql = "SELECT * FROM travelimage WHERE ImageID = '$imgIDs[$i]'";

            $result = $pdo->query($sql);
            $res = $result->fetch(PDO::FETCH_ASSOC);
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

        $imgrtn = array();
        for($i = $pageStart; $i < min($pageStart + $pageSize, count($imgs)); $i++) {
            array_push($imgrtn, $imgs[$i]);
        }

        https(200);
        $ret = ["totalSize" => count($imgs),"imgs" => $imgrtn];
        echo json_encode($ret);
        $pdo = null;
    }catch (PDOException $e) {
        die( $e->getMessage() );
    }
} else {
    https(403);
}