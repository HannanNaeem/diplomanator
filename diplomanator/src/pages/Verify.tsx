import React from "react";
import Form from "../components/Form"
import { useWeb3React } from "@web3-react/core";
import "../App.css"

const Verify = () => {


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

