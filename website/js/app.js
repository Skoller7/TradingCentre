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
  App.contracts.DataContractCreator.at('0xcbf9889d922f5c6096067e838dd7a52a9a52c91b').then(function(instance){
    DataContractCreatorInstance = instance;
    console.log(web3.eth.getBalance(account));
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
   //adress verandere hier bij nieuwe ganacha load 0xcbf9889d922f5c6096067e838dd7a52a9a52c91b
    App.contracts.DataContractCreator.at('0xcbf9889d922f5c6096067e838dd7a52a9a52c91b').then(function(instance){
    DataContractCreatorInstance = instance;
    console.log(web3.eth.getBalance(account)); //check balance?
    DataContractCreatorInstance.createDataContract(500, {from: account}).then((r) =>
 { console.log('deployment is succesfull');
  console.log(r.address);
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

},
requestPrice: function(){
  //hier zullen we de functie nog moeten meegeven van Het
  //contract dat getoond wordt, momenteel nog niet mogelijke
  //tot ik zelf accs kan aanmaken.

// /
  App.contracts.DataContract.at('0x1f5b97c3d86621cb452e33d526f4ab59e0738bb6').then(function(instance){
  DataContractInstance = instance;
//  DataContractinstance = DataContractI.at("0x8737a42306d1b59169a7fc54c286b596e5eafbcb");

  DataContractInstance.PriceOfData.call().then(function(result){
    console.log(result);
    $('#contractPrice').text(result);
  }).catch(function(err){
    console.log(err);
  });

});

},
//can comment away from here ( written on train not tested)

// requestBuyersCount: function(){
//
//   App.contracts.DataContract.at('').then(function(instance){
//     DataContractInstance = instance;
//
//     DataContractInstance.buyersCount.call().then(function(){
//       console.log(result);
//       //$('buyersCount').text(result);
//     }).catch(function(err){
//       console.log(err);
//     });
//   });
// },
//
//   isUserBacker: function(){
//
//     App.contracts.DataContract.at('').then(function(instance){
//       DataContractInstance = instance;
//
//       DataContractInstance.backers.call(msg.sender).then(function(r){
//         if(r === true)
//           console.log('Person is a backeer');
//         else console.log('Person is not a backer');
//       }).catch(function(err){
//         console.log(err);
//       });
//     });
//   },
//
//   createBuyRequest: function(){
//
//     App.contracts.Datacontract.at('').then(function(instance){
//       DataContractInstance = instance;
//
//       //hier price of data functie oproepen - klopt de requestbuy()? or gebeurt dit in send?
//       DataContractInstance.createBuyRequest.send(requestPrice()).then(function(r){
//         console.log(r);
//       }).catch(function(err){
//         console.log(err);
//       });
//     });
//   },
//
//   changeDataContractPrice: function(){
//
//     App.contracts.Datacontract.at('').then(function(instance){
//       DataContractInstance = instance;
//
//       DataContractInstance.changePrice(1500).send().then(function(r){
//         console.log(r);
//       }).catch(function(err){
//         console.log(err);
//       });
//     });
//   }

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

$('btn-contract-buyers').click(function(){
  console.log("amount of buyers clicked");
  App.requestBuyersCount();
});

$('btn-contract-isBacker').click(function(){
  console.log("is user a backer? clicked");
  App.isUserBacker();
});

$('btn-contract-buy').click(function(){
  console.log("buy contract clicked");
  App.createBuyRequest();

});



//$(document).on('click', '.btn-create', App.createContract);
