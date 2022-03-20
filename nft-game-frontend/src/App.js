import {React, useEffect, useState} from 'react';
import './App.css';
import SelectCharacter from './Components/SelectCharacter';
import { CONTRACT_ADDRESS , transformCharacterData} from './constants';
import myEpicGame from './utils/MyEpicGame.json';
import Arena from './Components/Arena';
import { ethers } from 'ethers';
const App = () => {

  const [currentAccount, setCurrentAccount] = useState(null);
  const [characterNFT, setCharacterNFT] = useState(null);


  const checkIfWalletIsConnected = async() =>{
    try{
      const {ethereum} = window;
      if(!ethereum){
        console.log('Make sure you have metamask and are connected !');
        return;
      }else{
        console.log('we have the ethereum object! ', ethereum);
      }
      const accounts = await ethereum.request({method: 'eth_accounts'});
      if(accounts.length !==0){
        const account = accounts[0];
        console.log('Account : ',account);
        setCurrentAccount(account);
      }else{
        console.log('No account available');
      }
    }catch(error){
      console.log(error);
    }
  };

  const checkNetwork = async()=>{
    try{
      if(window.ethereum.networkVersion!=='4'){
        alert("Connect to Rinkeby!");
      }
    }catch(error){
      console.log(error);
    }
  };


  const renderContent = () => {
    if(!currentAccount){
      return(
        <div className="connect-wallet-container">
          <img
              src="https://c.tenor.com/Jl-mymXzhywAAAAC/elmo-fire.gif"
              alt="Monty Python Gif"
            />
            <button
              className="cta-button connect-wallet-button"
              onClick={connectWalletAction}
            >
              Connect your wallet!
            </button>
        </div>
      )
    }else if(currentAccount && !characterNFT){
      return <SelectCharacter setCharacterNFT={setCharacterNFT} />;
    }else if(currentAccount && characterNFT){
      return <Arena characterNFT={characterNFT} setCharacterNFT={setCharacterNFT} />;
    }
  };

  const connectWalletAction = async() =>{
    try{
      const {ethereum} = window;
      if(!ethereum){
        alert('Metamask not found');
        return;
      }
      const accounts = await ethereum.request({method: 'eth_requestAccounts'});
      if(accounts.length !==0){
        const account = accounts[0];
        console.log('Account: ',account);
        setCurrentAccount(account);
      }else{
        console.log('No account available');
      }

    }catch(error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    checkIfWalletIsConnected();
    checkNetwork();
  },[]);

  useEffect(() => {
    const fetchNFTMetadata = async () => {
      console.log('Checking for Character NFT on address:', currentAccount);
  
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const gameContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        myEpicGame.abi,
        signer
      );
  
      const txn = await gameContract.checkIfUserHasNFT();
      if (txn.name) {
        console.log('User has character NFT');
        setCharacterNFT(transformCharacterData(txn));
      } else {
        console.log('No character NFT found');
      }
    };

    if (currentAccount) {
      console.log('CurrentAccount:', currentAccount);
      fetchNFTMetadata();
    }
  }, [currentAccount]);

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">⚡ Multiverse Madness</p>
          <p className="sub-text">Kill the psycho!</p>
          {renderContent()}
        </div>
        <div className="footer-container">
          <div style={{color:"white"}}>No Copyright.</div>
        </div>
      </div>
    </div>
  );
};

export default App;
