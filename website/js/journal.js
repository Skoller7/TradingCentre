/*
token from current user
*/
var token = getCookie("jwtToken");
/*
active portfolio id
*/
var activeportfolioid;
/*
all portfolios from current user
*/
var port = [];
/*
bool create or update portfolio
*/
var activemodalportdel = 0;
/*
elements for display content 
*/
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
var fromdate = document.getElementById("fromdate");
var todate = document.getElementById("todate");
var amount = document.getElementById("amount");
var ppdvar = document.getElementById("profit-port");
var refresh = document.getElementById("refreshorder");
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
var changedisplay = document.getElementById("changedisplay");
var content1 = document.getElementById("content1");
var content2 = document.getElementById("content2");
var content2orders = document.getElementById("content2-orders");
var content2header = document.getElementById("content2-header");
var myChart;
/*
all orders from current portfolio
*/
var arraysort;
/*
array with all checked orders to add to current portfolio
*/
var arrayaddorders = [];
/*
bool if portfolio is default or not
*/
var defaultbool = false;
var frdate;
var tdate;
/*
date from today
*/
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() +1;
var yyyy = today.getFullYear();
/*
push modals into the modallist
*/
modalList.push("MCreateNote");
modalList.push("MCreatePort");
modalList.push("Mupdateorder");
/*
event listener if input fields change 
*/
fromdate.addEventListener("change",getorders);
todate.addEventListener("change",getorders);
amount.addEventListener("change",getorders);
/*
show modal yes or no for delete and delete item if clicked yes
*/
function openyesno(functiondelete){
	closeAllModals();
	$('#yesno').modal({
		backdrop: 'static'
	});
document.getElementById("yess").addEventListener("click",function (e){
	$('#yesno').modal('toggle');
    functiondelete();
});
document.getElementById("noo").addEventListener("click",function (e){
	$('#yesno').modal('toggle');
});
}
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
        makerequest(json,"http://10.3.50.6/api/order","POST",token,function(data){
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
        });
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
        makerequestnopar("http://10.3.50.6/api/portfolio","GET",token,function(data){
            ul.innerHTML = "";
            for(var i = 0; i < data.length;i++){
                if(data[i].isForSale == false){
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
            }
        });
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
    var tel = 0;
    for(var j = 0; j < arrayaddorders.length; j++){
        var json = {
            "OrderId": arrayaddorders[j],
            "PortfolioId": activeportfolioid
        };
        makerequest(json,"http://10.3.50.6/api/portfolio/order","PUT",token,function(data){
                tel++;
                if( tel == arrayaddorders.length){
                    if(getstatus() == 201){
                    closeaddorder();
                    }else{
                        erroraddorder.innerHTML = "* Something went wrong";
                    }
                }
        });
    }
}

/*
onclick sell portfolio go to create selling portfolio page
*/
journalul.addEventListener("click",function(){
     window.location = "createdataselling.php?portfolioId="+activeportfolioid;
});
/*
api call get portfolio on id when clicked in submenu portfolios
*/
var header = document.getElementById("header-content");
document.getElementById("portfolios-ul").addEventListener("click",function(e) {
if(e.target && e.target.nodeName == "LI" && !(isNaN(e.target.id.substring(0,e.target.id.indexOf("port"))))) {
        makerequestnopar("http://10.3.50.6/api/portfolio?portfolioId="+ e.target.id.substring(0,e.target.id.indexOf("port")),"GET",token,function(data){
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
        },true);
}
});
/*
set default portfolio from current user on loading page
*/
function setdefaultport(id){
        makerequestnopar("http://10.3.50.6/api/portfolio?portfolioId="+ id,"GET",token,function(data){
                   setupactiveport(data,id + "port");
                    activeportfolioid = id;
                    getnotes();
                    getorders(); 
        },true);
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
api call delete or update portfolio
*/
var portids = [];
document.getElementById("footer-port").addEventListener("click",function(e) {
if(e.target && e.target.nodeName == "LI") {
    if(e.target.id == "header-port-del"){
        openyesno(function(){
            var valid = true;
            for(var i = 0;i < portids.length;i++){
                if(portids[i] == activeportfolioid){
                    valid = false;
                }
            }
            if(valid){
                makerequestnopar("http://10.3.50.6/api/portfolio?portfolioId=" + activeportfolioid,"DELETE",token,function(data){
                    getport();
                },true);
                portids.push(activeportfolioid);
            }
        });
    }else if(e.target.id == "header-port-update"){
        activemodalportdel = 1;
        makerequestnopar("http://10.3.50.6/api/portfolio?soldOnly=false&portfolioId="+activeportfolioid,"GET",token,function(data){
                    nameport.value = data.name;
                    descport.value = data.description;
                    goalport.value = data.goal;
                    imgurl.value = data.imgURL;
                    portimgel.setAttribute("src",imgurl.value);
                    openCreateport();
        },true);
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
        makerequestnopar("http://10.3.50.6/api/note?portfolioId=" + activeportfolioid,"GET",token,function(data){
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
        },true);
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
api call create and update note
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
            makerequest(json,"http://10.3.50.6/api/note","PUT",token,function(data){
                        if(getstatus() == 400 || getstatus() == 401 || getstatus()== 501 || getstatus() == 500){
                                errorcontent.innerHTML = "Something went wrong, please try again later";
                                valid = false;
                         }
                    if(valid){
                        McreateNoteClose();
                        getnotes();
                    }
            });
        }else{
            var json = {"NoteId": noteid,"message":content.value};
            makerequest(json,"http://10.3.50.6/api/note","POST",token,function(data){
                        if(getstatus() == 400 || getstatus() == 401 || getstatus()== 501 || getstatus() == 500){
                            errorcontent.innerHTML = "Something went wrong, please try again later";
                            valid = false;
                     }
                    if(valid){
                        McreateNoteClose();
                        getnotes();
                    }
            });
        }
    }
}
/*
api call delete and open update note modal
*/
var notesid = [];
var currentnoteid;
document.getElementById("notes-all").addEventListener("click",function(e) {
if(e.target && e.target.nodeName == "I" && !(isNaN(e.target.id))) {
    var id = e.target.id;
    if(e.target.className == "fa fa-trash"){
            openyesno(function(){
                var valid = true;
                currentnoteid = e.target.id;
                for(var i = 0; i < notesid.length;i++){
                    if(currentnoteid == notesid[i]){
                      valid = false; 
                       }
                }
                if(valid){
                    makerequestnopar("http://10.3.50.6/api/note?noteId=" +id,"DELETE",token,function(data){
                        if(getstatus() == 200){
                            getnotes();
                        }
                    },true);
                    notesid.push(currentnoteid);
                }
            });
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
getport();
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
    if(document.getElementById("createporttitle").innerHTML == "Create Portfolio"){
        if(valid){
            var jsonfile = {"Name": nameport.value,"Description": descport.value,"Goal": goalport.value	,"ImgURL":imgurl.value,"IsForSale": false,"Address":null};
            makerequest(jsonfile,"http://10.3.50.6/api/portfolio","PUT",token,function(data){
                if(getstatus() == 400 || getstatus() == 401 || getstatus() == 501 || getstatus() == 500){
                    erroradres.innerHTML = "* Something went wrong try again later";
                    valid = false; 
                }
            });
        }
   }else{
        if(valid){
            var jsonfile = {"PortfolioId": activeportfolioid,"Name": nameport.value,"Description": descport.value,"Goal": goalport.value	,"ImgURL":imgurl.value,"IsForSale": true,"Address": null};
            makerequest(jsonfile,"http://10.3.50.6/api/portfolio","POST",token,function(data){
                    if(getstatus() == 400 || getstatus() == 401 || getstatus()== 501 || getstatus() == 500){
                    erroradres.innerHTML = "* Something went wrong try again later";
                    valid = false; 
                    }
            });
        }
        activemodalportdel = 0;
    }
    if(valid){
        McreateportClose();
    }
}


/*
api call get orders users without the orders current in the portfolio
*/
function getordersadd(){
    all = document.getElementById("all-orders-table-add");
    all.innerHTML = "";
    makerequestnopar("http://10.3.50.6/api/order/getNotInPortfolio?portfolioId="+activeportfolioid,"GET",token,function(data){
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
    },true);
}
/*
refresh orders
*/
refresh.addEventListener("click",refreshorder);
function refreshorder(){
    makerequestnopar("http://10.3.50.6/api/order/refresh","GET",token,function(data){
        getorders(); 
    },true);
}
/*
api call get orders for content2
*/
function getorderscontent2(){
        content2orders.innerHTML = "";
        makerequestnopar("http://10.3.50.6/api/order/get?portfolioId="+activeportfolioid,"GET",token,function(data){
                if(data.length != 0){
                    for(var i = 0;i < data.length; i++){
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
            }else{
                content2orders.innerHTML = "No orders found";
            }
        },true);
}
/*
click eventlistener if link is clicked delete or update order
*/
var ids2 = [];
var current2;
content2orders.addEventListener("click",function(e){
    if(e.target.className == "edit"){
        openupdateorder(e);
    }else if(e.target.className == "deleteorder"){
            openyesno(function(){
                var valid = true;
                current2 = e.target.id;
                for(var i = 0; i < ids2.length;i++){
                    if(ids2[i] == current2){
                      valid =false;   
                    }
                }
                    if(valid){
                        makerequestnopar("http://10.3.50.6/api/portfolio/order?orderId="+current2+"&portfolioId="+activeportfolioid,"DELETE",token,function(){
                        getorderscontent2();
                        },true);
                        ids2.push(current2);
                    }
            });
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
    makerequestnopar("http://10.3.50.6/api/order/get?portfolioId="+activeportfolioid+"&amount="+amount.value+"&dateFrom="+frdate+"&dateTo="+tdate,"GET",token,function(data){
            if(data.length != 0){
                arraysort = data;
                    for(var i = 0;i < data.length; i++){
                            setOrders(data,i,defaultbool);
                    }
            }else{
                all.innerHTML = "No orders found";
            }
    },true);
    checkFooterPosition();
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
var ids = [];
var current;
function deleteorder(e){
    openyesno(function(){
                var valid = true;
                current = e.target.id;
                for(var i = 0; i < ids.length;i++){
                    if(ids[i] == current){
                      valid =false;   
                    }
                }
                
                    if(valid){
                        makerequestnopar("http://10.3.50.6/api/portfolio/order?orderId="+current+"&portfolioId="+activeportfolioid,"DELETE",token,function(){
                            getorders();
                        },true);
                        ids.push(current);
                    }
    });
}

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
        test();
        var millisecondsToWait = 500;
        setTimeout(function() {
BasicChart = {
    dataset: {
        source: data
    },
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
    },
    yAxis: {
        type: 'value',
        boundaryGap: [0, '50%'],
    },
    dataZoom: [{
        type: 'inside',
        start: 0,
        end: 100
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
            smooth:'true',
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
           encode: {
            x: 'day',
            y: 'profit'
            }
        }
    ]
},
        myChart.setOption(BasicChart, {
                dataset: {
                source: data
                },
                series:[{
                    name:'Profit/Loss',
                    encode: {
                    x: 'day',
                    y: 'profit'
                    }
                }]
        });
            
        // use configuration item and data specified to show chart
myChart.setOption(BasicChart);        
        }, millisecondsToWait);
        
        // based on prepared DOM, initialize echarts instance
        myChart = echarts.init(document.getElementById('main'),'light');

        var data = [];
        
function test(){
    if(activeportfolioid == null){
    makerequestnopar("http://10.3.50.6/api/portfolio","GET",token,function(id){
            for(var i = 0; i < id.length;i++){
                if(id[i].isDefault == true){
                  activeportfolioid = id[i].portfolioId;
                }
            }
            makerequestnopar("http://10.3.50.6/api/portfolio/profit?portfolioId="+activeportfolioid,"GET",token,function(obj){
                data = obj;
            });
    });
    }else{
        makerequestnopar("http://10.3.50.6/api/portfolio/profit?portfolioId="+activeportfolioid,"GET",token,function(obj){
                data = obj;
        }); 
    }
}
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