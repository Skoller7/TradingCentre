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

/*
<div class="card">
    <img src="img/tradeimg.png" alt="img of chart" class="img-fluid" height="50%"> 
    <div class="card-body">
        <h5 class="card-title">Skoller</h5>
        <p class="card-text">
        Lorem Ipsum is slechts een proeftekst uit het drukkerij- en zetterijwezen. 
        </p>
        <a href="datacenternew.php" class="btn btn-primary">Buy data</a>
    </div>
</div>
*/


var token = getCookie("jwtToken");
var username;
var description;
var defaultDescription = "This is where a description would appear if the user set one up";
var pictureURL;
var portfolios = [];

const urlParams = new URLSearchParams(window.location.search);
const userID = urlParams.get('userID');
console.log(makerequestnopar("http://10.3.50.6/api/user?userID=" + userID,"GET",token));

getUserData();
getUserPortfolios();

function getUserData(){
	var data = makerequestnopar("http://10.3.50.6/api/user","GET",token);
	username = data.username;
	description = data.description;
	pictureURL = data.pictureURL;
}

function getUserPortfolios(){
	portfolios = makerequestnopar("http://10.3.50.6/api/portfolio?soldOnly=true","GET",token);
}

function addPortfolioCards(portfolioData){
	 var portCardsHTML = $('.content-datacenter').html();
	 portCardsHTML += `<div class="card">
    	<img src="${portfolioData.pictureURL}" alt="${portfolioData.name}" class="img-fluid" height="50%"> 
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
	if(portfolios.length){
		for(var i = 0; i < portfolios.length; i++){
			addPortfolioCards(portfolios[i]);
		}
	}
	else{
		console.log(`Not empty ${description}`);
		$('#no-portfolio').css("visibility", "visible");
	}
}

$(document).ready(function() {
	setContent();
});