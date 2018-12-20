//var cookie = getCookie("jwtToken");
var user = [];
var token = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIyNCIsInVuaXF1ZV9uYW1lIjoidGVzdHVzZXIiLCJuYmYiOjE1NDUyMTExNTAsImV4cCI6MTU0NTI5NzU1MCwiaWF0IjoxNTQ1MjExMTUwfQ.i_S5d_PbOxxisOxTD6w5zDV6AZC5GwBZYWVjBhKC9GgjFzlHYhL0IGWlePq-8H1cz12Yyp6sV1P1BJsI8vYO6g";


function openOption(evt, optionName) {
    var i, content, tablink;
    
    content = document.getElementsByClassName("content");
    for (i = 0; i < content.length; i++) {
        content[i].style.display = "none";
    }
    
    tablink = document.getElementsByClassName("tablink");
    for (i = 0; i < tablink.length; i++) {
        tablink[i].className = tablink[i].className.replace(" active", "");
    }
    
    document.getElementById(optionName).style.display = "block";
    evt.currentTarget.className += " active";
}

document.getElementById("default").click();

function validateForm(){
    /*var a, b, c, d;
    a = document.getElementById("fname");
    //b = document.getElementById("img");
    c = document.getElementById("pw");
    d = document.getElementById("description");

    if (a.value === "" && c.value === "" && d.value === "") {
        window.alert("At least one of the fields has to be filled in to submit!");
        
        /*if (!a.value.replace(/\s/g, '').length && c.value.replace(/\s/g, '').length && d.value.replace(/\s/g, '').length) {
            window.alert("Fields can't contain whitespaces!");
        }*/
    
    var isFilled = validation();
    //var isEmpty2 = validation("accountForm", "textarea");

    if(isFilled === false) {
        window.alert("At least one of the fields has to be filled in to submit!");
    }
    
    else {
        
        if (document.getElementById("img")) {
                testImage();
            }
        
        user = makerequestnopar("http://10.3.50.6/api/user?userId=0", "GET", token);
        
        console.log(user);
        

        copyValue(user, "profileForm", "input");
        copyValue(user, "profileForm", "textarea");
        
    }
    $.ajax({
        "async": true,
        "crossDomain": true,
        url: "http://10.3.50.6/api/user",
        type: "POST",
        "headers": {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        "data": JSON.stringify(user),
        dataType: 'json',
        succes: function(data){
            console.log(data);
            window.alert("Your data has been changed!");
        },
        error: function(xhr, ajaxOptions, thrownError){
            console.log(xhr.status);
            console.log(thrownError);
            console.log(xhr);
        }
    });
   
     return false;
}

function copyValue(user, idelement, tagelement) {
    var form = document.getElementById(idelement);
    var elements = form.getElementsByTagName(tagelement);
    
    console.log(user);
    
    for(i = 0; i < elements.length; i++) {
        var el = elements[i];
        if(el.value) {
            var x = el.name;
            
            user[x] = el.value.trim();
            
            console.log(user[x]);
        }
    }
    console.log(user);
}

function validation() {
    
    var fields = ["fname", "lname", "email", "uname", "pn", "pw", "img", "description"];
    
    var i, l = fields.length;
    var fieldname, count = 0;
    for (i = 0; i < l; i++) {
        fieldname = fields[i];
        var txt = document.forms["profileForm"][fieldname].value;
        if (txt.trim() === "") { 
            
            count++;
        }
        
        else if (/^\s*$/.test(txt)){
            count++;
            document.forms["profileForm"][fieldname].value = "";
        }
        
        else if (fieldname === "img") {
            testImage();
        }
        
        else {
            count--;
        }
    }
    if (count === i) {
        return false;
    }
}



function adjust_textarea(h) {
    h.style.height = "20px";
    h.style.height = (h.scrollHeight)+"px";
}

function validateToDelete() {
    user = makerequestnopar("http://10.3.50.6/api/user?userId=0", "GET", token);
    var form = document.getElementById("deleteUser");
    var elements = form.getElementsByTagName("input");
    var b = false;
    console.log(user);
    
    for(i = 0; i < elements.length; i++) {
        var el = elements[i];
        
            if (confirm("Are you sure you want to delete your account? This can not be undone.")) {
                b = function deleteCall(){
                    $.ajax({
                        "async": true,
                        "crossDomain": true,
                        url: "http://10.3.50.6/api/user",
                        type: "DELETE",
                        "headers": {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + token
                        },
                        "data": JSON.stringify(el.value),
                        dataType: 'json',
                        succes: function(data){
                            console.log(data);
                            return true;
                        },
                        error: function(xhr, ajaxOptions, thrownError){
                            console.log(xhr.status);
                            console.log(thrownError);
                            console.log(xhr);
                            return false;
                        }
                    });
                }
                if (b === true) {
                    window.alert("Your account has been deleted, we hope to see you again!");
                }
                else {
                    window.alert("Your data has not been deleted, perhaps your password is incorrect.");
                    el.value = "";
                    el.focus();
                }
            }
            else {
                window.alert("Thanks for staying with us!");
            }
    }
    return false;
}

function testImage() {
        document.getElementById("imageUrl").src = document.getElementById("img").value;
}


function errorCallback() {
    document.getElementById("img").focus();
    document.getElementById("img").value = "";
    window.alert("Image URL is not valid. Please enter a valid URL or leave it blank.");
    return;
}

function loadCallback() {
    window.alert("Image URL is valid, you can proceed.");
}

/*var modal = document.querySelector(".modald");
var trigger = document.querySelector(".deleteUser");
var closeBtn = document.querySelector(".close");

function toggleModal() {
    modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal;
    }
}

trigger.addEventListener("click", toggleModal);
closeBtn.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);*/