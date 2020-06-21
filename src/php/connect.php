<?php
$server="localhost";
$sqlname="root";
$sqlpassword="";
$dbname="web-pj2";

$connect = new mysqli($server, $sqlname, $sqlpassword, $dbname, '3306');

if($connect->connect_error) {
    die("Connection failed:".$connect->connect_error);
    echo "<script>console.log('database connected failed!s')</script>";
}
$connect->query("SET NAMES utf8");