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
	/*
	//expandlivingTime
	if(isset($_SESSION['jwtToken'])){
		setcookie('jwtToken',$_SESSION['jwtToken'], time() + 60*60*6);
	}


	//index
	if (session_status() == PHP_SESSION_NONE) {
		if(isset($_SESSION['jwtToken'])){
			//check if still valid
			header('location: home.php');
		}
	}
	else{
		if(isset($_COOKIE['jwtToken'])){
			//check if still valid
			session_start();
			$_COOKIE['jwtToken'] = $_COOKIE['jwtToken'];
			header('location: home.php');
		}
		
	}
	*/
	/*
if(!isset($_SESSION['jwtToken'])){
			//if(apicall){
			$_SESSION['jwtToken'] = $_SESSION['jwtToken'];
			header('location: home.php');
			//}
			else{

			}
		}

*/
	
?>
