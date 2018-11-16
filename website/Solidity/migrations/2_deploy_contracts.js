var DataContractCreator = artifacts.require("DataContractCreator");

module.exports = function(deployer) {
  deployer.deploy(DataContractCreator);
};
//datacontract not deployed since creator will create it.

// //*
// Running migration: 1_initial_migration.js
//   Deploying Migrations...
//   ... 0x77b6fe50845a5517663f1754dcb2f68f78e5ef684199916b0b7c1128ee91e792
//   Migrations: 0xe5e9c8eaadfa8452b4a29ad80614833325a76f21
// Saving successful migration to network...
//   ... 0x448e747f83a1e0b1cc46bc16102bc0e321be38c15193644993668b63644b811c
// Saving artifacts...
// Running migration: 2_deploy_contracts.js
//   Deploying DataContractCreator...
//   ... 0x424f286d2afe98b7d5fe6adc80a4663b951df2c594667f81e5aea68fe51d07c7
//   DataContractCreator: 0xe08bd3d15b00490d4dbfed3fbe33c6a6c8ce5878
// Saving successful migration to network...
//   ... 0x52c0999e594715634284030acaa035eaac94f2b6298ad7d9479075b07d8479fe
// Saving artifacts...
// //
