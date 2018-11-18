function delcard(id){
    document.getElementById(id).style.display = "block";
}
function addzero(number){
    if(number < 10){
        number = "0" + number;
    }
    return number;
}

document.getElementById("createnote").addEventListener("click",onclickcreate);
function onclickcreate(){
    var note = document.createElement("div");
    var notebody = document.createElement("div");
    var notetitle = document.createElement("h5");
    var notetext = document.createElement("p");
    var notedel = document.createElement("button");
    var notecontent = document.getElementById("notecontent").value;
    if(notecontent == ""){
        document.getElementById('falsenote').style.color = "red";
        document.getElementById('falsenote').innerHTML = '* This field cannot be empty!';
    }
    else{
        var ID = Math.random();
        document.getElementById('falsenote').innerHTML = '';
        note.className = "card";
        note.setAttribute("id",ID);
        notebody.className = "card-body";
        notetitle.className = "card-title";
        notetext.className = "card-text";
        notedel.className = "btn btn-primary";
         //notedel.setAttribute("onclick",delcard(ID););
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() +1;
        var yyyy = today.getFullYear();
        var hh = addzero(today.getHours());
        var MM = addzero(today.getMinutes());
        today = dd + '/' + mm + '/' + yyyy + ' ' + hh + ':' + MM;
        notetitle.innerHTML = today + '<br>';
        notetext.innerHTML =  notecontent;
        notedel.innerHTML = "X";
        document.getElementById("notes").appendChild(note);
        note.appendChild(notebody);
        notebody.appendChild(notetitle);
        notebody.appendChild(notetext);
        notebody.appendChild(notedel);
        document.getElementById("notecontent").value = "";
        $(function(){
            $("#createnote").modal('toggle');	
        });
    }
}
$(function(){

	var dateTo = {
        dateTo:"01/01/0002"
	}
	//http://localhost:5000/api/auth/login
	console.log(dateTo);
    $.ajax({
    	"async": true,
  		"crossDomain": true,
  		url: 'http://localhost:5000/api/orders/get',
        type: 'POST',
        "headers": {
    		"Content-Type": "application/json",
            "Authorization": "Bearer " + getCookie("token")
  		},
        data: JSON.stringify(dateTo),
        dataType: 'json',
        success: function(data){
            console.log(data);
           for(var i = 0; i < data.length; i++){
                var table_orders = document.getElementById("orders");
                var row = orders.insertRow(i);
                row.insertCell(0).innerHTML = data[i].exchange;
                row.insertCell(1).innerHTML = data[i].symbol;
                row.insertCell(2).innerHTML = data[i].currency;
                row.insertCell(3).innerHTML = data[i].price;
                row.insertCell(4).innerHTML = data[i].qty;
                row.insertCell(5).innerHTML = data[i].timePlaced;
            }
        },
        error: function(xhr, ajaxOptions, thrownError){
        	console.log(xhr.status);
        	console.log(thrownError);
            //console.log("error");
        }
    });
});