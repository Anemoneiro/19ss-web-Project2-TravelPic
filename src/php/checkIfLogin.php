<?php
session_start();
include 'config.php';
include 'http.php';

if(isset($_SESSION['Username'])){
    echo $_SESSION['Username'];
}else{
    echo('');
}