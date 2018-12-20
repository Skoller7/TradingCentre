<html>
	<head>
		<title>Tradingcentre</title>
		<link rel="stylesheet" type="text/css" href="bootstrap-4.1.3/css/bootstrap.min.css">
		<link rel="stylesheet" type="text/css" href="css/main.css">
		<link rel="stylesheet" type="text/css" href="css/search.css">
		<link rel="stylesheet" type="text/css" href="css/header.css">
		<link rel="stylesheet" type="text/css" href="css/datacenter.css">
		<link rel="stylesheet" type="text/css" href="css/footer.css">
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
		<script src="js/lib.js" type="text/javascript"></script>
		<script src="js/jquery.js" type="text/javascript"></script>
	    <script src="bootstrap-4.1.3/js/bootstrap.min.js" type="text/javascript"></script>
	    <script src="js/search.js" type="text/javascript"></script>
	    <?php 
	    	include("favicon.html");
	    ?>
	</head>
	<body>
		<?php 
			include("header.html");
		?>
		<script src="js/header.js" type="text/javascript"></script>
		<script>
			<?php

				echo 'var search = "' . htmlspecialchars($_GET['search']) . '";';
				if(isset($_SESSION['jwtToken'] )){
					echo 'var jwtToken = "' . $_SESSION['jwtToken'] . '";';
				}
				else{
					if(isset($_COOKIE['jwtToken'])){
						echo 'var jwtToken = "' . $_COOKIE['jwtToken'] . '";';
					}
				}
				
			?>
		</script>

		<div class="container">

			<div class="row">
				<h1 class="col-md-10" id="search">Searched username: </h1>
			</div>
			<div class="row">
			
			
				<div class="col-md-1"></div>
				<div class="col-md-10" id="user"></div>
			</div>
		</div>
		
		<?php
			include ('footer.html');
		?>
	</body>
</html>