const ethers = require('ethers');
let provider = ethers.getDefaultProvider('rinkeby');
const {interface,bytecode} = require('./compileSahulat');
// Load the wallet to deploy the contract with
let privateKey = '3750a3a144cb5048d9a20ae3bf212269bf0193ff92434917792bf5ab20d1e84e';
let wallet = new ethers.Wallet(privateKey, provider);

// The address from the above deployment example
let contractAddress = "0x6f7ad9ff06AB6B704251f2646De01E1a41Dfff9d";
let contract = new ethers.Contract(contractAddress, interface, provider);

exports.viewRegisteration = async function(data,viewUserCallback) {
    // Get the current value
    let user = data.address
    let currentValue = await contract.viewUsers(user);
    console.log(currentValue);
    return viewUserCallback(null,currentValue)
}

exports.newRegisteration = async function(data,signupUserCallback) {
    let name = data.name
    let age = data.age
    let designation = data.designation
    let qualification = data.qualification
    let experience = data.experience
    let rateperhour = data.rateperhour
    let defaultprivateKey = data.privateKey;
    let privateKey = defaultprivateKey.slice(2)
    let wallet = new ethers.Wallet(privateKey, provider);
    let contractWithSigner = contract.connect(wallet);
    let tx = await contractWithSigner.insertion(name,age,designation,qualification,experience,rateperhour);
    console.log(tx);
    await tx.wait();
    return signupUserCallback(null,tx)
}

exports.newJobPlacement = async function(data,jobPlaceCallback) {
    let jobname = data.jobname
    let salary = data.salary
    let designation = data.designation
    let responsibility = data.responsibility
    let department = data.department
    let duration = data.duration
    let defaultprivateKey = data.privateKey;
    let privateKey = defaultprivateKey.slice(2)
    let wallet = new ethers.Wallet(privateKey, provider);
    let contractWithSigner = contract.connect(wallet);
    let tx = await contractWithSigner.jobPlacement(jobname,responsibility,duration,salary,designation,department);
    console.log(tx);
    await tx.wait();
    return jobPlaceCallback(null,tx)
}

exports.sahulatApplying = async function(data,jobApplyCallback) {
    let jobaddress = data.jobaddress
    let price = data.price
    let daystoComplete = data.daystoComplete
    let defaultprivateKey = data.privateKey;
    let privateKey = defaultprivateKey.slice(2)
    let wallet = new ethers.Wallet(privateKey, provider);
    let contractWithSigner = contract.connect(wallet);
    // let contractWithSigner = new Contract(contractAddress, abi, wallet)
    let tx = await contractWithSigner.jobApply(jobaddress,price,daystoComplete);
    console.log(tx);
    await tx.wait();
    return jobApplyCallback(null,tx)
}

exports.viewBidders = async function(data,bidsCallback) {
    let defaultprivateKey = data.privateKey;
    let privateKey = defaultprivateKey.slice(2)
    let wallet = new ethers.Wallet(privateKey, provider);
    let contractWithSigner = contract.connect(wallet);
    //let contractWithSigner = new Contract(contractAddress, abi, wallet)
    let pause = await contractWithSigner.pause();
    console.log(pause);
    await pause.wait();
    return bidsCallback(null,pause)
}

exports.getbids = async function(data,viewUserCallback) {
    // Get the current value
    //let user = data.address
    
    let currentValue = await contract.viewallBidders();
    console.log(currentValue);
    return viewUserCallback(null,currentValue)
}