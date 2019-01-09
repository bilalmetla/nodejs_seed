const path = require('path');
const fs = require('fs');
const solc = require('solc'); 
//getting path path.resolve(sameDir,foldername,contractfilename);
const sourcePath = path.resolve(__dirname,'contracts','freelancer.sol');
//reading file in utf8 format
const source = fs.readFileSync(sourcePath,'utf8');
//compiling smart contract 
//solc.compile(filereadabove,noOfDeployment).contracts[':Contractname'];
module.exports = solc.compile(source,1).contracts[':Sahulat'];
