<!doctype html>
<html>
<head>
    
    <link rel="stylesheet" type="text/css" href="bootstrap-4.1.3/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="css/datacenter.css">
    <link rel="stylesheet" href="css/Settings.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <script src="js/jquery.js" type="text/javascript"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="bootstrap-4.1.3/js/bootstrap.min.js" type="text/javascript"></script>
    <script src="js/lib.js" type="text/javascript"></script>
    <script src="js/Settings.js" type="text/javascript"></script>
    <title>Settings</title>
</head>
<body>
<?php
    include_once("header.html");
?>
   
            <div class="vertical-settings">
            <a href="" id="general" class="active">General</a>
            <a href="" id="security">Security</a>
            <a href="" id="privacy">Privacy</a>
            <a href="" id="account">Account</a>
            </div>
            <div id="general-option" class="option-settings">
                <form>
                    <a><label for="language">Preferred language:</label>
                    <select id="language">
                        <option value="english">English</option>
                        <option value="dutch">Dutch</option>
                    </select></a>
                    <a><label for="timezone">Time Zone:</label>
                    <select id="timezone">
                        <option value="gwt0">GWT + 0</option>
                        <option value="gwt1">GWT + 1</option>
                        <option value="gwt2">GWT + 2</option>
                        </select></a>
                    <a><label for="currency">Preferred currency:</label>
                    <select id="currency">
                        <option value="usd">USD</option>
                        <option value="btc">BTC</option>
                        <option value="eth">ETH</option>
                    </select></a><br>
                    <input type="submit">
                </form>
            </div>
            <div id="security-option" class="option" hidden>
                <form>
                    <a><label for="skey">Change secret key: </label>
                    <input type="text" id="skey"></a><br>
                    <input type="submit">
                </form>
            </div>
            <div id="privacy-option" class="option" hidden>
                <form>
                    <a><label for="public">Do you want your profile to be public? If it is not public, your data will not be able to be sold!</label>
                    <input type="text" id="public"></a><br>
                    <input type="submit">
                </form>
            </div>
            <div id="account-option" class="option" hidden>
                <form>
                    <a><label for="name">Change your profile's name: </label> 
                    <input type="text" id="name"></a>
                    <a><label for="img">Change your profile's name: </label>
                    <input type="image" id="img"></a>
                    <a><label for="pw">Change your password: </label>
                    <input type="password" id="pw"></a>
                    <a><label for="description">Change your profile's description</label>
                    <textarea id="description"></textarea></a>
                    <input type="submit">
                </form>
            </div>
</body>