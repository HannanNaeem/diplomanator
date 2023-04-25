import React from "react";
import Form from "../components/Form"
import { useWeb3React } from "@web3-react/core";
import "../App.css"

const Verify = () => {

    
      // await contract.methods.receivePayment().send(async (e : any, tx : any) => {
      //   if (e) {
      //     alert(`Something went wrong! Try switching accounts - ${e}`);
      //     console.log("ERROR ->", e);
      //   } else {
      //     console.log(tx);
      //   }
      //   setMinting(false);

  return (
    <div className="form_wrapper">
    <div className="pageHead-txt">
      Verify Diploma
      </div>
      <Form/>
    </div>
  );
};
  
export default Verify;

