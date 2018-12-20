$(document).ready(function() {

	var results;
	if(search){
		getUsers(function(){
			makeSearchResultElements();
		});
		//sets the searches term in the title of the page
		$("#searchedUsername").append(document.createTextNode(search));
	}
	else{
		$("#searchedUsername").append(document.createTextNode(search));
		noResults();
	}
	//api call to get all users that have the searched text in there name
	function getUsers(callBack){
		 $.ajax({
			"async": true,
			"crossDomain": true,
			url: 'https://10.3.50.6/api/user/search?username=' + search,
			timeout : 0,
			type: 'GET',
			"headers": {
			    "Content-Type": "application/json",
			    "Authorization": "Bearer " + getCookie('jwtToken'),

		  },
		    success: function(data){
		    	results = data;
		  		callBack();
		  
		    },
		    error: function(data, ajaxOptions, thrownError){
		    	noResults();
		    }
		});
		
	}

	//makes the user elements from the data that getUsers() provides
	function makeSearchResultElements(){

		console.log(results.length);

		if(results.length != 0){

			for(var i = 0; i < results.length; i++){
				//creats a user element
			    var name = results[i].username;
			    var e = document.createElement("DIV");
			    var link = document.createElement("A");
				e.setAttribute("class","searchResult");
			    link.setAttribute("href","profile.php?userID=" + results[i].userId);
			    link.setAttribute("class","searchLink");
			    var img = document.createElement("IMG");
			    img.setAttribute("alt","profile picture");
			    if(results[i].profilePicture == null){
			    	img.setAttribute("src","img/profile.png");
			    }
			    else{
			    	img.setAttribute("src",results[i].username);
			    }
			    img.setAttribute("class","searchImg");   
			    e.appendChild(img);
			   	
			   	//highligths the search term in the username
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
			    e.appendChild(link);
				document.getElementById("user").appendChild(e);
			}
		}
		else{
			noResults();
		}
		document.getElementById('footer').style.top = null;
	}
	//creates a message for when there are no users provided from getUsers()
	function noResults(){
		var div = document.createElement("DIV");
		div.setAttribute("class","noResultsText");
		div.appendChild(document.createTextNode("No search results found, try again."));
		document.getElementById("user").appendChild(div);
	}
});