<?php 
	
	
	setcookie('jwtToken',FALSE);
	session_destroy();
	header('location: index.php');
?>