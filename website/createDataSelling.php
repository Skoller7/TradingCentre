<!doctype html>
<html>
<head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="css/datacenter.css">
        <link rel="stylesheet" href="css/dataselling.css">
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

<div class="modal fade" id="choseOrderModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Chose the order you would like to showcase</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-row align-items-center">
             <div class="col-auto my-1">
               <label class="mr-sm-2" for="inlineFormCustomSelect">Orders:</label>
               <select class="custom-select mr-sm-2" id="inlineFormCustomSelect">
                 <option selected>Order #1234</option>
                 <option value="2">Order #1235</option>
                 <option value="3">Order #1236</option>
               </select>
                 <small id="priceHelp" class="form-text text-muted">* reminder : you can't sell the same order twice!</small>
             </div>
           </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary">Chose this order</button>
      </div>
    </div>
  </div>
</div>

<div class="containter-fluid">
<div class="row">
    <div class="col-md-3">
    <nav class="sidebar">
        <div class="col-md-12">
        <div class="row">
        <div class="user-image col-md-12">
        <h3>Create your data selling Portfolio!</h3>
        </div>
        </div>
        <div class="row">
        <div class="user-description col-md-12">
            <div class="form-group">
              <label for="comment">Data Description: </label>
              <textarea class="form-control" rows="5" id="PortfolioDescription" placeholder="In this data selling portfolio, I am going to teach you how to properly spot Head & shoulders, . . ."></textarea>
            </div>
          </div>
         </div>
        <div class="row">
        <div class="user-stats col-md-12">
        </div>
        </div>
        <div class="row col-md-12">
      <!--  <div class="user-buy col-md-12">
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#choseOrderModal">Chose a new order</button>
        </div> -->
        <label class="mr-sm-2" for="inlineFormCustomSelect">Current orders in the datacontract: </label>
        <!-- <select class="custom-select mr-sm-2" id="inlineFormCustomSelect"> -->
        <select class="custom-select mr-sm-2 ordersHier" id="inlineFormCustomSelect">
            <!--   <div class="ordersHier">
             </div> fetch orders from db -->
          </select>
          <button type="button" id="getdetails" name="button">test button</button>
        </div>
        <br  />  <br  />  <br  />  <br  />
        <hr color="white"/>
        <button type="button" class="btn btn-primary btn-save-order">Save this order</button><br  /><!-- hier de order plaatsen via api in de juiste tabel -->
        <small id="priceHelp" class="form-text text-muted">*you need to have an image and a description before you can save the file</small>
        <span id="saveOrder">This order has been saved!</span> <!-- dit verstoppen tot dat api call succesfull was -->
        <br  /> <br  /> <br  />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <button type="button" name="button" class="btn btn-primary btn-create-contract-request">Create Buycontract</button><a href="#"> More info?</a>
        </div>
    </nav>
    </div>
    <div class="col-md-9 col-sm-12 col-xs-12">
        <div class="header-content">
        <h3 id="ordernummerTitel"></h3>
        </div>
        <div class="image-content">
          <div class="img-fluid" style="height="50%" width="80%"">
          <img  class="orderimg img-responsive img-fluid" alt="image of this order"/>  <!-- hier een witte box met zwarte randen tonen tot de persoon een img heeft geupload dan wordt de box vervangen door de iamge.-->
          </div>
          <form class="" method="post">
            <p>Image url:
            	<input type="text" id="tradeurl"> <button type="button" name="button" class="btn btn-primary" id="refreshImage">Refresh image</button>
              </p>
          </form>

        </div>
        <div class="info-content">
            <div class="image-description">
            <textarea class="form-control orderdescription" rows="5" id="comment" placeholder="Example description

            In this image I spotted an head and shoulder but decided not to play it because of the following reasons

            1) ...
            2) ...
            "></textarea>
            </div>
        </div>
    </div>
</div>
</div>
</body>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<script src="js/web3.min.js"></script>
<script src="js/truffle-contract.js"></script>
<script src="js/dataselling.js"></script>
</html>
