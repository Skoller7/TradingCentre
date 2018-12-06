var token = getCookie("jwtToken");
var activeportfolioid;
var port = [];
var activemodalportdel = 0;
var content = document.getElementById("MCreateNoteContent");
var errorcontent = document.getElementById("ErrorCreateNoteContent");
var nameport = document.getElementById("MPortName");
var descport = document.getElementById("MPortDesc");
var goalport = document.getElementById("MPortGoal");
var errorname = document.getElementById("ErrorPortName");
var errordesc = document.getElementById("ErrorPortDesc");
var errorgoal = document.getElementById("ErrorPortGoal");
var desc = document.getElementById("portfolio-description");
var goals = document.getElementById("portfolio-goals");   
 var table_orders = document.getElementById("orders");
var head_orders = document.getElementById("orders-port");
var info = document.getElementById("info-content");
var all = document.getElementById("all-orders-table");
var col = ["Exchange","Symbol","Side","OrderQty","Currency","Price","Timestamp"];
var div = document.getElementById("col-order");
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
modalList.push("MCreateNote");
modalList.push("MCreatePort");
modalList.push("Maddorder");
if(token){
getport();
}
function addzero(number){
            if(number < 10){
                number = "0" + number;
            }
            return number;
}
/*
        function delcard(id){
            document.getElementById(id).style.display = "block";
        }
        function addzero(number){
            if(number < 10){
                number = "0" + number;
            }
            return number;
        }
                function closeModal(item){
                    if ($(item).is(':visible')){
                        $(item).modal('toggle');	
                    }
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
            
            }else{
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
        }*/

/*
change date and amount from orders
*/
fromdate.addEventListener("change",getorders);
todate.addEventListener("change",getorders);
amount.addEventListener("change",getorders);

/*
menu sidebar notes

document.getElementById("notes-sub").style.display = "none";
document.getElementById("notes").addEventListener("click",openSubNotes);
function openSubNotes(){
     var sub = document.getElementById("notes-sub");
    if(sub.style.display == "block"){
        document.getElementById("notes-arrow").className = "fa fa-angle-right";
        sub.style.display = "none";
    }else{
        document.getElementById("notes-arrow").className = "fa fa-angle-down";
        document.getElementById("notes-sub").style.display = "block";
    }
}
*/
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
                    setOrders(arraysort,j);
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
function getport(){
        port = [];
        var data = makerequestnopar("http://10.3.50.6/api/portfolio","GET",token);
        var ul = document.getElementById("portfolios-ul");
        ul.innerHTML = "";
        for(var i = 0; i < data.length;i++){
            var name = document.createTextNode(data[i].name);
            var li = document.createElement("LI");
            ul.appendChild(li);
            li.setAttribute("id",data[i].portfolioId + "port");
            li.appendChild(name);
            if(data[i].name == "default"){
                setdefaultport(data[i].portfolioId);
                 activeportfolioid = data[i].portfolioId;
            }
            var sub = document.getElementById(data[i].portfolioId + "port");
            port.push(sub.getAttribute("id"));
        }
            ppd();
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
    getordersadd();
}
/*
close modal add order to portfolio
*/
document.getElementById("btnclose").addEventListener("click",closeaddorder);
document.getElementById("addorderBCrosse").addEventListener("click",closeaddorder);
function closeaddorder(){
	$('#Maddorder').modal('toggle');	
}

/*
api call add order to portfolio
*/
document.getElementById("btnaddorder").addEventListener("click",addorderstoportfolio);
function addorderstoportfolio(){
    arrayaddorders = [];
    var ids = document.getElementsByName("addordercheck");
    for(var i = 0;i <ids.length;i++){
        if(ids[i].checked){
            arrayaddorders.push(ids[i].value);
        }
    }
    for(var j = 0; j < arrayaddorders.length; j++){
        var json = {
            "OrderId": arrayaddorders[j],
            "PortfolioId": activeportfolioid
        };
        var data = makerequest(json,"http://10.3.50.6/api/portfolio/order","PUT",token);
    }
    getorders();
    closeaddorder();
}

var delorders = document.getElementById("all-orders-table").addEventListener("click",function (e){
    if(e.target.nodeName == "I") {
        makerequestnopar("http://10.3.50.6/api/portfolio/order?orderId="+e.target.id+"&portfolioId="+activeportfolioid,"DELETE",token);
        getorders(); 
    }
});

/*
get ppd portfolio
*/
function ppd(){
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
}

/*
api call get portfolio on id when clicked in submenu portfolios
*/
var header = document.getElementById("header-content");
document.getElementById("portfolios-ul").addEventListener("click",function(e) {
if(e.target && e.target.nodeName == "LI" && !(isNaN(e.target.id.substring(0,e.target.id.indexOf("port"))))) {
        var data = makerequestnopar("http://10.3.50.6/api/portfolio?portfolioId="+ e.target.id.substring(0,e.target.id.indexOf("port")),"GET",token);
        setupactiveport(data,e.target.id);
        activeportfolioid = e.target.id.substring(0,e.target.id.indexOf("port"));
        getnotes();
        getorders();
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
        
        var ul = document.getElementById("portfolios-ul");   
        var footer = document.getElementById("footer-port");
        footer.innerHTML = ' ';
        desc.innerHTML = data.description;
        goals.innerHTML = data.goal;
        if(data.name != "default"){
            var idel = document.createElement("i");
            var iup = document.createElement("i");
            idel.setAttribute("id","header-port-del");
            iup.setAttribute("id","header-port-update");
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
if(e.target && e.target.nodeName == "I") {
    if(e.target.id == "header-port-del"){
        var data = makerequestnopar("http://10.3.50.6/api/portfolio?portfolioId=" + activeportfolioid,"DELETE",token); 
        getport();
    }else{
        activemodalportdel = 1;
        nameport.value = document.getElementById(activeportfolioid + "port").innerHTML;
        descport.value = desc.innerHTML;
        goalport.value = goals.innerHTML;
        openCreateport();
    }
}
});

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
        notes.appendChild(li);
        li.appendChild(content);
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
            $.ajax({
                "async": true,
                "crossDomain": true,
                url: "http://localhost:62382/api/note",
                type: "POST",
                "headers": {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
                data:{"NoteId": e.target.id,"Message": "Hello world2d"},
                dataType: 'json',
                success:function(data){},
                error: function(xhr, ajaxOptions, thrownError){
                    console.log(xhr.status);
                    console.log(thrownError);
                    console.log(xhr);
                }
            });   
      }
}
});

/* 
notes
*/
/*
show modal create note
*/
document.getElementById("BCreateNote").addEventListener("click",openMCreateNote);
function openMCreateNote(){
    document.getElementById("MCreateNoteBCreateNote").innerHTML = "Create note";
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
api call create note
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
        var json = {"PortfolioId": activeportfolioid ,"message":content.value};
        var data = makerequest(json,"http://10.3.50.6/api/note","PUT",token); 
        McreateNoteClose();
        getnotes();
    }
}

/*
show modal create portfolios
*/
document.getElementById("BCreatePort").addEventListener("click",openCreateport);
function openCreateport(){
     errorname.innerHTML = "";
    errordesc.innerHTML = "";
    errorgoal.innerHTML = "";
    if(activemodalportdel == 0){
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
close modal create portfolios
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
	$('#MCreatePort').modal('toggle');	
}

/*
api call create portfolio
*/
document.getElementById("MCreatePortBCreatePort").addEventListener("click",createport);
function createport(){
     var valid = true;
    errorname.innerHTML = "";
    errordesc.innerHTML = "";
    errorgoal.innerHTML = "";
    if(name.value == ""){
        errorname.innerHTML = "This field cannot be empty";
        valid = false;
    }
    console.log(nameport.value);
    if(activemodalportdel == 0){
        if(valid){
            var jsonfile = {"Name": nameport.value,"Description": descport.value,"Goal": goalport.value};
            console.log(jsonfile);
            makerequest(jsonfile,"http://10.3.50.6/api/portfolio","PUT",token); 
        }
   }else{
        if(valid){
        var jsonfile = {"PortfolioId":activeportfolioid,"Name": nameport.value,"Description": descport.value,"Goal": goalport.value};
            console.log(jsonfile);
        makerequest(jsonfile,"http://10.3.50.6/api/portfolio","POST",token); 
        }
        activemodalportdel = 0;
    }
    McreateportClose();
    getport();
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
  		url: "http://10.3.50.6/api/order/get?dateFrom=01/01/1970",
        type: "GET",
        "headers": {
    		"Content-Type": "application/json",
            "Authorization": "Bearer " + token
  		},
        dataType: 'json',
        success: function(data){
            if(data.length > 0){
                    for(var i = 0;i<data.length; i++){
                            setOrders(data,i);
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
api call get orders
*/
   /* for(var i=0;i < col.length;i++){
        var option = document.createElement("input");
        var span = document.createElement("label");
        option.setAttribute("type","checkbox");
        option.setAttribute("id",col[i]);
        option.setAttribute("checked","true");
        span.setAttribute("for",col[i]);
        span.style.cursor = "pointer";
        span.className = "dropdown-item";
        span.appendChild(option);
        span.innerHTML += col[i];
        div.appendChild(span);
    }
document.getElementById("col-order").style.display = "none";
document.getElementById("col-sel").addEventListener("click",openColOrder);
function openColOrder(){
     var sub = document.getElementById("col-order");
    if(sub.style.display == "block"){
        document.getElementById("col-arrow").className = "fa fa-angle-right";
        sub.style.display = "none";
    }else{
        document.getElementById("col-arrow").className = "fa fa-angle-down";
        document.getElementById("col-order").style.display = "block";
    }
    getorders();
}
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
            arraysort = data;
            if(data.length > 0){
                    for(var i = 0;i<data.length; i++){
                            setOrders(data,i);
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
function setOrders(data,i){
        var tr = document.createElement("tr");;
        if(data[i].side == "Buy"){
            color = "green";
        }else{
           color = "red";
        }        
        tr.innerHTML += "<td class='ex'>"+data[i].exchange+"</td>";
        tr.innerHTML += "<td class='si' style='color:"+color+"'>"+data[i].side+"</td>";
        tr.innerHTML += "<td class='pr'>"+data[i].price+"("+data[i].currency+")</td>";
        tr.innerHTML += "<td class='qt'>"+data[i].orderQty+"</td>";
        tr.innerHTML += "<td class='sy'>"+data[i].symbol+"</td>";
        var date = data[i].timestamp;
        tr.innerHTML += "<td class='ti'>"+date.substr(0,10)+" " + date.substr(11,5)+"</td>";
        if(all.className == 'all'){
            tr.innerHTML += "<td class='delorder'><i class='fa fa-trash' id="+data[i].orderId+"></i></td>";
        }else{
            
            tr.innerHTML += "<td class='addorder'><input type='checkbox' name='addordercheck' id="+data[i].orderId+" value="+data[i].orderId+"></td>"
        }
        all.appendChild(tr);
}
/* resize the chart on resize window */
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