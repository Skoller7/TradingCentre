  <?php
  //expandlivingTime
  session_start();
  if(isset($_SESSION['jwtToken'])){
    setcookie('jwtToken',$_SESSION['jwtToken'], time() + 60*60*6);
  }
  else{
    if(isset($_COOKIE['jwtToken'])){
      /*if(){
        $_SESSION['jwtToken'] = $_COOKIE['jwtToken'];
      }*/
    }
    else{
      header('location: logout.php');
    }
  }

?>
<!DOCTYPE html>
<html>
	<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="bootstrap-4.1.3/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="css/header.css">
    <link rel="stylesheet" type="text/css" href="css/datacenter.css">
    <link rel="stylesheet" type="text/css" href="css/main.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="bootstrap-4.1.3/js/bootstrap.min.js"></script>
 
    <script src="js/lib.js" type="text/javascript"></script>
    <?php 
      include('favicon.html');
    ?>
	</head>
   <style>
       .navbar{
            background-color: #4B77BE;
           margin: 0 auto;
        }
        .navbar-expand-lg .navbar-brand {
            color: #fff;
        }
        .navbar-expand-lg .navbar-brand:hover {
            color: #fff;
        }
        .nav-link{
            background-color: #fff;
            margin:1%;
            color:#000;
        }
        .nav-link:hover{
            background-color: #000;
            color: #fff;
        }
        .nav-pills .nav-link.active, .nav-pills .show>.nav-link{
            background-color: #000;
        }
        #context{
            border:1px solid #000;
            border-radius: 15px;
        }
        #context-head{
        }
        #context-firstrow{
             border:1px solid #000;
            border-radius: 15px;
        }
        #grey{
            background-color:#999;
        }
        .navbar-toggler-icon{
               background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(255,255,255,1)' stroke-width='3' stroke-linecap='round' stroke-miterlimit='10' d='M4 8h24M4 16h24M4 24h24'/%3E%3C/svg%3E");
        }
        .navbar-toggler-icon:hover{
            background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(0,0,0,1)' stroke-width='3' stroke-linecap='round' stroke-miterlimit='10' d='M4 8h24M4 16h24M4 24h24'/%3E%3C/svg%3E");
        }
        .container{
            margin-top:65px;
        }
        .img-person{
            width:20px;
        }
        .checked{
            color:#ff8c1a;
        }
        footer{
            background-color: #4B77BE;
            margin-top: 1%;
            color:#fff;
        }
        #footertext{
           margin:0 auto;
            text-align: center;
            padding:2%;
        }
        .footer-ul li{
            list-style: none;
            text-decoration: none;
        }
        .footer-ul li a{
            color: #fff;
        }
      </style>
	<body>
    <?php 
      include ('header.html');
    ?>

        
<div class="container">
    <div class="row">
        <div id="context-firstrow" class="col-md-7 col-sm-12 col-xs-12">
Lorem Ipsum is slechts een proeftekst uit het drukkerij- en zetterijwezen. Lorem Ipsum is de standaard proeftekst in deze bedrijfstak sinds de 16e eeuw, toen een onbekende drukker een zethaak met letters nam en ze door elkaar husselde om een font-catalogus te maken. Het heeft niet alleen vijf eeuwen overleefd maar is ook, vrijwel onveranderd, overgenomen in elektronische letterzetting. Het is in de jaren '60 populair geworden met de introductie van Letraset vellen met Lorem Ipsum passages en meer recentelijk door desktop publishing software zoals Aldus PageMaker die versies van Lorem Ipsum bevatten.
            Lorem Ipsum is slechts een proeftekst uit het drukkerij- en zetterijwezen. Lorem Ipsum is de standaard proeftekst in deze bedrijfstak sinds de 16e eeuw, toen een onbekende drukker een zethaak met letters nam en ze door elkaar husselde om een font-catalogus te maken. Het heeft niet alleen vijf eeuwen overleefd maar is ook, vrijwel onveranderd, overgenomen in elektronische letterzetting. Het is in de jaren '60 populair geworden met de introductie van Letraset vellen met Lorem Ipsum passages en meer recentelijk door desktop publishing software zoals Aldus PageMaker die versies van Lorem Ipsum bevatten.
            
            Lorem Ipsum is slechts een proeftekst uit het drukkerij- en zetterijwezen. Lorem Ipsum is de standaard proeftekst in deze bedrijfstak sinds de 16e eeuw, toen een onbekende drukker een zethaak met letters nam en ze door elkaar husselde om een font-catalogus te maken. Het heeft niet alleen vijf eeuwen overleefd maar is ook, vrijwel onveranderd, overgenomen in elektronische letterzetting. Het is in de jaren '60 populair geworden met de introductie van Letraset vellen met Lorem Ipsum passages en meer recentelijk door desktop publishing software zoals Aldus PageMaker die versies van Lorem Ipsum bevatten.
            Lorem Ipsum is slechts een proeftekst uit het drukkerij- en zetterijwezen. Lorem Ipsum is de standaard proeftekst in deze bedrijfstak sinds de 16e eeuw, toen een onbekende drukker een zethaak met letters nam en ze door elkaar husselde om een font-catalogus te maken. Het heeft niet alleen vijf eeuwen overleefd maar is ook, vrijwel onveranderd, overgenomen in elektronische letterzetting. Het is in de jaren '60 populair geworden met de introductie van Letraset vellen met Lorem Ipsum passages en meer recentelijk door desktop publishing software zoals Aldus PageMaker die versies van Lorem Ipsum bevatten.
            
            Lorem Ipsum is slechts een proeftekst uit het drukkerij- en zetterijwezen. Lorem Ipsum is de standaard proeftekst in deze bedrijfstak sinds de 16e eeuw, toen een onbekende drukker een zethaak met letters nam en ze door elkaar husselde om een font-catalogus te maken. Het heeft niet alleen vijf eeuwen overleefd maar is ook, vrijwel onveranderd, overgenomen in elektronische letterzetting. Het is in de jaren '60 populair geworden met de introductie van Letraset vellen met Lorem Ipsum passages en meer recentelijk door desktop publishing software zoals Aldus PageMaker die versies van Lorem Ipsum bevatten.
            
            Lorem Ipsum is slechts een proeftekst uit het drukkerij- en zetterijwezen. Lorem Ipsum is de standaard proeftekst in deze bedrijfstak sinds de 16e eeuw, toen een onbekende drukker een zethaak met letters nam en ze door elkaar husselde om een font-catalogus te maken. Het heeft niet alleen vijf eeuwen overleefd maar is ook, vrijwel onveranderd, overgenomen in elektronische letterzetting. Het is in de jaren '60 populair geworden met de introductie van Letraset vellen met Lorem Ipsum passages en meer recentelijk door desktop publishing software zoals Aldus PageMaker die versies van Lorem Ipsum bevatten.
            
            
            Lorem Ipsum is slechts een proeftekst uit het drukkerij- en zetterijwezen. Lorem Ipsum is de standaard proeftekst in deze bedrijfstak sinds de 16e eeuw, toen een onbekende drukker een zethaak met letters nam en ze door elkaar husselde om een font-catalogus te maken. Het heeft niet alleen vijf eeuwen overleefd maar is ook, vrijwel onveranderd, overgenomen in elektronische letterzetting. Het is in de jaren '60 populair geworden met de introductie van Letraset vellen met Lorem Ipsum passages en meer recentelijk door desktop publishing software zoals Aldus PageMaker die versies van Lorem Ipsum bevatten.
            
            Lorem Ipsum is slechts een proeftekst uit het drukkerij- en zetterijwezen. Lorem Ipsum is de standaard proeftekst in deze bedrijfstak sinds de 16e eeuw, toen een onbekende drukker een zethaak met letters nam en ze door elkaar husselde om een font-catalogus te maken. Het heeft niet alleen vijf eeuwen overleefd maar is ook, vrijwel onveranderd, overgenomen in elektronische letterzetting. Het is in de jaren '60 populair geworden met de introductie van Letraset vellen met Lorem Ipsum passages en meer recentelijk door desktop publishing software zoals Aldus PageMaker die versies van Lorem Ipsum bevatten.
            
            Lorem Ipsum is slechts een proeftekst uit het drukkerij- en zetterijwezen. Lorem Ipsum is de standaard proeftekst in deze bedrijfstak sinds de 16e eeuw, toen een onbekende drukker een zethaak met letters nam en ze door elkaar husselde om een font-catalogus te maken. Het heeft niet alleen vijf eeuwen overleefd maar is ook, vrijwel onveranderd, overgenomen in elektronische letterzetting. Het is in de jaren '60 populair geworden met de introductie van Letraset vellen met Lorem Ipsum passages en meer recentelijk door desktop publishing software zoals Aldus PageMaker die versies van Lorem Ipsum bevatten.
            
            Lorem Ipsum is slechts een proeftekst uit het drukkerij- en zetterijwezen. Lorem Ipsum is de standaard proeftekst in deze bedrijfstak sinds de 16e eeuw, toen een onbekende drukker een zethaak met letters nam en ze door elkaar husselde om een font-catalogus te maken. Het heeft niet alleen vijf eeuwen overleefd maar is ook, vrijwel onveranderd, overgenomen in elektronische letterzetting. Het is in de jaren '60 populair geworden met de introductie van Letraset vellen met Lorem Ipsum passages en meer recentelijk door desktop publishing software zoals Aldus PageMaker die versies van Lorem Ipsum bevatten.
            Lorem Ipsum is slechts een proeftekst uit het drukkerij- en zetterijwezen. Lorem Ipsum is de standaard proeftekst in deze bedrijfstak sinds de 16e eeuw, toen een onbekende drukker een zethaak met letters nam en ze door elkaar husselde om een font-catalogus te maken. Het heeft niet alleen vijf eeuwen overleefd maar is ook, vrijwel onveranderd, overgenomen in elektronische letterzetting. Het is in de jaren '60 populair geworden met de introductie van Letraset vellen met Lorem Ipsum passages en meer recentelijk door desktop publishing software zoals Aldus PageMaker die versies van Lorem Ipsum bevatten.
        </div>
        <div class="col-md-4 col-sm-12 col-xs-12" id="context-head">
            <div class="row">
                <div id="context" class="col-sm-12">
                        <table class="table">
                          <thead class="thead-dark">
                            <tr>
                                <h2>TOP SELLERS</h2>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th><img class="img-person" src="img/person.svg"></th>
                                <td><a href="Index.html">Mark</a></td>
                              <td>25000 <i class="fa fa-user"></i></td>
                              <td><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star"></span><span class="fa fa-star"></span></td>
                                </tr>
                            <tr>
                              <th><img class="img-person "src="img/person.svg"></th>
                                <td><a href="Index.html">Bart</a></td>
                              <td>45888 <i class="fa fa-user"></i></td>
                              <td><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span></td>
                            </tr>
                            <tr>
                              <th><img class="img-person" src="img/person.svg"></th>
                                <td><a href="Index.html">Ilja</a></td>
                              <td>9999999 <i class="fa fa-user"></i></td>
                              <td><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star"></span></td>
                            </tr>
                          </tbody>
                        </table>
                    </div>
            </div>
            <div class="row">
                 <div id="context" class="col-sm-12">
                     <!-- Optional attributes are data-theme="dark" data-width="" data-height="" data-chrome="nofooter noheader noborders noscrollbar transparent" data-tweet-limit="3""-->		
		<a class="twitter-timeline" href="https://twitter.com/Ilja_DR/lists/tradingcenter-list?ref_src=twsrc%5Etfw" data-height="500px" style="h2{display:none;}">A Twitter List by Ilja_DR</a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
                     <!-- <table class="table">
                          <thead class="thead-dark">
                            <tr>
                                <h2>NEWS FEED</h2>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                                <td><img class="img-person" src="img/person.svg"></td><td><a href="Index.html">Mark</a></td><td>28 Augustus 2018, 23:55</td><td><a class="btn btn-primary" data-toggle="collapse" href="#newsitem" role="button" aria-expanded="false" aria-controls="newsitem">V</a></td>
                            </tr>
                            <tr>
                                <td colspan="4" id="newsitem">The US 2018 midterm elections are approaching and can have a significant impact on the United States political landscape. Democrats are more trade-friendly, and if they win, they will try to block trade tariffs. On the other hand, Republicans favor more tariffs, lower taxes, and a stronger US Dollar. </td>
                            </tr>
                            <tr>
                                <td><img class="img-person" src="img/person.svg"></td><td><a href="Index.html">Mark</a></td><td>28 Augustus 2018, 22:23</td><td><a class="btn btn-primary" data-toggle="collapse" href="#newsitem1" role="button" aria-expanded="false" aria-controls="newsitem1">V</a></td>
                            </tr>
                            <tr>
                                <td colspan="4" id="newsitem1">The US 2018 midterm elections are approaching and can have a significant impact on the United States political landscape. Democrats are more trade-friendly, and if they win, they will try to block trade tariffs. On the other hand, Republicans favor more tariffs, lower taxes, and a stronger US Dollar. </td>
                            </tr>
                                                          <tr>
                                <td><img class="img-person" src="img/person.svg"></td><td><a href="Index.html">Mark</a></td><td>28 Augustus 2018, 15:10</td><td><a class="btn btn-primary" data-toggle="collapse" href="#newsitem2" role="button" aria-expanded="false" aria-controls="newsitem2">V</a></td>
                            </tr>
                            <tr>
                                <td colspan="4" id="newsitem2">The US 2018 midterm elections are approaching and can have a significant impact on the United States political landscape. Democrats are more trade-friendly, and if they win, they will try to block trade tariffs. On the other hand, Republicans favor more tariffs, lower taxes, and a stronger US Dollar. </td>
                            </tr>
                          </tbody>
                        </table>!-->
                    </div>   
            </div>
        </div>
    </div>        
</div>
        
  <?php 
    include ('footer.html');
  ?>
	</body>
</html>