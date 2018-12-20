<?php 
	if($_SERVER["REQUEST_METHOD"] == 'POST'){
		if(isset($_POST['jwtToken'])){
			if(!empty($_POST['jwtToken'])){
				//check if token is valid
				session_start();
				$_SESSION['jwtToken'] = $_POST['jwtToken'];
				$expireTime = time() + 60*60*24;
				$_SESSION['jwtTokenExpireTime'] = $expireTime;
				setcookie('jwtToken',$_POST['jwtToken'], $expireTime);
				setcookie('jwtTokenExpireTime', $expireTime, $expireTime);
				if(isset($_POST['verificationKey']) && isset($_POST['email']) && isset($_POST['username'])){
					if(!empty($_POST['verificationKey']) && !empty($_POST['email']) && !empty($_POST['username'])){
						$_SESSION['verificationKey'] = $_POST['verificationKey'];
						$_SESSION['email'] = $_POST['email'];
						$_SESSION['username'] =  $_POST['username'];
						header("location: journal.php");
					}
					header("location: logout.php");
				}
				header("location: journal.php");
			}
			else{
				header('location: logout.php');
			}
		}
		else{
			header('location: index.php');
		}
	}
?>