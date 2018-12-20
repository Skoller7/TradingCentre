<!doctype html>
<html>
<head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="css/datacenter.css">
      <link rel="stylesheet" href="bootstrap-4.1.3/css/bootstrap.min.css">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/echarts/4.2.0-rc.2/echarts.js"></script>
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
<body onload="addbarchart()">
<?php
  include_once("header.html");
?>

<div class="containter-fluid">
    <!-- <nav class="sidebar">
        <div class="row">
                <h3>Overview of your data</h3>
        <ul>
            <li><a href="">Portfolio 1 </a></li>
             <li><a href="">Portfolio 2</a></li>
             <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#buyContractModal">Create a new datacontract</button>
        </ul>
        </div>
    </nav> -->
<div class="">
  <!--  <div class="col-md-3"></div> -->
    <div class="col-md-12 col-sm-12 col-xs-12">
        <div class="header-content">


          <!-- Modal if user has no data yet -->
          <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLongTitle">No sell portfolios found.</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  Hello there!<br />
                  Looks like you don't have any datacontract yet. So the data that you are shown in this page is mere dummy data!
                  Feel free to head over to our <a href="#">FAQ</a> or <a href="journal.php">journal page</a> to create your own selling portfolio.
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>

          <h1>Your data overview</h1>

          <div class="datacontent panel panel-info" id="datacontent"></div>
          <button type="button" class="btn btn-primary makemodal" data-toggle="modal" data-target="#exampleModalCenter"></button>
          <div class="content-datacenter" id="cards">
          <div id="see-more-own" class='card' style='width:100%;float:left;text-align:center;'></div>


        </div>

          <div id="main" ></div>
        <div class="content-datacenter">

        </div>
    </div>
</div>
</div>
</body>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<script src="js/web3.min.js"></script>
<script src="js/truffle-contract.js"></script>
<script src="js/dataOverView.js"></script>
</html>
