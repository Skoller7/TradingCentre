modalList.push(document.getElementById("MLogin"));
modalList.push(document.getElementById("MSignUp"));
modalList.push(document.getElementById("MForgotPassword"));

//headerButton
//document.getElementById("navBJournal").addEventListener("click", goToJournal);
//document.getElementById("mavBHome").addEventListener("click", goToHome);
//modal button.
document.getElementById("MLoginBLogin").addEventListener("click",login);
document.getElementById("MLoginBClose").addEventListener("click",MLoginClose);
document.getElementById("MLoginBCrosse").addEventListener("click",MLoginClose);
document.getElementById("MLoginBForgotPassword").addEventListener("click",openMForgotPassword);
document.getElementById("MLoginBSingUp").addEventListener("click",openMSignUp);
document.getElementById("MSignUpBSingUp").addEventListener("click",singUp);
document.getElementById("MSignUpBClose").addEventListener("click",MSignUpClose);
document.getElementById("MSignUpBCrosse").addEventListener("click",MSignUpClose);
document.getElementById("MSingUpBLogin").addEventListener("click",openMLogin);
document.getElementById("MForgotPasswordBForgotPassword").addEventListener("click",forgotPassword);
document.getElementById("MForgotPasswordBClose").addEventListener("click",MForgotPasswordClose);
document.getElementById("MForgotPasswordBCrosse").addEventListener("click",MForgotPasswordClose);
//modal input
document.getElementById("MLoginIUsername").addEventListener("focusout",function(){
	checkInputIsEmpty(document.getElementById("MLoginIUsername"))
});
document.getElementById("MLoginIPassword").addEventListener("focusout",function(){
	checkInputIsEmpty(document.getElementById("MLoginIPassword"))
});

document.getElementById("Bsearch").addEventListener("click",search);



changeLoginchangeLogin();




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
	

	if (getCookie("token")) {
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
		link1.setAttribute("href","settings.html");
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
		link2.appendChild(document.createTextNode("Signup"));

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
	console.log(getCookie("token"));
	document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
	window.location.href = "index.html";
}
function login(){
	
	//MLoginClose();
	//console.log(document.getElementById("CBremimberMe"));
	//login logic


	document.getElementById("MLoginIUsername").classList.remove("modalError");
	document.getElementById("MLoginIEmail").classList.remove("modalError");
	document.getElementById("MLoginIPassword").classList.remove("modalError");

	document.getElementById("MLoginEMMain").style.display = "none";

	document.getElementById("MLoginEMUsername").innerHTML = "";
	document.getElementById("MLoginEMEmail").innerHTML = "";
	document.getElementById("MLoginEMPassword").innerHTML = "";
	document.getElementById("MLoginEMMain").innerHTML = "";

	var allowedToLogin = true;
	if(document.getElementById("MLoginIUsername").value == ""){
		errorModal(document.getElementById("MLoginIUsername"), document.getElementById("MLoginEMUsername"), "Username required");
		allowedToLogin = false;
	}
	if(document.getElementById("MLoginIEmail").value == ""){
		errorModal(document.getElementById("MLoginIEmail"), document.getElementById("MLoginEMEmail"), "Email required");
		allowedToLogin = false;
	}
	if(document.getElementById("MLoginIPassword").value == ""){
		errorModal(document.getElementById("MLoginIPassword"), document.getElementById("MLoginEMPassword"), "Password required");
		allowedToLogin = false;
	}
	if(allowedToLogin){


		$(function(){

		var loginUser = {
			username: document.getElementById("MLoginIUsername").value,
	        password: document.getElementById("MLoginIPassword").value,
	        email: document.getElementById("MLoginIEmail").value
		}
		//http://localhost:5000/api/auth/login
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
	            console.log(data.token);
	            //Mon Dec 18 2023 13:00:00 GMT+0100 (Central European Standard Time)
	            var date = new Date();
	            date.setMilliseconds(date.getMilliseconds() + 21600000);
	            document.cookie = "token=" + data.token + "expires=" + date;
	            window.location.href = "home.html";
	        },
	        error: function(data, ajaxOptions, thrownError){
	        	console.log(data);
	        	console.log(data.status);
	        	console.log(thrownError);
	        	document.getElementById("MLoginEMMain").style.display = "block";
	        	document.getElementById("MLoginEMMain").innerHTML = "Wrong username, email or password";
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
function singUp(){

if(document.getElementById("MSignUpIPassword").value != document.getElementById("MSignUpIRePassword").value){
	errorModal(document.getElementById("MSignUpIPassword"), document.getElementById("MSignUpEMPassword"), "Password must be between 4 and 20 characters");
	errorModal(document.getElementById("MSignUpIRePassword"));
}
else{
$(function(){

	var newUserData = {
		username: document.getElementById("MSignUpIUsername").value,
        password: document.getElementById("MSignUpIPassword").value,
        email: document.getElementById("MSignUpIEmail").value
	}


	document.getElementById("MSignUpIUsername").classList.remove("modalError");
	document.getElementById("MSignUpIPassword").classList.remove("modalError");
	document.getElementById("MSignUpIRePassword").classList.remove("modalError");
	document.getElementById("MSignUpIEmail").classList.remove("modalError");

	document.getElementById("MSignUpEMUsername").innerHTML = "";
	document.getElementById("MSignUpEMPassword").innerHTML = "";
	document.getElementById("MSignUpEMRePassword").innerHTML = "";
	document.getElementById("MSignUpEMEmail").innerHTML = "";

	console.log(newUserData);
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
            console.log(data.token);
           	var date = new Date();
	        date.setMilliseconds(date.getMilliseconds() + 21600000);
	        document.cookie = "token=" + data.token + "expires=" + date;
            window.location.href = "home.html";
        },
        error: function(data, ajaxOptions, thrownError){
        	console.log(data.status);
        	console.log(thrownError);
        	if(data.responseText != null){
        		console.log(data.responseText);
        		if(data.responseText == "Username already exists"){
					errorModal(document.getElementById("MSignUpIUsername"), document.getElementById("MSignUpEMUsername"), "Username already exists");
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
});
	
}
}
function loginUserNameErrorHandeler(e){
	if(e == "The Username field is required."){
		errorModal(document.getElementById("MSignUpIUsername"), document.getElementById("MSignUpEMUsername"), "Username required");
	}
}
function loginEmailErrorHandeler(e){
	if(e == "The Email field is required."){
		errorModal(document.getElementById("MSignUpIEmail"), document.getElementById("MSignUpEMEmail"), "Email required");
	}
}
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
	window.location.href = "search.html";
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
/*
function goToJournal(){
	if(getCookie("token")){
		window.location.href = "journal.html";
	}
	else{
		openMLogin();
	}
}
*/
function goToHome(){
	if(getCookie("token")){
		window.location.href = "home.html";
	}
	else{
		openMLogin();
	}
}
