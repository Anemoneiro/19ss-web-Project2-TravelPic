<?php
$server="127.0.0.1";
$sqlname="root";
$sqlpassword="";
//$sqlpassword="123456";//部署用
$dbname="web_pj2";

$connect = new mysqli($server, $sqlname, $sqlpassword, $dbname, '3306');

if($connect->connect_error) {
    die("Connection failed:".$connect->connect_error);
    echo "<script>console.log('database connected failed!s')</script>";
}
$connect->query("SET NAMES utf8");