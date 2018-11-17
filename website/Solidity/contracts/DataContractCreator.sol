import './DataContract.sol';
pragma solidity ^0.4.17;

contract DataContractCreator {
    address[]public deployedDataContracts; //alle gemaakte adressen opslaan.

    //maakt persoonlijke contracten per gebruiker.
    function createDataContract(uint price) public {
        address newDataContract = new DataContract(price, msg.sender);
        deployedDataContracts.push(newDataContract);
    }

    function getDeployedContracts() public view returns(address[])  {
      return deployedDataContracts;
    }
}
