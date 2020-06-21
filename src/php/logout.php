<?php
session_start();
unset($_SESSION['Username']);
unset($_SESSION['UserID']);
header("Location: ".$_SERVER['HTTP_REFERER']);
https(200);