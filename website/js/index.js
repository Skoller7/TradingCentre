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

$(document).ready(function(){

	//https://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser/9851769
	//Detects if the user is using IE
	var isIE = /*@cc_on!@*/false || !!document.documentMode;
	if(isIE)
		alert("This site is not optimized for Internet Explorer, so your experience may not be as great as intended.\nPlease consider switching over to a more recent browser.");

for(var i = 0; i < document.getElementsByClassName('getStarted').length; i++){
	document.getElementsByClassName('getStarted')[i].addEventListener("click", openMSignUp);
}

//Code to scroll to promotexts by clicking on the corresponding buttons
document.getElementById('promoJournalButton').addEventListener("click", scrollToJournal);
document.getElementById('promoDatacenterButton').addEventListener("click", scrollToDatacenter);
setSize();
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

$(window).resize(function() {
	setSize();
});


var journalImg = document.getElementById("journalRight");

//Redraws the site when the window is resized
function setSize(){

	var height = $(window).height()
	if(height < 640)
		height = 640;
	$('.promo').css('height',height);
	
	$('#demoJournal').css('margin-top',height);
	$('#demoJournal').css('height',height);
	$('#demoDatacenter').css('height',height);
	
	var topPosition = parseFloat($('#journalRight').position().top) * 1.54;
	$('#journalImg').css('top',topPosition + 'px');
	topPosition = parseFloat($('#datacenterLeft').position().top) * 1.485;
	$('#datacenterImg').css('top',topPosition + 'px');
}

}); 

function verifieEmail(){
	 $.ajax({
    	"async": true,
  		"crossDomain": true,
  		"url": "http://10.3.50.6/api/user/validate/" + verificationKey,
		"method": "POST",
		"timeout": 0,
		"headers": {
			"Content-Type": "application/json",
		},
        success: function(data){
        	console.log(data);
  			openMVerificationMailAccepted();
        },
        error: function(data, ajaxOptions, thrownError){
        	console.log(data);
        	console.log(data.status);
        	console.log(thrownError);
        }
   });
}