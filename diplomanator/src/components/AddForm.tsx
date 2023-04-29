import React, { useEffect, useState } from 'react';
import './Form.css';
import '../App.css';
import '@coreui/coreui/dist/css/coreui.min.css'
import abi from "../contract_abis/RecordAdder.json"

import {
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBInputGroup
} from 'mdb-react-ui-kit';
import Card from 'react-bootstrap/Card';


export default function AddForm() {


    const [dipID, setdipID] = useState("");

    const [myAccount , setMyAccount] = useState("");
    const [matched, setMatched] = useState(false);
    const [hash, setHash] = useState("");


    const contactAdd = "0x1A89d806032e27B33137581f24b64E19aa7B1e98";
    const Web3 = require('web3');
    const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
    
    

    const connect = async (event : any) => {
      event.preventDefault();
      try {
        if(window.ethereum){
          console.log("MetaMast detected");
          window.ethereum.request({method: 'eth_requestAccounts'}).then(
            (res : any) => {
              console.log(res);
              setMyAccount(res);
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

    useEffect(()=>{
      if (myAccount){
        console.log("Account");
      } else {
        console.log("No Account");
      }
      if (hash){
        console.log("Hash present");
      }
    }, [myAccount, hash]);
 



    async function callContract() {
      

      if (myAccount === ""){
        alert("error connecting to wallet");
        return;
      }

      var contract = new web3.eth.Contract(abi['abi'], contactAdd, {
        from: myAccount[0], // default from address
      });

      await contract.methods.addRecord(dipID).send(async (e : any, tx : any) => {
        if (e) {
          alert(`Something went wrong! Try switching accounts - ${e}`);
          console.log(e);
        } else {
          console.log(tx);
          // transaction was successful
            
        }
      });



    }


    const handlecallContract = async (event : any) =>{

      event.preventDefault();

      console.log(dipID);


      if (dipID === ""){
        alert("Please correct the inputs");
      } else {
        
        await callContract();
    
    }
      
      // else send monies to contract
      

    }

  return (
    <div className='form_wrapper'>
    <form>

    <MDBInputGroup className='mb-3' textBefore='Diploma ID'>
      <input className='form-control' type='text' placeholder="########" 
        value={dipID} onChange={(e) => {
          try{
            setdipID(e.target.value)
          } catch(e){
            console.log(e);
          }
        }}
      />
    </MDBInputGroup>

    
    <MDBInputGroup className='mb-3' textBefore='URI'>
      <input className='form-control' placeholder='<>' type='text' />
    </MDBInputGroup>


    <MDBBtn onClick={handlecallContract} type='submit' block>
        Call Contract
      </MDBBtn>
      <MDBBtn onClick={connect} type='submit' block>
        Connect to current account
      </MDBBtn>
    </form>

  </div>
  );
}