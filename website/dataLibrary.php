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
      <link rel="apple-touch-icon" sizes="57x57" href="img/favicon/apple-icon-57x57.png">
      <link rel="apple-touch-icon" sizes="60x60" href="img/favicon/apple-icon-60x60.png">
      <link rel="apple-touch-icon" sizes="72x72" href="img/favicon/apple-icon-72x72.png">
      <link rel="apple-touch-icon" sizes="76x76" href="img/favicon/apple-icon-76x76.png">
      <link rel="apple-touch-icon" sizes="114x114" href="img/favicon/apple-icon-114x114.png">
      <link rel="apple-touch-icon" sizes="120x120" href="img/favicon/apple-icon-120x120.png">
      <link rel="apple-touch-icon" sizes="144x144" href="img/favicon/apple-icon-144x144.png">
      <link rel="apple-touch-icon" sizes="152x152" href="img/favicon/apple-icon-152x152.png">
      <link rel="apple-touch-icon" sizes="180x180" href="img/favicon/apple-icon-180x180.png">
      <link rel="icon" type="image/png" sizes="192x192" href="img/favicon/android-icon-192x192.png">
      <link rel="icon" type="image/png" sizes="32x32" href="img/favicon/favicon-32x32.png">
      <link rel="icon" type="image/png" sizes="96x96" href="img/favicon/favicon-96x96.png">
      <link rel="icon" type="image/png" sizes="16x16" href="img/favicon/favicon-16x16.png">
      <link rel="manifest" href="img/favicon/manifest.json">
      <meta name="msapplication-TileColor" content="#ffffff">
      <meta name="msapplication-TileImage" content="img/favicon/ms-icon-144x144.png">
      <meta name="theme-color" content="#ffffff">

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
        <h3>Your bought portfolio's : </h3>
        </div>
        <div class="content-datacenter">
            <div class="card">
              <img src="img/tradeimg.png" alt="img of chart" class="img-fluid" height="50%">
              <div class="card-body">
                <h5 class="card-title">Skoller</h5>
                <p class="card-text">
                  Master of the head & shoulder pattern.
                  </p>
                  <div class="btn-check" id="buyCheck">
                <a class="btn btn-buycheck btn-primary" id="buyCheck">View data</a>
              </div>
                <div class="btn-fault" id="faultcheck">
              <p> Either you are not logged in in metamask,
                Or you are not an actual buyer of this portfolio!<span><a href=""> Click here for help </a> </span></p>
              </div>
              </div>
            </div>

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
