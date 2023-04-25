import './App.css';
import { useWeb3React } from "@web3-react/core";
import {useState, useEffect} from "react";
import web3 from 'web3';
import { injected } from "./wallet/Connect";
import abi from './contract_abis/MyToken.json'
import {BrowserRouter,Routes,Route} from "react-router-dom";
import  Verify  from "./pages/Verify";
import Home from './pages/Home';
import AddRecord from './pages/AddRecord';
import BrowseBC from './pages/BrowseBC';


function App() {
  
 
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route  path = "/" element={<Home/>}/>
        <Route  path = "/pages/Verify" element={<Verify/>}/>
        <Route  path = "/pages/AddRecord" element={<AddRecord/>}/>
        <Route  path = "/pages/BrowseBC" element={<BrowseBC/>}/>
      </Routes>
    </BrowserRouter>
    </>

 
  );
}


export default App;