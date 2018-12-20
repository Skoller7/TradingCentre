<!doctype html>
<html>
<head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="css/datacenter.css">
      <link rel="stylesheet" href="bootstrap-4.1.3/css/bootstrap.min.css">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="bootstrap-4.1.3/js/bootstrap.min.js"></script>
      <script src="js/lib.js" type="text/javascript"></script>
  <?php
    include('favicon.html');
  ?>
        <title>Datacenter</title>
</head>
<body>
<?php
  include_once("header.html");
?>
<div class="containter-fluid" id="containerdatacenter">
    <nav class="sidebar">
        <div class="user-image col-md-12">
        <h3 id="username-port"></h3>
            <img id="img-user" alt="my girlfriends brain" class="img-fluid" style="margin:1%; width:20%;">
        </div>
        <div class="user-description col-md-12" id="user-description">
            <h3>Description</h3>
        </div>
        <div class="user-buy col-md-12">
            <h3>Buy data</h3>
            <input type="button" value="Retrieving data from the blockchain . . ." id="contractPrice" class="btn-contract-buy">
            <span id="buying-succes"></span>
        </div>
    </nav>
    <div class="row">
    <div class='col-md-2'></div>
    <div class="col-md-10 col-sm-12 col-xs-12">
        <div class='row'>
        <div class='col-md-1' id="btnprev"></div>
        <div class='col-md-10' id="content-sell">

        </div>
        <div class='col-md-1' id="btnnext"></div>
    </div>
    </div>
</div>
</div>
    <!-- delete yes or no-->
<div class="modal fade" id="yesno" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
		        <h5 class="modal-title">Are you sure you want delete this?</h5>
		    </div>
      		<div class="modal-footer">
        		<button type="button" class="btn btn-primary" id="yess">Yes</button>
        		<button type="button" class="btn btn-secondary" id="noo">No</button>
      		</div>
    	</div>
		</div>
</div>
    <?php include("footer.html"); ?>
</body>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<script src="js/web3.min.js"></script>
<script src="js/truffle-contract.js"></script>
<script src="js/datacenterbuy.js"></script>
<script src="js/datacenter.js"></script>
</html>
