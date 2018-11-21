<?php 
	if($_SERVER["REQUEST_METHOD"] == 'POST'){
		if(isset($_POST['jwtToken'])){
			if(!empty($_POST['jwtToken'])){
				//check if token is valid
				session_start();
				$_SESSION['jwtToken'] = $_POST['jwtToken'];
				setcookie('jwtToken',$_POST['jwtToken'], time() + 60*60*6);
				header("location: home.php");
			}
			else{
				header("location: index.php");
			}
		}
		else{
			header("location: index.php");
		}
	}
?>
