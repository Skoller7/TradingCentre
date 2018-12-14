var urlParams = new URLSearchParams(window.location.search);
var aportfolioid = urlParams.get('portfolioId');
var token = getCookie("jwtToken");
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
      App.loadPage();
    })


  },

loadPage : function(){

  var data = makerequestnopar("http://10.3.50.6/api/portfolio?portfolioID=" + aportfolioid, "GET", token);
  name = data.name;
  description = data.description;
  goal = data.goal;
  imgurl = data.imgURL;

  $('#PortfolioDescription').text(description);

  var orderdata = makerequestnopar("http://10.3.50.6/api/order/get?portfolioId=" + aportfolioid, "GET", token);

  for(var i = 0; i < orderdata.length; i++){
    if(i == 0){
    $('.ordersHier').append("<option selected>orderdata[i]</option>"); }
    else {
    $('.ordersHier').append("<option value=i>orderdata[i]</option>"); }
  }
    console.log(orderdata);

},


  createNewContractCheck : function(){
      //orders & description checken.
      // als hij er 5 heeft mag hij het portfolio verkopen.
    App.createNewContract();
  },


  createNewContract : function(){
    console.log('creating new contract. . .');
    //checking the user accounts.
    web3.eth.getAccounts(function(error, accounts) {
    if (error) {
      console.log("bug is bij de if error");
      console.log(error);
    }
    else {
     var gas = 1000000;
     var account = accounts[0];
     var addres;
     //adress verandere hier bij nieuwe ganacha load 0x6fea428ed5b5b4804572a0df7766b71f68a44da8
      App.contracts.DataContractCreator.at('0xcbf9889d922f5c6096067e838dd7a52a9a52c91b').then(instance =>{
            console.log("voorbij de instance");
      DataContractCreatorInstance = instance;
      DataContractCreatorInstance.createDataContract(1500, {from: account, gas}).then((r) =>
       { console.log('deployment is succesfull');
        $('#contractSucces').text('succes');
      DataContractCreatorInstance.getDeployedContracts.call().then((r) => {
        var data = makerequestnopar("http://10.3.50.6/api/portfolio?portfolioID=" + aportfolioid, "GET", token);
        name = data.name;
        description = data.description;
        goal = data.goal;
        imgurl = data.imgURL;
        console.log(name, goal, description, imgurl);

        addres = r[r.length-1];


        console.log(r);
        console.log(addres);
        $.ajax({
          "async": true,
            "crossDomain": true,
            url: "http://10.3.50.6/api/portfolio",
          type: "POST",
          "headers": {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + token
            },
            "data":{
              "PortfolioId": aportfolioid,
              "Name": name,
              "Description": description,
              "Goal": goal,
              "ImgURL": imgurl,
              "IsForSale": true,
              "Address": addres
            },
          dataType: 'json',
          success: function(data){
            console.log(data);
              },
          error: function(xhr, ajaxOptions, thrownError){
              console.log(xhr.status);
              console.log(thrownError);
              console.log(xhr);
          }
      });

    })


       });
    //  DataContractInstance.createDataContract(500, account);
    });
  }
  });
}
}


function getPortfolio(){
  $.ajax({
    "async": true,
      "crossDomain": true,
      url: "http://10.3.50.6/api/portfolio?&portfolioId=" + aportfolioid,
    type: "POST",
    "headers": {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
    dataType: 'json',
    success: function(data){
      console.log(data);
        },
    error: function(xhr, ajaxOptions, thrownError){
        console.log(xhr.status);
        console.log(thrownError);
        console.log(xhr);
    }
});


}


  $(function() {
    $(window).load(function() {
      App.initWeb3();
    });
  });

  $('.btn-create-contract-request').click(function(){
     App.createNewContractCheck();
  });
