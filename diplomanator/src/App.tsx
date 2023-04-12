import './App.css';
import { useWeb3React } from "@web3-react/core";
import { injected } from "./wallet/Connect";
import {useState} from "react";
import web3 from 'web3';

function App() {


  // Main Banner Image
  const mainBgImage = "https://cdn.i-scmp.com/sites/default/files/styles/1200x800/public/d8/images/canvas/2021/12/03/b37a97d3-270c-4cdc-8c83-4ee735a686e8_95895212.jpg?itok=y0459xhc&v=1638533154";
 
  // web3React Hook
  const { active, account, library, activate, deactivate } = useWeb3React()
  
  // Function to connect to wallet
  async function connect() {
    try {
      await activate(injected);
    } catch (ex) {
      console.log(ex)
    }
  }

  async function disconnect() {
    try {
      deactivate()
    } catch (ex) {
      console.log(ex)
    }
  }
  // minting toggle listener
  // const [minting, setMinting] = useState(false);
  let minting = false;

  async function mint(){

    // setMinting(true);
    minting = true;
    const myAccount = "";
    const price = "0.01";

    let obj = {
      to : myAccount,
      from: account,
      value: web3.utils.toWei(price, "ether"),
      gas: 85000,
      gasLimit: "100000"
    };

    await library.eth.sendTransaction(obj, async (e : any, tx : any) => {

      if (e) {
        alert(`Something went wrong! Try switching accounts - ${e}`);
        console.log("ERROR ->", e);
      } 
      minting = false;
      // setMinting(false);

      
    });
  }

 
  return (
    
    <div className="App">

      {/* MAIN BANNER */}
      <div className="main-card-wrapper" style={{ backgroundImage: `url(${mainBgImage})` }}>
        <div className="main-card__inner-wrapper">
          <h1 className="header-txt">Diplomanator Beta</h1>
          {(active) ? 
            <button type ="button" disabled={minting} onClick={mint} className = "main-mint-btn">
              {(minting) ? `Waiting for confirmation..` : `Mint DipTok`}
            </button>
            : <button className="main-mint-btn" onClick={connect} >Connect to Wallet to Mint DipTok</button>
          }
          {(active && !minting) ? 
             <button type="button" onClick={disconnect} className="main-discon-btn">Disconnect </button>
            : <div></div>
          }
          
          
        </div>
      </div>

    </div>
 
  );
}


export default App;