import { useWeb3React } from "@web3-react/core";
import {useState, useEffect} from "react";
import web3 from 'web3';
import abi from '../contract_abis/MyToken.json'



const BrowseBC() => {

const contractAdd = "0xc4AC7f01B462f302D15f4c7eB1b13E83f9c8493b";
const {active, account, library, activate, deactivate} = useWeb3React()
const [recordEdit, setRecordEdit] = useState([]);

 // Function for event listener for Verification events containing diploma ID and URI
 const recordEditEvent = async () => {
    const contract = new library.eth.Contract(abi['abi'], contractAdd, {
      from: account, // default from address
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
          setRecordEdit((recordEdit) => [...recordEdit, {event.returnValues.DipID, event.returnValues.URI}]);
        });
      }
    );
  }
}
export default BrowseBC;