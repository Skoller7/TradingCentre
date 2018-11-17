var DataContractCreator = artifacts.require("DataContractCreator");

module.exports = function(deployer){
  deployer.deploy(DataContractCreator);
}

// module.exports = function(deployer) {
//   deployer.deploy(DataContractCreator).then(function(){
//         return deployer.deploy(DataContractcreator, Factory.address)
// });
// };

// Is it also possible to let another contract deploy a new other contract
// So it can store the created contracts in an array
