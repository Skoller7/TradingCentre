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

    console.log("test");
    return App.requestPrice();
  })
}

requestPrice: function(){

  App.contracts.DataContract.at('0x15781269bc3516278309224ad450a88e1de01fad').then(function(instance){
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
  App.contracts.DataContract.at('0x15781269bc3516278309224ad450a88e1de01fad').then(instance => {
    instance.createBuyRequest({from: account, gas, value: 1000000 }).then((r) => {
      console.log("buy request completed");
      $('#buying-succes').text("You succesfully bought the data!");
    })
  })
})
}


}

$('.btn-contract-buy').click(function(){
  console.log("buy contract clicked");
  App.createBuyRequest();
});
