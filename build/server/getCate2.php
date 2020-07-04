<?php
// 连接数据库 返回数据
header("content-type:text/html;charset=utf-8");
include_once "./connectDB.php";
// 中文乱码
$good_id = $_REQUEST["good_id"];
mysqli_query($db,'SET NAMES utf8');
mysqli_set_charset($db,'utf8');
$sql = "SELECT * FROM goods WHERE good_id = $good_id";  //改这里
$result = mysqli_query($db,$sql);
$data = mysqli_fetch_all($result,MYSQLI_ASSOC);
echo json_encode($data,true);

?>