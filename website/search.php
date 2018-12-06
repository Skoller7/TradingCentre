<?php
	if(isset(^_GET['user'])){

	}
	//call

	
	$page = 1
	$maxSearchResults = 20;
	if(isset($_GET['page'])){
		$page =¨$_GET['page'];
	}

?>

<html>
	<head>
		<title>Tradingcentre</title>
		<link rel="stylesheet" type="text/css" href="bootstrap-4.1.3/css/bootstrap.min.css">
		<link rel="stylesheet" type="text/css" href="css/main.css">
		<link rel="stylesheet" type="text/css" href="css/search.css">
		<link rel="stylesheet" type="text/css" href="css/header.css">
		<link rel="stylesheet" type="text/css" href="css/datacenter.css">
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
		<script src="js/lib.js" type="text/javascript"></script>
		<script src="js/jquery.js" type="text/javascript"></script>
	    <script src="bootstrap-4.1.3/js/bootstrap.min.js" type="text/javascript"></script>
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
				echo 'var resultsText = "";'; 
			?>
		</script>

		<div class="container">
			<div class="row">
			
			
				<div class="col-md-1"></div>
				<div class="col-md-8" id="user"></div>

				<div class="col-md-3" id="moreInfo">
					
					<p>profile picture</p>
					<img src=""  id="profilePicture" alt="profilePicture">
					<p>username</p>
					<p>sirname</p>
				</div>
			</div>
		</div>

		<?php 
			if($page > 2){

			}
			if($page > 1){
				//1 pagina terug
				echo'';
			}
			if($page =! $lastPage){
				//1 pagina Verder
				echo '';
			}
			if($page + 1 == $lastPage){

			}
		?>
		<script src="js/search.js" type="text/javascript"></script>
		<?php 
			include("footer.html");
		?>
		<script>
			<?php

				for($i = 0; <  $maxSearchResults; $i++){

					echo '';

				}
			?>

		</script>
	</body>
</html>