import '../App.css';
import { useWeb3React } from "@web3-react/core";
import {useState, useEffect} from "react";
import web3 from 'web3';
import { injected } from "../wallet/Connect";
import abi from '../contract_abis/MyToken.json'
import {useNavigate} from "react-router-dom";

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