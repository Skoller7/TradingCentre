<?php
	session_start();
	if(isset($_POST['jwtToken'])){
		$_SESSION['jwtToken'] = $_COOKIE['jwtToken'];
		$_SESSION['jwtTokenExpireTime'] =  $_COOKIE['jwtTokenExpireTime'];
	}
	//checks that the session jwtToken is set and if the cookie jwtToken is not not the same it wil put the session token in the cookie
	//if the session token is expired it wil redirect te user to the index page
	if(isset($_SESSION['jwtToken']) && isset($_SESSION['jwtTokenExpireTime'])){
		if(!empty($_SESSION['jwtToken']) && !empty($_SESSION['jwtTokenExpireTime'])){
			if(time() < $_SESSION['jwtTokenExpireTime']){
				if($_SESSION['jwtToken'] != $_COOKIE['jwtToken']){
					setcookie('jwtToken',$_SESSION['jwtToken'], $_SESSION['jwtTokenExpireTime']);
					setcookie('jwtTokenExpireTime',$_SESSION['jwtTokenExpireTime'],$_SESSION['jwtTokenExpireTime']);
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
	else{
		if(isset($_COOKIE['jwtToken'])){
			if(!empty($_COOKIE['jwtToken'])){
				echo "<head>";
				echo "<script src='https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js'></script>";
				echo "</head>";
				echo "<body>";
				echo "<script>
				$.ajax({
					'async': true,
					'crossDomain': true,
					url: 'http://10.3.50.6/api/user/search?username=test',
					timeout : 0,
					type: 'GET',
					'headers': {
					    'Content-Type': 'application/json',
					    'Authorization': 'Bearer ".$_COOKIE['jwtToken']."',

				  },
				    success: function(){
			  			var form = document.createElement('FORM');
				        form.setAttribute('method','POST');
				        form.setAttribute('action','".(isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]"."');
				        var inputJwtToken = document.createElement('INPUT');
	        			inputJwtToken.setAttribute('type','hidden');
	        			inputJwtToken.setAttribute('name','jwtToken');
	        			inputJwtToken.setAttribute('value','true');
	        			form.appendChild(inputJwtToken);
	        			document.body.appendChild(form);
	        			form.submit();	
				    }
				});
				</script>";
				echo "</body>";
			}
			else{
				header('location: logout.php');		
			}
		}
		else{
			header('location: logout.php');		
		}
	} 
?>