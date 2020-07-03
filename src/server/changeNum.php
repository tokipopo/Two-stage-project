<?php
include_once "./connectDB.php";

$user_id = $_REQUEST["user_id"];
$good_id = $_REQUEST["good_id"];
$num = $_REQUEST["orgnum"];

$sql = "UPDATE cart SET num = $num WHERE good_id = $good_id AND user_id = $user_id";


$retval = mysqli_query($db,$sql);




?> 