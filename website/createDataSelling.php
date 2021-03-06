<?php
  include ('checkToken.php');
?>
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
      <?php
        include_once('favicon.html');
      ?>

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
    <nav class="sidebar" style='width:30%;'>
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
        </div>
         <br  />  <br  />
         <div class="row col-md-12">
        <button type="button" class="btn btn-primary btn-save-order">Save this order</button><br  /><!-- hier de order plaatsen via api in de juiste tabel -->
        <small id="priceHelp" class="form-text text-muted">*you need to have an image and a description before you can save the file</small>
        <span id="saveOrder">This order has been saved!</span> <!-- dit verstoppen tot dat api call succesfull was -->
      </div>
        <hr color="white"/>
        <br />
         <div class="row col-md-12">
        <br /><p>Contract Price :<br />
        <input type="text" id="contractPricing" placeholder="WEI" class="form-control">
        <button type="button" name="button" class="btn btn-primary btn-create-contract-request">Create Buycontract</button><a href="#"> More info?</a>
        <br />
        <span id="errormessage"></span>
      </div>
        </div>
    </nav>
    <div class="col-md-4"></div>

    <div class="col-md-8 col-sm-12 col-xs-12">
        <div class="header-content">
        <h3 id="ordernummerTitel"></h3>
        </div>

        <!-- Modal if user has no data yet -->
        <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Sold portfolios can't be editted.</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                This page has been locked because it is for sale. You can still view your content but not edit it.
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
          <button type="button" class="btn btn-primary makemodal" data-toggle="modal" data-target="#exampleModalCenter"></button>




        <div class="image-content">
          <div class="img-fluid" style="height:50%;" width="80%">
          <img  class="orderimg img-responsive img-fluid" alt="image of this order"/>  <!-- hier een witte box met zwarte randen tonen tot de persoon een img heeft geupload dan wordt de box vervangen door de iamge.-->
          </div>
          <form class="" method="post">
            <p>Image url:
            	<input type="text" id="tradeurl"/> <button type="button" name="button" class="btn btn-primary" id="refreshImage">Refresh image</button>
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
<script src="js/lib.js"></script>
</html>
