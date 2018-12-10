<?php 
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
?>
<html>
	<head>
		<title>Tradingcentre</title>
		<link rel="stylesheet" type="text/css" href="bootstrap-4.1.3/css/bootstrap.min.css">
		<link rel="stylesheet" type="text/css" href="css/main.css">
		<link rel="stylesheet" type="text/css" href="css/index.css">
		<link rel="stylesheet" type="text/css" href="css/header.css">
		<link rel="stylesheet" type="text/css" href="css/datacenter.css">
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
		<script src="js/jquery.js" type="text/javascript"></script>
		<script src="js/index.js" type="text/javascript"></script>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
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
							<a href="" style="text-decoration: underline;">Get started</a>
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
							<p>Buy expert trading data via a smartcontract on the NEO blockchain or share your own expertise by creating curated portfolios with custom notes and images paired to each trade. </p>
							<a href="" style="text-decoration: underline;">Get started</a>
						</div>
					</div>
				</div>
			</div>
			<div class="parallax__layer parallax__layer--front demo">
				<div id="journalImg">
				</div>
				<div id="datacenterImg">
				</div>
			</div>
		</div>
		<!--
		<div id="cookieBanner">
			<div class="button" id="BAllowCookies">Allow cookies</div>
			GDPR info
		</div>
		-->
		
	</body>
</html>