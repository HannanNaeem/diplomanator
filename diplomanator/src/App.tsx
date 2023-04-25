import './App.css';
import { useWeb3React } from "@web3-react/core";
import {useState} from "react";
import web3 from 'web3';
import { injected } from "./wallet/Connect";
import abi from './contract_abis/MyToken.json'
import detectEthereumProvider from '@metamask/detect-provider';

function App() {
  
  // Main Banner Image
  const contactAdd = "0x5966C914AD5EBA72A197d41cDEFe4F07FB93637B";
  const mainBgImage = "https://cdn.i-scmp.com/sites/default/files/styles/1200x800/public/d8/images/canvas/2021/12/03/b37a97d3-270c-4cdc-8c83-4ee735a686e8_95895212.jpg?itok=y0459xhc&v=1638533154";
  const [provider, setProvider] = useState();

  // this is used to interface with block-chain directly e.g call method in a contract
  const {active, account, library, activate, deactivate} = useWeb3React()
  const [myAccount , setMyAccount] = useState("");
  const [isActive, setActive] = useState(false);
  const [minting, setMinting] = useState(false);
  const [dipTokEvent, setDipTokEvent] = useState([]);
  const [showEvents, setsShowEvents] = useState(true);

  // state hook for storing verifiying diploma events
  const [recordEdit, setRecordEdit] = useState([]);


  const ToggleEventViewer = () => {
    setsShowEvents(!showEvents);
  }

  // Function to listen to events emitted by the contract
  const sentTokenEvent = async () => {

    const contract = new library.eth.Contract(abi['abi'], contactAdd, {
      from: account, // default from address
    });

    await contract.getPastEvents(
      'sentTokens',
      {
        fromBlock: 0,
        toBlock: 'latest'
      },
      (error: Error, events) => {
        // create an array with only field of return values from events
        events.forEach((event) => {
          setDipTokEvent((dipTokEvent) => [...dipTokEvent, event.returnValues.to]);
        });
      });
  }

  // Function for event listener for Verification events containing diploma ID and URI
  const recordEditEvent = async () => {
    const contract = new library.eth.Contract(abi['abi'], contractAdd, {
      from, account, // default from address
    });

    await contract.getPastEvents(
      'recordEdit',
      {
        fromBlock: 0,
        toBlock: 'latest'
      },
      (error: Error, events) => {
        // create array with field DipID and URI
        events.forEach((event) => {
          setRecordEdit((recordEdit) => [...recordEdit, {event.returnValues.DipID, event.returnValues.URI}]));
        });
      }
    );
  }

  // Function to connect to wallet. We will use wallet to initiate transactions from the user
  async function connect() {
    try {
      await activate(injected);
      if(window.ethereum){
        console.log(provider);
        console.log("MetaMast detected");
        window.ethereum.request({method: 'eth_requestAccounts'}).then(
          (res : any) => {
            console.log(res);
            setMyAccount(res);
            setActive(true);
          }
        );
      } else {
        alert("Install metamask extension");
        return;
      }

    } catch (ex) {
      console.log(ex);
    }
  }

  async function sendEthsAndMint() {
    // request metamask to initiate transaction

      setMinting(true);
      window.ethereum.request({ method: 'eth_sendTransaction',
      params : [{
        from: account,
        to: contactAdd,
        value: '0xDE0B6B3A7640000',
      },],
    })
    .then(async (txHash: any) => {
      console.log(txHash);
      sentTokenEvent();
      console.log('Logged events into array');
      console.log()
      // var contract = new library.eth.Contract(abi['abi'], contactAdd, {
      //   from: account, // default from address
      // });
      // await contract.methods.receivePayment().send(async (e : any, tx : any) => {
      //   if (e) {
      //     alert(`Something went wrong! Try switching accounts - ${e}`);
      //     console.log("ERROR ->", e);
      //   } else {
      //     console.log(tx);
      //   }
      //   setMinting(false);


      // });

    })
    .catch((error: any) => console.error(error));
  }

  async function disconnect() {
    try {
      deactivate();
      setActive(false);
      setMyAccount("");
    } catch (ex) {
      console.log(ex)
    }
  }

  // minting toggle listener
  // const [minting, setMinting] = useState(false);

 
  
  async function mint(){
    
    setMinting(true);

    let obj = {
      to : contactAdd,
      from: myAccount,
      value: library.utils.toWei("1", "ether"),
    };

    await sendEthsAndMint();

    console.log("Transaction sent!")

    setMinting(false);
  }

 
  return (
    
    <div className="App">

      {/* MAIN BANNER */}
      <div className="main-card-wrapper" style={{ backgroundImage: `url(${mainBgImage})` }}>
        <div className="main-card__inner-wrapper">
          <h1 className="header-txt">Diplomanator Beta</h1>
          {(isActive) ? 
            <button type ="button" disabled={minting} onClick={mint} className = "main-mint-btn">
              {(minting) ? `Waiting for confirmation..` : `Mint DipTok`}
            </button>
            : <button className="main-mint-btn" onClick={connect} >Connect to Wallet to Mint DipTok</button>
          }
          {(isActive && !minting) ? 
             <button type="button" onClick={disconnect} className="main-discon-btn">Disconnect </button>
            : <div></div>
          }
          {(isActive && !minting) ? 
             <button type="button" onClick={() => {}} className="addr-btn"> {account} </button>
            : <div></div>
          }
         
         {(isActive) ?
            <button type ="button" onClick={ToggleEventViewer} className = "main-mint-btn">
              {(showEvents) ? `Hide Events` : `Show Events`}
            </button>
            :
            <div></div>
         }

         {
          <div className="event-viewer">
            <h3>Events</h3>
            <ul>
              {dipTokEvent.reverse().map((event, index) => {
                return <li key={index}>{event}</li>
              })}
            </ul>
          </div>        
      }
          
          
        </div>
      </div>

    </div>
 
  );
}


export default App;