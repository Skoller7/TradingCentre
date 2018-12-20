<?php
  include ('checkToken.php');
?>
<!doctype html>

 <!-- menu bar meer naar links, users uit db halen & verschillende portfolio's tonen *
- mogelijk tonen op rating/likes/follows? **
- card een max height geven zodat deze ongeveer even zal zijn afhankelijk * * *
- datacenter menu bar drop down maken * * * *
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
        <title>Datacenteroverview</title>
</head>
<body>
<?php
  include_once("header.html");
?>
<div class="containter-fluid">
<div class="row">
    <div class="col-md-12 col-sm-12 col-xs-12">
        <div class="header-content">
        <h3>Datacenter</h3>
        </div>
        <div class="content-datacenter" id="highlightcards">
            
        </div>
         <div id="see-more-other" class='card' style='width:100%;float:left;text-align:center;'></div>
    </div>
</div>
</div>
    <?php include("footer.html"); ?>
</body>
<script src="js/datacenteroverview.js"></script>
</html>
