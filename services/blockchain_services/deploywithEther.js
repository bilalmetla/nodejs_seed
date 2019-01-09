const ethers = require('ethers');
const {interface,bytecode} = require('./compileSahulat');

const sahulatDeployment = async() => {
// Connect to the network
let provider = ethers.getDefaultProvider('rinkeby');

// Load the wallet to deploy the contract with
let privateKey = '3750a3a144cb5048d9a20ae3bf212269bf0193ff92434917792bf5ab20d1e84e';
let wallet = new ethers.Wallet(privateKey, provider);

// Create an instance of a Contract Factory
let factory = new ethers.ContractFactory(interface, bytecode, wallet);

// Notice we pass in "Hello World" as the parameter to the constructor
let contract = await factory.deploy();

// The address the Contract WILL have once mined
// See: https://ropsten.etherscan.io/address/0x2bd9aaa2953f988153c8629926d22a6a5f69b14e
console.log(contract.address);
// "0x2bD9aAa2953F988153c8629926D22A6a5F69b14E"

// The transaction that was sent to the network to deploy the Contract
// See: https://ropsten.etherscan.io/tx/0x159b76843662a15bd67e482dcfbee55e8e44efad26c5a614245e12a00d4b1a51
console.log(contract.deployTransaction.hash);
// "0x159b76843662a15bd67e482dcfbee55e8e44efad26c5a614245e12a00d4b1a51"

// The contract is NOT deployed yet; we must wait until it is mined
console.log(await contract.deployed());

// Done! The contract is deployed.
}

sahulatDeployment()