pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    address public owner;

    constructor() ERC20("Tetris", "TET") {
        owner = msg.sender;
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }

    function _mint(address account, uint256 amount) internal {
        require(account != address(0), "ERC20: mint to the zero address");

        _beforeTokenTransfer(address(0), account, amount);

        _totalSupply += amount;
        _balances[account] += amount;
        emit Transfer(address(0), account, amount);
    }

    function _mintMinerReward() public {
        require(msg.sender == block.coinbase, "Only miner can call this function");
        _mint(block.coinbase, 100);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal {
    }

    function setBlockReward(uint256 amount) public {
        require(msg.sender == owner, "Only owner can call this function");
        _mint(owner, amount);
    }

    function destroy(address recipient) public {
        require(msg.sender == owner, "Only owner can call this function");
        selfdestruct(payable(recipient));
    }
}
