<?php 
  session_start();
  $showEmailVerificationModal = false;
  if(isset($_SESSION['verificationKey']) && isset($_SESSION['email']) && isset($_SESSION['username'])){
    if(!empty($_SESSION['verificationKey']) && !empty($_SESSION['email']) && !empty($_SESSION['username'])){
      /*
      $headers[] = 'MIME-Version: 1.0';
      $headers[] = 'Content-type: text/html; charset=iso-8859-1';
      $headers[] = 'From: TradingCenter <birthday@example.com>';
      */
      $email = $_SESSION['email'];
      $emailHeader = 'verification TradingCentre';
      //$emailBody = "Dear ".$_SESSION['username'].",\r\n\r\nYou have regently made an account on <a href='www.google.com'>TradingCenter</a> with this email address.\r\nCan you please comfirnm that this is your email address by clinking this link.\r\nhttps://dtprojecten.ehb.be/TradingCenter/index.php?verificationKey=" . $_SESSION['verificationKey'];
      $emailBody = "Dear ".$_SESSION['username'].",\r\n\r\nYou have regently made an account on TradingCenter with this email address.\r\nCan you please comfirnm that this is your email address by clinking this link.\r\nhttps://dtprojecten.ehb.be/TradingCenter/index.php?verificationKey=" . $_SESSION['verificationKey'];
      unset($_SESSION['email']);
      unset($_SESSION['verificationKey']);
      unset($_SESSION['username']);
      mail($email,$emailHeader,$emailBody);  
      //mail($email,$emailHeader,$emailBody,implode("\r\n", $headers));    
      $showEmailVerificationModal = true;
    }
  }
?>
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
  <?php
    include('favicon.html');
  ?>
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
                    <li id="addorder">Add orders to current portfolio</li>
                    <div id="rightbottom">
                        <div class="footer-port" id="footer-port">
                        </div>
                        <li id="changedisplay" style='padding: 10px 20px 10px 20px;' class='fa fa-desktop'></li>
                    </div>
                    <li id="BCreateNote">Create note</li>
                    <!--<li class="notes-header" id="notes"><a href="#">All Notes<i id="notes-arrow" class="fa fa-angle-right"></i></a></li>
                    <div id="notes-sub">
                        <ul id="notes-ul">

                        </ul>
                    </div>!-->
                    <div id="notes-all" ></div>
                </ul>
            </div>
        </div>
    </nav>
    <div class="col-md-2 col-sm-0 col-xs-0"></div>
    <div class="col-md-10 col-sm-12 col-xs-12">
    <div id="content1" style='display:block;'>
        <div class="chart-content">
           <div id="main"></div>
        </div>
        <div id="portfolio-description">

        </div>
        <div id="portfolio-goals">

        </div>
        <h3>Orders</h3>
        <div class="info-content" id="info-content">
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
        <div style='height:30px;'>

        </div>
        </div>
        <div id="content2" style='display:none;margin-left:10px;margin-right:10px;'>
            <h3 id='content2-header'>Trading journal</h3>
            <hr style='color:#000;'/>
            <div id="content2-orders"></div>
                    <div style='height:30px;'>

        </div>
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
      				<input type="text" id="urlorder" placeholder="image url" autocomplete="off">
      				<span class="modalErrorMsg" id="errorurl"></span>
                    <img style='width:100%;' id='imageurl'>
                    <p class="modalParagraph">Description</p>
      				<input type="text" id="descorder" placeholder="description" autocomplete="off">
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
		        <h5 class="modal-title">Add orders to current portfolio</h5>
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
		        <h5 class="modal-title" id="notetitle">Create Note</h5>
		        <button type="button" class="close" id="MCreateNoteBCrosse" aria-label="Close">
	          		<span aria-hidden="true">&times;</span>
				</button>
		    </div>
      		<div class="modal-body">
      			<form>
					<p class="modalParagraph">Message</p>
      				<input type="text" id="MCreateNoteContent" placeholder="Note" autocomplete="off">
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
      				<input type="text" name="name" id="Mimgurl" placeholder="image url" autocomplete="off">
      				<span class="modalErrorMsg" id="errorporturl"></span>
                    <img style='width:100%;' id='portimg'>
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
    <?php
      if($showEmailVerificationModal){
        echo '<script>openMVerificationMail("'.$email.'");</script>';
      }
    ?>
</body>
</html>
