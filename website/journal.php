<!doctype html>
<html>
<head>
<link rel="stylesheet" href="bootstrap-4.1.3/css/bootstrap.min.css">    
<script src="bootstrap-4.1.3/js/bootstrap.min.js"></script>
<script src="js/lib.js" type="text/javascript"></script>
<link rel="stylesheet" href="css/datacenter.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/echarts/4.2.0-rc.2/echarts.js"></script>
    		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
</head>
<body onload="addchart()">
<?php
  include_once("header.html");  
?>
<div class="containter-fluid">
<div class="row">
    <nav class="col-md-3 sidebar">
        <div class="row">
                <h3>Portfolios</h3>
        <ul>
            <li><a href="" class="port1">Portfolio 1</a></li>
             <li><a href="" class="port2">Portfolio 1</a></li>
            <li><a href="" class="port3">Portfolio 1</a></li>
            <li><a href="" class="port1">Portfolio 1</a></li>
        </ul>
            <h3>Notes</h3>
        <div class="notes">
            <input type="submit" value="Add new note">
        </div>
        </div>
    </nav>
    <div class="col-md-12 col-sm-12 col-xs-12">
        <div class="header-content">
        <h3>Showcase best trades #1</h3>
        </div>
        <div class="chart-content">
           <div id="main"></div>

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
                                <td>Technique</td>
                                <td>Image</td>
                              </thead>
                          </tbody>  
                        </table>
        </div>
    </div>
</div>
</div>
    <script type="text/javascript" src="js/journal.js"></script>
</body>
</html>