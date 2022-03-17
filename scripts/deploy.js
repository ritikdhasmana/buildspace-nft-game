const main = async() => {
    const gameContractFactory = await hre.ethers.getContractFactory('MyEpicGame');
    const gameContract = await gameContractFactory.deploy(
    ["Rainboo", "Lizzy", "Fire Chic"],       // Names
    ["https://imgur.com/KPCIkFq", // Images
    "https://imgur.com/BxnIznZ", 
    "https://imgur.com/Zd2hDGt"],
    [300, 600, 900],                    // HP values
    [100, 50, 25]        
    );
    await gameContract.depolyed;
    console.log("Contract deployed to:", gameContract.address);
    let txn = await gameContract.mintCharacterNFT(0);
    await txn.wait();
    console.log("Minted NFT #1");
        
    txn = await gameContract.mintCharacterNFT(1);
    await txn.wait();
    console.log("Minted NFT #2");
        
    txn = await gameContract.mintCharacterNFT(2);
    await txn.wait();
    console.log("Minted NFT #3");
        
    txn = await gameContract.mintCharacterNFT(1);
    await txn.wait();
    console.log("Minted NFT #4");
        
    console.log("Done deploying and minting!");

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