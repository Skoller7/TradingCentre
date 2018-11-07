/*
var xhttp = new XMLHttpRequest();
xhttp.open("POST", "http://localhost:5000/api/auth/login", true);
xhttp.send();
var test = xhttp.();
*/

$(function(){

	var testUser = {
		username: "Umdom",
        password: "ahoe",
        email: "hoe@hoe"
	}
	//http://localhost:5000/api/auth/login
	console.log(testUser);
    $.ajax({
    	"async": true,
  		"crossDomain": true,
  		url: 'http://localhost:5000/api/auth/login',
        type: 'POST',
        "headers": {
    		"Content-Type": "application/json"
  		},
        data: JSON.stringify(testUser),
        dataType: 'json',
        success: function(data){
            console.log(data.token);
        },
        error: function(xhr, ajaxOptions, thrownError){
        	console.log(xhr.status);
        	console.log(thrownError);
            //console.log("error");
        }
    });
});

/*
//localhost:5000/api/auth/login


	var uAAAAAser = {
		username: "Umdom",
        password: "ahoe",
        email: "hoe@hoe"
	}
console.log(uAAAAAser);


var settings = {

  "async": true,
  "crossDomain": true,
  "url": "http://localhost:5000/api/auth/login",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json"
  },
  //"data": "{\r\n    username: \"Umdom\",\r\n\t\"password\": \"ahoe\",\r\n\t\"email\": \"hoe@hoe\"\r\n }"
  "data" : JSON.stringify(uAAAAAser)
}

$.ajax(settings).done(function (response) {
	document.cookie = "cooikesAllowed=true";
	console.log(response.token);
});
*/