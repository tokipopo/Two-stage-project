<?php
// 连接数据库 返回数据
header("content-type:text/html;charset=utf-8");
include_once "./connectDB.php";
mysqli_query($db,'SET NAMES utf8');
mysqli_set_charset($db,'utf8');
$sql = "SELECT * FROM goods";
$result = mysqli_query($db,$sql);
$data = mysqli_fetch_all($result,MYSQLI_ASSOC);
echo json_encode($data,true);

?>