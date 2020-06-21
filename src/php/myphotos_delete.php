<?php
session_start();
include 'config.php';
include 'http.php';

if (isset($_SESSION['Username'])) {
    try {
        $pdo = new PDO(DBCONNSTRING, DBUSER, DBPASS);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $imageID = $_POST['imageID'];
        $userId = $_SESSION['UserID'];

        $sql = "SELECT * FROM travelimage WHERE ImageID ='$imageID' AND UID='$userId'";
        $result = $pdo->query($sql);
        $res = $result->fetch(PDO::FETCH_ASSOC);
        if(!$res) {
            https(401);
            return;
        }

        $picPath = $res['PATH'];

        //remember to delete picture in travelimage && travelimagefavor
        $delete_img = "DELETE FROM travelimage WHERE ImageID='$imageID'";
        $delete_favor = "DELETE FROM travelimagefavor WHERE ImageID='$imageID'";

        $result_img = $pdo->query($delete_img);
        $result_favor = $pdo->query($delete_favor);

        //delete file
        $root = dirname(__FILE__,3);
        $uploadPath = $root . '/img/travel-images/large/' . $picPath;
        $delete_picInFile = unlink($uploadPath);

        if ($delete_picInFile) {
            https(200);
        } else {
            https(400);
        }
    } catch (PDOException $e) {
        die($e->getMessage());
    }
} else {
    https(403);
}