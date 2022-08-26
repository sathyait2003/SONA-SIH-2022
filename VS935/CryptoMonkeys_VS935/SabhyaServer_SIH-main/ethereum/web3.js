import Web3 from "web3";

let web3;
//we define web3 provider from meta mask
if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
    //In browser and metamak running
    web3 = new Web3(window.ethereum);//giving our version of web3
    window.ethereum.request({ method: "eth_requestAccounts" });
} else {
    //In next server or user doesn't have metamask
    console.log(process.env.INFURAENDPOINT_PROVIDER_URL);
    const provider = new Web3.providers.HttpProvider(process.env.INFURAENDPOINT_PROVIDER_URL);
    web3 = new Web3(provider);
}

export default web3;

// gas fee is 10^-8 eth