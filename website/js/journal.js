var token = getCookie("jwtToken");
var activeportfolioid;
var port = [];
var activemodalportdel = 0;
var content = document.getElementById("MCreateNoteContent");
var errorcontent = document.getElementById("ErrorCreateNoteContent");
var nameport = document.getElementById("MPortName");
var descport = document.getElementById("MPortDesc");
var goalport = document.getElementById("MPortGoal");
var imgurl = document.getElementById("Mimgurl");
var errorname = document.getElementById("ErrorPortName");
var errordesc = document.getElementById("ErrorPortDesc");
var errorgoal = document.getElementById("ErrorPortGoal");
var errorurlport = document.getElementById("errorporturl");
var desc = document.getElementById("portfolio-description");
var goals = document.getElementById("portfolio-goals");
 var table_orders = document.getElementById("orders");
var head_orders = document.getElementById("orders-port");
var info = document.getElementById("info-content");
var all = document.getElementById("all-orders-table");
var myChart;
var ex = document.getElementById("exchange");
var si = document.getElementById("side");
var pr = document.getElementById("price");
var qt = document.getElementById("orderQty");
var sy = document.getElementById("symbol");
var ti = document.getElementById("timestamp");
var ex_arr = document.getElementById("exchange-arrow");
var si_arr = document.getElementById("side-arrow");
var pr_arr = document.getElementById("price-arrow");
var qt_arr = document.getElementById("orderQty-arrow");
var sy_arr = document.getElementById("symbol-arrow");
var ti_arr = document.getElementById("timestamp-arrow");
var arraysort;
var arrayaddorders = [];
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() +1;
var yyyy = today.getFullYear();
var fromdate = document.getElementById("fromdate");
var todate = document.getElementById("todate");
var amount = document.getElementById("amount");
var frdate;
var tdate;
var ppdvar = document.getElementById("profit-port");
var refresh = document.getElementById("refreshorder");
var defaultbool = false;
var ul = document.getElementById("portfolios-ul");
var footer = document.getElementById("footer-port");
var journalul = document.getElementById("ul-journal");
var descinput = document.getElementById("descorder");
var urlinput = document.getElementById("urlorder");
var errorurl = document.getElementById("errorurl");
var errordescription = document.getElementById("errordesc");
var erroraddorder = document.getElementById("erroraddorder");
var imageurlel = document.getElementById("imageurl");
var portimgel = document.getElementById("portimg");
modalList.push("MCreateNote");
modalList.push("MCreatePort");
modalList.push("Mupdateorder");
fromdate.addEventListener("change",getorders);
todate.addEventListener("change",getorders);
amount.addEventListener("change",getorders);
var changedisplay = document.getElementById("changedisplay");
var content1 = document.getElementById("content1");
var content2 = document.getElementById("content2");
var content2orders = document.getElementById("content2-orders");
var content2header = document.getElementById("content2-header");
var currentid;
/*
change display onclick button
*/
changedisplay.addEventListener("click",changedisplayjournal);
function changedisplayjournal(){
    if(content1.style.display == "block"){
        content2.style.display = "block";
        content1.style.display = "none";
        content2header.innerHTML = "Trading journal ";
        getorderscontent2();
    }else{
        content2.style.display = "none";
        content1.style.display = "block";
        getorders();
    }
}
/*
add zero to number smaller then 10
*/
        function addzero(number){
            if(number < 10){
                number = "0" + number;
            }
            return number;
        }
/*
show modal add  desc and img to image 
*/
var idupdate = 0;
function openupdateorder(e){
	closeAllModals();
	$('#Mupdateorder').modal({
		backdrop: 'static'
	});
    idupdate = e.target.id;
    errordescription.innerHTML = "";
    errorurl.innerHTML = "";
    for(var i=0;i< arraysort.length;i++){
        if(idupdate == arraysort[i].orderId){
            descinput.value = arraysort[i].description;
            urlinput.value = arraysort[i].imgURL;
             imageurlel.setAttribute("src",arraysort[i].imgURL);
            return;
        }
    }
}
/*
set image on change input value
*/
urlinput.addEventListener("change",setimg);
function setimg(){
    imageurlel.setAttribute("src",urlinput.value);
}
/*
close modal add  desc and img to image 
*/
document.getElementById("btncloseupdate").addEventListener("click",closeupdateorder);
document.getElementById("updateorderBCrosse").addEventListener("click",closeupdateorder);
function closeupdateorder(){
	$('#Mupdateorder').modal('toggle');
}

/*
api call add  desc and img to image 
*/
document.getElementById("btnupdateorder").addEventListener("click",function (){
    var valid = true;
    errordescription.innerHTML = "";
    errorurl.innerHTML = "";
    if(descinput.value == ""){
        valid = false;
        errordescription.innerHTML = "* This field cannot be empty";
    }
    if(urlinput.value == ""){
        valid = false;
        errorurl.innerHTML = "* This field cannot be empty";
    }else if(!ValidURL(urlinput.value)){
        valid = false;   
        errorurl.innerHTML = "* This must be an url image from tradingview.com";
    }
    if(valid){
            var json = {
                "OrderId" : idupdate,
                "Description" : descinput.value,
                "ImgURL" : urlinput.value,
                "IsSold" : 0
            }
        var data = makerequest(json,"http://10.3.50.6/api/order","POST",token);
        if(getstatus() == 200 || getstatus() == 201){
            descinput.value = "";
            urlinput.value  ="";
            errordescription.innerHTML = "Succesfully updated";
            errorurl.innerHTML = "";
                if(content1.style.display == "block"){
                    getorders();
                }else{
                    getorderscontent2();
                }
            closeupdateorder();
        }else if(getstatus() == 400){
            errordescription.innerHTML = data;
        }else if(getstatus() == 401){
            errordescription.innerHTML = "* Something went wrong try again later";
        }
    }
});
/*
table eventlisteners
*/
function sort(array,prop,change){
    if(change == 0){
        for(var i = 0;i < array.length;i++){
            for(var j = 0; j < array.length - i - 1; j++){
                if(array[j][prop] > array[j + 1][prop]){
                    var id = document.getElementById(array[j].orderId);
                    var idplus = document.getElementById(array[j + 1].orderId);
                    var hold = array[j];
                    id.setAttribute("id",array[j+1].orderId);
                    idplus.setAttribute("id",array[j].orderId);
                    array[j] = array[j+1];
                    array[j+1] = hold;
                }
            }
        }
    }else{
        for(var i = 0;i < array.length;i++){
            for(var j = 0; j < array.length - i - 1; j++){
                if(array[j][prop] < array[j + 1][prop]){
                    var id = document.getElementById(array[j].orderId);
                    var idplus = document.getElementById(array[j + 1].orderId);
                    var hold = array[j];
                    id.setAttribute("id",array[j+1].orderId);
                    idplus.setAttribute("id",array[j].orderId);
                    array[j] = array[j+1];
                    array[j+1] = hold;
                }
            }
        }
    }
    return array;
}
function sortarray(){
    var docid = document.getElementById(this.id + "-arrow");
    if(docid.className == 'fa fa-angle-down'){
        docid.className = "fa fa-angle-up";
        arraysort = sort(arraysort,this.id,0);
    }else{
         docid.className = "fa fa-angle-down";
        arraysort = sort(arraysort,this.id,1);
    }
    all.innerHTML = "";
        if(arraysort.length == 0){
            all.innerHTML = "No orders found";
           }else{
               all = document.getElementById("all-orders-table");
                for(var j = 0;j < arraysort.length;j++){
                    setOrders(arraysort,j,defaultbool);
                }
           }
}
ex.addEventListener("click",sortarray);
si.addEventListener("click",sortarray);
pr.addEventListener("click",sortarray);
qt.addEventListener("click",sortarray); 
sy.addEventListener("click",sortarray);
ti.addEventListener("click",sortarray);
/* 
menu sidebar portfolios
*/
document.getElementById("porfolios-sub").style.display = "none";
document.getElementById("portfolios").addEventListener("click",openSubPortfolios);
function openSubPortfolios(){
     var sub = document.getElementById("porfolios-sub");
    if(sub.style.display == "block"){
        document.getElementById("port-arrow").className = "fa fa-angle-right";
        sub.style.display = "none";
    }else{
        document.getElementById("port-arrow").className = "fa fa-angle-down";
        document.getElementById("porfolios-sub").style.display = "block";
    }
}

/*
call get all portfolios in submenu portfolios
*/

if(token != false){
getport();
}
function getport(){
        port = [];
        var data = makerequestnopar("http://10.3.50.6/api/portfolio","GET",token);
        ul.innerHTML = "";
        for(var i = 0; i < data.length;i++){
            var name = document.createTextNode(data[i].name);
            var li = document.createElement("LI");
            ul.appendChild(li);
            li.setAttribute("style","background-color:#3a4e5f");
            li.setAttribute("id",data[i].portfolioId + "port");
            li.appendChild(name);
            if(data[i].isDefault == true){
                defaultbool = true;
                setdefaultport(data[i].portfolioId);
                 activeportfolioid = data[i].portfolioId;
            }
            var sub = document.getElementById(data[i].portfolioId + "port");
            port.push(sub.getAttribute("id"));
        }
          //  ppd();
}

/*
add order to portfolio
*/
/*
show modal add order to portfolio
*/
document.getElementById("addorder").addEventListener("click",openaddorder);
function openaddorder(){
	closeAllModals();
	$('#Maddorder').modal({
		backdrop: 'static'
	});
   erroraddorder.innerHTML = "";
    getordersadd();
}
/*
close modal add order to portfolio
*/
document.getElementById("btnclose").addEventListener("click",closeaddorder);
document.getElementById("addorderBCrosse").addEventListener("click",closeaddorder);
function closeaddorder(){
	$('#Maddorder').modal('toggle');
                if(content1.style.display == "block"){
                    getorders();
                }else{
                    getorderscontent2();
                }
}

/*
api call add order to portfolio
*/
document.getElementById("btnaddorder").addEventListener("click",addorderstoportfolio);
function addorderstoportfolio(){
    var valid = true;
    erroraddorder.innerHTML = "";
    arrayaddorders = [];
    var ids = document.getElementsByName("addordercheck");
    for(var i = 0;i <ids.length;i++){
        if(ids[i].checked){
            arrayaddorders.push(ids[i].value);
        }
    }
    if(arrayaddorders.length == 0){
        valid = false;
         erroraddorder.innerHTML = "* Check one or more orders to submit";
    }
    for(var j = 0; j < arrayaddorders.length; j++){
        var json = {
            "OrderId": arrayaddorders[j],
            "PortfolioId": activeportfolioid
        };
        var data = makerequest(json,"http://10.3.50.6/api/portfolio/order","PUT",token);
        if(getstatus() != 201){
           valid = false;
        }
    }
    if(valid){
        erroraddorder.innerHTML = "Orders succesfuly added to portfolio";
        closeaddorder();
        all  =document.getElementById("all-orders-table");
    }else{
        if(erroraddorder.innerHTML == ""){
            if(getstatus() == 400){
                erroraddorder.innerHTML = data;
            }else if(getstatus() == 401){
                erroraddorder.innerHTML = "* Something went wrong try again later";
            }
        }
    }
}

/*
open sub menu options

function openoptions(id){
    var div = document.getElementById("opt"+id);
    var classname = document.getElementsByClassName("dropdown-options");
    for (var i = 0;i < classname.length;i++){
        classname[i].style.display = "none";
    }
    if(div.style.display == "block"){
        div.style.display = "none";
    }else{
        div.style.display = "block";
    }
    
}
*/
/*
get ppd portfolio
*/
/*function ppd(){
    var data = makerequestnopar("http://10.3.50.6/api/portfolio/profit?portfolioId="+activeportfolioid,"GET",token);
    for(var i = 0;i < data.length;i++){
        if(data[i].day == addzero(dd)+"/"+addzero(mm)+"/"+yyyy){
            var j;
            if(data[i].profit < 0){
                color = "red";
                j = "fa fa-long-arrow-down";
            }else{
                color = "green";
                j = "fa fa-long-arrow-up";
            }
            ppdvar.style.color = color;
            ppdvar.style.textAlign = "center";
            ppdvar.style.fontWeight = "700";
            ppdvar.innerHTML = "Profit of the day  " + data[i].profit;
        }
    }
}*/
journalul.addEventListener("click",function(){
     window.location = "createdataselling.php?portfolioId="+activeportfolioid;
});
/*
api call get portfolio on id when clicked in submenu portfolios
*/
var header = document.getElementById("header-content");
document.getElementById("portfolios-ul").addEventListener("click",function(e) {
if(e.target && e.target.nodeName == "LI" && !(isNaN(e.target.id.substring(0,e.target.id.indexOf("port"))))) {
        var data = makerequestnopar("http://10.3.50.6/api/portfolio?portfolioId="+ e.target.id.substring(0,e.target.id.indexOf("port")),"GET",token);
        setupactiveport(data,e.target.id);
            activeportfolioid = e.target.id.substring(0,e.target.id.indexOf("port"));
        if(data.isDefault == true){
            defaultbool = true;
            journalul.style.display = "none";
        }else{
            defaultbool = false;
            journalul.innerHTML = "Sell portfolio";
            journalul.style.display = "block";
        }
        getnotes();
        if(content1.style.display == "block"){
            getorders();
        }else{
            getorderscontent2();
        }
}
});
/*
set default portfolio on loading page
*/
function setdefaultport(id){
        var data = makerequestnopar("http://10.3.50.6/api/portfolio?portfolioId="+ id,"GET",token);
        setupactiveport(data,id + "port");
        activeportfolioid = id;
        getnotes();
        getorders();
}
/*
setup active portfolio
*/
function setupactiveport(data,id){
    footer.innerHTML = "";
        desc.innerHTML = data.description;
        goals.innerHTML = data.goal;
        if(data.isDefault != true){
            var idel = document.createElement("li");
            var iup = document.createElement("li");
            idel.setAttribute("id","header-port-del");
            iup.setAttribute("id","header-port-update");
            idel.setAttribute("style","padding:10px 20px 10px 20px;");
            iup.setAttribute("style","padding:10px 20px 10px 20px;");
            idel.className = "fa fa-trash";
            iup.className = "fa fa-edit";
            footer.appendChild(idel);
            footer.appendChild(iup);
        }
        var sub = document.getElementById(id);
        for(var i = 0;i < port.length;i++){
            document.getElementById(port[i]).style.borderLeft = "0px solid #FF751A";
            document.getElementById(port[i]).style.paddingRight = "0px";
        }
        sub.style.borderLeft = "3px solid #FF751A";
        sub.style.paddingRight = "-3px";
}
/*
api call delete portfolio
*/
document.getElementById("footer-port").addEventListener("click",function(e) {
if(e.target && e.target.nodeName == "LI") {
    if(e.target.id == "header-port-del"){
        var data = makerequestnopar("http://10.3.50.6/api/portfolio?portfolioId=" + activeportfolioid,"DELETE",token);
        getport();
    }else if(e.target.id == "header-port-update"){
        activemodalportdel = 1;
        var data = makerequestnopar("http://10.3.50.6/api/portfolio?soldOnly=false&portfolioId="+activeportfolioid,"GET",token);
        console.log(data);
        nameport.value = data.name;
        descport.value = data.description;
        goalport.value = data.goal;
        imgurl.value = data.imgURL;
        portimgel.setAttribute("src",imgurl.value);
        openCreateport();
    }
}
});
imgurl.addEventListener("change",setimgport);
function setimgport(){
    portimgel.setAttribute("src",imgurl.value);
}
/*
api call get all notes with portfolioid
*/
function getnotes(){
        var data = makerequestnopar("http://10.3.50.6/api/note?portfolioId=" + activeportfolioid,"GET",token);
        var notes = document.getElementById("notes-all");
        notes.innerHTML = "";
      for(var i = 0; i < data.length;i++){
        var li = document.createElement("div");
        li.setAttribute("class","notes-card");
        li.setAttribute("id",data[i].noteId + "note")
        var content = document.createElement("div");
        content.setAttribute("class","notes-content");
        content.setAttribute("id","notes-content");
        var content_del = document.createElement("i");
        var content_edit = document.createElement("i");
        var p = document.createElement("p");
          p.innerHTML = data[i].message;
        content.appendChild(p);
        content.appendChild(content_edit);
        content.appendChild(content_del);
        content_del.setAttribute("id",data[i].noteId);
        content_del.setAttribute("class","fa fa-trash");
        content_edit.setAttribute("id",data[i].noteId);
        content_edit.setAttribute("class","fa fa-edit");
          content_edit.setAttribute("value",data[i].message);
        notes.appendChild(li);
        li.appendChild(content);
      }
}

/*
notes
*/
/*
show modal create note
*/
var createorupdate = true;
var noteid;
document.getElementById("BCreateNote").addEventListener("click",openMCreateNote);
function openMCreateNote(){
    if(content.value == ""){
        createorupdate = true;
        document.getElementById("MCreateNoteBCreateNote").innerHTML = "Create note";
        document.getElementById("notetitle").innerHTML = "Create note";
    }else{
        document.getElementById("MCreateNoteBCreateNote").innerHTML = "Update note";
        document.getElementById("notetitle").innerHTML = "Update note";
    }
     errorcontent.innerHTML = "";
	closeAllModals();
	$('#MCreateNote').modal({
		backdrop: 'static'
	});
}
/*
close modal create notes
*/
document.getElementById("MCreateNoteBClose").addEventListener("click",McreateNoteClose);
document.getElementById("MCreateNoteBCrosse").addEventListener("click",McreateNoteClose);
function McreateNoteClose(){
    content.value = "";
     errorcontent.innerHTML = "";
	$('#MCreateNote').modal('toggle');
}

/*
api call create and updatenote
*/
document.getElementById("MCreateNoteBCreateNote").addEventListener("click",createnote);
function createnote(){
     errorcontent.innerHTML = "";
    var valid =true;
    if(content.value == ""){
          errorcontent.innerHTML = "This field cannot be empty";
        valid = false;
    }
    if(valid){
        if(createorupdate){
            var json = {"PortfolioId": activeportfolioid ,"message":content.value};
            makerequest(json,"http://10.3.50.6/api/note","PUT",token);
        }else{
            var json = {"NoteId": noteid,"message":content.value};
            makerequest(json,"http://10.3.50.6/api/note","POST",token);
        }
        if(getstatus() == 400 || getstatus() == 401 || getstatus()== 501 || getstatus() == 500){
                errorcontent.innerHTML = "Something went wrong, please try again later";
                valid = false;
         }
    }
    if(valid){
        McreateNoteClose();
        getnotes();
    }
}
/*
api call delete and update note
*/
document.getElementById("notes-all").addEventListener("click",function(e) {
if(e.target && e.target.nodeName == "I" && !(isNaN(e.target.id))) {
    if(e.target.className == "fa fa-trash"){
                makerequestnopar("http://10.3.50.6/api/note?noteId=" + e.target.id,"DELETE",token);
                document.getElementById(e.target.id + "note").style.display = "none";
      }else{
          content.value = e.target.getAttribute("value");
          noteid = e.target.id;
          createorupdate = false;
          openMCreateNote();
      }
}
});

/*
show modal create & update portfolios
*/
document.getElementById("BCreatePort").addEventListener("click",openCreateport);
function openCreateport(){
     errorname.innerHTML = "";
    errordesc.innerHTML = "";
    errorgoal.innerHTML = "";
errorurlport.innerHTML = "";
    if(activemodalportdel == 0){
         portimgel.setAttribute("src","");
        document.getElementById("createporttitle").innerHTML = "Create Portfolio";
        document.getElementById("MCreatePortBCreatePort").innerHTML = "Create Portfolio";

    }else{
          document.getElementById("createporttitle").innerHTML = "Update Portfolio";
        document.getElementById("MCreatePortBCreatePort").innerHTML = "Update Portfolio";
    }
	closeAllModals();
	$('#MCreatePort').modal({
		backdrop: 'static'
	});
}
/*
close modal create & update portfolios
*/
document.getElementById("MCreatePortBClose").addEventListener("click",McreateportClose);
document.getElementById("MCreatePortBCrosse").addEventListener("click",McreateportClose);
function McreateportClose(){
nameport.value = "";
descport.value = "";
goalport.value = "";
errorname.innerHTML = "";
errordesc.innerHTML = "";
errorgoal.innerHTML = "";
 imgurl.value = "";
errorurlport.innerHTML = "";

	$('#MCreatePort').modal('toggle');
}

/*
api call create portfolio and update portfolio
*/
document.getElementById("MCreatePortBCreatePort").addEventListener("click",createport);
function createport(){
     var valid = true;
    errorname.innerHTML = "";
    errordesc.innerHTML = "";
    errorgoal.innerHTML = "";
    errorurlport.innerHTML = "";
    
    if(nameport.value == ""){
        errorname.innerHTML = "This field cannot be empty";
        valid = false;
    }
    if(!ValidURL(imgurl.value)){
        
        errorurlport.innerHTML = "This field must be a correct image url";
        valid = false;
    }
    if(activemodalportdel == 0){
        if(valid){
            var jsonfile = {"Name": nameport.value,"Description": descport.value,"Goal": goalport.value	,"ImgURL":imgurl.value,"IsForSale": true,"Address":null};
            var data = makerequest(jsonfile,"http://10.3.50.6/api/portfolio","PUT",token);
             console.log(getstatus());
            if(getstatus() == 400 || getstatus() == 401 || getstatus() == 501 || getstatus() == 500){
                    erroradres.innerHTML = "* Something went wrong try again later";
                    valid = false; 
            }
        }
   }else{
        if(valid){
            var jsonfile = {"PortfolioId": activeportfolioid,"Name": nameport.value,"Description": descport.value,"Goal": goalport.value	,"ImgURL":imgurl.value,"IsForSale": true,"Address": null};
        var data = makerequest(jsonfile,"http://10.3.50.6/api/portfolio","POST",token);
        if(getstatus() == 400 || getstatus() == 401 || getstatus()== 501 || getstatus() == 500){
                    erroradres.innerHTML = "* Something went wrong try again later";
                    valid = false; 
            }
        }
        activemodalportdel = 0;
    }
    if(valid){
    McreateportClose();
    getport();
    }
}


/*
api call get orders users without the orders current in the portfolio
*/
function getordersadd(){
    all = document.getElementById("all-orders-table-add");
    all.innerHTML = "";
    $.ajax({
    	"async": true,
  		"crossDomain": true,
  		url: "http://10.3.50.6/api/order/getNotInPortfolio?portfolioId="+activeportfolioid,
        type: "GET",
        "headers": {
    		"Content-Type": "application/json",
            "Authorization": "Bearer " + token
  		},
        dataType: 'json',
        success: function(data){
            if(data.length > 0){
                if(!defaultbool){
                    for(var i = 0;i<data.length; i++){
                        if(data[i].isSold == false){
                            setOrders(data,i,defaultbool);
                        }
                    }
                }else{
                    all.innerHTML = "You cannot add orders to default portfolio";
                }
            }else{
                all.innerHTML = "No orders found";
            }
            },
        error: function(xhr, ajaxOptions, thrownError){
        	console.log(xhr.status);
        	console.log(thrownError);
            console.log(xhr);
        }
    }); 
}
/*
refresh orders
*/
refresh.addEventListener("click",refreshorder);
function refreshorder(){
    makerequestnopar("http://10.3.50.6/api/order/refresh","GET",token);
    getorders();   
}
/*
api call get orders for content2
*/
function getorderscontent2(){
        content2orders.innerHTML = "";
       $.ajax({
    	"async": true,
  		"crossDomain": true,
  		url: "http://10.3.50.6/api/order/get?portfolioId="+activeportfolioid,
        type: "GET",
        "headers": {
    		"Content-Type": "application/json",
            "Authorization": "Bearer " + token
  		},
        dataType: 'json',
        success: function(data){
            if(data.length != 0){
                    for(var i = 0;i < data.length; i++){
                        if(data[i].isSold == false){
                             var date = data[i].timestamp;
                                    if(data[i].side == "Buy"){
                                        color = "green";
                                    }else{
                                       color = "red";
                                    }
                            if(!defaultbool){ 
                                content2orders.innerHTML += "<div class='card' style='margin:2%;'><div class='card-body'><h4>"+date.substr(0,10)+" " + date.substr(11,5)+" - <span style='color:"+color+"'>" + data[i].side +"</span> - <a href='#' class='edit' id='"+data[i].orderId+"'>Edit order</a> - <a href='#' class='deleteorder' id='"+data[i].orderId+"'>Delete order</a></h4><img src="+data[i].imgURL+" style='width:100%;'/><div style='font-size:17px;'><u>Description:</u> "+data[i].description+"</div></div></div>";
                            }else{
                                 content2orders.innerHTML += "<div class='card' style='margin:2%;'><div class='card-body'><h4>"+date.substr(0,10)+" " + date.substr(11,5)+" - <span style='color:"+color+"'>" + data[i].side +"</span> - <a href='#' class='edit' id='"+data[i].orderId+"'>Edit order</a></h4><img src="+data[i].imgURL+" style='width:100%;'/><div style='font-size:17px;'><u>Description:</u> "+data[i].description+"</div></div></div>";                               
                            }
                        }
                    }
            }else{
                content2orders.innerHTML = "No orders found";
            }
            
            },
        error: function(xhr, ajaxOptions, thrownError){
        	console.log(xhr.status);
        	console.log(thrownError);
            console.log(xhr);
        }
    });
}
                /*
                click eventlistener if link is clicked delete or update order
                */
                content2orders.addEventListener("click",function(e){
                    if(e.target.className == "edit"){
                        openupdateorder(e);
                    }else if(e.target.className == "deleteorder"){
                        var valid = true;
                        console.log(currentid);
                       if(currentid == null){
                           currentid = e.target.id;
                       }else{
                           if(currentid == e.target.id){
                               valid = false;
                           }
                       }
                        if(valid){
                            makerequestnopar("http://10.3.50.6/api/portfolio/order?orderId="+e.target.id+"&portfolioId="+activeportfolioid,"DELETE",token);
                            if(getstatus() == 400 || getstatus() == 401 || getstatus()== 501 || getstatus() == 500){
                                alert("Something went wrong, please try again later");
                            }
                        }
                        getorderscontent2();
                    }
                });
/*
api call get orders
*/
function getorders(){
        all = document.getElementById("all-orders-table");
        all.innerHTML = "";
        if(todate.value == ""){
            todate.value = yyyy+"-"+addzero(mm)+"-"+addzero(dd);
            tdate = addzero(dd)+"/"+addzero(mm)+"/"+yyyy;
        }else{
            tdate = todate.value.substring(8,10) + "/" + todate.value.substring(5,7) + "/" + todate.value.substring(0,4);
        }
        if(fromdate.value == ""){
            fromdate.value = "1970-01-01";
        }
        frdate = fromdate.value.substring(8,10) + "/" + fromdate.value.substring(5,7) + "/" + fromdate.value.substring(0,4);
       $.ajax({
    	"async": true,
  		"crossDomain": true,
  		url: "http://10.3.50.6/api/order/get?portfolioId="+activeportfolioid+"&amount="+amount.value+"&dateFrom="+frdate+"&dateTo="+tdate,
        type: "GET",
        "headers": {
    		"Content-Type": "application/json",
            "Authorization": "Bearer " + token
  		},
        dataType: 'json',
        success: function(data){
            if(data.length != 0){
                arraysort = data;
                    for(var i = 0;i < data.length; i++){
                        if(data[i].isSold == false){
                            setOrders(data,i,defaultbool);
                        }
                    }
            }else{
                all.innerHTML = "No orders found";
            }
            },
        error: function(xhr, ajaxOptions, thrownError){
        	console.log(xhr.status);
        	console.log(thrownError);
            console.log(xhr);
        }
    });
}
/*
set orders in the table
*/
function setOrders(data,i,defaultbool){
        var tr = document.createElement("tr");
        if(data[i].side == "Buy"){
            color = "green";
        }else{
           color = "red";
        }
        if(all.className == 'all'){
            tr.innerHTML += "<td class='id'>"+data[i].orderId+"</td>";
        }
        tr.innerHTML += "<td class='ex'>"+data[i].exchange+"</td>";
        tr.innerHTML += "<td class='si' style='color:"+color+"'>"+data[i].side+"</td>";
        tr.innerHTML += "<td class='pr'>"+data[i].price+"("+data[i].currency+")</td>";
        tr.innerHTML += "<td class='qt'>"+data[i].orderQty+"</td>";
        tr.innerHTML += "<td class='sy'>"+data[i].symbol+"</td>";
        var date = data[i].timestamp;
        tr.innerHTML += "<td class='ti'>"+date.substr(0,10)+" " + date.substr(11,5)+"</td>";
        if(all.className == 'all'){
            var td = document.createElement("td");
            td.setAttribute("class","dropdowndrop");
            var a = document.createElement("a");
            a.setAttribute("class","btn btn-primary");
            a.setAttribute("id",data[i].orderId);
            a.style.color = "#fff";
            var jk = document.createElement("i");
            jk.setAttribute("class","fa fa-edit");
            jk.setAttribute("id",data[i].orderId);
            a.appendChild(jk);
            td.appendChild(a);
            a.addEventListener("click",openupdateorder);
            if(!defaultbool){
                var a2 = document.createElement("a");
                a2.setAttribute("class","btn btn-danger");
                a2.setAttribute("id",data[i].orderId);
                var kj = document.createElement("i");
                kj.setAttribute("class","fa fa-trash");
                kj.setAttribute("id",data[i].orderId);
                kj.setAttribute("style","background-color:red;");
                a2.appendChild(kj);
                a2.addEventListener("click",deleteorder);
                td.appendChild(a2);
            }
            if(data[i].imgURL == null || data.imgURL == ""){
                tr.innerHTML += "<td><i class='fa fa-times' style='color:red;'></i></td>";
            }else{
                tr.innerHTML += "<td><i class='fa fa-check' style='color:green;'></i></td>";
            }
            if(data[i].description == null || data.description == ""){
                tr.innerHTML += "<td><i class='fa fa-times' style='color:red;'></i></td>";
            }else{
                tr.innerHTML += "<td><i class='fa fa-check' style='color:green;'></i></td>";
            }
            tr.appendChild(td);
        }else{
            tr.innerHTML += "<td class='addorder'><input type='checkbox' name='addordercheck' class='check' id="+data[i].orderId+" value="+data[i].orderId+"></td>"
        }
        all.appendChild(tr);
}
/*
api call delete order
*/
function deleteorder(e){
            var data = makerequestnopar("http://10.3.50.6/api/portfolio/order?orderId="+e.target.id+"&portfolioId="+activeportfolioid,"DELETE",token);
            if(getstatus() == 400 || getstatus() == 401 || getstatus()== 501 || getstatus() == 500){
                alert("Something went wrong, please try again later");
            }else{
                if(content1.style.display == "block"){
                    getorders();
                }else{
                    getorderscontent2();
                }
            }
    return;
};

    $(window).on('resize', function(){
        if(myChart != null && myChart != undefined){
           myChart.resize();
        }
    });
function adddoubleline(){
           var myChart = echarts.init(document.getElementById('main'),'light');

        var base = +new Date(2018, 9, 3);
        var oneDay = 24 * 3600 * 1000;
        var date = [];
        var today = +new Date();

        var dataBitMex = [Math.random() * 1];
        var dataBinance = [Math.random() * 3];



        /*fetch('http://api.com/file.json')
        .then (function(response){
               return response.json();
               })
        .then(function(myJson){
                date.push([JSON.stringify(myJson)]);
})


        fetch('http://api.com/file.json')
        .then (function(response){
               return response.json();
               })
        .then(function(myJson){
                dataBitMex.push([JSON.stringify(myJson)]);
})

fetch('http://api.com/file.json')
        .then (function(response){
               return response.json();
               })
        .then(function(myJson){
                dataBinance.push([JSON.stringify(myJson)]);
})*/


        for (var i = base; i <= today; i += oneDay) {
            var j = 1;
            var now = new Date(base += oneDay);
            date.push([now.getFullYear(), now.getMonth(), now.getDate()].join('/'));
            dataBitMex.push(Math.round((Math.random() - 0.5) * 20 + dataBitMex[j-1]));
            dataBinance.push(Math.round((Math.random() - 0.5) * 30 + dataBinance[j-1]));
            j++;
        }
        doubleLine = {
             tooltip: {
                trigger: 'axis',
                position: function (pt) {
                    return [pt[0], '10%'];
                        }
            },
            legend:{
              left: 'left',
              data: ['BitMex', 'Binance'],
              align: 'left'
            },
            title: {
                left: 'center',
                text: 'Profit/Loss per day',
            },
            toolbox: {
                feature: {
                        show: true,
                        saveAsImage: {
                        title: 'Save As Image'
                    },
                        magicType:{
                        type: ['bar', 'line'],
                        title: {bar: 'Bar Graph', line: 'Line Graph'}
                    }
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: date
            },
            yAxis: {
                type: 'value',
                boundaryGap: [0, '100%']
            },
            dataZoom: [{
                type: 'inside',
                start: 0,
                end: 10
                },
                    {start: 0,
                        end: 10,
                        handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                        handleSize: '80%',
                        handleStyle: {
                            color: '#fff',
                            shadowBlur: 3,
                            shadowColor: 'rgba(0, 0, 0, 0.6)',
                            shadowOffsetX: 2,
                            shadowOffsetY: 2
                            }
                    }
            ],
            series: [
                {
                name:'BitMex',
                type:'line',
                smooth:true,
                symbol: 'diamond',
                sampling: 'average',
                itemStyle: {
                    color: 'rgb(255, 70, 131)'
                },
                    data: dataBitMex
                },
                {
                name:'Binance',
                type:'line',
                smooth:true,
                symbol:'circle',
                sampling: 'average',
                itemStyle: {
                    color: 'rgb(240, 230, 290)'
                },
                    data: dataBinance
                }
            ]
        };
        myChart.setOption(doubleLine);
}
function addbasichart(){
        // based on prepared DOM, initialize echarts instance
        myChart = echarts.init(document.getElementById('main'),'light');

        // specify chart configuration item and data
var base = +new Date(2018, 9, 3);
var oneDay = 24 * 3600 * 1000;
var date = [];
var today = +new Date();

var data = [Math.random() * 5];

/*fetch('http://api.com/file.json')
        .then (function(response){
               return response.json();
               })
        .then(function(myJson){
                date.push([JSON.stringify(myJson)]);
})

fetch('http://api.com/file.json')
        .then (function(response){
               return response.json();
               })
        .then(function(myJson){
                data.push([JSON.stringify(myJson)]);
})*/

for (var i = base; i < today; i += oneDay) {
    var j = 1;
    var now = new Date(base += oneDay);
    date.push([now.getFullYear(), now.getMonth() , now.getDate()].join('/'));
    data.push(Math.round((Math.random() - 0.5) * 20 + data[j-1]));
    j++;
}

BasicChart = {
    tooltip: {
        trigger: 'axis',
        position: function (pt) {
            return [pt[0], '10%'];
        }
    },
    title: {
        left: 'center',
        text: 'Profit/Loss per day',
    },
    toolbox: {
        feature: {
                show: true,
                saveAsImage: {
                title: 'Save As Image'
            },
                magicType:{
                type: ['bar', 'line'],
                title: {bar: 'Bar Graph', line: 'Line Graph'}
            }
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: date
    },
    yAxis: {
        type: 'value',
        boundaryGap: [0, '100%']
    },
    dataZoom: [{
        type: 'inside',
        start: 0,
        end: 10
    }, {
        start: 0,
        end: 10,
        handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
        handleSize: '80%',
        handleStyle: {
            color: '#fff',
            shadowBlur: 3,
            shadowColor: 'rgba(0, 0, 0, 0.6)',
            shadowOffsetX: 2,
            shadowOffsetY: 2
        }
    }],
    series: [
        {
            name:'Profit/Loss',
            type:'line',
            smooth:true,
            symbol: 'diamond',
            sampling: 'average',
            itemStyle: {
                color: 'rgb(255, 70, 131)'
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgb(255, 158, 68)'
                }, {
                    offset: 1,
                    color: 'rgb(255, 70, 131)'
                }])
            },
            data: data
        }
    ]
},
        // use configuration item and data specified to show chart
        myChart.setOption(BasicChart);
}
function addchart(){
        // based on prepared DOM, initialize echarts instance
        var myChart = echarts.init(document.getElementById('main'));

        // specify chart configuration item and data
var base = +new Date(1968, 9, 3);
var base2 = +new Date(1968,9,4);
var oneDay = 24 * 3600 * 1000;
var date = [];
var today = +new Date();

var data = [Math.random() * 300];
for (var i = base2; i < today; i += oneDay) {
    var j = 1;
    var now = new Date(base += oneDay);
    date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
    data.push(Math.round((Math.random() - 0.5) * 20 + data[j - 1]));
    j++;
}
option = {
    tooltip: {
        trigger: 'axis',
        position: function (pt) {
            return [pt[0], '10%'];
        }
    },
    title: {
        left: 'center',
        text: 'Binance',
    },
    toolbox: {
        feature: {
            dataZoom: {
                yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: date
    },
    yAxis: {
        type: 'value',
        boundaryGap: [0, '100%']
    },
    dataZoom: [{
        type: 'inside',
        start: 0,
        end: 10
    }, {
        start: 0,
        end: 10,
        handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
        handleSize: '80%',
        handleStyle: {
            color: '#fff',
            shadowBlur: 3,
            shadowColor: 'rgba(0, 0, 0, 0.6)',
            shadowOffsetX: 2,
            shadowOffsetY: 2
        }
    }],
    series: [
        {
            name:'Won/Lost',
            type:'line',
            smooth:true,
            symbol: 'none',
            sampling: 'average',
            itemStyle: {
                color: 'rgb(255, 70, 131)'
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgb(255, 158, 68)'
                }, {
                    offset: 1,
                    color: 'rgb(255, 70, 131)'
                }])
            },
            data: data
        }
    ]
};
        // use configuration item and data specified to show chart
        myChart.setOption(option);
}
