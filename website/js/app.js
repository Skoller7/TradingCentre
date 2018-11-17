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

  $.getJSON('./Solidity/build/contracts/DataContractCreator.json', function(data){
    // Get the necessary contract artifact file and instantiate it with truffle-contract
    var DataCreatorArtifact = data;
    App.contracts.DataContractCreator = TruffleContract(DataCreatorArtifact);

    //set the provider for our contracts
    App.contracts.DataContractCreator.setProvider(App.web3Provider);


    //hier nieuwe functies aan chainen als we willen dat die worden geladen bij het begin
    //van de pagina.
    return App.getDeployedContractAdresses();
  });
},

getDeployedContractAdresses: function(){

  //vars hier
  App.contracts.DataContractCreator.deployed().then(function(instance){
    DataContractCreatorInstance = instance;

    DataContractCreatorInstance.getDeployedContracts.call().then((r) => {
   $('#amountOfContracts').text(r.length);
   console.log("requested amount of deployed contracts");
 });

});

},

createNewContract : function(){

  //checking the user accounts.
  web3.eth.getAccounts(function(error, accounts) {
  if (error) {
    console.log(error);
  }

   var account = accounts[0];

    App.contracts.DataContractCreator.deployed().then(function(instance){
    DataContractCreatorInstance = instance;
    console.log(web3.eth.getBalance(account)); //check balance?
    DataContractCreatorInstance.createDataContract(500, {from: account}).then((r) =>
 { console.log('deployment is succesfull');
});

  //  DataContractInstance.createDataContract(500, account);

});


  //mogelijke oplossing = werken via .new() maar dan kan ik de gemaakte contracts
  // niet bijhouden of ?
  // misschien eens rondvragen of een contract functie wel degelijk een nieuw contract kan
  // aanmaken in truffle.js
  // - contract deployen op rinkby en via daar altijd verder werken?
  // makkelijker om te testen?
  // youtube guide opzoeken?

  //dit weg commenten en alles werkt
//   App.contracts.DataContractCreator.deployed().then(function(instance){
//   DataContractCreatorInstance = instance;
//   return DataContractCreatorInstance.createDataContract(5000, {from: account});
// }).then(function(result){
//   console.log("Deployment succesfull");
//   $('#contractSucces').text("a succes!");
// }).catch(function(err){
//   console.log(err.message);
//   });
});
}


};

$(function() {
  $(window).load(function() {
    App.initWeb3();
  });
});

$('.btn-create-contract-request').click(function(){
   App.getDeployedContractAdresses();
});

$('.btn-create-contract').click(function(){
   App.createNewContract();
});



//$(document).on('click', '.btn-create', App.createContract);
