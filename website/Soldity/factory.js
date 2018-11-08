import web3 from './web3';
import DataContractCreator from './build/DataContractCreator.json';


const instance = new web3.eth.Contract(
  JSON.parse(DataContractCreator.interface),
  '0xC575b083e570E54f68fe6aDbAEB24a604b5ADe88'
);

export default instance;
