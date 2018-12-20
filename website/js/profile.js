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
var defaultUsername = "default user";
var defaultDescription = "This is where a description would appear if the user set one up";
var pictureURL;
var portfolios = [];

//Tries to put a URL parameter in a variable
var urlParams = new URLSearchParams(window.location.search);
var userID = urlParams.get('userID');
if(!userID)
	urlParams.get('userId');
if(!userID)
	urlParams.get('userid');
var validParam = /^\d+$/.test(userID);

getUserData();
getUserPortfolios();

//Checks if the URL contains valid a parameter
function URLContainsParam(){
	if(window.location.href.indexOf("?userID=") + 1 && userID && validParam)
		return true;
	return false;
}

//Retrieves user data
function getUserData(){
	if(URLContainsParam())
		makerequestnopar("http://10.3.50.6/api/user?userID=" + userID, "GET", token, function(data){
			username = data.username;
				description = data.description;
				pictureURL = data.pictureURL;
				setContent();
			}, true);
	else
		makerequestnopar("http://10.3.50.6/api/user", "GET", token, function(data){
				username = data.username;
				description = data.description;
				pictureURL = data.pictureURL;
				setContent();
		},true);

}

//Retrieves selling portfolios
function getUserPortfolios(){
	if(URLContainsParam())
		makerequestnopar("http://10.3.50.6/api/portfolio?soldOnly=true&userId=" + userID, "GET", token, function(data){
			portfolios = data;
			setContent();
		}, true);
	else
		portfolios = makerequestnopar("http://10.3.50.6/api/portfolio?soldOnly=true", "GET", token, function(data){
			portfolios = data;
			setContent();
		}, true);
}

//Shows portfolios on the site
function addPortfolioCards(portfolioData){
	 var portCardsHTML = $('.content-datacenter').html();
	 portCardsHTML += `
	 <div class="card">
    	<img src="${portfolioData.imgURL}" alt="${portfolioData.name}" class="img-fluid" height="50%"> 
    	<div class="card-body">
        	<h5 class="card-title">${portfolioData.name}</h5>
        	<p class="card-text">
        	${portfolioData.description} 
        	</p>
        	<a href="datacenternew.php?portfolioId=${portfolioData.portfolioId}" class="btn btn-primary">Buy data</a>
    	</div>
	</div>`
	$('.content-datacenter').html(portCardsHTML);
}

//Puts a user's information on the screen
function setContent(){
	if(username)
		$('#user-name').text(username);
	else
		$('#user-name').text(defaultUsername);

	if(description)
		$('#user-description').text(description);	
	else 
		$('#user-description').text(defaultDescription);

	if(pictureURL){
		$('#user-img').attr("src", pictureURL);
		$('#user-img').attr("alt", username);
	}
	else {
		$('#user-img').attr("src", "img/profile.png");
		$('#user-img').attr("alt", "default profile picture");
	}

	if(portfolios.length && portfolios != "error: ")
		for(var i = 0; i < portfolios.length; i++)
			addPortfolioCards(portfolios[i]);
	else
		$('#no-portfolio').css("visibility", "visible");
}

$(document).ready(function() {

});