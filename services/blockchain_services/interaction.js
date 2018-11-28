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

exports.createTransaction =  async (err,txscallback) => { 
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
        .numberToHex(106);
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

exports.getbalance = async() => {
    
}
    