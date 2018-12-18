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

var urlParams = new URLSearchParams(window.location.search);
var userID = /^\d+$/.test(urlParams.get('userID'));

getUserData();
getUserPortfolios();

function URLContainsParam(){
	if(window.location.href.indexOf("?userID=") + 1 && userID)
		return true;
	return false;
}

function getUserData(){
	if(URLContainsParam())
		var data = makerequestnopar("http://10.3.50.6/api/user?userID=" + userID, "GET", token);
	else
		var data = makerequestnopar("http://10.3.50.6/api/user", "GET", token);
	username = data.username;
	description = data.description;
	pictureURL = data.pictureURL;
}

function getUserPortfolios(){
	if(URLContainsParam())
		portfolios = makerequestnopar("http://10.3.50.6/api/portfolio?soldOnly=true&userId=" + userID, "GET", token);
	else
		portfolios = makerequestnopar("http://10.3.50.6/api/portfolio?soldOnly=true", "GET", token);
}

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
        	<a href="datacenternew.php" class="btn btn-primary">Buy data</a>
    	</div>
	</div>`
	$('.content-datacenter').html(portCardsHTML);
}

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
	setContent();
});