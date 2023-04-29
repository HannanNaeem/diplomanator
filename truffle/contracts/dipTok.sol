// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC20, ERC20Burnable, Ownable {

    event paymentReceived(address indexed from);
    event sentTokens(address indexed to);

    address[] private _pendingMints;

    constructor() ERC20("DipTok", "DTK") {}

    function mint() private {
        address to = _pendingMints[_pendingMints.length-1];
        uint256 amount = 10;
        _mint(to, amount*(10**18));
        emit sentTokens(to);
        _pendingMints.pop();
    }

    receive() external payable{
        require(msg.value == 1 ether, "Incorrect amount");
        emit paymentReceived(msg.sender);
        _pendingMints.push(msg.sender);
        mint();
    }
}
