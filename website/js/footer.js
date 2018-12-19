$(document).ready(function(){
	//Checks if the footer will appear on screen; if so, the footer gets moved to below the screen4 
if(parseInt($('#footer').css('top'), 10) < $(window).height()){
	$('#footer').css('top',$(window).height() + 10);
}
	window.scrollTo(0,0);
	for(var i = 0; i < document.getElementsByClassName('footerSignup').length; i++){
		document.getElementsByClassName('footerSignup')[i].addEventListener("click", openMSignUp);
	}
});