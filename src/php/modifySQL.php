<?php
include 'config.php';
include 'myhash.php';

/* 用来修改数据库原有用户数据 */

/*try {
    $pdo = new PDO(DBCONNSTRING,DBUSER,DBPASS);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sql = "ALTER TABLE traveluser add column Encrypt varchar(255) NOT NULL after PASS";
    $result = $pdo->query($sql);

    $sql = "ALTER TABLE traveluser add column Password varchar(255) NOT NULL after Encrypt";
    $result = $pdo->query($sql);

    $sql_modify = "SELECT * FROM traveluser WHERE 1";
    $result_modify = $pdo->query($sql_modify);
    while ($res = $result_modify->fetch(PDO::FETCH_ASSOC)) {
        $username = $res['UserName'];
        $password = $res['Pass'];
        $encode = createRandomStr();
        $newPass = encodePassword($password, $encode)['password'];

        $sql_salt = "UPDATE traveluser SET Password='$newPass', Encrypt='$encode' WHERE username='$username'";
        $result_salt = $pdo->query($sql_salt);
    }

    $sql = "ALTER TABLE traveluser drop column PASS";
    $result = $pdo->query($sql);

    $pdo = null;
}catch (PDOException $e) {
    die( $e->getMessage() );
}*/