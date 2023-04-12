import './App.css';
import { useWeb3React } from "@web3-react/core";
import { injected } from "./wallet/Connect";
import {useState} from "react";
import web3 from 'web3';
import abi from './contract_abis/MyToken.json'

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
    const myAccount = "0x096F56C92c2c173CC7CaBa35C6a53CF3b97f9892";
    const contactAdd = "0xc02d178467118443B4c26BC33fd1D3D05cfF657C"

    let obj = {
      to : myAccount,
      from: myAccount,
      value: 100,
      gas: 85000,
      gasLimit: "100000"
    };

    var contract = new library.eth.Contract(abi['abi'], contactAdd, {
      from: myAccount, // default from address
    });

    await contract.methods.mint.sendTransation(myAccount, 100, async (e : any, tx : any) => {

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