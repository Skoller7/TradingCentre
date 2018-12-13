$(document).ready(function() {

var results;
getUsers(function(){
	makeSearchResultElements();
})


$("#search").append(document.createTextNode(search));

function getUsers(callBack){
	 $.ajax({
		"async": true,
		"crossDomain": true,
		url: 'http://10.3.50.6/api/user/search?username=' + search,
		timeout : 0,
		type: 'GET',
		"headers": {
		    "Content-Type": "application/json",
		    "Authorization": "Bearer " + jwtToken,

	  },
	    success: function(data){
	    	console.log(data);
	    	results = data;
	  		callBack();
	  
	    },
	    error: function(data, ajaxOptions, thrownError){
	        console.log(data);
	    	console.log(data.status);
	    	console.log(thrownError);
	    }
	});
	
}


	function makeSearchResultElements(){

		console.log(results.length);

		if(results.length != 0){

			for(var i = 0; i < results.length; i++){

			    var name = results[i].username;
			    var e = document.createElement("DIV");
			    var link = document.createElement("A");
				e.setAttribute("class","searchResult");
			    link.setAttribute("href","journal.php?user=" + results[i].username);
			    var img = document.createElement("IMG");
			    img.setAttribute("alt","profile picture");
			    if(results[i].profilePicture == null){
			    	img.setAttribute("src","img/profile.png");
			    }
			    else{
			    	img.setAttribute("src",results[i].username);
			    }
			    //img.setAttribute("src","data:image/png;base64,"+results[i].profilePicture);
			    img.setAttribute("class","searchImg");   
			    e.appendChild(img);
			   
			    var indexOfsearch = [];
			    var count = 0;
			    do{
			        indexOfsearch[count] = name.indexOf(search);
			        name = name.replace(search,'');

			        count++;
			    }while(name.indexOf(search) != -1);
			    

			    if(indexOfsearch.length != 1){
			    	var lastIndex = 0;
			    	
			    	for(var j = 0; j < indexOfsearch.length ; j++){
			    	
			    		var span = document.createElement("SPAN");
			    		span.setAttribute("class", "markedText");
			    		span.appendChild(document.createTextNode(search));
			    		link.appendChild(document.createTextNode(name.substr(lastIndex,indexOfsearch[j] - lastIndex)));
			    		link.appendChild(span);
			    		lastIndex = indexOfsearch[j];

			    	}
			    	link.appendChild(document.createTextNode(name.substr(indexOfsearch[indexOfsearch.length - 1])));
			    }
			    else{
			    	if(indexOfsearch == -1){
			    		link.appendChild(document.createTextNode(name));
			    	}
			    	else{
			    		console.log('test');
			    		link.appendChild(document.createTextNode(name.substr(0,indexOfsearch[0])));
			    		var span = document.createElement("SPAN");
			    		span.setAttribute("class", "markedText");
			    		span.appendChild(document.createTextNode(search));
			    		link.appendChild(span);
			    		link.appendChild(document.createTextNode(name.substr((name.length - name.length), name.length)));
			    	}
			    }
			    /*
			    e.addEventListener("click",function(){
			    	//document.getElementById('profilePicture').setAttribute("src","data:image/png;base64,"+results.users[i].profilePicture);
			    });*/
			    e.appendChild(link);
				document.getElementById("user").appendChild(e);
			}
		}
		else{
			console.log('geen users');
		}


	}

});

