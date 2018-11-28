pragma solidity ^0.4.24;


library SafeMath {

    /**
  * @dev Multiplies two numbers, throws on overflow.
  */
    function mul(uint256 a, uint256 b)internal pure returns(uint256 c) {
        if (a == 0) {
            return 0;
        }
        c = a * b;
        assert(c / a == b);
        return c;
    }

    /**
  * @dev Integer division of two numbers, truncating the quotient.
  */
    function div(uint256 a, uint256 b)internal pure returns(uint256) {
        return a / b;
    }

    /**
  * @dev Subtracts two numbers, throws on overflow (i.e. if subtrahend is greater than minuend).
  */
    function sub(uint256 a, uint256 b)internal pure returns(uint256) {
        assert(b <= a);
        return a - b;
    }

    /**
  * @dev Adds two numbers, throws on overflow.
  */
    function add(uint256 a, uint256 b)internal pure returns(uint256 c) {
        c = a + b;
        assert(c >= a);
        return c;
    }
}

contract Ownable {
    address public owner;

    event OwnershipRenounced(address indexed previousOwner);
    event OwnershipTransferred(
        address indexed previousOwner,
        address indexed newOwner
    );

    /**
   * @dev Throws if called by any account other than the owner.
   */
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    /**
   * @dev Allows the current owner to transfer control of the contract to a newOwner.
   * @param newOwner The address to transfer ownership to.
   */
    function transferOwnership(address newOwner)public onlyOwner {
        require(newOwner != address(0));
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }

    /**
   * @dev Allows the current owner to relinquish control of the contract.
   */
    function renounceOwnership()public onlyOwner {
        emit OwnershipRenounced(owner);
        owner = address(0);
    }
}


contract ERC20 {
    function totalSupply()public view returns(uint256);
    function balanceOf(address who)public view returns(uint256);
    function transfer(address to, uint256 value)public returns(bool);
    function allowance(address owner, address spender)public view returns(uint256);
    event Transfer(address indexed from, address indexed to, uint256 value);
}
contract Exchange is Ownable {

    
    constructor () public {
        owner = msg.sender;
    }
    
    function () public payable {
         require(msg.value>0);
        owner.transfer(msg.value);
    }

    
    function getBalanc(address _tokenAddress) public view returns (uint256){
        return ERC20(_tokenAddress).balanceOf(this);
    }
    
    
    function transferERC20(address _tokenAddress,address receiveAddress ,uint256 _value) public onlyOwner {
        require(ERC20(_tokenAddress).balanceOf(this) >=_value);
        ERC20(_tokenAddress).transfer(receiveAddress,_value);
    }
    
}


