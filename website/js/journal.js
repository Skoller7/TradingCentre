
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

$(function(){

	var dateTo = {
        portfolioId: "6",
amount: "200",
dateFrom: "20/02/2000",
dateTo: "15/05/2018"
	}
	//http://localhost:5000/api/auth/login
	console.log(dateTo);
    $.ajax({
    	"async": true,
  		"crossDomain": true,
  		url: 'http://10.3.50.6/api/order/get',
        type: 'GET',
        "headers": {
    		"Content-Type": "application/json",
            "Authorization": "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxNSIsInVuaXF1ZV9uYW1lIjoidGVzdHVzZXIiLCJuYmYiOjE1NDIyNzQyODIsImV4cCI6MTU0MjM2MDY4MiwiaWF0IjoxNTQyMjc0MjgyfQ.n30oCL2z9vkfTEeDKoTOVhgOOxihee3AcDNFe2OH9pMHGGDdl_PN_OXGOflkRP2GeJMW2UZprbNxhNQR-QNKVg"
  		},
        data: JSON.stringify(dateTo),
        dataType: 'json',
        success: function(data){
            console.log(data);
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
               
              var div = document.createElement("div");
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
            row.insertCell(7).appendChild(div);
            }
        },
        error: function(xhr, ajaxOptions, thrownError){
        	console.log(xhr.status);
        	console.log(thrownError);
            //console.log("error");
        }
    });
});

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