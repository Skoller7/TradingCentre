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
<div class="modal fade" id="buyContractModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Create a Datacontract</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-row align-items-center">
             <div class="col-auto my-1">
               <label class="mr-sm-2" for="inlineFormCustomSelect">Preference</label>
               <select class="custom-select mr-sm-2" id="inlineFormCustomSelect">
                 <option selected>Default Portfolio</option>
                 <option value="2">Portfolio 1</option>
                 <option value="3">Portfolio 2</option>
               </select>
             </div>
           </div>
          <div class="form-group"><br  />
            <label for="exampleInputEmail1">Contract Price</label>
            <input type="ContractPrice" class="form-control" aria-describedby="emailHelp" placeholder="Ether price">
            <small id="priceHelp" class="form-text text-muted">This will be the selling price of your contract</small>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary">Create contract</button>
      </div>
    </div>
  </div>
</div>


<div class="containter-fluid">
    <nav class="sidebar">
        <div class="row">
                <h3>Overview of your data</h3>
        <ul>
            <li><a href="">Portfolio 1 </a></li>
             <li><a href="">Portfolio 2</a></li>
             <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#buyContractModal">Create a new datacontract</button>
        </ul>
        </div>
    </nav>
<div class="row">
    <div class="col-md-3"></div>
    <div class="col-md-9 col-sm-12 col-xs-12">
        <div class="header-content">
        <h3>Portfolio 1 overview</h3><br /><br />


          <h4>DataContract price:
          <span id="contractPrice"></span> </h4><br />

          <h4>Buyers :
          <span id="buyers"></span></h4><br />

          <h4>Profit :
            <span id="dataProfit"></span>
          </h4>

          <h1>Hier misschien nog een graph over hoe de sales gaan???</h1>
            <div id="main" ></div>


        </div>
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
