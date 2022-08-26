import web3 from "./web3";
import { abi } from "./build/ResourceHei.json";


const instance = new web3.eth.Contract(abi, '0xbB8f8A8245AFC2aCa018c497b5971fcea3f19829');


export default instance;


// Attempting to deploy contract from account:  0x33186EbE36Cb0cf30d15381831a554B313077152
// Contract deployed at address:  0xbB8f8A8245AFC2aCa018c497b5971fcea3f19829