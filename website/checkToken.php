<?php
	session_start();
	if(isset($_POST['jwtToken'])){
		$_SESSION['jwtToken'] = $_COOKIE['jwtToken'];
	}
	//checks that the session jwtToken is set and if the cookie jwtToken is not not the same it wil put the session token in the cookie
	//if the session token is expired it wil redirect te user to the index page
	if(isset($_SESSION['jwtToken'] && isset($_SESSION['jwtTokenExpireTime']))){
		if(!empty($_SESSION['jwtToken']) && !empty($_SESSION['jwtTokenExpireTime'])){
			if(time() < $_SESSION['jwtTokenExpireTime']){
				if($_SESSION['jwtToken'] != $_COOKIE['jwtToken']){
					setcookie('jwtToken',$_SESSION['jwtToken'], $_SESSION['jwtTokenExpireTime']);
				}
			}
			else{
				header('location: logout.php');
			}
		}
		else{
			header('location: logout.php');
		}
	}
	//if 
	if(isset($_COOKIE['jwtToken'])){
		if(!empty($_COOKIE['jwtToken'])){
			if($_SESSION['jwtToken'] != $_COOKIE['jwtToken']){

				echo "<script src='https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.j'></script>";
				echo "<script>
				$.ajax({
					'async': true,
					'crossDomain': true,
					url: 'http://10.3.50.6/api/user/search?username=' +,
					timeout : 0,
					type: 'GET',
					'headers': {
					    'Content-Type': 'application/json',
					    'Authorization': 'Bearer ' ".$_COOKIE['jwtToken'].",

				  },
				    success: function(data){	
				  		if(ajax.status === 200){
				  			var form = document.createElement('FORM');
					        form.setAttribute('method','post');
					        form.setAttribute('action','checkLogin.php');
					        var inputJwtToken = document.createElement('INPUT');
		        			inputJwtToken.setAttribute('type','hidden');
		        			inputJwtToken.setAttribute('name','jwtToken');
		        			inputJwtToken.setAttribute('value',".$_COOKIE['jwtToken'].");
		        			form.submit();
				  		}
				    }
				});
				</script>";
			}
		}
		else{
			header('location: logout.php');		
		}
	}
	else{
		header('location: logout.php');		
	}
?>