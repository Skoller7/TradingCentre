<!doctype html>
<html>
<head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="css/datacenter.css">
      <link rel="stylesheet" href="bootstrap-4.1.3/css/bootstrap.min.css">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
      <script src="bootstrap-4.1.3/js/bootstrap.min.js"></script>
      <script src="js/lib.js" type="text/javascript"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/echarts/4.2.0-rc.2/echarts.js"></script>
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
    <title>Journal</title>

</head>
<body onload="addbasichart()">
<?php
  include_once("header.html");  
?>
<div class="containter-fluid">
<div class="row">
    <nav class="sidebar">
        <div class="row">
            <div class="sidebar-content-portfolios">
                <ul>
                    <li id="ul-journal" style="display:none;"></li>
                    <li id="BCreatePort">Create portfolio</li>
                    <li class="portfolios-header" id="portfolios"><a href="#">Portfolios<i id="port-arrow" class="fa fa-angle-right"></i></a></li>
                    <div id="porfolios-sub">
                        <ul id="portfolios-ul">
                        </ul>
                    </div>
                    <li id="addorder">Add orders</li>
                    <li id="BCreateNote">Create note</li>
                    <!--<li class="notes-header" id="notes"><a href="#">All Notes<i id="notes-arrow" class="fa fa-angle-right"></i></a></li>
                    <div id="notes-sub">
                        <ul id="notes-ul">

                        </ul>
                    </div>!-->
                    <div id="notes-all"></div>
                </ul>
            </div>
        </div>
    </nav>
    <div class="col-md-3 col-sm-0 col-xs-0"></div>
    <div class="col-md-9 col-sm-12 col-xs-12">
        <div class="header-content" id="header-content">
            <h3 id="header-portfolio-name"></h3>
        </div>
        <div class="chart-content">
           <div id="main"></div>
        </div>
        <div id="portfolio-description">

        </div>
        <div id="portfolio-goals">

        </div>
        <h3>Orders</h3>
        <div class="info-content" id="info-content">
        <div>
            <div class="table-responsive">
                <label>Amount</label>
                <select id="amount">
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                    <option value="150">150</option>
                    <option value="200">200</option>
                </select>
                <label>From date</label>
                <input type="date" id="fromdate">
                <label>To Date</label>
                <input type="date" id="todate">
                <input type="submit" class="btn btn-primary" id="refreshorder" value="Refresh orders" style="margin-left:2%;">
                <table class="table table-hover">
                    <thead>
                      <tr class="head-td">
                          <th id="orderId">OrderId</th>
                            <th id="exchange">Exchange<i id="exchange-arrow" class="fa fa-angle-up"></i></th>
                          <th id="side">Side<i id="side-arrow" class="fa fa-angle-up"></i></th>
                          <th id="price">Price<i id="price-arrow" class="fa fa-angle-up"></i></th>
                          <th id="orderQty">Quantity<i id="orderQty-arrow" class="fa fa-angle-up"></i></th>
                          <th id="symbol">Symbol<i id="symbol-arrow" class="fa fa-angle-up"></i></th>
                          <th id="timestamp">Timestamp<i id="timestamp-arrow" class="fa fa-angle-up"></i></th>
                          <th>Image</th>
                          <th>Description</th>
                          <th>Options</th>
                        </tr>
                    </thead>
                    <tbody id="all-orders-table" class="all">
                    </tbody>
                  </table>
                </div>
            </div>
        </div>
        <div class="footer-port" id="footer-port">

        </div>
    </div>
</div>
</div>
<div class="modal fade" id="yesno" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
		        <h5 class="modal-title">Are you sure you want delete this</h5>
		        <button type="button" class="close" id="yesnoBCrosse" aria-label="Close">
	          		<span aria-hidden="true">&times;</span>
				</button>
		    </div>
      		<div class="modal-footer">
        		<button type="button" class="btn btn-primary" id="yess">delete order</button>
        		<button type="button" class="btn btn-secondary" id="noo">Close</button>
      		</div>
    	</div>
		</div>
</div>
    <!-- add description and image to url!-->
    <div class="modal fade" id="Mupdateorder" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
		        <h5 class="modal-title">Upload image and description</h5>
		        <button type="button" class="close" id="updateorderBCrosse" aria-label="Close">
	          		<span aria-hidden="true">&times;</span>
				</button>
		    </div>
      		<div class="modal-body">
      			<form>
                 <p class="modalParagraph">Image url</p>
      				<input type="text" id="urlorder" placeholder="Note" autocomplete="off">
      				<span class="modalErrorMsg" id="errorurl"></span>
                    <p class="modalParagraph">Description</p>
      				<input type="text" id="descorder" placeholder="Note" autocomplete="off">
      				<span class="modalErrorMsg" id="errordesc"></span>
      			</form>
      		</div>
      		<div class="modal-footer">
        		<button type="button" class="btn btn-primary" id="btnupdateorder">Update order</button>
        		<button type="button" class="btn btn-secondary" id="btncloseupdate">Close</button>
      		</div>
    	</div>
		</div>
</div>
<!-- add order to portfolio !-->
<div class="modal fade" id="Maddorder" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
		        <h5 class="modal-title">Add orders to portfolio</h5>
		        <button type="button" class="close" id="addorderBCrosse" aria-label="Close">
	          		<span aria-hidden="true">&times;</span>
				</button>
		    </div>
      		<div class="modal-body">
      			<form>
                <table class="table table-hover">
                    <thead>
                      <tr class="head-td">
                        <th>Exchange</th>
                          <th >Side</th>
                          <th >Price</th>
                          <th>Quantity</th>
                          <th>Symbol</th>
                          <th>Timestamp</th>
                          <th>Add</th>
                        </tr>
                    </thead>
                    <tbody id="all-orders-table-add">
                        
                    </tbody>
                  </table>
      				<span class="modalErrorMsg" id="erroraddorder"></span>
      			</form>
      		</div>
      		<div class="modal-footer">
        		<button type="button" class="btn btn-primary" id="btnaddorder">Add Orders</button>
        		<button type="button" class="btn btn-secondary" id="btnclose">Close</button>
      		</div>
    	</div>
		</div>
</div>
<!-- modal create notes and portfolio!-->

<div class="modal fade" id="MCreateNote" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
		        <h5 class="modal-title">Create Note</h5>
		        <button type="button" class="close" id="MCreateNoteBCrosse" aria-label="Close">
	          		<span aria-hidden="true">&times;</span>
				</button>
		    </div>
      		<div class="modal-body">
      			<form>
					<p class="modalParagraph">Message</p>
      				<input type="text" name="email" id="MCreateNoteContent" placeholder="Note" autocomplete="off">
      				<span class="modalErrorMsg" id="ErrorCreateNoteContent"></span>
      			</form>
      		</div>
      		<div class="modal-footer">
        		<button type="button" class="btn btn-primary" id="MCreateNoteBCreateNote">Create note</button>
        		<button type="button" class="btn btn-secondary" id="MCreateNoteBClose">Close</button>
      		</div>
    	</div>
		</div>
</div>
<div class="modal fade" id="MCreatePort" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
		        <h5 class="modal-title" id="createporttitle">Create portfolio</h5>
		        <button type="button" class="close" id="MCreatePortBCrosse" aria-label="Close">
	          		<span aria-hidden="true">&times;</span>
				</button>
		    </div>
      		<div class="modal-body">
      			<form>
                    <p class="modalParagraph">Name</p>
      				<input type="text" name="name" id="MPortName" placeholder="Name" autocomplete="off">
      				<span class="modalErrorMsg" id="ErrorPortName"></span>
                    <p class="modalParagraph">Description</p>
      				<input type="text" name="name" id="MPortDesc" placeholder="Description" autocomplete="off">
      				<span class="modalErrorMsg" id="ErrorPortDesc"></span>
                    <p class="modalParagraph">Goal</p>
      				<input type="text" name="name" id="MPortGoal" placeholder="Goal" autocomplete="off">
      				<span class="modalErrorMsg" id="ErrorPortGoal"></span>
                    <p class="modalParagraph">Image url</p>
      				<input type="text" name="name" id="Mimgurl" placeholder="Description" autocomplete="off">
      				<span class="modalErrorMsg" id="errorporturl"></span>
                    <p class="modalParagraph">Address</p>
      				<input type="text" name="name" id="Maddress" placeholder="Goal" autocomplete="off">
      				<span class="modalErrorMsg" id="erroradres"></span>
      			</form>
      		</div>
      		<div class="modal-footer">
        		<button type="button" class="btn btn-primary" id="MCreatePortBCreatePort">Create Portfolio</button>
        		<button type="button" class="btn btn-secondary" id="MCreatePortBClose">Close</button>
      		</div>
    	</div>
		</div>
</div>
    <script type="text/javascript" src="js/journal.js"></script>
</body>
</html>
