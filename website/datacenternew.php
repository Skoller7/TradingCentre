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
    <div class="col-md-3">
    <nav class="sidebar">
        <div class="col-md-12">
        <div class="row">
        <div class="user-image col-md-12">
        <h3>Skoller</h3>
            <img src="img/indrabreind.png" alt="my girlfriends brain" class="img-fluid" style="margin: 1%; width:20%;">
        </div>
        </div>
        <div class="row">
        <div class="user-description col-md-12">
            <h3>Description</h3>
            Lorem Ipsum is slechts een proeftekst uit het drukkerij- en zetterijwezen. Lorem Ipsum is de standaard proeftekst in deze bedrijfstak sinds de 16e eeuw, toen een onbekende drukker een zethaak met letters nam en ze door elkaar husselde om een font-catalogus te maken
        </div>
         </div>
        <div class="row">
        <div class="user-stats col-md-12">
        <h3>Personal stats</h3>
        Head  shoulder fan<br>
        Followers: 1222<br>
        Rating : <span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><br>
        </div>
        </div>
        <div class="row">
        <div class="user-buy col-md-12">
            <h3>Buy data</h3>
            <input type="button" value="Retrieving data from the blockchain . . ." id="contractPrice" class="btn-contract-buy">
            <span id="buying-succes"></span>
        </div>
        </div>
        </div>
    </nav>
    </div>
    <div class="col-md-9 col-sm-12 col-xs-12">
        <div class="header-content">
        <h3>Showcase best trades #1</h3>
        </div>
        <div class="image-content">
           <img src="img/tradeimg.png" alt="img of chart" class="img-fluid" height="50%">
        </div>
        <div class="info-content">
            <div class="image-description">
            Lorem Ipsum is slechts een proeftekst uit het drukkerij- en zetterijwezen. Lorem Ipsum is de standaard proeftekst in deze bedrijfstak sinds de 16e eeuw, toen een onbekende drukker een zethaak met letters nam en ze door elkaar husselde om een font-catalogus te maken. Het heeft niet alleen vijf eeuwen overleefd maar is ook, vrijwel onveranderd, overgenomen in elektronische letterzetting. Het is in de jaren '60 populair geworden met de introductie van Letraset vellen met Lorem Ipsum passages en meer recentelijk door desktop publishing software zoals Aldus PageMaker die versies van Lorem Ipsum bevatten.
            </div>
            <div class="image-like">
            <input type="submit" value="Like">
            <input type="submit" value="Dislike">
            </div>
            <div class="image-comments">
                <div class="image-comment">
                    <div class="comment-head">
                    <i class="fa fa-user"></i> Skoller
                    </div>
                    <div class="comment-content">
                    Lorem Ipsum is slechts een proeftekst uit het drukkerij- en zetterijwezen. Lorem Ipsum is de standaard proeftekst in deze bedrijfstak sinds de 16e eeuw, toen een onbekende drukker een zethaak met letters nam en ze door elkaar husselde om een font-catalogus te maken
                    </div>
                    <div class="comment-footer">
                        <span class="comment-date">14/11/2018 18:55</span>
                        <span class="comment-links"><a href="">Like</a><a href="">Dislike</a><a href="">Reply</a></span>
                    </div>
                </div>
                <div class="comment-add">
                <form method="post" class="form-add-comment">
                    <label>Comment</label>
                    <input type="text">
                    <input type="submit" value="Add comment">
                </form>
                </div>
            </div>
        </div>
        <div class="similar datasellers">
            <h3>Similar datasellers</h3>
            <div class="row">
                <div class="user-image col-md-2">
        <h3>Skoller</h3>
            <img src="img/indrabreind.png" alt="my girlfriends brain" class="img-fluid" style="margin: 1%; width:20%;">
        </div>
                    <div class="user-image col-md-2">
        <h3>Skoller</h3>
            <img src="img/indrabreind.png" alt="my girlfriends brain" class="img-fluid" style="margin: 1%; width:20%;">
        </div>
                    <div class="user-image col-md-2">
        <h3>Skoller</h3>
            <img src="img/indrabreind.png" alt="my girlfriends brain" class="img-fluid" style="margin: 1%; width:20%;">
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
<script src="js/datacenterbuy.js"></script>
</html>
