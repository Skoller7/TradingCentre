var accounts_lengths;

var DataContractArtifact;
contracts.DataContractCreator.deployed().then(function(instance){
  DataContractArtifact = instance;
  return instance.getDeployedContracts();
}).then(function(result){
  document.getElementById('ethPrice').innerHTML = 'result.length';
});
