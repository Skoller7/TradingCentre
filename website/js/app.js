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

//retrieving the contracts from the json file.
initContract1: function(){
  $.getJSON('./Solidity/build/contracts/DataContractCreator.json').then(DataCreatorArtifact => {
    App.contracts.DataContractCreator = TruffleContract(DataCreatorArtifact);
    App.contracts.DataContractCreator.setProvider(App.web3Provider);
    return $.getJSON('./Solidity/build/contracts/DataContract.json')
  }).then(DataContractArtifact => {
    App.contracts.DataContract = TruffleContract(DataContractArtifact);
    App.contracts.DataContract.setProvider(App.web3Provider);
    console.log(App.getDeployedContractAdresses())
    console.log(App.contracts);

    console.log("test");
    return App.requestPrice();
  })


},
createBuyRequest: function(){

  //retrieving the user accounts.
  web3.eth.getAccounts(function(error, accounts) {
  if(error) {
    console.log(error);
  }
  //setting a default variable for the gas payment ( cost to make a transaction)
  var gas = 2000000;
  //We automatically select the first account.
  var account = accounts[0];
  //In our app we take the contract that we created in initContract1, specifiy its adres on the blockchain and then put it in an instance
  //then we call a function and send the gas, account and order value with it.
  App.contracts.DataContract.at('0x15781269bc3516278309224ad450a88e1de01fad').then(instance => {
    instance.createBuyRequest({from: account, gas, value: 1000000 }).then((r) => {
      console.log("buy request completed");
      $('#buying-succes').text("You succesfully bought the data!");
    })
  })
})
},

getDeployedContractAdresses: function(){
  App.contracts.DataContractCreator.at('0xcbf9889d922f5c6096067e838dd7a52a9a52c91b').then(instance => {
    return instance.getDeployedContracts.call()
  }).then(deployedContracts => {
    console.log("requested amount of deployed contracts:", deployedContracts.length)
    $('#amountOfContracts').text(deployedContracts.length);
  })
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
   //adress verandere hier bij nieuwe ganacha load 0x6fea428ed5b5b4804572a0df7766b71f68a44da8
    App.contracts.DataContractCreator.at('0xcbf9889d922f5c6096067e838dd7a52a9a52c91b').then(instance =>{
          console.log("voorbij de instance");
    DataContractCreatorInstance = instance;
    DataContractCreatorInstance.createDataContract(1500, {from: account, gas}).then((r) =>
     { console.log('deployment is succesfull');
      $('#contractSucces').text('succes');
      console.log(App.requestAdresses());
     });
  //  DataContractInstance.createDataContract(500, account);
  });
}
});
},
requestPrice: function(){

  App.contracts.DataContract.at('0x15781269bc3516278309224ad450a88e1de01fad').then(function(instance){
    return instance.getPrice.call()
  }).then(priceOfData => {
    console.log("Succesfully retrieved price of data :", priceOfData);
    $('#contractPrice').text(priceOfData);
    $('#contractPrice').val("Buy for " + priceOfData + " WEI");
  })
},
requestAdresses: function(){

  App.contracts.DataContractCreator.at('0xcbf9889d922f5c6096067e838dd7a52a9a52c91b').then(function(instance){
    DataContractCreatorInstance = instance;
    console.log(DataContractCreatorInstance);

    DataContractCreatorInstance.getDeployedContracts.call().then(function(result){
      console.log(result);
      $('#contract-addresses').text(result);
        return result;
    }).catch(function(err){
      console.log(err);
    });
  });

},

requestBuyersCount: function(){

  App.contracts.DataContract.at('0x15781269bc3516278309224ad450a88e1de01fad').then(function(instance){
    DataContractInstance = instance;

    DataContractInstance.getBuyersCount.call().then(function(result){
      $('#buyers').text(result);
      //$('buyersCount').text(result);
    }).catch(function(err){
      console.log(err);
    });
  });
},
//
  isUserBacker: function(){

    App.contracts.DataContract.at('0x15781269bc3516278309224ad450a88e1de01fad').then(function(instance){
      DataContractInstance = instance;

        web3.eth.getAccounts(function(error, accounts) {
          var account = accounts[0];
      DataContractInstance.backers.call(account).then(function(r){
        if(r === true)
          console.log('Person is a backer');
        else $('#isBacker').text('User is not a backer');
      }).catch(function(err){
        console.log(err);
      });
    });
  })
  },
//
  changeDataContractPrice: function(){

    App.contracts.Datacontract.at('0x15781269bc3516278309224ad450a88e1de01fad').then(function(instance){
      DataContractInstance = instance;

      DataContractInstance.changePrice(1500).send().then(function(r){
        console.log(r);
      }).catch(function(err){
        console.log(err);
      });
    });
  }

  //tot hier


}
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

$('.btn-contract-price').click(function(){
  console.log("price request clicked");
   App.requestPrice();
});

$('.btn-contract-buyers').click(function(){
  console.log("amount of buyers clicked");
  App.requestBuyersCount();
});

$('.btn-contract-isBacker').click(function(){
  console.log("is user a backer? clicked");
  App.isUserBacker();
});

$('.btn-contract-buy').click(function(){
  console.log("buy contract clicked");
  App.createBuyRequest();
});

$('.btn-contract-addresses').click(function(){
  console.log('requesting adresses....');
  App.requestAdresses();
})




//$(document).on('click', '.btn-create', App.createContract);
