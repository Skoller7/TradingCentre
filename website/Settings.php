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
                <button class="tablink" onclick="openOption(event, 'general')">General</button>
                <button class="tablink" onclick="openOption(event, 'security')">Security</button>
                <button class="tablink" onclick="openOption(event, 'privacy')">Privacy</button>
                <button class="tablink" onclick="openOption(event, 'account')" id="default">Account</button>
            </div>
            <div id="general" class="content">
                <form class="myForm">
                    <label for="language">Preferred language:</label>
                    <select id="language">
                        <option value="english">English</option>
                        <option value="dutch">Dutch</option>
                    </select>
                    <label for="timezone">Time Zone:</label>
                    <select id="timezone">
                        <option value="gwt0">GWT + 0</option>
                        <option value="gwt1">GWT + 1</option>
                        <option value="gwt2">GWT + 2</option>
                        </select>
                    <label for="currency">Preferred currency:</label>
                    <select id="currency">
                        <option value="usd">USD</option>
                        <option value="btc">BTC</option>
                        <option value="eth">ETH</option>
                    </select>
                    <input type="submit">
                </form>
            </div>
            <div id="security" class="content">
                <form class="myForm">
                    <input type="text" id="skey" placeholder="Change your secret key">
                    <input type="submit">
                </form>
            </div>
            <div id="privacy" class="content">
                <form class="myForm">
                    <label for="public">Do you want your profile to be public?
                        If it is not public, your data will not be able to be sold!</label><br>
                    <select id="public">
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                    <input type="submit">
                </form>
            </div>
            <div id="account" class="content">
                
                <form id="accountForm" onsubmit="return validateForm()" class="myForm">
                    <input type="text" id="fname" name="firstName" placeholder="First name">
                    <input type="text" id="lname" name="lastName" placeholder="Last name">
                    <input type="email" id="email" name="email" placeholder="E-mail">
                    <input type="text" id="uname" name="username" placeholder="Username">
                    <input type="number" id="pn" name="phone" placeholder="Phone number">
                    <input type="password" id="pw" name="Password" placeholder="Password">
                    <input type="url" id="img" name="image" placeholder="Image URL">
                    <textarea id="description" name="description" placeholder="Description" onkeyup="adjust_textarea(this)"></textarea>
                    <a><input type="submit"></a>
                </form>
            </div>
    <script src="js/Settings.js" type="text/javascript"></script>
</body>