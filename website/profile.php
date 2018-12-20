<!doctype html>
<html>
<head>
    <title>Profile</title>
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
    <?php
        include_once('favicon.html');
    ?>
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