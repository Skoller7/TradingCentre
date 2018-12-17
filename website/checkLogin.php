<?php 
	if($_SERVER["REQUEST_METHOD"] == 'POST'){
		if(isset($_POST['jwtToken'])){
			if(!empty($_POST['jwtToken'])){
				//check if token is valid
				session_start();
				$_SESSION['jwtToken'] = $_POST['jwtToken'];
				$_SESSION['jwtToken'] = time() + 60*60*24;
				setcookie('jwtToken',$_POST['jwtToken'], time() + 60*60*24);
				
				if(isset($_POST['verificationKey']) && $_POST['email']){
					$_SESSION['verificationKey'] = $_POST['verificationKey'];
					$_SESSION['email'] = $_POST['email'];

				}
				header("location: journal.php");
			}
			else{
				header('location: index.php');
			}
		}
		else{
			header('location: index.php');
		}
	}
?>