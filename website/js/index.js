//console.log(document.cookie);
/*
if(getCookie("token")){
	window.location.href  = "home.html";
}


if(getCookie("cooikesAllowed") == "true"){
	document.getElementById("cookieBanner").style.display = "none";	
}
*/
/*
if(getCookie("cooikesAllowed")){
	if(getCookie("rememberMe")){
		autoLogin(getCookie("username"),getCookie("password"));
	}
}
*/
//button header/test
//document.getElementById("BAllowCookies").addEventListener("click",allowCookies);
//document.getElementById("journalImg").addEventListener("click", goToJournal);


/*
function autoLogin(username, password){

	//login logic
	if(true){
		window.location.href = "home.html?username=" + username + "&password=" + password;
	}


}
*/


function scrollToJournal(){
	var scroll_to_demojournal = document.getElementById('demoJournal');
	scroll_to_demojournal.scrollIntoView({behavior: "smooth"});
}

function scrollToDatacenter(){
	var scroll_to_demodatacenter = document.getElementById('demoDatacenter');
	scroll_to_demodatacenter.scrollIntoView({behavior: "smooth"});
}

function allowCookies(){
	document.cookie = "cooikesAllowed=true;  expires=Thu, 01 Jan 3000 00:00:00 UTC";
	document.getElementById("cookieBanner").style.display = "none";
}

var journalImg = document.getElementById("journalRight");


var topPosition = parseFloat($('#journalRight').position().top) * 3;
$('#journalImg').css('top',topPosition + 'px');
topPosition = parseFloat($('#datacenterLeft').position().top) * 1.95;
$('#datacenterImg').css('top',topPosition + 'px');

$('.promo').css('height',$(window).height());
$('#demoJournal').css('margin-top',$(window).height());
$('#demoJournal').css('height',$(window).height());
$('#demoDatacenter').css('height',$(window).height());
