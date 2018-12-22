const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
var Tx = require('ethereumjs-tx');
const abiDecoder = require('abi-decoder'); 
const {interface,bytecode} = require('./compile');
// const provider = new HDWalletProvider(
//     'solid minor bulk grow glow web trap drastic blood humor field web',
//     'https://rinkeby.infura.io/v3/1ce4ad6e387048e9aa5dedbfaf35e03b'
//   );
// const provider = new HDWalletProvider(
//     '7ce531a86a62a09cc34eb1f02124a08b9e276a61f1ac223679985d549d6f1003',
//     'https://rinkeby.infura.io/v3/0794f9a581474946ac19ef6e1aa3218a'
//   );

var PrivateKeyProvider = require("truffle-privatekey-provider");
var privateKey = "3750a3a144cb5048d9a20ae3bf212269bf0193ff92434917792bf5ab20d1e84e";
var provider = new PrivateKeyProvider(privateKey, "https://rinkeby.infura.io/v3/0794f9a581474946ac19ef6e1aa3218a");
  const web3 = new Web3(provider);
//const web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/1ce4ad6e387048e9aa5dedbfaf35e03b"));
//var net = require('net')
//const web3 = new Web3(new Web3.providers.IpcProvider('../../../../home/hafiz/hafiz/geth.ipc', net)); // mac os path

// var myContract = new web3.eth.Contract(JSON.parse(interface), '0xe953dc826ff971499a1a90febb3043421a14a5a4', {
//     from: '0x8eb731191f33e0f332522126ea2c9c89e8bbffaf', // default from address
//     gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
// });
var privateKey = new Buffer('0x3750a3a144cb5048d9a20ae3bf212269bf0193ff92434917792bf5ab20d1e84e', 'hex');
exports.createAccount = async function (address,accountCallback) {
      var account = await web3.eth.accounts.create()
    return accountCallback(null,account)
       
   }; //end of balanceOf

   /**
    * get account address by private key
    */  
exports.getAccountbyPrivateKey = async function (address,accountCallback) {
    var account = await web3.eth.accounts.privateKeyToAccount(address.payload.address)
     return accountCallback(null,account)   
  }; //end of balanceOf 

exports.createTransaction =  async (data,txscallback) => { 
    var amount = "1"
    var amountToSend = web3.utils.toWei(amount,"ether")
//    await web3.eth.personal.unlockAccount("0x3766331b6ec7c81d9fdabb8d287d1bff31903284", "blockchain", 6000)
//    .then(console.log('Account unlocked!'));
//    await web3.eth.personal.unlockAccount("0xff8a901abff1b6c23fea20a69fe07a27f7003405", "Blockchain@2605", 6000)
//    .then(console.log('Account unlocked!'));

    await web3.eth.sendTransaction({
        from: '0xC6c2C6230dDC8a7800C3d397D155aCca30C1a59c',
        to: '0x970B461BB44be719134DC8E923667EF7eDd8C910',
        value: amountToSend
    })
    .on('transactionHash', function(hash){
        console.log(hash)
    })
    .on('receipt', function(receipt){
        console.log(receipt)
        return txscallback(null,receipt)
    })
    .on('confirmation', function(confirmationNumber, receipt){ 
        console.log(confirmationNumber)
    })
    .on('error',function(err){
        console.log(err); 
    }) 
    

}; //end of balanceOf

exports.getBalance = function (address,balcallback) {
 web3.eth.getBalance(address,function(err,balance){
        if(err){
            console.log("error")
            return balcallback(err,null);
        }else{
            var balanceofaddr = balance / Math.pow(10, 18);
            return balcallback(null,balanceofaddr)
        }
    });   
}; //end of balanceOf

exports.gettransaction = function (txshash,txscallback) {
    web3.eth.getTransaction("0x6611c204e203ef61363de60ba6e09d67f1169b60524289859fe7781f17de7ce5",function(err,txs){
           if(err){
               console.log("error")
               return txscallback(err,null);
           }else{
               return txscallback(null,txs)
           }
       });   
   }; 

exports.getBlock = function (blockhash,blockcallback) {
    web3.eth.getBlock("0x9994e35f2017eee0e5a0538fb103e0d8fd0ea1f83b56771bd5b525c4a207f901",function(err,block){
           if(err){
               console.log("error")
               return blockcallback(err,null);
           }else{
               return blockcallback(null,block)
           }
       });   
   }; 

exports.getCurrentGasPrice = function (blockhash,pricecallback) {
    web3.eth.getGasPrice(function(err,gasprice){
           if(err){
               console.log("error")
               return pricecallback(err,null);
           }else{
               return pricecallback(null,gasprice)
           }
       });   
   };    
    