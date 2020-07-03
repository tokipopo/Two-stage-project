<?php
header("content-type:text/html;charset=utf-8");
include_once "./connectDB.php";

$user_id = $_REQUEST["user_id"];
$good_id = $_REQUEST["good_id"];

// 判断good_id是否
function is_json($good_id) { 
  json_decode($good_id);
  return (json_last_error() == JSON_ERROR_NONE);
 }
if(is_json($good_id)){
  $good_id = json_decode($good_id);
  if(is_array($good_id)){
    for($i=0;$i<count($good_id);$i++){
    // echo $good_id[$i];
    $sql = "DELETE FROM cart WHERE good_id = $good_id[$i] AND user_id = $user_id";
    $result = mysqli_query($db,$sql);
    // $data = mysqli_fetch_all($result,MYSQLI_ASSOC);
  }
   echo "已将选中商品删除"; 
  }else{
    $sql = "DELETE FROM cart WHERE good_id = $good_id AND user_id = $user_id";
    $result = mysqli_query($db,$sql);
  if($sql)
  echo "成功删除该商品";
  }
}





?> 