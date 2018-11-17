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


    return App.initContract();
  },

initContract: function(){

  console.log("test");
  $.getJSON('./Solidity/build/contracts/DataContractCreator.json', function(data){
    // Get the necessary contract artifact file and instantiate it with truffle-contract
    var DataCreatorArtifact = data;
    console.log(data);
    App.contracts.DataContractCreator = TruffleContract(DataCreatorArtifact);

    //set the provider for our contracts
    App.contracts.DataContractCreator.setProvider(App.web3Provider);

    return App.getDeployedContractAdresses();
  });
},

getDeployedContractAdresses: function(){

  //vars hier
  App.contracts.DataContractCreator.deployed().then(function(instance){
    DataContractCreatorInstance = instance;

    DataContractCreatorInstance.getDeployedContracts.call().then((r) => {
   $('#amountOfContracts').text(r.length);
 });

})

}

// createNewContract : function(){
//
//   //checking the user accounts.
//   web3.eth.getAccounts(function(error, accounts) {
//   if (error) {
//     console.log(error);
//   }
//
//   var accounts = accounts[1];
//
//   App.contracts.DataContractCreator.deployed().then(function(instance){
//   DataContractCreatorInstance = instance;
//
//   return DataContractCreatorInstance.createDataContract(500, {from: account});
// }).then(function(result){
//   console.log("Deployment succesfull");
// }).catch(function(err){
//   console.log(err.message);
//   });
// });
// }


};

$(function() {
  $(window).load(function() {
    App.initWeb3();
  });
});

$('.btn-create-contract-request').click(function(){
  console.log("button clicked");
   App.getDeployedContractAdresses();
});

$('.btn-create-contract').click(function(){
  console.log("button clicked");
   App.getDeployedContractAdresses();
});



//$(document).on('click', '.btn-create', App.createContract);
