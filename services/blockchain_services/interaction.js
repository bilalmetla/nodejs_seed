const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
var Tx = require('ethereumjs-tx');
const abiDecoder = require('abi-decoder'); 
const {interface,bytecode} = require('./compile');
const provider = new HDWalletProvider(
    'solid minor bulk grow glow web trap drastic blood humor field web',
    'https://rinkeby.infura.io/v3/1ce4ad6e387048e9aa5dedbfaf35e03b'
  );
const web3 = new Web3(provider);
var myContract = new web3.eth.Contract(JSON.parse(interface), '0xe953dc826ff971499a1a90febb3043421a14a5a4', {
    from: '0x8eb731191f33e0f332522126ea2c9c89e8bbffaf', // default from address
    gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
});
var privateKey = new Buffer('e4206fffa16a4af420c2a8c3f50008b349c41c04c8d0ced6d783dd59a972ccb2', 'hex');


exports.createAccount = async function (address,accountCallback) {
     var account = await web3.eth.accounts.create()
      return accountCallback(null,account)   
   }; //end of balanceOf

   /**
    * get account address by private key
    */
exports.getAccountbyPrivateKey = async function (address,accountCallback) {
    var account = await web3.eth.accounts.privateKeyToAccount('0x8352c6584d19075413d357ff6282a1dd43a4420b62958d83079a41eeb8201b32')
     return accountCallback(null,account)   
  }; //end of balanceOf

exports.createTransaction =  async (err,txscallback) => { 

    myContract.events.Transfer({filter:{from:'0x8eb731191f33e0f332522126ea2c9c89e8bbffaf'},
    fromBlock:3408670},function(error,result){
        if(!error){
            console.log("result")
            console.log(result)
        }else{
            console.log(error)
        }
    })
    var newHash;
    var transferFromABI = await myContract
        .methods
        .transfer('0x36a662850f399a47278b18163fbc9cb46334dacb', '30000000000000000000')
        .encodeABI();
    var gasLimit = 63897;
    console.log(gasLimit);
    const gasLimitHex = web3
        .utils
        .numberToHex(gasLimit);
    const gasPrice = 26500000001;
    console.log(gasPrice);
    const gasPriceHex = web3
        .utils
        .numberToHex(gasPrice);
    const countHexa = web3
        .utils
        .numberToHex(114);
    const valueHexa = web3
        .utils
        .numberToHex(0);
    var rawTx = {
        to: '0xe953dc826ff971499a1a90febb3043421a14a5a4',
        value: valueHexa,
        data: transferFromABI,
        nonce: countHexa,
        gasPrice: gasPriceHex,
        gasLimit: gasLimitHex
    }
    var tx = new Tx(rawTx);
    tx.sign(privateKey);
    var serializedTx = tx.serialize();
    await web3
        .eth
        .sendSignedTransaction('0x' + serializedTx.toString('hex'), function (err, hash) {
            if (hash) {
                console.log(`${hash}`);
                txscallback(null, hash);
            } else {
                console.log(err)
                txscallback(err, null);

            }
        });
                //.on('confirmation', function(confirmationNumber, receipt){
                //    console.log(confirmationNumber);
                //})
                //.on('receipt', function(receipt){
                //    // receipt example
                //    console.log(receipt);
                //});
               // return newHash;
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
    