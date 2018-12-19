modalList.push(document.getElementById("MLogin"));
modalList.push(document.getElementById("MSignUp"));
//modalList.push(document.getElementById("MForgotPassword"));
modalList.push(document.getElementById("MVerificationMail"));
modalList.push(document.getElementById("MVerificationMailAccepted"));
//arne pls geef info
document.getElementById("menu").addEventListener("click",openMenu);

//headerButton
/*
document.getElementById("navBJournal").addEventListener("click", goToJournal);
document.getElementById("mavBHome").addEventListener("click", goToHome);
*/

//modal button.
document.getElementById("MLoginBLogin").addEventListener("click",function(){
	login(document.getElementById("MLoginIUsername").value, document.getElementById("MLoginIPassword").value);
});
document.getElementById("MLoginBClose").addEventListener("click",MLoginClose);
document.getElementById("MLoginBCrosse").addEventListener("click",MLoginClose);
//document.getElementById("MLoginBForgotPassword").addEventListener("click",openMForgotPassword);
document.getElementById("MLoginBSignUp").addEventListener("click",openMSignUp);
document.getElementById("MSignUpBSignUp").addEventListener("click",signUp);
document.getElementById("MSignUpBClose").addEventListener("click",MSignUpClose);
document.getElementById("MSignUpBCrosse").addEventListener("click",MSignUpClose);
document.getElementById("MSignUpBLogin").addEventListener("click",openMLogin);
//document.getElementById("MForgotPasswordBForgotPassword").addEventListener("click",forgotPassword);
//document.getElementById("MForgotPasswordBClose").addEventListener("click",MForgotPasswordClose);
//document.getElementById("MForgotPasswordBCrosse").addEventListener("click",MForgotPasswordClose);
document.getElementById("MVerificationMailBClose").addEventListener("click",MVerificationMailClose);
document.getElementById("MVerificationMailBCrosse").addEventListener("click",MVerificationMailClose);
document.getElementById("MVerificationMailAcceptedBCrosse").addEventListener("click",MVerificationMailAcceptedClose);
document.getElementById("MVerificationMailAcceptedBClose").addEventListener("click",MVerificationMailAcceptedClose);
//modal input
document.getElementById("MLoginIUsername").addEventListener("focusout",function(){
	checkInputIsEmpty(document.getElementById("MLoginIUsername"))
});
document.getElementById("MLoginIPassword").addEventListener("focusout",function(){
	checkInputIsEmpty(document.getElementById("MLoginIPassword"))
});
var terms = false;
document.getElementById("MSignUpIAccept").addEventListener("click",changeTerms);

document.getElementById("Bsearch").addEventListener("click",search);

changeLoginchangeLogin();

var loginErrorElementList = [];

loginErrorElementList[0] = document.getElementById("MLoginEMUsername");
loginErrorElementList[1] = document.getElementById("MLoginEMPassword");
loginErrorElementList[2] = document.getElementById("MLoginEMMain");

var loginInputList = [];

loginInputList[0] = document.getElementById("MLoginIUsername");
loginInputList[1] = document.getElementById("MLoginIUsername");

var signUpErrorElementList = [];

signUpErrorElementList[0] = document.getElementById("MSignUpEMUsername");
signUpErrorElementList[1] = document.getElementById("MSignUpEMPassword");
signUpErrorElementList[2] = document.getElementById("MSignUpEMRePassword");
signUpErrorElementList[3] = document.getElementById("MSignUpEMEmail");
signUpErrorElementList[4] = document.getElementById("MSignUpEMTermsOfService");

var signUpInputList = [];

signUpInputList[0] = document.getElementById("MSignUpIUsername");
signUpInputList[1] = document.getElementById("MSignUpIPassword");
signUpInputList[2] = document.getElementById("MSignUpIRePassword");
signUpInputList[3] = document.getElementById("MSignUpIEmail");
signUpInputList[4] = document.getElementById("MSignUpIAccept");


function changeLoginchangeLogin() {


	if(document.getElementById("BSetttings") != null){
		document.getElementById("rightButtonNav").removeChild(document.getElementById("BSetttings"));
	}
	if(document.getElementById("BLogout") != null){
		document.getElementById("BLogout").removeEventListener("click",logout);
		document.getElementById("rightButtonNav").removeChild(document.getElementById("BLogout"));
	}
	if(document.getElementById("BLogin") != null){
		document.getElementById("BLogin").removeEventListener("click",openMLogin);
		document.getElementById("rightButtonNav").removeChild(document.getElementById("BLogin"));
	}
	if(document.getElementById("BSignUp") != null){
		document.getElementById("BSignUp").removeEventListener("click",openMSignUp);
		document.getElementById("rightButtonNav").removeChild(document.getElementById("BSignUp"));
	}
	

	if (getCookie("jwtToken")) {
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
		var bt1 = document.createElement("LI");
		bt1.classList.add("nav-item");
		var link1 = document.createElement("A");
		link1.classList.add("nav-link");
		link1.appendChild(document.createTextNode("Login"));
		
		var bt2 = document.createElement("LI");
		bt2.classList.add("nav-item");
		var link2 = document.createElement("A");
		link2.classList.add("nav-link");
		//link2.appendChild(document.createTextNode("Sign up"));
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



function logout(){
	//console.log(getCookie("token"));
	//document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
	window.location.href = "logout.php";
}
function login(usernameInput, passwordInput){
	
	//MLoginClose();
	//console.log(document.getElementById("CBremimberMe"));
	//login logic

	for(var i = 0; i < loginInputList.length; i++){
		loginInputList[i].remove("modalError");
	}

	for(var i = 0; i < loginErrorElementList.length; i++){
		loginErrorElementList[i].innerHTML = "";
	}
	loginErrorElementList[2].style.display = "none";

	var allowedToLogin = true;
	if(loginInputList[0].value === ""){
		errorModal(loginInputList[0], loginErrorElementList[0], "Username required");
		allowedToLogin = false;
	}

	if(document.getElementById("MLoginIPassword").value == ""){
		errorModal(loginInputList[1], loginErrorElementList[1], "Password required");
		allowedToLogin = false;
	}
	if(loginInputList[1].value < 8){
		errorModal(loginInputList[1], loginErrorElementList[1], "Password must be 8 characters or longer");
		allowedToLogin = false;
	}
	if(allowedToLogin){
		
		var loginUser = {
			username: usernameInput,
	        password: passwordInput,
		}

		console.log(loginUser);
	    $.ajax({
	    	"async": true,
	  		"crossDomain": true,
	  		url: 'http://10.3.50.6/api/user/login',
	        type: 'POST',
	        "headers": {
	    		"Content-Type": "application/json"
	  		},
	        data: JSON.stringify(loginUser),
	        dataType: 'json',
	        success: function(data){
	        	/*
	        	console.log(data);
	            console.log(data.token);
	            //Mon Dec 18 2023 13:00:00 GMT+0100 (Central European Standard Time)
	            var date = new Date();
	            date.setMilliseconds(date.getMilliseconds() + 21600000);
	            document.cookie = "token=" + data.token + "expires=" + date;
	            window.location.href = "home.html";
	           	*/
	            
	            var form = document.createElement("FORM");
		        form.setAttribute("method","post");
		        form.setAttribute("action","checkLogin.php");
		        var input = document.createElement("INPUT");
		        input.setAttribute("type","hidden");
		        input.setAttribute("name","jwtToken");
		        input.setAttribute("value",data.token);
		        form.appendChild(input);
			    document.body.appendChild(form);
			    //console.log(form);
		        form.submit();
		        
	        },
	        error: function(data, ajaxOptions, thrownError){
	        	console.log(data);
	        	console.log(data.status);
	        	console.log(thrownError);
	        	loginErrorElementList[2].style.display = "block";
	        	loginErrorElementList[2].innerHTML = "Wrong username or password";
	        	if(data.responseText != null){
	        		console.log(data.responseText);
	        		/*
	        		if(data.responseText == "Username already exists"){
						errorModal(document.getElementById("MSignUpIUsername"), document.getElementById("MSignUpEMUsername"), "Username already exists");
					}
					if(data.responseText == "Email is not valid"){
						errorModal(document.getElementById("MSignUpIEmail"), document.getElementById("MSignUpEMEmail"), "Email is not valid");
					}
					*/
	        	}
	        	//console.log(JSON.parse(data.responseJSON));
	            //console.log("error");
	            if(data.responseJSON != null){
	        		console.log(data.responseJSON);
	        		/*

	        		if(data.responseJSON.Username != null){
	            	data.responseJSON.Username.forEach(loginUserNameErrorHandeler);
		            }
		            if(data.responseJSON.Email != null){
		            	data.responseJSON.Email.forEach(loginEmailErrorHandeler);
		            }
		            if(data.responseJSON.Password != null){
		            	data.responseJSON.Password.forEach(loginPasswordErrorHandeler);
		            }
		            */
	        	}
	            //console.log("error");
	        }
	   });
}

	/*
	if(true){
		if(document.getElementById("CBremimberMe").value){
			document.cookie = "rememberMe=true";
			//document.cookie = "username=" + document.getElementById("MLoginIUsername").value;
			//document.cookie = "password=" + document.getElementById("MLoginIPassword").value;
		}
		//window.location.href = "home.html?username=" + document.getElementById("MLoginIUsername").value + "&password=" + document.getElementById("MLoginIPassword").value;
	}
	//login code
	*/
}
function signUpCall(){

	var newUserData = {
		username: signUpInputList[0].value,
        password: signUpInputList[1].value,
        email: signUpInputList[3].value
	}

    $.ajax({
    	"async": true,
  		"crossDomain": true,
  		url: 'http://10.3.50.6/api/user/register',
        type: 'POST',
        "headers": {
    		"Content-Type": "application/json"
  		},
        data: JSON.stringify(newUserData),
        dataType: 'json',
        success: function(data){
            //console.log(data.token);
           	//var date = new Date();
	        //date.setMilliseconds(date.getMilliseconds() + 21600000);
	        //document.cookie = "token=" + data.token + "expires=" + date;
	       	console.log(data);
	       	//getJwtToken(signUpInputList[0].value,signUpInputList[1].value);
	       	getJwtToken(data,signUpInputList[0].value,signUpInputList[1].value);

        },
        error: function(data, ajaxOptions, thrownError){
        	console.log(data.status);
        	console.log(thrownError);
        	if(data.responseText != null){
        		console.log(data.responseText);
        		if(data.responseText == "Username already taken"){
					errorModal(signUpInputList[0],signUpErrorElementList[0], "Username already taken");
				}
				if(data.responseText == "Email is not valid"){
					errorModal(signUpInputList[3], signUpInputList[3], "Email is not valid");
				}
        	}
        	console.log(data);
        	//console.log(JSON.parse(data.responseJSON));
            //console.log("error");
            if(data.responseJSON != null){
        		console.log(data.responseJSON);
        		if(data.responseJSON.Username != null){
            	data.responseJSON.Username.forEach(loginUserNameErrorHandeler);
	            }
	            if(data.responseJSON.Email != null){
	            	data.responseJSON.Email.forEach(loginEmailErrorHandeler);
	            }
	            if(data.responseJSON.Password != null){
	            	data.responseJSON.Password.forEach(loginPasswordErrorHandeler);
	            }
        	}
        }
    });	
	
}
/*
function loginUserNameIsTaken(e){
	if(e == "Username already taken"){
		errorModal(signUpInputList[0],signUpErrorElementList[0], "Username already taken");
	}
}
*/
function loginUserNameErrorHandeler(e){
	if(e == "The Username field is required."){
		errorModal(document.getElementById("MSignUpIUsername"), document.getElementById("MSignUpEMUsername"), "Username required");
	}
}
/*function loginEmailErrorHandeler(e){
	if(e == "The Email field is required."){
		errorModal(document.getElementById("MSignUpIEmail"), document.getElementById("MSignUpEMEmail"), "Email required");
	}
}*/
function loginPasswordErrorHandeler(e){
	if(e == "The Password field is required."){
		errorModal(document.getElementById("MSignUpIPassword"), document.getElementById("MSignUpEMPassword"), "Password required");
		errorModal(document.getElementById("MSignUpIRePassword"));
	}
	if(e == "Password must be longer than 8 characters"){
		errorModal(document.getElementById("MSignUpIPassword"), document.getElementById("MSignUpEMPassword"), "Password must be 8 characters or longer");
		errorModal(document.getElementById("MSignUpIRePassword"));
	}
}
/*
function forgotPassword(){

}
*/
function search(){
	document.getElementById("FSearch").submit();
}

function MLoginClose(){
	$('#MLogin').modal('toggle');
}
function MSignUpClose(){
	$('#MSignUp').modal('toggle');	
}
/*
function MForgotPasswordClose(){
	$('#MForgotPassword').modal('toggle');	
}
*/
function MVerificationMailClose(){
	$('#MVerificationMail').modal('toggle');	
}
function MVerificationMailAcceptedClose(){
	$('#MVerificationMailAccepted').modal('toggle');	
}
function checkInputIsEmpty(e){
	if(e.value == ""){
		return false;
	}
	else{
		return true;	
	}
}

function errorModal(modal, errorElement, errorMsg){
	modal.classList.add("modalError");

	if(errorElement != null){
		if(errorElement.innerHTML == ""){
			errorElement.innerHTML = errorMsg;
		}
		else{
			errorElement.innerHTML = errorElement.innerHTML + ", " + errorMsg;
		}
	}
}

function openMLogin(){
	closeAllModals();
	$('#MLogin').modal({
		backdrop: 'static'
	});
}
function openMSignUp(){
	closeAllModals();
	$('#MSignUp').modal({
		backdrop: 'static'
	});
}
/*
function openMForgotPassword() {
	closeAllModals();
	$('#MForgotPassword').modal({
		backdrop: 'static'
	});
}
*/
function openMVerificationMail(email){
	closeAllModals();
	document.getElementById("MVerificationMailPMessage").innerHTML = "We have sent you a verification e-mail to this address <br />" + email;
	$('#MVerificationMail').modal();
}
function openMVerificationMailAccepted(){
	closeAllModals();
	$('#MVerificationMailAccepted').modal();
}
function goToJournal(){
	/*
	if(getCookie("token")){
		window.location.href = "journal.html";
	}
	else{
		//openMLogin();
		window.location.href = "journal.html";
	}
	*/
	window.location.href = "journal.html";
}
function goToHome(){
	if(getCookie("token")){
		window.location.href = "home.html";
	}
	else{
		openMLogin();
	}
}

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
/*
function getVerificationKey(usernameInput,jwtToken){

	 $.ajax({
		"async": true,
		"crossDomain": true,
		url: 'http://10.3.50.6/api/user/search?username=' + usernameInput,
		timeout : 0,
		type: 'GET',
		"headers": {
		    "Content-Type": "application/json",
		    "Authorization": "Bearer " + jwtToken,

	  },
	    success: function(data){
	    	console.log(data);
	    	hasVerivication = true;
	    	
	  
	    },
	    error: function(data, ajaxOptions, thrownError){
	        console.log(data);
	    	console.log(data.status);
	    	console.log(thrownError);
	    }
	});

}
*/
/*
function getUserId(){
	$.ajax({
		"async": true,
		"crossDomain": true,
		url: 'http://10.3.50.6/api/user/search?username=' + usernameInput,
		timeout : 0,
		type: 'GET',
		"headers": {
		    "Content-Type": "application/json",
		    "Authorization": "Bearer " + jwtToken,

	  },
	    success: function(data){
	    	console.log(data);
	    	return data;
	    },
	    error: function(data, ajaxOptions, thrownError){
	        console.log(data);
	    	console.log(data.status);
	    	console.log(thrownError);
	    }
	});
}
*/

function getJwtToken(dataSignUp,usernameInput, passwordInput){

		
	var loginUser = {
		username: usernameInput,
        password: passwordInput,
	}

	console.log(loginUser);
    $.ajax({
    	"async": true,
  		"crossDomain": true,
  		url: 'http://10.3.50.6/api/user/login',
        type: 'POST',
        "headers": {
    		"Content-Type": "application/json"
  		},
        data: JSON.stringify(loginUser),
        dataType: 'json',
        success: function(data){
        	console.log(data);
        	/*
        	console.log(data);
            console.log(data.token);
            //Mon Dec 18 2023 13:00:00 GMT+0100 (Central European Standard Time)
            var date = new Date();
            date.setMilliseconds(date.getMilliseconds() + 21600000);
            document.cookie = "token=" + data.token + "expires=" + date;
            window.location.href = "home.html";
            */
			//var dataSignUp = signUpCall();
			/*
			console.log("data");
			console.log(data);
			console.log("dataSignUp");
			console.log(dataSignUp);

			var testt;
			console.log(testt);
			if(typeof data !== 'undefined'){
				console.log("1");
			}
			if(typeof data === 'undefined'){
				console.log("2");
			}
			if(typeof testt !== 'undefined'){
				console.log("3");
			}
			if(typeof testt === 'undefined'){
				console.log("4");
			}
			*/
			
			if(typeof data !== 'undefined' && typeof dataSignUp !== 'undefined'){
				//console.log(data);
				//console.log(dataSignUp);
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

		        form.appendChild(inputJwtToken);
		        form.appendChild(verificationKey);
		        form.appendChild(email);
			    document.body.appendChild(form);
			    //console.log(form);
			    form.submit();
			}
        },
        error: function(data, ajaxOptions, thrownError){
        	console.log(data);
        	console.log(data.status);
        	console.log(thrownError);
        }
   });

}


function checkSignUp(){
	var makeApiCall = true;

	for(var i = 0; i < signUpErrorElementList.length; i++){
		signUpErrorElementList[i].innerHTML = "";
	}

	if(!terms){
		errorModal(signUpInputList[4],signUpErrorElementList[4],"You must agree with the terms of service");
	}
		
	for(var i = 0; i < signUpInputList.length; i++){
		signUpInputList[i].classList.remove("modalError");
		if(!checkInputIsEmpty(signUpInputList[i])){
			errorModal(signUpInputList[i], signUpErrorElementList[i], "can't be empty");
			makeApiCall = false;
		}
	}
	if(signUpInputList[1].value != signUpInputList[2].value){
		errorModal(signUpInputList[1], signUpErrorElementList[1], "The passwords are not the same");
		errorModal(signUpInputList[2]);
		makeApiCall = false;
	}
	
	if(!validateEmail(signUpInputList[3].value)){
		errorModal(signUpInputList[3], signUpErrorElementList[3], "Email is not valid");
		makeApiCall = false;
	}

	if(signUpInputList[1].length >= 8){
		errorModal(signUpInputList[1], signUpErrorElementList[1], "Password must be 8 characters or longer");
	}


	if(signUpInputList[2].length >= 8){
		errorModal(signUpInputList[2], signUpErrorElementList[2], "Password must be 8 characters or longer");
	}

	console.log("makeApiCall " + makeApiCall);
	return makeApiCall;

}

function signUp(){
	if(checkSignUp()){
		signUpCall();
	}
}