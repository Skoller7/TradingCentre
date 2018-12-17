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
    /*var val = validation("accountForm", "input");
    var val2 = validation("accountForm", "textarea");
    if (val == false && val2 == false) {
        window.alert("At least one of the fields has to be filled in to submit!")
    }*/
    
    var isEmpty = false;
    $('input').each(function(){
        if(isEmpty === false && $.trim( this.value ) === ""){
            isEmpty = true;
        }
    });

    if(isEmpty === true) {
        window.alert("At least one of the fields has to be filled in to submit!");
    }
    
    else {
        //var cookie = getCookie("jwtToken");
        var user = [];
        var token = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIyNCIsInVuaXF1ZV9uYW1lIjoidGVzdHVzZXIiLCJuYmYiOjE1NDUwNjMwODUsImV4cCI6MTU0NTE0OTQ4NSwiaWF0IjoxNTQ1MDYzMDg1fQ.vbj4x__vbXmy4q8NY3U8txGAPRMT_-4BVkHAR88XSmK6PfADEz7bOZBZktYpp5CMZwFohNaV8uIFz-13yj2Rig"
        user = makerequestnopar("http://10.3.50.6/api/user?userId=0", "GET", token);
        
        console.log(user);
        

        copyValue(user, "accountForm", "input");
        copyValue(user, "accountForm", "textarea");
        
    }
    /*$.ajax({
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
        },
        error: function(xhr, ajaxOptions, thrownError){
            console.log(xhr.status);
            console.log(thrownError);
            console.log(xhr);
        }
    });*/
    //window.alert("Your data has been changed!")
     return false;
}

function copyValue(user, idelement, tagelement) {
    var form = document.getElementById(idelement);
    var elements = form.getElementsByTagName(tagelement);
    
    console.log(user);
    
    for(var i = 0; i < elements.length; i++) {
        var el = elements[i];
        if(el.value) {
            var x = el.name;
            
            user[x] = el.value;
            
            console.log(user[x]);
        }
    }
    console.log(user);
}

function validation(idelement, tagelement) {
    /*var form = document.getElementById(idelement)
    var elements = form.getElementsByTagName(tagelement);
    var count = 0;
    var i;
    var el;
    for(i = 0; i < elements.lenght; i++) {
        el = elements[i];
        if(!el.value) {
        count++;
        }
        else {
            count--;
        }
    }
    console.log(count + " " + i);
    if(count == i) {
        return false;
        
    }*/
}