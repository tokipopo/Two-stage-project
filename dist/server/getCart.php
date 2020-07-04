<?php
header("content-type:text/html;charset=utf-8");
/* 1、连接数据库 */
include_once "./connectDB.php";
mysqli_query($db,'SET NAMES utf8');
mysqli_set_charset($db,'utf8');

$user_id = $_REQUEST["user_id"];

/* 多表查询 */
$sql = "SELECT cart.*,goods.good_id,goods.title,goods.info,goods.src,goods.price FROM cart , goods WHERE cart.good_id = goods.good_id AND user_id=$user_id";

$result = mysqli_query($db,$sql);

$data = mysqli_fetch_all($result,MYSQLI_ASSOC);

echo json_encode($data,true);

?>