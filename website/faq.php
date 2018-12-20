<!doctype html>
<html>
<head>
    <title>Frequently Asked Questions</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="css/guides.css">
    <link rel="stylesheet" href="css/datacenter.css">
    <link rel="stylesheet" href="bootstrap-4.1.3/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="bootstrap-4.1.3/js/bootstrap.min.js"></script>
    <script src="js/lib.js" type="text/javascript"></script>
    <script src="js/guides.js" type="text/javascript"></script>
    <?php
		include_once('favicon.html');
	?>
</head>
<body>
<?php
  include_once("header.html");
?>
	<div class="row">
		<div class="col-md-3"></div>
		<div class="col-md-6 col-sm-12 col-xs-12" id="guideContent">
			<h2 class="guideTitle">Account</h2>
            <button class="collapsible">How do I add a BitMEX account to Tradingcenter?</button>
            <!-- https://www.w3schools.com/howto/howto_js_collapsible.asp -->
            <div class="collapsibleContent">
                <p>To add your BitMEX account, go to <a href="settings.php">this</a> page, click on "Security" and enter your key and secret.</p>
            </div>
            <button class="collapsible">How do I change my username?</button>
            <div class="collapsibleContent">
                <p>You can change your username on <a href="settings.php">this</a> page.</p>
            </div>

            <h2 class="guideTitle">General</h2>
            <button class="collapsible">What is the difference between datacenter and journal?</button>
            <div class="collapsibleContent">
                <p>A journal is to keep track of your own trading data, while datacenter is for sharing trading knowledge.</p>
            </div>
            <button class="collapsible">How do I sell my data?</button>
            <div class="collapsibleContent">
                <p>To sell your trading data, go to the <a href=""></a> page, click on blablabla and blablabla</p>
            </div>

		</div>
		<div class="col-md-3"></div>
	</div>
<?php
  include_once("footer.html");
?>
</body>
<!-- <script src="js/web3.min.js"></script>
<script src="js/truffle-contract.js"></script>
<script src="js/datacenterbuy.js"></script>
<script src="js/datacenter.js"></script> -->
</html>