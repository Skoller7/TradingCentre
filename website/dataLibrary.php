<!doctype html>

 <!-- menu bar meer naar links, users uit db halen & verschillende portfolio's tonen *
- mogelijk tonen op rating/likes/follows? **
- card een max height geven zodat deze ongeveer even zal zijn afhankelijk * * *
- als user toch geen backer is er voor zorgen dat link naar faq wordt getoond ( link nog aanmaken);
-->
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
        include_once('favicon.html');
      ?>

</head>
<body>
<?php
  include_once("header.html");
?>
<div class="containter-fluid">
<div class="row">
    <div class="col-md-3"></div>
    <div class="col-md-9 col-sm-12 col-xs-12">
        <div class="header-content">
        <h3>Your bought portfolios : </h3>
        </div>

        <div class="content-datacenter" id="cards">
        <div id="see-more-own" class='card' style='width:100%;float:left;text-align:center;'></div>
        <div class="content-datacenter">
          <!--  <div class="card">
              <img src="img/tradeimg.png" alt="img of chart" class="img-fluid" height="50%">
              <div class="card-body">
                <h5 class="card-title">Skoller</h5>
                <p class="card-text">
                  Master of the head & shoulder pattern.
                  </p>
                  <div class="btn-check" id="buyCheck">
                <a class="btn btn-buycheck btn-primary" id="buyCheck" href="boughtdata.php">View data</a>
              </div>
                <div class="btn-fault" id="faultcheck">
              <p> Either you are not logged in in metamask,
                Or you are not an actual buyer of this portfolio!<span><a href=""> Click here for help </a> </span></p>
              </div>
              </div>
            </div>-->

        </div>
    </div>
</div>
</div>
</body>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<script src="js/web3.min.js"></script>
<script src="js/truffle-contract.js"></script>
<script src="js/datalibrary.js"></script>
</html>
