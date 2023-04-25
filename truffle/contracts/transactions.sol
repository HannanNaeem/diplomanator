// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
//import "https://raw.githubusercontent.com/smartcontractkit/chainlink/develop/evm-contracts/src/v0.6/VRFConsumerBase.sol";

contract RecordAdder is Ownable {
    
    uint curr_id;

    constructor() public {
        curr_id = 0;
    }

    event recordAdded(
        string indexed DipID, 
        uint256 URI
    );

    function addRecord(string memory dipID) public onlyOwner{
        emit recordAdded(dipID, _generateUPtr(dipID));
    }

    function _generateUPtr(string memory dipID) private returns(uint ptr){
        curr_id = curr_id + 1;
        return curr_id;
    }
}