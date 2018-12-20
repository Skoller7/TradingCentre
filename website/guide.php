<!doctype html>
<html>
<head>
    <title>Guide</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="css/guide.css">
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
			<h1 class="guideTitle">Guides</h1>
            <h3 class="guideSubtitle">Metamask</h3>
            <p>Before you can buy other's trading data, you need to add the <a href="https://metamask.io">Metamask</a> extension to your browser and create an account.<br/>
            Currently we are using the Ropsten testnet on this site, so you will need to switch over to that network, but this allows you to add funds to your account by using a Ropsten faucet, such as <a href="https://faucet.ropsten.be">this</a> one.</p>
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