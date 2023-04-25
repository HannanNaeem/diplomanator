import React, { useEffect, useState } from 'react';
import './Form.css';
import { useWeb3React } from "@web3-react/core";
import '@coreui/coreui/dist/css/coreui.min.css'
import abi from "../contract_abis/MyToken.json"
import web3 from 'web3';
import {
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBInputGroup
} from 'mdb-react-ui-kit';

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

    const contactAdd = "0xc4AC7f01B462f302D15f4c7eB1b13E83f9c8493b";
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
    }, [myAccount]);

    
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
        }
      });
    }


    const handleValidate = async (event : any) =>{
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
          <option value="ENG">Cockrell School of Engineering</option>
          <option value="GBS">Graduate School of Business</option>
          <option value="SIS">School of Information Sciences</option>
          <option value="CNS">College of Natural Sciences</option>
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
          <option value="ECE">Software Engineering</option>
          <option value="ECO">Economics</option>
          <option value="CS">Computer Science</option>
          <option value="MATH">Mathematics</option>
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
  </div>
  );
}