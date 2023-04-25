import '../App.css';
import { useWeb3React } from "@web3-react/core";
import {useState, useEffect} from "react";
import web3 from 'web3';
import { injected } from "../wallet/Connect";
import abi from '../contract_abis/MyToken.json'
import {useNavigate} from "react-router-dom";




const Home =() => {
  
  // Main Banner Image
  const contactAdd = "0xc4AC7f01B462f302D15f4c7eB1b13E83f9c8493b";
  const mainBgImage = "https://www.commonapp.org/static/aed6289d277c112ece5a609eff45ae9c/university-texas-austin_1171.jpg";
  const addRecImage = "https://wallpapercave.com/wp/wp2337008.jpg";
  const verifyImage = "https://assets.teenvogue.com/photos/5e66a34f7ac2c30008a4819d/16:9/w_2560%2Cc_limit/GettyImages-1062799214.jpg";
  const [provider, setProvider] = useState();

  // this is used to interface with block-chain directly e.g call method in a contract
  const {active, account, library, activate, deactivate} = useWeb3React()
  const [myAccount , setMyAccount] = useState("");
  const [isActive, setActive] = useState(false);
  const [minting, setMinting] = useState(false);

  const navigate = useNavigate();

  useEffect(()=>{
    if (minting){
      console.log("Minting now");
    } else {
      console.log("Not minting now");
    }
  }, [minting]);


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

      // let obj = {
      //   to : contactAdd,
      //   from: myAccount,
      //   value: library.utils.toWei("1", "ether"),
      // };
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
      setMinting(false);

    })
    .catch((error: any) => {console.error(error); setMinting(false);});
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

    await sendEthsAndMint();

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
            <div className = "account-wrapper">
              Account: {account} 
             </div>
            : <div></div>
          }
          
          
        </div>
      </div>

        <button onClick={() =>{navigate("./pages/Verify")}} className="function-card-wrapper" style={{ backgroundImage: `url(${verifyImage})` }}>
          <div className="function-card__inner-wrapper">
            <h1 className="function-txt"> Verify ✅</h1>

          </div>
        </button>

        
        <button onClick={()=> {navigate("./pages/AddRecord")}} className="function-card-wrapper" style={{ backgroundImage: `url(${addRecImage})` }}>
          <div className="function-card__inner-wrapper">
            <h1 className="function-txt"> Add records</h1>

          </div>
        </button>
    </div>
 
  );

};

export default Home