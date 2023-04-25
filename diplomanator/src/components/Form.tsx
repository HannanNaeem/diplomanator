import React, { useEffect, useState } from 'react';
import './Form.css';
import '../App.css';
import { useWeb3React } from "@web3-react/core";
import '@coreui/coreui/dist/css/coreui.min.css'
import abi from "../contract_abis/MyToken.json"
import web3 from 'web3';
import db from "../dataBase/dips.json" ;
import {useNavigate} from "react-router-dom";
import {
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBInputGroup
} from 'mdb-react-ui-kit';
import Card from 'react-bootstrap/Card';

export default function Form() {

    const [fname, setFName] = useState("");
    const [lname, setLName] = useState("");
    const [dipID, setdipID] = useState("");
    const [school, setSchool] = useState("");
    const [major, setMajor] = useState("");
    const [gmonth, setMonth] = useState("");
    const [gyear, setYear] = useState("");
    const {active, account, library, activate, deactivate} = useWeb3React()
    const [myAccount , setMyAccount] = useState("");
    const [matched, setMatched] = useState(false);
    const [hash, setHash] = useState("");


    const contactAdd = "0xa3EB4D4888d18B318E859D6b733dF5D57fA5d3df";
    const Web3 = require('web3');
    const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
    
    async function sha256(message: any) {
      // encode as UTF-8
      const msgBuffer = new TextEncoder().encode(message);                    
  
      // hash the message
      const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  
      // convert ArrayBuffer to Array
      const hashArray = Array.from(new Uint8Array(hashBuffer));
  
      // convert bytes to hex string                  
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      return hashHex;
    }

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
    const navigate = useNavigate();

    async function verifyDiploma(){
      
      var this_key = 0;
      var t_key = ""
      for (t_key in db["db"]){
        if(dipID === t_key){
          break;
        }
        this_key = this_key + 1;
      }

      if(this_key >= Object.keys(db["db"]).length){
        alert("Diploma does not exist");
        navigate("/");
      } else {
        var key = dipID;
        const keyTyped = (key as keyof typeof db["db"]);
        var db_string  = "";
        db_string = db_string.concat(db["db"][keyTyped].fname, db["db"][keyTyped].lname, db["db"][keyTyped].school, db["db"][keyTyped].major, db["db"][keyTyped].month, db["db"][keyTyped].year);
        var hash_db = await sha256(db_string);
        console.log(hash_db)
        var input_string = "";
        var input_string = input_string.concat(fname.toLowerCase(), lname.toLowerCase(), school.toLowerCase(), major.toLowerCase(), gmonth, gyear);
        var hash_in = await sha256(input_string);
        setHash(hash_in)

        if (hash_in === hash_db){
          setMatched(true)
        }
      }
    }



    async function sendDIPTOKS() {
      

      if (myAccount === ""){
        alert("error connecting to wallet");
        return;
      }

      var contract = new web3.eth.Contract(abi['abi'], contactAdd, {
        from: myAccount[0], // default from address
      });

      await contract.methods.transfer(contactAdd, 1).send(async (e : any, tx : any) => {
        if (e) {
          alert(`Something went wrong! Try switching accounts - ${e}`);
          console.log(e);
        } else {
          console.log(tx);
          // transaction was successful
          await verifyDiploma();
        }
      });



    }


    const handleValidate = async (event : any) =>{
      setMatched(false);
      setHash("");
      event.preventDefault();
      console.log(fname);
      console.log(lname);
      console.log(dipID);
      console.log(school);
      console.log(major);
      console.log(gmonth);
      console.log(gyear);

      if (fname === "" || lname === "" || dipID === "" || school === "" || major === "" || gmonth ==="" || gyear === ""){
        alert("Please correct the inputs");
      } else {await sendDIPTOKS();}
      
      // else send monies to contract
      

    }

  return (
    <div className='form_wrapper'>
    <form>

    <MDBInputGroup textBefore='Graduate' className='mb-3'>
    <input className='form-control' type='text' placeholder="First Name" 
        value={fname} onChange={(e) => {
          try{
            setFName(e.target.value)
          } catch(e){
            console.log(e);
          }
        }}
      />
      <span className='input-group-text'> </span>
      <input className='form-control' placeholder='Last Name' type='text' 
        value={lname} onChange={(e) => {
          try{
            setLName(e.target.value)
          } catch(e){
            console.log(e);
          }
        }}
      />
    </MDBInputGroup>

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

    <label htmlFor='basic-url2' className='form-label'>
      School Information
    </label>
    <MDBInputGroup className='mb-3' textBefore='School'>
      
      <select value={school} className='form-control' id='basic-url2'
        onChange={(e) => {
          try{
            setSchool(e.target.value)
          } catch(e){
            console.log(e);
          }
        }}
      >
        <option value="">Choose School ⏬</option>
          <option value="eng">Cockrell School of Engineering</option>
          <option value="gbs">Graduate School of Business</option>
          <option value="sis">School of Information Sciences</option>
          <option value="cns">College of Natural Sciences</option>
      </select>      
      <span className='input-group-text'> Major </span>
      
      <select value={major} className='form-control' id='basic-url2'
        onChange={(e) => {
          try{
            setMajor(e.target.value)
          } catch(e){
            console.log(e);
          }
        }}
      >
          <option value="">Choose Major ⏬</option>
          <option value="ece">Software Engineering</option>
          <option value="eco">Economics</option>
          <option value="cs">Computer Science</option>
          <option value="math">Mathematics</option>
      </select>
    </MDBInputGroup>

    <MDBInputGroup className='mb-3' textBefore="Graduation Month">
      <input className='form-control' placeholder='MM' type='text' value={gmonth} onChange={(e) => {
          try{
            setMonth(e.target.value)
          } catch(e){
            console.log(e);
          }
        }}/>
      <span className='input-group-text'> Graduation Year </span>
      <input className='form-control' placeholder='YYYY' type='text' value={gyear} onChange={(e) => {
          try{
            setYear(e.target.value)
          } catch(e){
            console.log(e);
          }
        }}/>
    </MDBInputGroup>


    <MDBBtn onClick={handleValidate} type='submit' block>
        Validate
      </MDBBtn>
      <MDBBtn onClick={connect} type='submit' block>
        Connect Wallet
      </MDBBtn>
    </form>


    <div >
      {(!matched && hash != "") ?
      <div>
        <div className='nomatch-txt'>
          No Match   (-1 DTK)
        </div>
      </div>
      : 
      <div>

      </div>
      }
      {(matched) ? <div>
        <div className='match-txt'>
          MATCH   (-1 DTK)
        </div>
          <div className='match-card'> 
            <Card>
              <Card.Body> {hash} </Card.Body>
            </Card>
          </div>
        </div>
        : <div></div>}
    </div>
  </div>
  );
}