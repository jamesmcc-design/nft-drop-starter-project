import { publicKey } from '@project-serum/anchor/dist/cjs/utils';
import React, { useEffect, useState } from 'react';
import './App.css';
import twitterLogo from './assets/twitter-logo.svg';
import Button from "./components/Button"
import CandyMachine from './CandyMachine';

// Constants
const TWITTER_HANDLE = '_buildspace';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {

  const [walletAddress, setWalletAddress] = useState(null)

  const connectWallet = async () => {
    const { solana } = window

    if (solana) {
      const response = await solana.connect()
        console.log("Connected with public key:",response.publicKey.toString());
        setWalletAddress(publicKey)
    }
  }

  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;

      if (solana) {
        if (solana.isPhantom) {
          console.log('Phantom wallet found!')

          const response = await solana.connect({ onlyIfTrusted: true })
            console.log(
              'Connected with Public Key:',
              response.publicKey.toString()
            )
            setWalletAddress(publicKey)      
        }

        } else {
          alert('Solana object not found! Get a Phantom Wallet')
        }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(()=> {
    const onLoad = async () => {
      await checkIfWalletIsConnected()
    }
    window.addEventListener('load', onLoad)
    return () => window.removeEventListener('load', onLoad)
  }, [])

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header">🍭 Candy Drop</p>
          <p className="sub-text">NFT drop machine with fair mint</p>
          {!walletAddress ?
            <Button title="Connect to wallet"  onClick={connectWallet} style="cta-button connect-wallet-button" />
            :
            <Button title="You're Connected"  onClick={null}  style="cta-button connect-wallet-button" />
          }
        </div>
        {walletAddress && <CandyMachine walletAddress={window.solana} />}
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
