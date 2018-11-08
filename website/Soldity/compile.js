const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath); // removes buildPath

const dataContractPath = path.resolve(__dirname, 'contracts', 'DataContract.sol');
const source = fs.readFileSync(dataContractPath, 'utf8');
const output = solc.compile(source, 1).contracts;

fs.ensureDirSync(buildPath); //looks if the dir exists, else it creates it.

//adds the json files
for (let contract in output) {
  fs.outputJsonSync (
    path.resolve(buildPath, contract.replace(':', '') + '.json' ),
    output[contract]
  );
}
