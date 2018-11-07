var modalList = [];
modalList.push(document.getElementById("MLogin"));
modalList.push(document.getElementById("MSignUp"));
modalList.push(document.getElementById("MForgotPassword"));

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

var logedIn = false;


changeLoginchangeLogin(false);



function changeLoginchangeLogin(e) {
	
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
	

	if (e) {
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

function closeAllModals(){
	modalList.forEach(closeModal);	
}

function logout(){

	logedIn = false;
	window.location.href = "index.html";

}
function login(){
	
	MLoginClose();
	console.log(document.getElementById("CBremimberMe"));
	//login logic
	$(function(){

	var testUser = {
		username: document.getElementById("MLoginIUsername").value,
        password: document.getElementById("MLoginIPassword").value,
        email: document.getElementById("MLoginIEmail").value
	}
	//http://localhost:5000/api/auth/login
	console.log(testUser);
    $.ajax({
    	"async": true,
  		"crossDomain": true,
  		url: 'http://localhost:5000/api/auth/login',
        type: 'POST',
        "headers": {
    		"Content-Type": "application/json"
  		},
        data: JSON.stringify(testUser),
        dataType: 'json',
        success: function(data){
            console.log(data.token);
            document.cookie = "token=" + data.token;
            window.location.href = "home.html";
        },
        error: function(xhr, ajaxOptions, thrownError){
        	console.log(xhr.status);
        	console.log(thrownError);
            //console.log("error");
        }
    });
});


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

function closeModal(item){
	//https://stackoverflow.com/questions/19506672/how-to-check-if-bootstrap-modal-is-open-so-i-can-use-jquery-validate
	if ($(item).is(':visible')){
		$(item).modal('toggle');	
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
