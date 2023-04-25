import { useWeb3React } from "@web3-react/core";
import {useState, useEffect} from "react";
import web3 from 'web3';
import abi from '../contract_abis/MyToken.json'
import *  as ReactBootStrap from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card, Button, Form, FloatingLabel} from 'react-bootstrap';

const BrowseBC = () => {

const contractAdd = "0xb8401841Dc81a8Bb25D35F6F5C153cC1C802b8e0";
const {active, account, library, activate, deactivate} = useWeb3React()
const [recordAdded, setRecordAdded] = useState([]);

 // Function for event listener for Verification events containing diploma ID and URI
 const recordAddedEvent = async () => {
    const contract = new library.eth.Contract(abi['abi'], contractAdd, {
      from: account, // default from address
    });

    await contract.getPastEvents(
      'recordAdded',
      {
        fromBlock: 0,
        toBlock: 'latest'
      },
      (error: Error, events) => {
        // create array with field DipID and URI
        events.forEach((event) => {
          setRecordAdded((recordAdded) => [...recordAdded, [event.returnValues.DipID, event.returnValues.URI]]);
        });
      }
    );
  };

  const renderRecordEdit = (record, index) => {
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
    <Card>
      <Card.Header>Diploma Records</Card.Header>
      <Card.Body>
        <Card.Title>Browse Verified Diploma Events</Card.Title>
        <Button variant="primary" onClick={showEvents}>View BlockChain Events</Button>


        <FloatingLabel
        controlId="floatingTextarea"
        label="Comments"
        className="mb-3"
      >
        <Form.Control as="textarea" placeholder="Leave a comment here" />
      </FloatingLabel>
      <FloatingLabel controlId="floatingTextarea2" label="Comments">
        <Form.Control
          as="textarea"
          placeholder="Leave a comment here"
          style={{ height: '100px' }}
        />
      </FloatingLabel>

      </Card.Body>
    


    <ReactBootStrap.Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Diploma ID</th>
          <th>URI</th>
        </tr>
      </thead>
      <tbody>
        {recordAdded.map(renderRecordEdit)} 
      </tbody>
    </ReactBootStrap.Table>
    </Card>
  );


};

export default BrowseBC
