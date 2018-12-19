var token = getCookie("jwtToken");
var userId = makerequestnopar("http://10.3.50.6/api/user" , "GET" , token);
var portfolios = makerequestnopar("http://10.3.50.6/api/portfolio?soldOnly=true" , "GET" , token);
var i = 0; //declared this variable here because getting data from the blockchain takes time. And thus if you'd place it in a normal for loop the numbers wouldn't be correct.
var dataDatum; //variable for the default settings of the data graph.
var dataInput; //variable for the default settings of the data graph.
var cards = document.getElementById("cards");
var seemoreother = document.getElementById("see-more-other");
$('.makemodal').hide();
console.log(portfolios);
/*
array with all for sale portfolios from other users
*/
var arrayforsale;
/*
array with all for sale portfolios from current user
*/
var arrayforsaleown;
/*
begin and max for arrays to show, the function setcontentcards will change the value if see more is clicked
*/
var n_own = 0;
var max_own = 6;
var n_other = 0;
var max_other = 6;
var buyersCountf; //data voor contracts -> html
var pricef;
var profitf;
var portfolioid = [];
for(var i = 0; i < portfolios.length; i++) //I have to declare the portfolio id's here because else in the App function it will always give the last portfolio id.
{
  portfolioid[i] = portfolios[i].portfolioId;
}
console.log(portfolioid);

getcard();
console.log(portfolios);


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
  // else if (window.web3) {
  //   //App.web3Provider = window.web3.currentProvider;
  // }
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
  })
},


requestData: function(){


  if(portfolios.length ==  0){

    $('#exampleModalCenter').show();
    $('.makemodal').click();

    //default values.
    dataDatum = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    dataInput = [1, 5, 8, 9, 2, 8, 12, 25, 9, 18, 28, 15];

    var content;

    $('datacontent').append()
  }
  else {
    console.log('enter if statement');
  for(i; i < portfolios.length; i++){
  //  console.log(portfolios[i-1].address);

    //getting data from the blockchain.
    App.contracts.DataContract.at(portfolios[i].address).then(function(instance){
      DataContractInstance = instance;

      DataContractInstance.getBuyersCount.call().then(function(r){
        var buyersCountf = r;
        DataContractInstance.getPrice.call().then(function(r2){
        profitf = buyersCountf * r2;
        pricef = r2;

        var content = "<div class='col-md-3 col-sm-12 card'> <div class='card-body main-card'> <h4> Portfolio: </h4>" + i+ " <h6> Buyers : " + buyersCountf + "</h6> <h6> Sell Price: " + pricef + "</h6> <h6> Total Profit: " + profitf + "</h6></div></div>"; // grootte mss aanpassen?
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
     }
},


requestContractData : function(adrespara){

  App.contracts.DataContract.at(portfolios[i].address).then(function(instance){
    DataContractInstance = instance;

    DataContractInstance.getBuyersCount.call().then(function(r){
      buyersCountf = r;
      DataContractInstance.getPrice.call().then(function(r2){
      profitf = buyersCountf * r2;
      pricef = r2;
      })
    })
  })


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

  App.contracts.DataContract.at(adrespara).then(function(instance){
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

$(function() {
  $(window).load(function() {
    App.initWeb3();
  });
});

function getcard(){console.warn();
    var data = makerequestnopar("http://10.3.50.6/api/portfolio?soldOnly=true","GET",token);
    if(getstatus() == 401){
        openMLogin();
    }else{
        if(getstatus() == 400 || getstatus() == 500 || getstatus() == 501){
            alert("Something went wrong, please try again later");
        }else{
            arrayforsaleown = data;
            setcontentcards(arrayforsaleown,"see-more-own",true,max_own,n_own);
        }
    }
}

function setcontentcards(arrayport,seemoreid,boolown,max,n){
    var seemore = document.getElementById(seemoreid);
    var lengtharray = arrayport.length / 6;
    lengtharray = lengtharray.toFixed(0);
    if(lengtharray == 1 || lengtharray == 0){
        max = arrayport.length;
    }
    for(var i = n; i < max;i++){
            if(arrayport[i].address != null && arrayport[i].address != ""){
                    setcard(arrayport,i,boolown);
            }
    }
    lengtharray--;
    seemore.style.display = "none";
    seemore.innerHTML = "";
    if(lengtharray > 0){
            var a = document.createElement("a");
            a.setAttribute("href","#");
            a.setAttribute("style","margin:0 auto;");
            a.innerHTML = "See more";
            a.addEventListener("click",function(){
                n = max;
                if(lengtharray > 1){
                    max = max + 6;
                }else{
                    max = arrayport.length;
                }
                setcontentcards(arrayport,seemoreid,boolown,max,n);
            });
            seemore.style.display = "block";
            seemore.appendChild(a);
    }
}
/*
display card on screen
*/
function setcard(data,i,own){
               var card = document.createElement("div");
                card.setAttribute("class","col-md-3 col-sm-12 card");
                var img = document.createElement("img");
                img.setAttribute("alt","image of trade");
                img.setAttribute("class","img-fluid");
                img.setAttribute("height","50%");
                img.setAttribute("src",data[i].imgURL);
                card.appendChild(img);
                var cardbody = document.createElement("div");
                cardbody.setAttribute("class","card-body");
                if(own){
                    cardbody.innerHTML +=  "<h5 class='card-title'>"+data[i].name+"</h5>";
                }else{
                    cardbody.innerHTML +=  "<h5 class='card-title'>skoller</h5>";
                }

                // App.contracts.DataContract.at(portfolios[i].address).then(function(instance){
                //   DataContractInstance = instance;
                //
                //   DataContractInstance.getBuyersCount.call().then(function(r){
                //     buyersCountf = r;
                //     DataContractInstance.getPrice.call().then(function(r2){
                //     profitf = buyersCountf * r2;
                //     pricef = r2;
                //
                // })
                //   })
                // })


                cardbody.innerHTML +=  "<p class='card-text' id='portfoliodata'>Buyers count:"+ buyersCountf +"<br />Profit made: " + profitf +"</p>";
                cardbody.innerHTML += "<a href='datacenternew.php?portfolioId="+data[i].portfolioId+"' class='btn btn-primary'>Show data</a>";
                card.appendChild(cardbody);
                if(own){
                    cards.appendChild(card);
                }
}



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
            data: dataDatum
        },
        yAxis:{},
        series: [{
            name:'Data sold',
            type: 'bar',
            data: dataInput
        }]
    };

        myChart.setOption(option);
}
