<?php
function encodePassword($password, $encrypt) {
    $pwd = array();
    $pwd['encrypt'] =  $encrypt ? $encrypt : createRandomstr();
    $pwd['password'] = md5(md5(trim($password)).$pwd['encrypt']);
    return $pwd;
}

function createRandomStr($len = 6) {
    $encrypt = '';
    $chars = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for ($i = 0; $i < $len; $i++) {
        $encrypt .= $chars[mt_rand(0, strlen($chars) - 1)];
    }
    return $encrypt;
}