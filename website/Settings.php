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
                <button class="tablink" onclick="openOption(event, 'general')" id="default">General</button>
                <button class="tablink" onclick="openOption(event, 'security')">Security</button>
                <button class="tablink" onclick="openOption(event, 'privacy')">Privacy</button>
                <button class="tablink" onclick="openOption(event, 'account')">Account</button>
            </div>
            <div id="general" class="content">
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
                    <a><input type="submit"></a>
                </form>
            </div>
            <div id="security" class="content">
                <form>
                    <a><label for="skey">Change secret key: </label>
                    <input type="text" id="skey"></a><br>
                    <a><input type="submit"></a>
                </form>
            </div>
            <div id="privacy" class="content">
                <form>
                    <a><label for="public">Do you want your profile to be public?
                        If it is not public, your data will not be able to be sold!</label><br>
                    <input type="text" id="public"></a><br>
                    <a><input type="submit"></a>
                </form>
            </div>
            <div id="account" class="content">
                <form id="accountForm" onsubmit="return validateForm()">
                    <a><label for="name">Change your first name: </label> 
                    <input type="text" id="fname" name="firstName"></a>
                    <a><label for="name">Change your last name: </label> 
                    <input type="text" id="lname" name="lastName"></a>
                    <a><label for="name">Change your e-mail: </label> 
                    <input type="email" id="email" name="email"></a>
                    <a><label for="name">Change your user name: </label> 
                    <input type="text" id="uname" name="username"></a>
                    <a><label for="pw">Change your phone number: </label>
                    <input type="number" id="pn" name="phone"></a>
                    <a><label for="pw">Change your password: </label>
                    <input type="password" id="pw" name="password"></a>
                    <a><label for="img">Give your new profile foto URL: </label>
                    <input type="url" id="img" name="image"></a>
                    <a><label for="description">Change your profile's description</label><br>
                    <textarea id="description" rows="4" cols="50" name="description"></textarea></a>
                    <a><input type="submit"></a>
                </form>
            </div>
    <script src="js/Settings.js" type="text/javascript"></script>
</body>