if(user){
	if(getCookie("token")){
		var date = new Date();
		date.setMilliseconds(date.getMilliseconds() + 21600000);

		document.cookie = "token=" + getCookie("token") + "; expires=" + date;
		getUserData();
	}
	else{
		window.location.href  = "index.html";
	}
}
function getUserData(){

}