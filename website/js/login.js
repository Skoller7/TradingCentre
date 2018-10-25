var modalList = [];
modalList.push(document.getElementById("MLogin"));
modalList.push(document.getElementById("MSignUp"));
modalList.push(document.getElementById("MForgotPassword"));

//button header/test

document.getElementById("BLogin").addEventListener("click",openMLogin);
document.getElementById("BSignUp").addEventListener("click",openMSignUp);
document.getElementById("BForgotPassword").addEventListener("click",openMForgotPassword)
document.getElementById("BAllowCookies").addEventListener("click",allowCookies);
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
document.getElementById("MLoginBSingUp").addEventListener("click",openMSignUp);
document.getElementById("MSignUpBSingUp").addEventListener("click",singUp);
document.getElementById("MSignUpBClose").addEventListener("click",MSignUpClose);
document.getElementById("MSignUpBCrosse").addEventListener("click",MSignUpClose);
document.getElementById("MSingUpBLogin").addEventListener("click",openMLogin);
document.getElementById("MForgotPasswordBForgotPassword").addEventListener("click",forgotPassword);
document.getElementById("MForgotPasswordBClose").addEventListener("click",MForgotPasswordClose);
document.getElementById("MForgotPasswordBCrosse").addEventListener("click",MForgotPasswordClose);

function closeAllModals(){
	modalList.forEach(closeModal);	
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
function allowCookies(){
	console.log("test");
	document.cookie = "cooikesAllowed=true";
	var x = document.cookie;

	console.log(x);
}