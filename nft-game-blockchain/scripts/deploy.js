const main = async() => {
    const gameContractFactory = await hre.ethers.getContractFactory('MyEpicGame');
    const gameContract = await gameContractFactory.deploy(
    ["Rainboo", "Lizzy", "Fire Chic"],       // Names
    ["https://i.imgur.com/6DYeBuo.jpeg", // Images
    "https://i.imgur.com/U5uEV9U.png", 
    "https://i.imgur.com/8HMWuAz.png"],
    [300, 600, 900],                    // HP values
    [100, 50, 25],
    "jojo",
    "https://i.imgur.com/uZ2H3ks.jpeg",
    9000,
    50     
    );
    await gameContract.depolyed;
    console.log("Contract deployed to:", gameContract.address);
    // let txn = await gameContract.mintCharacterNFT(2);
    // await txn.wait();
  
    // txn = await gameContract.attackBoss();
    // await txn.wait();
  
    // txn = await gameContract.attackBoss();
    // await txn.wait();
  
    // console.log("Done!");

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