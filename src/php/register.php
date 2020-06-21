<?php
session_start();
include 'config.php';
include 'http.php';
include 'myhash.php';

$username = $_POST['username'];
$password = $_POST['password'];
$email = $_POST['email'];

try {
    $pdo = new PDO(DBCONNSTRING,DBUSER,DBPASS);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sql_username = "SELECT * FROM traveluser WHERE username = '$username'";
    $result_username = $pdo->query($sql_username);
    $row_username = $result_username->fetch();

    $sql_email = "SELECT * FROM traveluser WHERE email = '$email'";
    $result_email = $pdo->query($sql_email);
    $row_email = $result_email->fetch();

    if ($row_username) {
        https(400);
    } else if($row_email) {
        https(401);
    } else {
        $encode = createRandomStr();
        $newPass = encodePassword($password, $encode)['password'];

        $sql_insert = "INSERT INTO traveluser (username, email, password, encrypt) VALUES ('$username', '$email', '$newPass', '$encode')";
        $pdo->exec($sql_insert);
        https(200);
    }
    $pdo = null;
}catch (PDOException $e) {
    die( $e->getMessage() );
}

/*$sql_select = "SELECT username FROM traveluser WHERE username = '$username'";
$result = mysqli_query($connect, $sql_select);
$row = mysqli_num_rows($result);

//用户名已存在
if($row) {
    https(400);
}
//用户名不存在，插入用户信息
else {
    $sql_insert = "INSERT INTO traveluser (username, email, pass) VALUES ('$username', '$email', '$password')";
    $result = mysqli_query($connect, $sql_insert);
    https(200);
}

mysqli_close($connect);*/
