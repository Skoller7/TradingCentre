var HDWalletProvider = require("truffle-hdwallet-provider");

var MNEMONIC = "suffer amazing unknown anchor cotton focus alpha elbow summer shine limb permit";
/*
 * NB: since truffle-hdwallet-provider 0.0.5 you must wrap HDWallet providers in a
 * function when declaring them. Failure to do so will cause commands to hang. ex:
 * ```
 * mainnet: {
 *     provider: function() {
 *       return new HDWalletProvider(mnemonic, 'https://mainnet.infura.io/<infura-key>')
 *     },
 *     network_id: '1',
 *     gas: 4500000,
 *     gasPrice: 10000000000,
 *   },
 */
 module.exports = {
    networks: {
  development: {
    host: "localhost",
    port: 7545,
    network_id: "*" // Match any network id
  },
  ropsten: {
    provider: function() {
      return new HDWalletProvider(MNEMONIC, "https://ropsten.infura.io/v3/e1f507ef8d814286a1f1e2ea39cfe576")
    },
    network_id: '3',
    gas: 4000000      //make sure this gas allocation isn't over 4M, which is the max
    }
  }
};
