import web3 from "./web3";

import { abi } from "./build/Resource.json";

const resourceContract = (address) => {
    return new web3.eth.Contract(abi, address);
};

export default resourceContract;