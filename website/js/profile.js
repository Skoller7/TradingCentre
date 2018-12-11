/*var settings = {
  "url": "http://10.3.50.6/api/user/login",
  "method": "POST",
  "timeout": 0,
  "headers": {
    "Content-Type": "application/json"
  },
  "data": "{\n\t\"username\": \"TestUser\",\n\t\"password\": \"MyPassword\"\n}",
};
$.ajax(settings).done(function (response) {
  console.log(response);
});
*/

var token = getCookie("jwtToken");
var username;
var description;
var defaultDescription = "This is where a description would appear if the user set one up";
var pictureURL;

getUserData();

function getUserData(){
	var data = makerequestnopar("http://10.3.50.6/api/user","GET",token);
	username = data.username;
	description = data.description;
	pictureURL = data.pictureURL;
}

function setContent(){
	$('#user-name').text(username);
	if(description){
		$('#user-description').text(description);	
	}
	else {
		$('#user-description').text(defaultDescription);
	}
	if(pictureURL){
		$('#user-img').attr("src",pictureURL);
		$('#user-img').attr("alt",username);
	}
	else {
		$('#user-img').attr("src","img/profile.png");
		$('#user-img').attr("alt","default profile picture");
	}
}

$(document).ready(function() {
	setContent();
});