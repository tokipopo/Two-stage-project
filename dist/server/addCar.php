<?php
include_once "./connectDB.php";

$user_id = $_REQUEST["user_id"];
$good_id = $_REQUEST["good_id"];

$sql = "SELECT * FROM cart WHERE good_id = $good_id AND user_id = $user_id";
$result = mysqli_query($db,$sql);
$num = mysqli_num_rows($result);

if($num == 0){
    $sql = "INSERT INTO cart " .
    "(cart_id,user_id,good_id,num)" .
    "VALUES " .
    "(NULL,$user_id,$good_id,1)";
}elseif($num >= 1){
    $sql = "UPDATE cart SET num = num +1 WHERE good_id = $good_id AND user_id = $user_id";
}

$retval = mysqli_query($db,$sql);

if (!$retval) {
  die('添加到购物车失败: ' . mysqli_error($db));
}
echo "加入购物车成功";


?> 