<?php
	session_start();
	if(isset($_POST['jwtToken'])){
		$_SESSION['jwtToken'] = $_COOKIE['jwtToken'];
		$_SESSION['jwtTokenExpireTime'] = $_COOKIE['jwtTokenExpireTime'];
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
		}
	}
	else{
		if(isset($_COOKIE['jwtToken']) && isset($_COOKIE['jwtTokenExpireTime'])){
			if(!empty($_COOKIE['jwtToken']) && !empty($_COOKIE['jwtTokenExpireTime'])){
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
		}
	} 
?>
<html>
	<head>
		<title>Tradingcenter</title>
		<link rel="stylesheet" type="text/css" href="bootstrap-4.1.3/css/bootstrap.min.css">
		<link rel="stylesheet" type="text/css" href="css/main.css">
		<link rel="stylesheet" type="text/css" href="css/index.css">
		<link rel="stylesheet" type="text/css" href="css/datacenter.css">
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
		<script src="js/index.js" type="text/javascript"></script>
	    <script src="bootstrap-4.1.3/js/bootstrap.min.js" type="text/javascript"></script>
	    <script src="js/lib.js" type="text/javascript"></script>
	    <?php
	    	include('favicon.html');
	     ?>
	</head>
	<body>
		<?php 
			include('header.html');
		?>
		<!-- https://keithclark.co.uk/articles/pure-css-parallax-websites/ -->
	<div class="parallax" style="transform-style: preserve-3d;">
		<div id="background" class="parallax__layer parallax__layer--back">
			<div id="leftPanel" class="showcasePanel">
			</div>
			<div id="rightPanel" class="showcasePanel">
			</div>
		</div>
		<div id="divider" class="parallax__layer parallax__layer--back">
		</div>
		<div class="parallax__layer">
			<div id="promoLeft" class="promo">
				<img src="img/journal.png" class="promoLogo">
				<p class="promoText">Log your trades on your exchanges to find trading patterns or just to keep track of your buying and selling history</p>
				<input type="button" class="promoButton" id="promoJournalButton" value="Journal"></input>
			</div>
			<div id="promoRight" class="promo">
				<img src="img/datacentre.png" class="promoLogo">
				<p class="promoText">Learn new trading techniques from experienced traders or get paid to teach others about your favorite strategies</p>
				<input type="button" class="promoButton" id="promoDatacenterButton" value="Datacenter"></input>
			</div>
			<div id="demoJournal" class="demo">
				<div id="journalLeft" class="demoHalves">
					<div class="demoText">
						<p>Your journal will automatically keep track of your trades on BitMEX and generate handy charts so you can see your progress over time. 
						Additionally, you can log your trades in custom portfolios based on goals or techniques.</p>
						<a class="getStarted" style="text-decoration: underline;">Get started</a>
					</div>
				</div>
				<div id="journalRight" class="demoHalves">
				</div>
			</div>
			<div id="horizontalDivider"><div></div></div>
			<div id="demoDatacenter" class="demo">
				<div id="datacenterLeft" class="demoHalves">
				</div>
				<div id="datacenterRight" class="demoHalves">
					<div class="demoText">
						<p>Buy expert trading data via a smartcontract on the NEO blockchain or share your own expertise by creating curated portfolios with custom notesand images paired to each trade. </p>
						<a class="getStarted" style="text-decoration: underline;">Get started</a>
					</div>
				</div>
			</div>
			<?php 
            include('footer.html');
        ?>
		<div class="parallax__layer parallax__layer--front demo">
			<div id="journalImg">
			</div>
			<div id="datacenterImg">
			</div>
		</div>
		
	</div>
	<script>
		var verificationKey = "";
	</script>
	<?php 
		if(isset($_GET['verificationKey'])){
			echo '<script>verificationKey = "'. $_GET['verificationKey'] .'";verifieEmail();</script>';
		}
	?>		
	</body>
</html>