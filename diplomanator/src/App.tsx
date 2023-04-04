import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';

function App() {
    const [walletAddress, setWalletAddress] = useState('');

    useEffect(() => {
        getCurrentWalletConnected();
        addWalletListener();
    }, [walletAddress]);

    const connectWallet = async () => {
        let provider = window.ethereum;
        if (typeof window != "undefined" && typeof provider != "undefined") {
            try{
                /* Metamask is installed and ready to connect */
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                console.log(accounts[0]);
            } catch(error) {
                console.log(error);
            }
        }
        else{
            /* Metamask is not installed */
            console.log("Install Metamask");
        }
    }

    const getCurrentWalletConnected = async () => {
        if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
          try {
            const accounts = await window.ethereum.request({
              method: "eth_accounts",
            });
            if (accounts.length > 0) {
              setWalletAddress(accounts[0]);
              console.log(accounts[0]);
            } else {
              console.log("Connect to MetaMask using the Connect button");
            }
          } catch (err) {
            console.error(err);
          }
        } else {
          /* MetaMask is not installed */
          console.log("Please install MetaMask");
        }
      };
    
      const addWalletListener = async () => {
        if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
          window.ethereum.on("accountsChanged", (accounts: any[]) => {
            setWalletAddress(accounts[0]);
            console.log(accounts[0]);
          });
        } else {
          /* MetaMask is not installed */
          setWalletAddress("");
          console.log("Please install MetaMask");
        }
      };



    return (
    <div>
      <nav className="navbar">
        <div className="container">
          <div className="navbar-brand">
            <h1 className="navbar-item is-size-4">Diplomanator</h1>
          </div>
          <div id="navbarMenu" className="navbar-menu">
            <div className="navbar-end is-align-items-center">
              <button onClick={connectWallet}
                className="button is-white connect-wallet">
                <span className="is-link has-text-weight-bold">
                {walletAddress && walletAddress.length > 0 ? 
                `Connected: ${walletAddress.substring(0, 6)}...${walletAddress.substring(38)}` 
                : `Connect Wallet`}
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>
      <section className="hero is-fullheight">
        <div className="faucet-hero-body">
          <div className="container has-text-centered main-content">
            <h1 className="title is-1">
                Verify your diploma
            </h1>
            <div className="box address-box">
              <div className="columns">
                <div className="column is-four-fifths">
                  <input
                    className="input is-medium"
                    type="text"
                    placeholder="Enter your wallet address (0x...)"
                  />
                </div>
                <div className="column">
                  <button className="button is-link is-medium">
                    Verify Diploma 
                </button>
                </div>
              </div>
              <article className="panel is-grey-darker">
                <p className="panel-heading">Transaction Data</p>
                <div className="panel-block">
                  <p>Transaction Data</p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
    </div>
  ); 



        // <div className="App">
        //   <header className="App-header">
        //     Account: xyz
        //     <br />
        //     Balance: 123
        //     <p className='App-link'>
        //        <code>Connect wallet</code> 
        //     </p>
        //     {/* <a
        //       className="App-link"
        //       href="https://reactjs.org"
        //       target="_blank"
        //       rel="noopener noreferrer"
        //     >
        //       Learn React
        //     </a> */}
        //   </header>
        // </div>
    //   );
}


export default App;
