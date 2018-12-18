var token = getCookie("jwtToken");
var userId = makerequestnopar("http://10.3.50.6/api/user" , "GET" , token);

var portfolios = makerequestnopar("http://10.3.50.6/api/portfolio?soldOnly=true" , "GET" , token);
console.log(portfolios[0].portfolioId);
App = {
  web3Provider: null,
  contracts: {},

  initWeb3: async function(){

    if (window.ethereum) {
  App.web3Provider = window.ethereum;
  try {
    // Request account access
    await window.ethereum.enable();
  } catch (error) {
    // User denied account access...
    console.error("User denied account access")
    }
  }
  // Legacy dapp browsers...
  else if (window.web3) {
    App.web3Provider = window.web3.currentProvider;
  }
  // If no injected web3 instance is detected, fall back to Ganache
  else {
    App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
  }
  web3 = new Web3(App.web3Provider);
    return App.initContract1();
  },

initContract1: function(){
  $.getJSON('./Solidity/build/contracts/DataContractCreator.json').then(DataCreatorArtifact => {
    App.contracts.DataContractCreator = TruffleContract(DataCreatorArtifact);
    App.contracts.DataContractCreator.setProvider(App.web3Provider);
    return $.getJSON('./Solidity/build/contracts/DataContract.json')
  }).then(DataContractArtifact => {
    App.contracts.DataContract = TruffleContract(DataContractArtifact);
    App.contracts.DataContract.setProvider(App.web3Provider);
    console.log(App.contracts);
    App.requestData();
    // App.requestPrice();
    // App.requestBuyersCount();
    // App.calcProfit();
  })
},




// <div class="card" style="width: 18rem;">
//   <div class="card-body">
//     <h5 class="card-title">Card title</h5>
//     <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
//     <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//     <a href="#" class="card-link">Card link</a>
//     <a href="#" class="card-link">Another link</a>
//   </div>
// </div>

requestData: function(){

  for(var i = 0; i < portfolios.length; i++){
  //  console.log(portfolios[i-1].address);

    var buyersCountf;
    var pricef;
    var profitf;

    //getting data from the blockchain.
    App.contracts.DataContract.at(portfolios[i].address).then(function(instance){
      DataContractInstance = instance;

      DataContractInstance.getBuyersCount.call().then(function(r){
        var buyersCountf = r;
        DataContractInstance.getPrice.call().then(function(r2){
        profitf = buyersCountf * r2;
        pricef = r2;

        var content = "<div class='col-md-3 col-sm-12 card'> <div class='card-body main-card'> <h4> Portfolio: </h4> <h6> Buyers : " + buyersCountf + "</h6> <h6> Sell Price: " + pricef + "</h6> <h6> Total Profit: " + profitf + "</h6></div></div>"; // grootte mss aanpassen?
         $('.datacontent').append(content);


        })
      })
    })
    //converting data into html cards.
    // $('.datacontent').append("<div class='card-body'>");
    // $('.datacontent').append("<h4> Portfolio " + i + ": </h4>");
    // $('.datacontent').append("<h6> Buyers : " + buyersCountf + "</h6>");
    // $('.datacontent').append("<h6> Sell Price: " + pricef + "</h6>");
    // $('.datacontent').append("<h6> Total Profit: " + profitf + "</h6>");

  }

       $('.main-card').css("margin: 1%, float:left, display: inline-block");

},

requestBuyersCount: function(adrespara){

  App.contracts.DataContract.at(adrespara).then(function(instance){
    DataContractInstance = instance;

    DataContractInstance.getBuyersCount.call().then(function(result){
      $('#buyers').text(result);
      //$('buyersCount').text(result);
    }).catch(function(err){
      console.log(err);
    });
  });
},

calcProfit: function(){

  App.contracts.DataContract.at('0x15781269bc3516278309224ad450a88e1de01fad').then(function(instance){
    DataContractInstance = instance;

    DataContractInstance.getBuyersCount.call().then(function(r){
      var buyers = r;
      DataContractInstance.getPrice.call().then(function(r2){
        buyers *= r2;
        console.log(buyers);
        $('#dataProfit').text(buyers);
      })
    })
  })
},

requestPrice: function(){


  //retrieve the data from the database (which porfolio's he owns).

  App.contracts.DataContract.at('0x15781269bc3516278309224ad450a88e1de01fad').then(function(instance){
    return instance.getPrice.call()
  }).then(priceOfData => {
    console.log("Succesfully retrieved price of data :", priceOfData);
    $('#contractPrice').text(priceOfData);
    $('#contractPrice').val("Buy for " + priceOfData + " WEI");
  })
}
}

var token = getCookie("jwtToken");
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

$(function() {
  $(window).load(function() {
    App.initWeb3();
  });
});

$('.btn-contract-price').click(function(){
  console.log("price request clicked");
   App.requestPrice();
});

function addbarchart(){
    var myChart = echarts.init(document.getElementById('main'), 'light');

    var option = {
        title:{
            text: 'Data sold per month',
            left: 'left'
        },
        toolbox: {
            feature:{
                show: true,
                saveAsImage: {
                    title: 'Save As Image'
                }
            }
        },
        legend: {
            data:['Data sold']
        },
        xAxis: {
            data: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        },
        yAxis:{},
        series: [{
            name:'Data sold',
            type: 'bar',
            data: [1, 5, 8, 9, 2, 8, 12, 25, 9, 18, 28, 15]
        }]
    };

        myChart.setOption(option);
}
