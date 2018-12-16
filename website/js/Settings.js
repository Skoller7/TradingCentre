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
    var a, b, c, d;
    a = document.getElementById("name");
    //b = document.getElementById("img");
    c = document.getElementById("pw");
    d = document.getElementById("description");

    if (a.value === "" && c.value === "" && d.value === "") {
        window.alert("At least one of the fields has to be filled in to submit!");
        
        /*if (!a.value.replace(/\s/g, '').length && c.value.replace(/\s/g, '').length && d.value.replace(/\s/g, '').length) {
            window.alert("Fields can't contain whitespaces!");
        }*/
    }
    
    else {
        //var cookie = getCookie("jwtToken");
        var token = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIyNCIsInVuaXF1ZV9uYW1lIjoidGVzdHVzZXIiLCJuYmYiOjE1NDQ5Nzk5MDQsImV4cCI6MTU0NTA2NjMwNCwiaWF0IjoxNTQ0OTc5OTA0fQ.wAuA7Nxbnf3rOohJmt6wG9tzh_UhAxFfZWgapezHeGO2Mcztw45xch5grvMs9SgpEsP9lIOlwE6wq7oLAw29ZA"
        var user = makerequestnopar("http://10.3.50.6/api/user?userId=0", "GET", token);
        
        console.log(user);
        
        var changes = [];
        var form = document.getElementById("accountForm");
        var inputs = form.getElementsByTagName("input");
        for (var i = 0; i <inputs.length; i++) {
            var input = inputs[i];
            if(input.value){
                console.log(form[i].name);
                var n = form[i].name;
                //console.log(user.form[i].name);
            changes.push(form[i].name + ": " + input.value);
                console.log(user.n);
            }
            /*else {
                changes.push(form[i].name + ": " + user.n);
            }*/
        }
        console.log(changes);
    }
     return false;
}