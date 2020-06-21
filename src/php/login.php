<?php
session_start();
include 'config.php';
include 'http.php';
include 'myhash.php';

$username = $_POST['username'];
$password = $_POST['password'];

try {
    $pdo = new PDO(DBCONNSTRING,DBUSER,DBPASS);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sql = "SELECT * FROM traveluser WHERE username = '$username'";
    $result = $pdo->query($sql);
    $row = $result->fetch();

    if ($row) {
        $newPass = encodePassword($password, $row['Encrypt'])['password'];

        $sql_pw = "SELECT * FROM traveluser WHERE username = '$username' AND password = '$newPass'";
        $result_pw = $pdo->query($sql_pw);
        $row_pw = $result_pw->fetch();
        if($row_pw) {
            https(200);
            $expiryTime = time() + 60 * 60 * 24;
            $_SESSION['Username'] = $_POST['username'];
            $_SESSION['UserID'] = $row_pw['UID'];
        } else {
            https(400);
        }
    } else {
        https(404);
    }
    $pdo = null;
}catch (PDOException $e) {
    die( $e->getMessage() );
}