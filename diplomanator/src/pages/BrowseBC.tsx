import { useWeb3React } from "@web3-react/core";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState, useEffect} from "react";
import web3 from 'web3';
import abi from '../contract_abis/RecordAdder.json'
import *  as ReactBootStrap from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card, Button, Form, FloatingLabel} from 'react-bootstrap';
import "../App.css"


const BrowseBC = () => {

const contractAdd = "0x1A89d806032e27B33137581f24b64E19aa7B1e98";
const [record, setRecord] = useState<any>([]);
const [myAccount , setMyAccount] = useState("");

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
 // Function for event listener for Verification events containing diploma ID and URI
const recordAddedEvent = async () => {
    const contract = new web3.eth.Contract(abi['abi'], contractAdd, {
      from: myAccount[0], // default from address
    });

    await contract.getPastEvents(
      "recordAdded",
      {
        fromBlock: 0,
        toBlock: 'latest'
      },
      function(error: any, events : any){ console.log(events); })
      .then(function(events : any){
        events.forEach((event:any) => {
          let data = {
            DipID: event.returnValues.URI,
            URI: event.returnValues.DipID
          }
        setRecord((record:any) => [...record, data]); // same results as the optional callback above
        });
      });

    };

  const renderRecordEdit = (record:any, index:any) => {
    return(
      <tr>
        <td>{record.DipID}</td>
        <td>{record.URI}</td>
      </tr>
    )
  }

  const showEvents = () => {
    recordAddedEvent();
  }


  return(
    <div className="events-table">
    <Card>
      <Card.Header><div className="eventsHead-txt">Diploma Records</div></Card.Header>
      <Card.Body>
        <Card.Title>Browse Verified Diploma Events</Card.Title>
        <Button variant="primary" onClick={showEvents}>View BlockChain Events</Button>
        <Button variant="primary" onClick={connect}>Get current account</Button>

      </Card.Body>
    


    <ReactBootStrap.Table striped bordered hover>
      <thead>
        <tr>
          <th>URI</th>
          <th>Diploma ID (encoded)</th>
        </tr>
      </thead>
      <tbody>
        {record.map(renderRecordEdit)} 
      </tbody>
    </ReactBootStrap.Table>
    </Card>
    </div>
  );


};

export default BrowseBC
