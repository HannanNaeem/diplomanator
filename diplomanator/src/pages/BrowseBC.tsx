import '../App.css';
import { useWeb3React } from "@web3-react/core";
import {useState, useEffect} from "react";
import web3 from 'web3';
import { injected } from "../wallet/Connect";
import abi from '../contract_abis/MyToken.json'
import {useNavigate} from "react-router-dom";