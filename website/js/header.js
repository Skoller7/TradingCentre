modalList.push(document.getElementById("MLogin"));
modalList.push(document.getElementById("MSignUp"));
modalList.push(document.getElementById("MForgotPassword"));
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
document.getElementById("MLoginBForgotPassword").addEventListener("click",openMForgotPassword);
document.getElementById("MLoginBSignUp").addEventListener("click",openMSignUp);
document.getElementById("MSignUpBSignUp").addEventListener("click",signUp);
document.getElementById("MSignUpBClose").addEventListener("click",MSignUpClose);
document.getElementById("MSignUpBCrosse").addEventListener("click",MSignUpClose);
document.getElementById("MSignUpBLogin").addEventListener("click",openMLogin);
document.getElementById("MForgotPasswordBForgotPassword").addEventListener("click",forgotPassword);
document.getElementById("MForgotPasswordBClose").addEventListener("click",MForgotPasswordClose);
document.getElementById("MForgotPasswordBCrosse").addEventListener("click",MForgotPasswordClose);
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

var errorList = [];

errorList[0] = document.getElementById("MSignUpEMUsername");
errorList[1] = document.getElementById("MSignUpEMPassword");
errorList[2] = document.getElementById("MSignUpEMRePassword");
errorList[3] = document.getElementById("MSignUpEMEmail");
errorList[4] = document.getElementById("MSignUpEMTermsOfService");

var inputList = [];

inputList[0] = document.getElementById("MSignUpIUsername");
inputList[1] = document.getElementById("MSignUpIPassword");
inputList[2] = document.getElementById("MSignUpIRePassword");
inputList[3] = document.getElementById("MSignUpIEmail");
inputList[4] = document.getElementById("MSignUpIAccept");


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

		link1.appendChild(document.createTextNode("Settings"));

		var bt2 = document.createElement("LI");
		bt2.classList.add("nav-item");
		var link2 = document.createElement("A");
		link2.classList.add("nav-link");
		link2.appendChild(document.createTextNode("Logout"));

		bt1.setAttribute("id","BSetttings");
		link1.setAttribute("href","settings.php");
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


	document.getElementById("MLoginIUsername").classList.remove("modalError");
	//document.getElementById("MLoginIEmail").classList.remove("modalError");
	document.getElementById("MLoginIPassword").classList.remove("modalError");

	document.getElementById("MLoginEMMain").style.display = "none";

	document.getElementById("MLoginEMUsername").innerHTML = "";
	//document.getElementById("MLoginEMEmail").innerHTML = "";
	document.getElementById("MLoginEMPassword").innerHTML = "";
	document.getElementById("MLoginEMMain").innerHTML = "";

	var allowedToLogin = true;
	if(document.getElementById("MLoginIUsername").value == ""){
		errorModal(document.getElementById("MLoginIUsername"), document.getElementById("MLoginEMUsername"), "Username required");
		allowedToLogin = false;
	}
    /*
	if(document.getElementById("MLoginIEmail").value == ""){
		errorModal(document.getElementById("MLoginIEmail"), document.getElementById("MLoginEMEmail"), "Email required");
		allowedToLogin = false;
	}*/
	if(document.getElementById("MLoginIPassword").value == ""){
		errorModal(document.getElementById("MLoginIPassword"), document.getElementById("MLoginEMPassword"), "Password required");
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
	        	document.getElementById("MLoginEMMain").style.display = "block";
	        	document.getElementById("MLoginEMMain").innerHTML = "Wrong username or password";
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
		username: inputList[0].value,
        password: inputList[1].value,
        email: inputList[3].value
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
	       	//getJwtToken(inputList[0].value,inputList[1].value);
	       	getJwtToken(data,inputList[0].value,inputList[1].value);

        },
        error: function(data, ajaxOptions, thrownError){
        	console.log(data.status);
        	console.log(thrownError);
        	if(data.responseText != null){
        		console.log(data.responseText);
        		if(data.responseText == "Username already exists"){
					errorModal(document.getElemgientById("MSignUpIUsername"), document.getElementById("MSignUpEMUsername"), "Username already exists");
				}
				if(data.responseText == "Email is not valid"){
					errorModal(document.getElementById("MSignUpIEmail"), document.getElementById("MSignUpEMEmail"), "Email is not valid");
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

function forgotPassword(){

}
function search(){
	document.getElementById("FSearch").submit();
}

function MLoginClose(){
	$('#MLogin').modal('toggle');
}
function MSignUpClose(){
	$('#MSignUp').modal('toggle');	
}
function MForgotPasswordClose(){
	$('#MForgotPassword').modal('toggle');	
}
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
function openMForgotPassword() {
	closeAllModals();
	$('#MForgotPassword').modal({
		backdrop: 'static'
	});
}
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

	for(var i = 0; i < errorList.length; i++){
		errorList[i].innerHTML = "";
	}

	if(!terms){
		errorModal(inputList[4],errorList[4],"You must agree with the terms of service");
	}
		
	for(var i = 0; i < inputList.length; i++){
		inputList[i].classList.remove("modalError");
		if(!checkInputIsEmpty(inputList[i])){
			errorModal(inputList[i], errorList[i], "can't be empty");
			makeApiCall = false;
		}
	}
	if(inputList[1].value != inputList[2].value){
		errorModal(inputList[1], errorList[1], "The passwords are not the same");
		errorModal(inputList[2]);
		makeApiCall = false;
	}
	
	if(!validateEmail(inputList[3].value)){
		errorModal(inputList[3], errorList[3], "Email is not valid");
		makeApiCall = false;
	}

	if(inputList[1].length >= 8){
		errorModal(inputList[1], errorList[1], "Password must be 8 characters or longer");
	}


	if(inputList[2].length >= 8){
		errorModal(inputList[2], errorList[2], "Password must be 8 characters or longer");
	}

	console.log("makeApiCall " + makeApiCall);
	return makeApiCall;

}

function signUp(){
	if(checkSignUp()){
		signUpCall();
	}
}