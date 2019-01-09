const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const provider = new HDWalletProvider(
    'solid minor bulk grow glow web trap drastic blood humor field web',
    'https://rinkeby.infura.io/v3/1ce4ad6e387048e9aa5dedbfaf35e03b'
  );
const web3 = new Web3(provider);
const {interface,bytecode} = require('./compile');
let abi = JSON.parse('[ { "constant": true,"inputs": ["Array"],"name": "job_count","outputs": ["Array"],"payable": false,"stateMutability": "view","type": "function" },{ "constant": false,"inputs": [],"name": "jobsView","outputs": ["Array"],"payable": false,"stateMutability": "nonpayable","type": "function" },{ "constant": false,"inputs": ["Array"],"name": "insertion","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function" },{ "constant": true,"inputs": ["Array"],"name": "seq_users","outputs": ["Array"],"payable": false,"stateMutability": "view","type": "function" },{ "constant": false,"inputs": ["Array"],"name": "jobPlacement","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function" },{ "constant": "true","inputs": ["Array"],"name": "bids","outputs": ["Array"],"payable": false,"stateMutability": "view","type": "function" },{ "constant": true,"inputs": ["Array"],"name": "temp","outputs": ["Array"],"payable": false,"stateMutability": "view","type": "function" },{ "constant": true,"inputs": ["Array"],"name": "per_data","outputs": ["Array"],"payable": false,"stateMutability": "view","type": "function" },{ "constant": true,"inputs": ["Array"],"name": "viewUsers","outputs": ["Array"],"payable": false,"stateMutability": "view","type": "function" },{ "constant": true,"inputs": ["Array"],"name": "temp_bids","outputs": ["Array"],"payable": false,"stateMutability": "view","type": "function" },{ "constant": true,"inputs": ["Array"],"name": "bids_place","outputs": ["Array"],"payable": false,"stateMutability": "view","type": "function" },{ "constant": false,"inputs": ["Array"],"name": "viewBidders:","outputs": ["Array"],"payable": false,"stateMutability": "nonpayable","type": "function" },{ "constant": true,"inputs": ["Array"],"name": "job_addr_map","outputs": ["Array"],"payable": false,"stateMutability": "view","type": "function" },{ "constant": false,"inputs": ["Array"],"name": "jobApply","outputs": ["Array"],"payable": false,"stateMutability": "nonpayable","type": "function" } ]')

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    // console.log('Deploying to the Network using account : ', accounts[0]); 

     const result = await new web3.eth.Contract(JSON.parse(interface)).deploy({data: '0x'+ bytecode}).send({gas: '4700000', from : '0x8eb731191f33e0f332522126ea2c9c89e8bbffaf'});  
     console.log('Contract Deployed to : ', result);
    console.log('Contract Deployed to : ', result.options.address);
    //console.log('Contract Deployed to : ', result.defaultBlock);
};

deploy();
//Interaction with smart Contract


