<?php
// 连接数据库 返回数据
header("content-type:text/html;charset=utf-8");
include_once "./connectDB.php";
// 中文乱码
mysqli_query($db,'SET NAMES utf8');
mysqli_set_charset($db,'utf8');
$page = $_REQUEST["page"]; 
$sort = $_REQUEST["sort"];

$limit = $page * 25;

if($sort == "default"){
  $sql = "SELECT * FROM goods Order BY good_id LIMIT $limit,25";
}elseif($sort == "price_asc"){
  $sql = "SELECT * FROM goods Order BY price ASC LIMIT $limit ,25";
} elseif ($sort == "price_desc") {
  $sql = "SELECT * FROM goods Order BY price DESC LIMIT $limit,25";
}

$result = mysqli_query($db,$sql);
$data = mysqli_fetch_all($result,MYSQLI_ASSOC);
echo json_encode($data,true);

?>