var token = getCookie("jwtToken");
console.log(token);
var userId;
makerequestnopar("http://10.3.50.6/api/user" , "GET" , token, function(a){
  userId = a;
}, false);
var portfolios;
makerequestnopar("http://10.3.50.6/api/portfolio?soldOnly=true" , "GET" , token, function(a){
  portfolios = a
}, false);
var i = 0; //declared this variable here because getting data from the blockchain takes time. And thus if you'd place it in a normal for loop the numbers wouldn't be correct.
var dataDatum; //= ["January", "February", "March", "April", "May", "Jun", "Jule", "August", "September", "October", "November", "December"]; //variable for the default settings of the data graph.
var dataInput; // = ["1", "2", "3", "8", "12", "13", "18", "25", "30", "35", "40", "45"];//variable for the default settings of the data graph.
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

if(getCookie("jwtToken")){
for(var i = 0; i < portfolios.length; i++) //I have to declare the portfolio id's here because else in the App function it will always give the last portfolio id.
{
  portfolioid[i] = portfolios[i].portfolioId;
}
}
else {
  portfolios = [];
}

console.log(portfolioid);
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
  //  App.getcard();
  })
},


requestData: function(){

  if(portfolios.length ==  0 ){

    $('#exampleModalCenter').show();
    $('.makemodal').click();
    portfolioId = [1, 2 ,3];

    //default values.
    dataDatum = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    dataInput = [1, 5, 8, 9, 2, 8, 12, 25, 9, 18, 28, 15];

          for(var y = 0; y < 3; y++){
                   var card = document.createElement("div");
                    card.setAttribute("class","col-md-3 col-sm-12 card");
                    var img = document.createElement("img");
                    img.setAttribute("alt","image of trade");
                    img.setAttribute("class","img-fluid");
                    img.setAttribute("height","50%");
                    img.setAttribute("src", "https://www.tradingview.com/x/J3AJo0r1/");
                    card.appendChild(img);
                    var cardbody = document.createElement("div");
                    cardbody.setAttribute("class","card-body");

                      cardbody.innerHTML +=  "<h5 class='card-title'> Dummy data </h5>";
                      cardbody.innerHTML +=  "<p class='card-text' id='portfoliodata'>Buyers count: 23 <br />Profit made: 34500 </p>";
                      cardbody.innerHTML +=  "<a href='datacenternew.php?portfolioId="+33+"' class='btn btn-primary'>this is dummy data</a>";
                      card.appendChild(cardbody);
                        cards.appendChild(card);
                }

  }
  else {
    App.getcard();
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

//commented no really needed anymore.
// requestPrice: function(){
//
//
//   //retrieve the data from the database (which porfolio's he owns).
//
//   App.contracts.DataContract.at('0x15781269bc3516278309224ad450a88e1de01fad').then(function(instance){
//     return instance.getPrice.call()
//   }).then(priceOfData => {
//     console.log("Succesfully retrieved price of data :", priceOfData);
//     $('#contractPrice').text(priceOfData);
//     $('#contractPrice').val("Buy for " + priceOfData + " WEI");
//   })
// },

getcard: function(){console.warn();
    var data = makerequestnopar("http://10.3.50.6/api/portfolio?soldOnly=true","GET",token, function(data)
    {
      if(getstatus() == 401){
          openMLogin();
      }else{
          if(getstatus() == 400 || getstatus() == 500 || getstatus() == 501){
              alert("Something went wrong, please try again later");
          }else{
              arrayforsaleown = data;
              App.setcontentcards(arrayforsaleown,"see-more-own",true,max_own,n_own);
          }
      }
    }, true);
},



setcontentcards: function(arrayport,seemoreid,boolown,max,n){
    var seemore = document.getElementById(seemoreid);
    var lengtharray = arrayport.length / 6;
    lengtharray = lengtharray.toFixed(0);
    if(lengtharray == 1 || lengtharray == 0){
        max = arrayport.length;
    }
    for(var i = n; i < max;i++){
            if(arrayport[i].address != null && arrayport[i].address != ""){
                    App.setcard(arrayport,i,boolown);
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
                App.setcontentcards(arrayport,seemoreid,boolown,max,n);
            });
            seemore.style.display = "block";
            seemore.appendChild(a);
    }
},


setcard: function(data,i,own){
               var card = document.createElement("div");
                card.setAttribute("class","col-md-3 col-sm-12 card");
                var img = document.createElement("img");
                img.setAttribute("alt","image of trade");
                img.setAttribute("class","img-fluid");
                img.setAttribute("height","50%");
                img.setAttribute("src",data[i].imgURL);
                card.setAttribute("style", "float:left; margin: 1%; height: 350px;");
                card.appendChild(img);
                var cardbody = document.createElement("div");
                cardbody.setAttribute("class","card-body");
                if(own){
                    cardbody.innerHTML +=  "<h5 class='card-title'>"+data[i].name+"</h5>";
                }else{
                    cardbody.innerHTML +=  "<h5 class='card-title'>no name</h5>";
                }

                App.contracts.DataContract.at(portfolios[i].address).then(function(instance){
                  DataContractInstance = instance;
                  console.log("inside instance");
                  DataContractInstance.getBuyersCount.call().then(function(r){
                    buyersCountf = r;
                    DataContractInstance.getPrice.call().then(function(r2){
                    profitf = buyersCountf * r2;
                    pricef = r2;
                    console.log(buyersCountf, pricef, profitf);

                  cardbody.innerHTML +=  "<p class='card-text' id='portfoliodata'>Buyers count: "+ buyersCountf +"<br />Profit made: " + profitf +"</p>";
                  cardbody.innerHTML += "<a href='datacenternew.php?portfolioId="+data[i].portfolioId+"' class='btn btn-primary'>Show data</a>";
                  card.appendChild(cardbody);
                  document.getElementById("datacontent").appendChild(card);
                  //card.appendChild(card);



                  })
                })
              })
}







}

$(function() {
  $(window).load(function() {
    App.initWeb3();
  });
});


/*
dummy portfolio
*/

// function getcard(){console.warn();
//     var data = makerequestnopar("http://10.3.50.6/api/portfolio?soldOnly=true","GET",token);
//     if(getstatus() == 401){
//         openMLogin();
//     }else{
//         if(getstatus() == 400 || getstatus() == 500 || getstatus() == 501){
//             alert("Something went wrong, please try again later");
//         }else{
//             arrayforsaleown = data;
//             App.setcontentcards(arrayforsaleown,"see-more-own",true,max_own,n_own);
//         }
//     }
// }
//
//
//
// setcontentcards: function(arrayport,seemoreid,boolown,max,n){
//     var seemore = document.getElementById(seemoreid);
//     var lengtharray = arrayport.length / 6;
//     lengtharray = lengtharray.toFixed(0);
//     if(lengtharray == 1 || lengtharray == 0){
//         max = arrayport.length;
//     }
//     for(var i = n; i < max;i++){
//             if(arrayport[i].address != null && arrayport[i].address != ""){
//                     App.setcard(arrayport,i,boolown);
//             }
//     }
//     lengtharray--;
//     seemore.style.display = "none";
//     seemore.innerHTML = "";
//     if(lengtharray > 0){
//             var a = document.createElement("a");
//             a.setAttribute("href","#");
//             a.setAttribute("style","margin:0 auto;");
//             a.innerHTML = "See more";
//             a.addEventListener("click",function(){
//                 n = max;
//                 if(lengtharray > 1){
//                     max = max + 6;
//                 }else{
//                     max = arrayport.length;
//                 }
//                 App.setcontentcards(arrayport,seemoreid,boolown,max,n);
//             });
//             seemore.style.display = "block";
//             seemore.appendChild(a);
//     }
// },
//
//
// setcard: function(data,i,own){
//                var card = document.createElement("div");
//                 card.setAttribute("class","col-md-3 col-sm-12 card");
//                 var img = document.createElement("img");
//                 img.setAttribute("alt","image of trade");
//                 img.setAttribute("class","img-fluid");
//                 img.setAttribute("height","50%");
//                 img.setAttribute("src",data[i].imgURL);
//                 card.appendChild(img);
//                 var cardbody = document.createElement("div");
//                 cardbody.setAttribute("class","card-body");
//                 if(own){
//                     cardbody.innerHTML +=  "<h5 class='card-title'>"+data[i].name+"</h5>";
//                 }else{
//                     cardbody.innerHTML +=  "<h5 class='card-title'>skoller</h5>";
//                 }
//
//                 App.contracts.DataContract.at(portfolios[i].address).then(function(instance){
//                   DataContractInstance = instance;
//                   console.log("inside instance");
//                   DataContractInstance.getBuyersCount.call().then(function(r){
//                     buyersCountf = r;
//                     DataContractInstance.getPrice.call().then(function(r2){
//                     profitf = buyersCountf * r2;
//                     pricef = r2;
//                     console.log(buyersCountf, pricef, profitf);
//
//                   cardbody.innerHTML +=  "<p class='card-text' id='portfoliodata'>Buyers count: "+ buyersCountf +"<br />Profit made: " + profitf +"</p>";
//                   cardbody.innerHTML += "<a href='datacenternew.php?portfolioId="+data[i].portfolioId+"' class='btn btn-primary'>Show data</a>";
//                   card.appendChild(cardbody);
//
//                   })
//                 })
//               })
//                 if(own){
//                     cards.appendChild(card);
//                 }
// }
//



function addbarchart(){
  setTimeout(function() {
  option = {
      title: {
          text: 'Data sold per month'
      },
      tooltip: {},
      legend: {
          data:['Data sold']
      },
      xAxis: {
          data: dataDatum
      },
      yAxis: {},
      series: [{
          name: 'Data sold',
          type: 'bar',
          data: dataInput
      }]
  },

      myChart.setOption(option);
      }, 500);

      var myChart = echarts.init(document.getElementById('main'), 'light');

  }
