//array of all the modals of the current page(including header)
var modalList = [];
var requestsuccess = true;
var statuscall = 200;

function getstatus(){
    return statuscall;
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
    return false;
}
//https://www.w3schools.com/js/js_cookies.asp
function getCookieObj(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c;
        }
    }
    return false;
}

//https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

//close all the modals that are active on screen
function closeAllModals(){
  modalList.forEach(closeModal);  
}

//close the given modal
//https://stackoverflow.com/questions/19506672/how-to-check-if-bootstrap-modal-is-open-so-i-can-use-jquery-validate
function closeModal(modal){
  if ($(modal).is(':visible')){
    $(modal).modal('toggle');  
  }
}
//makes api request without parameters
function makerequestnopar(url_api, type_api, authorization_api,success,async){
    var ajax = $.ajax({
    	"async": async,
  		"crossDomain": true,
  		url: url_api,
        type: type_api,
        "headers": {
    		"Content-Type": "application/json",
            "Authorization": "Bearer " + authorization_api
  		},
        dataType: 'json'
       });
        ajax.done(function(data) {
            statuscall = ajax.status;
            success(data);
        });

        ajax.fail(function(status, error,xhr) {
            statuscall = ajax.status;
            success(xhr.responseText);
        });
}

//makes api request with parameters
function makerequest(jsonfile_api, url_api, type_api, authorization_api,success){
   var ajax = $.ajax({
    	"async": true,
  		"crossDomain": true,
  		url: url_api,
        type: type_api,
        "headers": {
    		"Content-Type": "application/json",
            "Authorization": "Bearer " + authorization_api
  		},
        data: JSON.stringify(jsonfile_api),
        dataType: 'json',
   });
    ajax.done(function(data) {
            statuscall = ajax.status;
            success(data);
    });
    ajax.fail(function(status, error,xhr) {
            statuscall = ajax.status;
            success(xhr.responseText);
    });   

}
function ValidURL(str) {
  var pattern = new RegExp("(http(s?):\\\/\\\/)www.tradingview.com\\\/x\\\/[A-Za-z0-9]{8}\\\/$");
  if(!pattern.test(str)) {
    pattern = new RegExp("(http(s?):\/\/)www.tradingview.com\/x\/[A-Za-z0-9]{8}\/$");
    if(!pattern.test(str)){
        return false;
    }else{
        return true;
    }
  } else {
    return true;
  }
}