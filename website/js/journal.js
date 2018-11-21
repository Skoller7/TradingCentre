modalList.push("MCreateNote");
modalList.push("MCretePort");
/*        function delcard(id){
            document.getElementById(id).style.display = "block";
        }
        function addzero(number){
            if(number < 10){
                number = "0" + number;
            }
            return number;
        }
                function closeModal(item){
                    //https://stackoverflow.com/questions/19506672/how-to-check-if-bootstrap-modal-is-open-so-i-can-use-jquery-validate
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
menu sidebar notes
*/
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
call get all portfolios
*/
$(function(){
    var token = getCookie("token").substring(0,getCookie("token").indexOf("expires"));
    var data = makerequestnopar("http://10.3.50.6/api/portfolio","GET",token);
    var ul = document.getElementById("portfolios-ul");
    var sub_port = ["Delete portfolio","Update Portfolio","Create order","Delete order"];
    for(var i = 0; i < data.length;i++){
        var name = document.createTextNode(data[i].name);
        var li = document.createElement("LI");
        var div_sub = document.createElement("DIV");
        div_sub.setAttribute("id","sub-sub-port");
        var ul_sub = document.createElement("UL");
        ul_sub.setAttribute("id","ul-sub-port")
        var li_sub = document.createElement("LI");
        ul.appendChild(li);
        li.setAttribute("id",data[i].portfolioId);
        li.appendChild(name);
       for(var i= 0;i < sub_port.length;i++){
            li_sub.appendChild(sub_port[i]);
            li_sub.appendChild("id",sub_port[i]);
            ul_sub.appendChild(li_sub);
        }
        div_sub.appendChild(ul_sub);
        ul.appendChild(div_sub);
        
    }
});

/*
api call get portfolio on id
*/
var header = document.getElementById("header-content");
document.getElementById("portfolios-ul").addEventListener("click",function(e) {
if(e.target && e.target.nodeName == "LI" && !(isNaN(e.target.id))) {
        $(function(){
        var token = getCookie("token").substring(0,getCookie("token").indexOf("expires"));
        var data = makerequestnopar("http://10.3.50.6/api/portfolio?portfolioId="+ e.target.id,"GET",token);
        var ul = document.getElementById("portfolios-ul");
        var header = document.getElementById("header-portfolio-name");
        var desc = document.getElementById("portfolio-description");
        var goals = document.getElementById("portfolio-goals");        
        header.innerHTML = data.name;
        desc.innerHTML = data.description;
        goals.innerHTML = data.goal;
        });
}
});

/*
api call delete portfolio
*/

/*
api call get all notes with portfolioid
*/
$(function(){
    
    var token = getCookie("token").substring(0,getCookie("token").indexOf("expires"));
    var data = makerequestnopar("http://10.3.50.6/api/note?portfolioId=17","GET",token); 
   var notes = document.getElementById("notes-all");
        var li = document.createElement("div");
        li.setAttribute("class","notes-card");
        var content = document.createElement("div");
        content.setAttribute("class","notes-content");
        var content_del = document.createElement("i");
        var content_edit = document.createElement("i");
        content.appendChild(content_edit);
        content.appendChild(content_del);
        content_del.setAttribute("class","fa fa-trash");
        content_edit.setAttribute("class","fa fa-edit");
        notes.appendChild(li);
        li.appendChild(content);
    for(var i = 0; i < data.length;i++){
        var div = document.createElement("div");
        div.setAttribute("class","notes-card");
        var content = document.createElement("p");
        content.innerHTML = data[i].message;
        notes.appendChild(div);
        div.appendChild(content);
    }
});
/* 
notes
*/
var content = document.getElementById("MCreateNoteContent");
var errorcontent = document.getElementById("ErrorCreateNoteContent");
/*
show modal create note
*/
document.getElementById("BCreateNote").addEventListener("click",openMCreateNote);
function openMCreateNote(){
    content.focus();
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
   $(function(){
    var token = getCookie("token").substring(0,getCookie("token").indexOf("expires"));
    var valid =true;
    if(content.value == ""){
          errorcontent.innerHTML = "This field cannot be empty";
        valid = false;
    }
    if(valid){
        var json = {"PortfolioId": 17,"message":content.value};
        var data = makerequest(json,"http://10.3.50.6/api/note","PUT",token); 
        McreateNoteClose();
    }
}); 
}
/*

*/
var nameport = document.getElementById("MPortName");
var descport = document.getElementById("MPortDesc");
var goalport = document.getElementById("MPortGoal");
var errorname = document.getElementById("ErrorPortName");
var errordesc = document.getElementById("ErrorPortDesc");
var errorgoal = document.getElementById("ErrorPortGoal");


/*
show modal create portfolios
*/
document.getElementById("BCreatePort").addEventListener("click",openCreateport);
function openCreateport(){
     errorname.innerHTML = "";
    errordesc.innerHTML = "";
    errorgoal.innerHTML = "";
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
   $(function(){
    var token = getCookie("token").substring(0,getCookie("token").indexOf("expires"));
    if(valid){
        console.log(nameport.value);
        descport.value = "";
        goalport.value = "";
        var jsonfile = {"Name": nameport.value,"Description": descport.value,"Goal": goalport.value};
        var data = makerequest(jsonfile,"http://10.3.50.6/api/portfolio","PUT",token); 
        McreateportClose();
    }
}); 
}




$(function(){
var dateTo = {
        portfolioId: "17",
amount: "200",
dateFrom: "20/02/2000",
dateTo: "21/11/2018"
	};
var token = getCookie("token").substring(0,getCookie("token").indexOf("expires"));
var data = makerequest(dateTo,"http://10.3.50.6/api/order/get","GET",token);
for(var i = 0,rowCtr = data.length; i <= rowCtr; i++){
                var table_orders = document.getElementById("orders");
                var row = table_orders.insertRow(i);
                row.insertCell(0).innerHTML = data[i].exchange;
                row.insertCell(1).innerHTML = data[i].symbol;
                row.insertCell(2).innerHTML = data[i].currency;
                row.insertCell(3).innerHTML = data[i].side;
                row.insertCell(4).innerHTML = data[i].price;
                row.insertCell(5).innerHTML = data[i].orderQty;
                row.insertCell(6).innerHTML = data[i].timestamp;
               
            /*  var div = document.createElement("div");
               div.className = "order-type-div";
                var array = ["Head & Shoulders","Saab","Mercades","Audi"];
                //Create and append select list
                var type = document.createElement("select");
                type.className = "order-type";

                //Create and append the options
                for (var i = 0; i < array.length; i++) {
                    var option = document.createElement("option");
                    option.value = array[i];
                    option.text = array[i];
                    type.appendChild(option);
                }
               div.appendChild(type);
            row.insertCell(7).appendChild(div);*/
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
        var myChart = echarts.init(document.getElementById('main'),'light');

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