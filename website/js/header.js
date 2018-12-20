/*
naming convention for modals and elements in the modal

First: capital letters for the element
M = modal
B = button
I = input
EM = error message

Than the name of the element
*/

//array of all modals
modalList.push(document.getElementById("MLogin"));
modalList.push(document.getElementById("MSignUp"));
modalList.push(document.getElementById("MVerificationMail"));
modalList.push(document.getElementById("MVerificationMailAccepted"));

//terms of service bool
var terms = false;

//array of all the login error elements
var loginErrorElementList = [];

loginErrorElementList[0] = document.getElementById("MLoginEMUsername");
loginErrorElementList[1] = document.getElementById("MLoginEMPassword");
loginErrorElementList[2] = document.getElementById("MLoginEMMain");

//array of all the login input elements
var loginInputList = [];

loginInputList[0] = document.getElementById("MLoginIUsername");
loginInputList[1] = document.getElementById("MLoginIPassword");

//array of all the sign up error elements
var signUpErrorElementList = [];

signUpErrorElementList[0] = document.getElementById("MSignUpEMUsername");
signUpErrorElementList[1] = document.getElementById("MSignUpEMPassword");
signUpErrorElementList[2] = document.getElementById("MSignUpEMRePassword");
signUpErrorElementList[3] = document.getElementById("MSignUpEMEmail");
signUpErrorElementList[4] = document.getElementById("MSignUpEMTermsOfService");

//array of all the sign up input elements
var signUpInputList = [];

signUpInputList[0] = document.getElementById("MSignUpIUsername");
signUpInputList[1] = document.getElementById("MSignUpIPassword");
signUpInputList[2] = document.getElementById("MSignUpIRePassword");
signUpInputList[3] = document.getElementById("MSignUpIEmail");
signUpInputList[4] = document.getElementById("MSignUpIAccept");

//adding enter event listenrs on all login input elements
for(var i = 0; i < loginInputList.length; i++){
	loginInputList[i].addEventListener("keyup", function(keyEvent){
		keyEvent.preventDefault();
		if (keyEvent.keyCode === 13) {
    		login(loginInputList[0].value, loginInputList[1].value);
  		}
	});
}

//adding enter event listenrs on all login sign up elements
for(var i = 0; i < signUpInputList.length; i++){
	signUpInputList[i].addEventListener("keyup", function(keyEvent){
		keyEvent.preventDefault();
		if (keyEvent.keyCode === 13) {
    		signUp();
  		}
	});
}
//event listeners
//header
document.getElementById("Bsearch").addEventListener("click",search);
document.getElementById("menu").addEventListener("click",openMenu);
document.getElementById("cookieButton").addEventListener("click",allowCookies);
//modal button
//login modal
document.getElementById("MLoginBLogin").addEventListener("click",function(){
	login(loginInputList[0].value, loginInputList[1].value);
});
document.getElementById("MLoginBClose").addEventListener("click",MLoginClose);
document.getElementById("MLoginBCrosse").addEventListener("click",MLoginClose);
document.getElementById("MLoginBSignUp").addEventListener("click",openMSignUp);
//sing up modal
document.getElementById("MSignUpBSignUp").addEventListener("click",signUp);
document.getElementById("MSignUpBClose").addEventListener("click",MSignUpClose);
document.getElementById("MSignUpBCrosse").addEventListener("click",MSignUpClose);
document.getElementById("MSignUpBLogin").addEventListener("click",openMLogin);
signUpInputList[4].addEventListener("click",changeTerms);
//verification mail modal
document.getElementById("MVerificationMailBClose").addEventListener("click",MVerificationMailClose);
document.getElementById("MVerificationMailBCrosse").addEventListener("click",MVerificationMailClose);
//verification mail accepted modal
document.getElementById("MVerificationMailAcceptedBCrosse").addEventListener("click",MVerificationMailAcceptedClose);
document.getElementById("MVerificationMailAcceptedBClose").addEventListener("click",MVerificationMailAcceptedClose);

changeLoginchangeLogin();
checkAllowCookies();



//creates 2 buttons
//if the user is logged in profile and logout
//if the user is not logged in login and sign up
function changeLoginchangeLogin() {

	//if button settings exists remove it
	if(document.getElementById("BSetttings") != null){
		document.getElementById("rightButtonNav").removeChild(document.getElementById("BSetttings"));
	}
	//if button logout exists remove it
	if(document.getElementById("BLogout") != null){
		document.getElementById("BLogout").removeEventListener("click",logout);
		document.getElementById("rightButtonNav").removeChild(document.getElementById("BLogout"));
	}
	//if button login exists remove it
	if(document.getElementById("BLogin") != null){
		document.getElementById("BLogin").removeEventListener("click",openMLogin);
		document.getElementById("rightButtonNav").removeChild(document.getElementById("BLogin"));
	}
	//if button sign up exists remove it
	if(document.getElementById("BSignUp") != null){
		document.getElementById("BSignUp").removeEventListener("click",openMSignUp);
		document.getElementById("rightButtonNav").removeChild(document.getElementById("BSignUp"));
	}
	
	//checkes if the user is logged in
	if (getCookie("jwtToken")) {
		//bt1 = profile
		//bt2 = logout
		var bt1 = document.createElement("LI");
		bt1.classList.add("nav-item");
		var link1 = document.createElement("A");
		link1.classList.add("nav-link");

		link1.appendChild(document.createTextNode("Profile"));

		var bt2 = document.createElement("LI");
		bt2.classList.add("nav-item");
		var link2 = document.createElement("A");
		link2.classList.add("nav-link");
		link2.appendChild(document.createTextNode("Logout"));

		bt1.setAttribute("id","BSetttings");
		link1.setAttribute("href","profile.php");
		bt2.setAttribute("id","BLogout");

		bt1.appendChild(link1);
		bt2.appendChild(link2);

		document.getElementById("rightButtonNav").appendChild(bt1);
		document.getElementById("rightButtonNav").appendChild(bt2);

		document.getElementById("BLogout").addEventListener("click",logout);
	}
	else{
		//bt1 = login
		//bt2 = sign up
		var bt1 = document.createElement("LI");
		bt1.classList.add("nav-item");
		var link1 = document.createElement("A");
		link1.classList.add("nav-link");
		link1.appendChild(document.createTextNode("Login"));
		
		var bt2 = document.createElement("LI");
		bt2.classList.add("nav-item");
		var link2 = document.createElement("A");
		link2.classList.add("nav-link");
		link2.appendChild(document.createTextNode("Sign up"));

		bt1.setAttribute("id","BLogin");
		bt2.setAttribute("id","BSignUp");

		bt1.appendChild(link1);
		bt2.appendChild(link2);

		bt1.addEventListener("click",openMLogin);
		bt2.addEventListener("click",openMSignUp);

		document.getElementById("rightButtonNav").appendChild(bt1);
		document.getElementById("rightButtonNav").appendChild(bt2);
	}
}


//redirects to logout.php to end the php session and  
function logout(){
	window.location.href = "logout.php";
}
//login api call
function loginCall(usernameInput, passwordInput){

	//api call body
	var loginUser = {
		username: usernameInput,
        password: passwordInput,
	}

    $.ajax({
    	"async": true,
  		"crossDomain": true,
  		url: 'https://10.3.50.6/api/user/login',
        type: 'POST',
        "headers": {
    		"Content-Type": "application/json"
  		},
        data: JSON.stringify(loginUser),
        dataType: 'json',
        success: function(data){
        	//create form to with the jwtToken to checkLogin.php
            var form = document.createElement("FORM");
	        form.setAttribute("method","post");
	        form.setAttribute("action","checkLogin.php");
	        var input = document.createElement("INPUT");
	        input.setAttribute("type","hidden");
	        input.setAttribute("name","jwtToken");
	        input.setAttribute("value",data.token);
	        form.appendChild(input);
		    document.body.appendChild(form);
	        form.submit();
        },
        error: function(data){
        	//error handeling if the username and password don't match with a user
        	loginErrorElementList[2].style.display = "block";
        	loginErrorElementList[2].innerHTML = "Wrong username or password";
        }
   });
}
function signUpCall(){

	//api call body
	var newUserData = {
		username: signUpInputList[0].value,
        password: signUpInputList[1].value,
        email: signUpInputList[3].value
	}

    $.ajax({
    	"async": true,
  		"crossDomain": true,
  		url: 'https://10.3.50.6/api/user/register',
        type: 'POST',
        "headers": {
    		"Content-Type": "application/json"
  		},
        data: JSON.stringify(newUserData),
        dataType: 'json',
        success: function(data){
        	//get the jwtToken
	       	getJwtToken(data,signUpInputList[0].value,signUpInputList[1].value);

        },
        error: function(data){
        	if(data.responseText != null){
        		//check if the username is taken
        		if(data.responseText == "Username already taken"){
					errorModal(signUpInputList[0],signUpErrorElementList[0], "Username already taken");
				}
				//check if the email is valid (by the server) 
				if(data.responseText == "Email is not valid"){
					errorModal(signUpInputList[3], signUpInputList[3], "Email is not valid");
				}
        	}
        }
    });	
	
}
//sumbits a get request to search
function search(){
	document.getElementById("FSearch").submit();
}
//close login modal
function MLoginClose(){
	$('#MLogin').modal('toggle');
}
//close sign up modal
function MSignUpClose(){
	$('#MSignUp').modal('toggle');	
}
//close verification mail modal
function MVerificationMailClose(){
	$('#MVerificationMail').modal('toggle');	
}
//close verification mail accepted modal
function MVerificationMailAcceptedClose(){
	$('#MVerificationMailAccepted').modal('toggle');	
}
//check if the input element is empty for error handeling
function checkInputIsEmpty(e){
	if(e.value == ""){
		return false;
	}
	else{
		return true;	
	}
}
//adds error message to an element
function errorModal(modal, errorElement, errorMsg){
	//modal.setAttribute('class','modalError');
	modal.style.border = "2px red solid";

	if(errorElement != null){
		if(errorElement.innerHTML == ""){
			errorElement.innerHTML = errorMsg;
		}
		else{
			errorElement.innerHTML = errorElement.innerHTML + ", " + errorMsg;
		}
	}
}
//open login modal
function openMLogin(){
	closeAllModals();
	$('#MLogin').modal({
		backdrop: 'static'
	});
}
//open login modal
function openMSignUp(){
	closeAllModals();
	$('#MSignUp').modal({
		backdrop: 'static'
	});
}
//open login modal
function openMVerificationMail(email){
	closeAllModals();
	document.getElementById("MVerificationMailPMessage").innerHTML = "We have sent a verification email to this address <br />" + email + "<br /> Please make sure to check your spam folder, as the email may appear in there";
	$('#MVerificationMail').modal();
}
//open login modal
function openMVerificationMailAccepted(){
	closeAllModals();
	$('#MVerificationMailAccepted').modal();
}
//?
function goToJournal(){
	window.location.href = "journal.html";
}
//terms of service checkbox
function changeTerms(){
	if(terms){
		terms = false;
	}
	else{
		terms = true;
	}
}


function openMenu() {
  document.getElementById("navbar-overlay").style.width = "100%";
}

function closeNav() {
  document.getElementById("navbar-overlay").style.width = "0%";
}


//get jwt token for sign up
function getJwtToken(dataSignUp,usernameInput, passwordInput){

	//api call body
	var loginUser = {
		username: usernameInput,
        password: passwordInput,
	}

    $.ajax({
    	"async": true,
  		"crossDomain": true,
  		url: 'https://10.3.50.6/api/user/login',
        type: 'POST',
        "headers": {
    		"Content-Type": "application/json"
  		},
        data: JSON.stringify(loginUser),
        dataType: 'json',
        success: function(data){
			if(typeof data !== 'undefined' && typeof dataSignUp !== 'undefined'){
				//form with verificationKey, username and email address for the verification email and the jwtToken for the user session
				var form = document.createElement("FORM");
		        form.setAttribute("method","post");
		        form.setAttribute("action","checkLogin.php");
		        var inputJwtToken = document.createElement("INPUT");
		        inputJwtToken.setAttribute("type","hidden");
		        inputJwtToken.setAttribute("name","jwtToken");
		        inputJwtToken.setAttribute("value",data.token);
		        var verificationKey = document.createElement("INPUT");
		        verificationKey.setAttribute("type","hidden");
		        verificationKey.setAttribute("name","verificationKey");
		        verificationKey.setAttribute("value",dataSignUp.verificationKey);
		        var email = document.createElement("INPUT");
		        email.setAttribute("type","hidden");
		        email.setAttribute("name","email");
		        email.setAttribute("value",dataSignUp.email);
		        var username = document.createElement("INPUT");
		        username.setAttribute("type","hidden");
		        username.setAttribute("name","username");
		        username.setAttribute("value",dataSignUp.username)
		        form.appendChild(inputJwtToken);
		        form.appendChild(verificationKey);
		        form.appendChild(email);
		        form.appendChild(username);
			    document.body.appendChild(form);
			   	form.submit();
			}
        },
        error: function(data, ajaxOptions, thrownError){
        }
   });

}
//validation of sign up
function checkLogin(){
	var allowedToLogin = true;

	//remove modalError class from all input elements 
	for(var i = 0; i < loginInputList.length; i++){
		loginInputList[i].classList.remove("modalError");

	}
	//empty all error messages
	for(var i = 0; i < loginErrorElementList.length; i++){
		loginErrorElementList[i].innerHTML = "";
	}
	//hidding of modal error message
	loginErrorElementList[2].style.display = "none";

	//check if username is not empty
	if(loginInputList[0].value === ""){
		errorModal(loginInputList[0], loginErrorElementList[0], "Username required");
		allowedToLogin = false;
	}
	//check if sign up is not empty
	if(loginInputList[1].value == ""){
		errorModal(loginInputList[1], loginErrorElementList[1], "Password required");
		allowedToLogin = false;
	}
	//check if password is longer then 7 character
	if(loginInputList[1].value.length < 7){
		errorModal(loginInputList[1], loginErrorElementList[1], "Password must be 8 characters or longer");
		allowedToLogin = false;
	}
	return allowedToLogin;
}

//validation of sign up
function checkSignUp(){
	var makeApiCall = true;

	//empty all error messages
	for(var i = 0; i < signUpErrorElementList.length; i++){
		signUpErrorElementList[i].innerHTML = "";
	}
	//remove modalError class from all input elements
	for(var i = 0; i < signUpInputList.length; i++){
		signUpInputList[i].classList.remove("modalError");
		if(!checkInputIsEmpty(signUpInputList[i])){
			errorModal(signUpInputList[i], signUpErrorElementList[i], "can't be empty");
			makeApiCall = false;
		}
	}
	//check if the terms of service is checked
	if(!terms){
		errorModal(signUpInputList[4],signUpErrorElementList[4],"You must agree with the terms of service");
		makeApiCall = false;
	}

	//check if the passwords are the same
	if(signUpInputList[1].value != signUpInputList[2].value){
		errorModal(signUpInputList[1], signUpErrorElementList[1], "The passwords are not the same");
		errorModal(signUpInputList[2]);
		makeApiCall = false;
	}
	//check if email is valid with regex
	if(!validateEmail(signUpInputList[3].value)){
		errorModal(signUpInputList[3], signUpErrorElementList[3], "Email is not valid");
		makeApiCall = false;
	}
	//check if the first password is longer than 7 characters
	if(signUpInputList[1].length >= 8){
		errorModal(signUpInputList[1], signUpErrorElementList[1], "Password must be 8 characters or longer");
		makeApiCall = false;
	}

	//check if the second password is longer than 7 characters
	if(signUpInputList[2].length >= 8){
		errorModal(signUpInputList[2], signUpErrorElementList[2], "Password must be 8 characters or longer");
		makeApiCall = false;
	}

	return makeApiCall;

}
//login functionality
function login(usernameInput, passwordInput){
	if(checkLogin()){
		loginCall(usernameInput, passwordInput);
	}
}
//sing up functionality
function signUp(){
	if(checkSignUp()){
		signUpCall();
	}
}
//makes a cookie when the user agrees to allow cookies
function allowCookies(){
	document.cookie = "allowCookies=true";
	$('#banner').css('visibility','hidden');
}
//removes the cookie banner when the user agrees with cookies
function checkAllowCookies(){
	if(!getCookie('allowCookies')){
		$('#banner').css('visibility','visible');
	}
	else{
		$('#banner').css('visibility','hidden');	
	}
}