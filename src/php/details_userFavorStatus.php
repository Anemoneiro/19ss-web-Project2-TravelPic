<?php
session_start();
include 'config.php';
include 'http.php';

$imageID = $_POST['imageID'];

if(isset($_SESSION['Username'])) {
    try {
        $pdo = new PDO(DBCONNSTRING,DBUSER,DBPASS);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $username = $_SESSION['Username'];
        $userID = $_SESSION['UserID'];

        $sql_check = "SELECT * FROM travelimage WHERE ImageID='$imageID'";
        $result_check = $pdo->query($sql_check);
        $res_check = $result_check->fetch(PDO::FETCH_ASSOC);
        if(!$res_check) {
            https(404);
            return;
        }

        $sql = "SELECT * FROM travelimagefavor WHERE ImageID='$imageID' AND UID='$userID'";
        $result = $pdo->query($sql);
        $res = $result->fetch(PDO::FETCH_ASSOC);
        if($res) echo(1);
            else echo(0);
        https(200);
    }catch (PDOException $e) {
        die( $e->getMessage() );
    }
} else {
    https(403);
}
