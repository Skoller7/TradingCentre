var modalList = [];

//https://www.w3schools.com/howto/howto_html_include.asp
function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /*loop through a collection of all HTML elements:*/
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /*make an HTTP request using the attribute value as the file name:*/
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {elmnt.innerHTML = this.responseText;}
          if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
          /*remove the attribute, and call this function once more:*/
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      }      
      xhttp.open("GET", file, true);
      xhttp.send();
      /*exit the function:*/
      return;
    }
  }
};

//includeHTMLFile("test.html");

function includeHTMLFile(filePath, elmnt){
  /*
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", filePath, true);
  xhttp.send();
  */

  /*make an HTTP request using the attribute value as the file name:*/
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {elmnt.innerHTML = this.responseText;}
          if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
          /*remove the attribute, and call this function once more:*/
          //elmnt.removeAttribute("w3-include-html");
          //includeHTML();
        }
      }      
      xhttp.open("GET", filePath, true);
      xhttp.send();
}


//https://www.w3schools.com/js/js_cookies.asp
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

//modals
function closeAllModals(){
  modalList.forEach(closeModal);  
}

function closeModal(item){
  //https://stackoverflow.com/questions/19506672/how-to-check-if-bootstrap-modal-is-open-so-i-can-use-jquery-validate
  if ($(item).is(':visible')){
    $(item).modal('toggle');  
  }
}
//makes api request without parameters
function makerequestnopar( url_api, type_api, authorization_api){
    var data_api;
   $.ajax({
    	"async": false,
  		"crossDomain": true,
  		url: url_api,
        type: type_api,
        "headers": {
    		"Content-Type": "application/json",
            "Authorization": "Bearer " + authorization_api
  		},
        dataType: 'json',
        success: function(data){
             data_api = data;
            },
        error: function(xhr, ajaxOptions, thrownError){
        	console.log(xhr.status);
        	console.log(thrownError);
            //console.log("error");
        }
    });
    return data_api;
}
//makes api request with parameters
function makerequest(jsonfile_api, url_api, type_api, authorization_api){
    var data_api; 
   $.ajax({
    	"async": false,
  		"crossDomain": true,
  		url: url_api,
        type: type_api,
        "headers": {
    		"Content-Type": "application/json",
            "Authorization": "Bearer " + authorization_api
  		},
        data: JSON.stringify(jsonfile_api),
        dataType: 'json',
        success: function(data){
            data_api = data;
            },
        error: function(xhr, ajaxOptions, thrownError){
        	console.log(xhr.status);
        	console.log(thrownError);
            console.log(xhr);
        }
    });
    return data_api;
}