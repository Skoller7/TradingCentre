<?php
  include ('checkToken.php');
?>
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
    <?php
        include_once('favicon.html');
    ?>
    <title>Settings</title>
</head>
<body onload="isVerified()">
<?php
    include_once("header.html");
?>
   
            <div class="vertical-settings">
                <button class="tablink" onclick="openOption(event, 'general')">General</button>
                <button class="tablink" onclick="openOption(event, 'security')">Security</button>
                <button class="tablink" onclick="openOption(event, 'verificate')">Verificate</button>
                <button class="tablink" onclick="openOption(event, 'account')">Account</button>
                <button class="tablink" onclick="openOption(event, 'profile')" id="default">Profile</button>
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
                    <input type="text" id="key" placeholder="your key">
                    <input type="text" id="skey" placeholder="Change your secret key">
                    <input type="submit" value='Change key' id='changekey'>
                </form>
                <span style='color:red;' id='errorkeys'></span>
            </div>
            <div id="verificate" class="content">
                <form class="myForm">
                    <label id="VerifiedOrNot">Your Account is: <p id="isVer"></p></label>
                    <button id="verify">Send again a e-mail to verificate</button>
                </form>
            </div>
    
            <div id="account" class="content">
                <form class="myForm" id="deleteUser">
                    <h2>Delete your Account</h2>
                    <label>Important: If you delete your account, all the data related to this user will be deleted. After it is deleted, we won't be able to get any of the data back!</label>
                    <input type="password" id="dltpw" name="password" placeholder="Fill in your password before submitting">
                    <button id="delete" onclick="return validateToDelete()">Delete Account</button>
                    
                    <!--<div id="modalDelete" class="modald">
                        <span class="close" title="Close">&times;</span>
                        <div class="md-content">
                            <label>If you delete your user, we will not be able to bring all your information back!</label>
                            <button type="submit" id="confirm">I'm sure I want to delete</button>
                        </div>
                    </div>-->
                </form>
            </div>
    
            <div id="profile" class="content">
                <form id="profileForm" onsubmit="return validateForm()" class="myForm">
                    <input type="text" id="fname" name="firstName" placeholder="First name">
                    <input type="text" id="lname" name="lastName" placeholder="Last name">
                    <input type="email" id="email" name="email" placeholder="E-mail">
                    <input type="text" id="uname" name="username" placeholder="Username">
                    <input type="number" id="pn" name="phone" placeholder="Phone number">
                    <input type="password" id="pw" name="password" placeholder="Password">
                    <input type="url" id="img" name="pictureURL" placeholder="Image URL">
                    <textarea id="description" name="description" placeholder="Description" onkeyup="adjust_textarea(this)"></textarea>
                    <input type="submit">
                    <img style="display: none" id="imageUrl" onerror="errorCallback()" onload="loadCallback()">
                </form>
            </div>
    <script src="js/Settings.js" type="text/javascript"></script>
</body>