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
		<!--<script src="js/index.js" type="text/javascript"></script>-->
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
			

		<div class="parallax">
			<div id="background" class="parallax__layer parallax__layer--back">
				<div id="leftPanel" class="showcasePanel">
				</div>
				<div id="rightPanel" class="showcasePanel">
				</div>
			</div>
			<div id="divider" class="parallax__layer parallax__layer--back">
			</div>
			
			
			<div id="promo" class="parallax__layer parallax__layer--base">
				<div id="promoLeft">
					<img src="img/journal.png" class="promoLogo">
					<p class="promoText">Dit is tekst dat van zo'n hoog emotioneel kwaliteit is, dat de gebruiker niet anders kan dan op de knop hieronder te drukken</p>
					<button class="promoButton" onclick="scrollToJournal()">Journal</button>
				</div>
				<div id="promoRight">
					<img src="img/datacentre.png" class="promoLogo">
					<p class="promoText">De kwaliteit van deze tekst is nog een stuk hoger; het zou me niet verbazen als het in de geschiedenisboeken bij MacBeth en Lord of the Rings gezet wordt</p>
					<button class="promoButton" onclick="scrollToDatacenter()">Datacenter</button>
				</div>
				<div id="demoJournal" class="demo">
					<div id="journalLeft" class="demoHalves">
						<p>Hier staat een uitzonderlijk boeiende tekst dat duidelijk uitlegt hoe de journal werkt.</p>
					</div>
					<div id="journalRight" class="demoHalves">
					</div>
				</div>
				<div id="demoDatacenter" class="demo">
					<div id="datacenterLeft" class="demoHalves">
					</div>
					<div id="datacenterRight" class="demoHalves">
						<p>Hier staat een uitzonderlijk boeiende tekst dat duidelijk uitlegt hoe de journal werkt.</p>
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
		<script src="js/index.js" type="text/javascript"></script>
	</body>
</html>