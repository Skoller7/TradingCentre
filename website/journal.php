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
                    <li id="BCreatePort">Create portfolio</li>
                    <li class="portfolios-header" id="portfolios"><a href="#">Portfolios<i id="port-arrow" class="fa fa-angle-right"></i></a></li>
                    <div id="porfolios-sub">
                        <ul id="portfolios-ul">
                        </ul>
                    </div>
                    <li id="BCreateNote">Create note</li>
                    <li class="notes-header" id="notes"><a href="#">Notes<i id="notes-arrow" class="fa fa-angle-right"></i></a></li>
                    <div id="notes-sub">
                        <ul id="notes-ul">
                             <div id="notes-all"></div>
                        </ul>
                    </div>
                </ul>
            </div>
        </div>
    </nav>
    <div class="col-md-3"></div>
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
        <div class="info-content">
                    <table class="table table-dark" width="100%;">
                          <tbody id="orders">
                            <thead>
                              <td>Exchange</td>
                                <td>Symbol</td>
                                <td>Currency</td>
                                <td>Buy/Sell</td>
                                <td>Price</td>
                                <td>Qauntity</td>
                                <td>Timeplaced</td>
                                <!--<td>Technique</td>
                                <td>Image</td>!-->
                              </thead>
                          </tbody>  
                        </table>
        </div>
        <div class="footer-port">
                    <i id="header-port-del"></i>
            <i id="header-port-update"></i>
        </div>
    </div>
</div>
</div>
<!-- modal create notes!-->
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
		        <h5 class="modal-title">Create portfolio</h5>
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