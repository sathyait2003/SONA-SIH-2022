const dotenv = require("dotenv");
const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const { abi, evm } = require("./build/ResourceHei.json");

dotenv.config({ path: path.resolve(__dirname, "../", ".env") });

const mnemonicPhrase = process.env.MNEMONIC_PHRASE;
const providerUrl = process.env.INFURAENDPOINT_PROVIDER_URL;
console.log(providerUrl);
const provider = new HDWalletProvider({
    mnemonic:{
        phrase:mnemonicPhrase
    },
    providerOrUrl: providerUrl
});

const web3 = new Web3(provider);

const cColors = {
    green: '\x1b[36m%s\x1b[32m',
    yellow: '\x1b[36m%s\x1b[33m',
    red: '\x1b[36m%s\x1b[31m'
};

const deploy = async () => {
    try {
        console.log("stuff");
        const accounts = await web3.eth.getAccounts();

        console.log(cColors.yellow, "Attempting to deploy contract from account: ", accounts[0]);

        const contract = await new web3.eth.Contract(abi);
        const deploy = contract.deploy({ data: '0x' + evm.bytecode.object });
        const resourceHEI = await deploy.send({ from: accounts[0] });

        console.log(cColors.green, "Contract deployed at address: ", resourceHEI.options.address);
    } catch(e) {
        console.log(cColors.red, "Contract deploy error: ", e);
    }
    // ENDING SCRIPT PROCESS
    process.exit();
}
deploy();