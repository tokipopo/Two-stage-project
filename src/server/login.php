<?php
include_once "./connectDB.php";
$username = $_REQUEST["username"];
$password = $_REQUEST["password"];
// echo $username;
// echo $password;


$sql = "SELECT * FROM `user` WHERE username = '$username'";

$r = mysqli_query($db, $sql);
$num = mysqli_num_rows($r); 
if($num == 1){
  $data = mysqli_fetch_all($r,MYSQLI_ASSOC);
  $data = $data[0];
 
  if($password  === $data["password"]){
    echo '{"status":"success","msg":"登录成功!"}';
  }else{
    echo '{"status":"error","msg":"密码不正确!"}';
  }
}else{
  echo '{"status":"error","msg":"该用户名不存在!"}';
}


?>