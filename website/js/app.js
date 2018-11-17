//
// if (typeof web3 !== 'undefined'){
//   web3 = new Web3(web3.currentProvider);
// }
// else {
//   web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"))
// }
//
// window.onload = function getBalance(){
//   web3.eth.getBalance(web3.eth.accounts[0], function(error, result){
//     if(!error)
//     document.getElementById("myBalance").innerTest = web3.fromWei(result);
//     else {
//       console.error(error);
//     }
//   });
//
// }

// App = {
//   web3Provider: null,
//   contracts: {},
//
//   init: async function(){
//
//     return await App.initWeb3();
//   },
//
//   initWeb3: async function(){
//     if(window.ethereum){
//       console.log("web3found");
//       App.web3Provider = window.ethereum;
//       try{
//         await window.ethereum.enable();
//       } catch (error) {
//         console.error("User denied account acces")
//       }
//     }
//     else if(window.web3){
//       App.web3Provider = window.web3.currentProvider;
//     }
//     else {
//       App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
//     }
//     web3 = new Web3(App.web3Provider);
//
//     return App.initContract();
//   },
//
//   initContract: function(){
//     $.getJSON('../Solidity/build/contracts/DataContractCreator.json', function(data){
//
//       var DataCreatorArtifact = data;
//       App.contracts.DataContractCreator = TruffleContract(DataCreatorArtifact);
//
//       App.contracts.DataContractCreator.setProvider(App.web3Provider);
//     });
// },
//
// createContract: async function() {
//
//   var dataCreatorInstance;
//   var contractPrice = 100000;
//
//   web3.eth.getAccounts(function(error, accounts){
//     if(error){
//       console.log(error);
//     }
//     var account = accounts[0];
//
//     App.contracts.DataContractCreator.deployed().then(function(instance){
//       dataCreatorInstance = instance;
//
//       return dataCreatorInstance.createDataContract(contractPrice, {from: account});
//     }).then(function(result){
//       return App.alert();
//     }).catch(function(err){
//       console.log(err.message);
//     });
//   });
//
// }
//
// };
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


    return App.initContract();
  },

initContract: function(){

  console.log("test");
  $.getJSON('../Solidity/build/contracts/DataContractCreator.json', function(data){
    // Get the necessary contract artifact file and instantiate it with truffle-contract    var DataCreatorArtifact = data;
    console.log(data);
    App.contracts.DataContractCreator = TruffleContract(DataContractArtifact);

    //set the provider for our contracts
    App.contracts.DatacontractCreator.setProvider(App.web3Provider);
  });
},

getDeployedContractAdresses: function(){

  //vars hier
  App.contracts.DataContractCreator.deployed().then(function(instance){

  })

}


};

$(function() {
  $(window).load(function() {
    App.initWeb3();
  });
});

$('.btn-create').click(function(){
  console.log("button clicked");
   App.getDeployedContractAdresses();
});

//$(document).on('click', '.btn-create', App.createContract);
