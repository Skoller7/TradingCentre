var signedIn = '<li><a href="settings.php">settings</a></li> <li><a id="footerLogout">log out</a></li>'

$(document).ready(function(){
	//Checks if the footer will appear on screen; if so, the footer gets moved to below the screen4 
	function checkFooterPosition(){
		document.getElementById('footer').style.top = null;
		if(parseInt($('#footer').css('top'), 10) < $(window).height()){
			$('#footer').css('top',$(window).height() + 10);
			//Setting an element's position below the screen causes the browser to scroll to said location, this scrolls back up
			//window.scrollTo(0,0);
		}
	}
	
	checkFooterPosition();

	document.getElementById('footerSignup').addEventListener("click", openMSignUp);
	document.getElementById('footerLogin').addEventListener("click", openMLogin);

	if (getCookie("jwtToken")){
		$('#accountLinks').html(signedIn);
		document.getElementById('footerLogout').addEventListener("click",logout);
	}

	$(window).resize(function() {
		checkFooterPosition();
	});

	$("body").on('DOMSubtreeModified', "body", function() {
   		alert('changed');
	});

});

