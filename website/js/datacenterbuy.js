var token = getCookie("jwtToken");
var urlParams = new URLSearchParams(window.location.search);
var aportfolioid = urlParams.get('portfolioId');
var cportfolio;
makerequestnopar("http://10.3.50.6/api/portfolio?portfolioId="+ aportfolioid , "GET" , token, function(a){
  cportfolio = a;
}, false); //retrieving the data of this portfolio.
console.log(cportfolio);
var caddress = cportfolio.address; //placing the adres in a variable.
console.log(caddress);

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
    App.contracts.DataContract.setProvider(App.web3Provider);;
    console.log(App.contracts);
    console.log("test");
    return App.requestPrice();
  })
},

requestPrice: function(){
  App.contracts.DataContract.at(caddress).then(function(instance){
    return instance.getPrice.call()
  }).then(priceOfData => {
    console.log("Succesfully retrieved price of data :", priceOfData);
    $('#contractPrice').text(priceOfData);
    $('#contractPrice').val("Buy for " + priceOfData + " WEI");

  })
},


createBuyRequest: function(){

  web3.eth.getAccounts(function(error, accounts) {
  if(error) {
    console.log(error);
  }
  var gas = 2000000;
  var account = accounts[0];
  App.contracts.DataContract.at(caddress).then(instance => {
    instance.createBuyRequest({from: account, gas, value: 1000000 }).then((r) => {
      console.log("buy request completed");
      $('#buying-succes').text("You succesfully bought the data!");

      makerequestnopar("http://10.3.50.6/api/purchase?portfolioId=" + aportfolioid , "POST" , token);

    //   $.ajax({
    //     "async": true,
    //       "crossDomain": true,
    //       url: "http://10.3.50.6/api/purchase?portfolioId=" + aportfolioid,
    //     type: "POST",
    //     "headers": {
    //         "Content-Type": "application/json",
    //         "Authorization": "Bearer " + token
    //       },
    //     dataType: 'json',
    //     success: function(data){
    //       console.log(data);
    //         },
    //     error: function(xhr, ajaxOptions, thrownError){
    //         console.log(xhr.status);
    //         console.log(thrownError);
    //         console.log(xhr);
    //     }
    // });
    });
  });
});
}


}

$(function() {
  $(window).load(function() {
    App.initWeb3();
  });
});

$('.btn-contract-buy').click(function(){
  console.log("buy contract clicked");
  App.createBuyRequest();
});
