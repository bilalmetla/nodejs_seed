const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
var Tx = require('ethereumjs-tx');
const abiDecoder = require('abi-decoder'); 
// const {interface,bytecode} = require('./compile');
var PrivateKeyProvider = require("truffle-privatekey-provider");
const infuraKey = "https://rinkeby.infura.io/v3/0794f9a581474946ac19ef6e1aa3218a"
// const provider = new HDWalletProvider(
//     'solid minor bulk grow glow web trap drastic blood humor field web',
//     'https://rinkeby.infura.io/v3/1ce4ad6e387048e9aa5dedbfaf35e03b'
//   );
// const provider = new HDWalletProvider(
//     '7ce531a86a62a09cc34eb1f02124a08b9e276a61f1ac223679985d549d6f1003',
//     'https://rinkeby.infura.io/v3/0794f9a581474946ac19ef6e1aa3218a'
//   );

var privateKey = "3750a3a144cb5048d9a20ae3bf212269bf0193ff92434917792bf5ab20d1e84e";
var provider = new PrivateKeyProvider(privateKey,infuraKey );
const web3 = new Web3(provider);
//const web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/1ce4ad6e387048e9aa5dedbfaf35e03b"));
//var net = require('net')
//const web3 = new Web3(new Web3.providers.IpcProvider('../../../../home/hafiz/hafiz/geth.ipc', net)); // mac os path

// var myContract = new web3.eth.Contract(JSON.parse(interface), '0xe953dc826ff971499a1a90febb3043421a14a5a4', {
//     from: '0x8eb731191f33e0f332522126ea2c9c89e8bbffaf', // default from address
//     gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
// });
//var privateKey = new Buffer('0x3750a3a144cb5048d9a20ae3bf212269bf0193ff92434917792bf5ab20d1e84e', 'hex');
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

exports.createTransaction =  async (transaction,txscallback) => { 
    var privateKey = transaction.privateKey;
    let satisfyPrivateKey = privateKey.substring(2)
    var provider = new PrivateKeyProvider(satisfyPrivateKey, infuraKey);
    const web3 = new Web3(provider);
    var amount = transaction.amountTransfor.toString()
    var amountToSend = web3.utils.toWei(amount,"ether")

    await web3.eth.sendTransaction({
        from: transaction.sender,
        to: transaction.reciever,
        value: amountToSend
    })
    .on('transactionHash', function(hash){
        console.log(hash)
    })
    .on('receipt', function(receipt){
        console.log(receipt)
        return txscallback(null,receipt)
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
/**
 * get transaction by blockchain
 */
exports.gettransaction = function (data,txscallback) {
    web3.eth.getTransaction(data.txid,function(err,txs){
           if(err){
               console.log("error")
               return txscallback(err,null);
           }else{
               return txscallback(null,txs)
           }
       });   
   }; 

exports.getBlock = function (data,blockcallback) {
    web3.eth.getBlock(data.height,function(err,block){
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
    