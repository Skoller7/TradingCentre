var modalList;


//button header/test
document.getElementById("BLogin").addEventListener("click",openMLogin);
document.getElementById("BSignUp").addEventListener("click",openMSignUp);
document.getElementById("BForgotPassword").addEventListener("click",openMForgotPassword)
//modal input
document.getElementById("MLoginIUsername").addEventListener("focusout",function(){
	checkInputIsEmpty(document.getElementById("MLoginIUsername"))
});
document.getElementById("MLoginIPassword").addEventListener("focusout",function(){
	checkInputIsEmpty(document.getElementById("MLoginIPassword"))
});
//modal button
document.getElementById("MLoginBLogin").addEventListener("click",login);
document.getElementById("MLoginBClose").addEventListener("click",MLoginClose);
document.getElementById("MLoginBCrosse").addEventListener("click",MLoginClose);
document.getElementById("MLoginBForgotPassword").addEventListener("click",openMForgotPassword);
document.getElementById("MLoginBSingUp").addEventListener("click",);
document.getElementById("MSignUpBSingUp").addEventListener("click",singUp);
document.getElementById("MSignUpBClose").addEventListener("click",MSignUpClose);
document.getElementById("MSignUpBCrosse").addEventListener("click",MSignUpClose);
document.getElementById("MSingUpBLogin").addEventListener("click",);
document.getElementById("MForgotPasswordBForgotPassword").addEventListener("click",forgotPassword);
document.getElementById("MForgotPasswordBClose").addEventListener("click",MForgotPasswordClose);
document.getElementById("MForgotPasswordBCrosse").addEventListener("click",MForgotPasswordClose);

function openMLogin(){
	$('#MLogin').modal({
		backdrop: 'static'
	});
}
function openMSignUp(){
	$('#MSignUp').modal({
		backdrop: 'static'
	});
}
function openMForgotPassword() {
	//https://stackoverflow.com/questions/19506672/how-to-check-if-bootstrap-modal-is-open-so-i-can-use-jquery-validate
	if ($('#MLogin').is(':visible')){
		MLoginClose();
	}
	$('#MForgotPassword').modal({
		backdrop: 'static'
	});
}


function login(){
	
	MLoginClose();
}
function singUp(){

}
function forgotPassword(){

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
/*
function che(){

}
function checkLoginPassword(){

}
*/