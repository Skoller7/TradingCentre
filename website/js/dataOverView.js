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
    App.requestPrice();
    App.requestBuyersCount();
    App.calcProfit();
  })
},

requestBuyersCount: function(){

  App.contracts.DataContract.deployed().then(function(instance){
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

  App.contracts.DataContract.deployed().then(function(instance){
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

  App.contracts.DataContract.deployed().then(function(instance){
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

$('.btn-contract-price').click(function(){
  console.log("price request clicked");
   App.requestPrice();
});

function addbarchart() {
    myChart = echarts.init(document.getElementById('myChart'), light);
    
    barChart = {
        tooltip: {
            title: {
                left: 'center',
                text: 'Data sold'
            },
            toolbox: {
                feature: {
                    show: true,
                    saveAsImage: {
                        title: 'Save As Image'
                    }
                }
            },
            xAxis: {
                type: 'category',
                data: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
            },
            yAxis: {
                type: 'value',
                boundaryGap: [0, '50%']
            },
            series: {
                name: 'Data sold',
                type: 'bar',
                smooth: true,
                data: [1, 5, 2, 6, 8, 10, 20, 11, 0, 12, 23, 33, 26]
            }
        }
    },
        myChart.setOption(barChart);
};
