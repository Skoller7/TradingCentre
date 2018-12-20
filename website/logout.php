<?php 
	session_start();
	setcookie('jwtToken',FALSE);
	setcookie('jwtTokenExpireTime',FALSE);
	session_destroy();
	header('location: index.php');
?>