const main = async() => {
    const gameContractFactory = await hre.ethers.getContractFactory('MyEpicGame');
    const gameContract = await gameContractFactory.deploy(
    ["Rainboo", "Lizzy", "Fire Chic"],       // Names
    ["https://imgur.com/KPCIkFq", // Images
    "https://imgur.com/BxnIznZ", 
    "https://imgur.com/Zd2hDGt"],
    [300, 600, 900],                    // HP values
    [100, 50, 25],
    "jojo",
    "https://i.imgur.com/uZ2H3ks.jpeg",
    9000,
    50         
    );
    await gameContract.depolyed;
    console.log("Contract deployed to:", gameContract.address);
    let txn;
    txn = await gameContract.mintCharacterNFT(2);
    await txn.wait;
        
    txn = await gameContract.attackBoss();
    await txn.wait;
    txn = await gameContract.attackBoss();
    await txn.wait;
    console.log("done!");
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch(error){
        console.log(error);
        process.exit(1);
    }
};
runMain();