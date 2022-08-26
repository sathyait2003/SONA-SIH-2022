const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

const buildPath = path.resolve(__dirname,'build');

const resourceHEIPath = path.resolve(__dirname, "contracts", "ResourceHei.sol");
const source = fs.readFileSync(resourceHEIPath, 'utf-8');

const cConfig = {
    cColors: {
        green: '\x1b[36m%s\x1b[32m',
        yellow: '\x1b[36m%s\x1b[33m',
        red: '\x1b[36m%s\x1b[31m'
    },
    cUnicodes: {
        check: '✓',
        cross: 'x',
        ether: '⧫'
    },
    cSpaces: (ns) => Array(ns + 1).join(" ")
};

const input = {
    language: 'Solidity',
    sources: {
        'resourceHEI.sol': {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*']
            }
        }
    }
};

const output = JSON.parse(solc.compile(JSON.stringify(input))).contracts['resourceHEI.sol'];

(function(){
    try{      
        //Remove build folder and recreate for a new compile   
        fs.removeSync(buildPath); 
        console.log(cConfig.cColors.yellow, cConfig.cUnicodes.check, buildPath, "removed successfully");
        fs.ensureDirSync(buildPath);
        console.log(cConfig.cColors.green, cConfig.cUnicodes.check, buildPath, "created successfully");

        for(contract in output){
            fs.outputJSONSync(
                path.resolve(buildPath, contract+ ".json"),//pile destination
                output[contract]//content
            );
            console.log(cConfig.cColors.green, cConfig.cUnicodes.check, contract, "contract created successfully");
         }
    }
    catch(e){
        console.error(cConfig.cColors.red, cConfig.cUnicodes.cross, e);
    }
     // EXIT THE PROCESS
     process.exit;
})();






