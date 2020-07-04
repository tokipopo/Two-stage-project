<?php
include_once "./connectDB.php";
$username = $_REQUEST["username"];
$password = $_REQUEST["password"];



$sql = "SELECT * FROM `user` WHERE username = '$username'";

$r = mysqli_query($db, $sql);
$data = array("status"=>"","data"=>array("msg"=>""));
$num = mysqli_num_rows($r); 
if($num == 1){
  $datab = mysqli_fetch_all($r,MYSQLI_ASSOC);
  $datab = $datab[0];
 
  if($password  === $datab["password"]){
    $sql2 = "SELECT * FROM `user` WHERE username='$username'";
    $result = mysqli_query($db,$sql2);
    $res = mysqli_fetch_all($result, MYSQLI_ASSOC);
    $res = $res[0];
    $userId = $res["id"];
    $data["status"] = "success";
    $data["data"]["msg"] = "恭喜你，登录成功";
    $data["data"]["id"] = $userId;
    $data["data"]["password"] = $password;
    $data["data"]["username"] = $username;
    echo json_encode($data,true);
  }else{
    echo '{"status":"error","msg":"密码不正确!"}';
  }
}else{
  echo '{"status":"error","msg":"该用户名不存在!"}';
}


?>