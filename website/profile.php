<!doctype html>
<html>
<head>
    <meta charset="utf-8">  
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="css/profile.css">
    <link rel="stylesheet" href="css/datacenter.css">
    <link rel="stylesheet" href="bootstrap-4.1.3/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">      
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="bootstrap-4.1.3/js/bootstrap.min.js"></script>
    <script src="js/lib.js" type="text/javascript"></script>
    <script src="js/profile.js" type="text/javascript"></script>
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
                            <div class="col-md-12" id="user-image">
                                <h3 id="user-name"></h3>
                                <img src="img/profile.png" id="user-img" class="img-fluid">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12" id="description">
                                <h3>Description</h3>
                                <p id="user-description"></p>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
            <div class="col-md-9 col-sm-12 col-xs-12">
                <div class="header-content">
                    <h3>Data overview</h3>
                </div>
                <div class="content-datacenter">
                    <p id="no-portfolio">This user currently has no portfolios for sale.</p>
                </div>
            </div>
        </div>
        <?php 
            include('footer.html');
        ?>
    </div>
</body>
</html>