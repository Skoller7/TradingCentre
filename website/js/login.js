

//console.log(document.cookie);

if(getCookie("token")){
	window.location.href  = "home.html";
}


if(getCookie("cooikesAllowed") == "true"){
	document.getElementById("cookieBanner").style.display = "none";	
}
/*
if(getCookie("cooikesAllowed")){
	if(getCookie("rememberMe")){
		autoLogin(getCookie("username"),getCookie("password"));
	}
}
*/
//button header/test
document.getElementById("BAllowCookies").addEventListener("click",allowCookies);
//document.getElementById("journalImg").addEventListener("click", goToJournal);


/*
function autoLogin(username, password){

	//login logic
	if(true){
		window.location.href = "home.html?username=" + username + "&password=" + password;
	}


}
*/



function allowCookies(){
	document.cookie = "cooikesAllowed=true;  expires=Thu, 01 Jan 3000 00:00:00 UTC";
	document.getElementById("cookieBanner").style.display = "none";
}