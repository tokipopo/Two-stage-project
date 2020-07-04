<?php
$db = mysqli_connect("127.0.0.1:3306", "root", "", "SEPHORA");

if (!$db) {
  die('连接错误: ' . mysqli_error($db));
}

?>