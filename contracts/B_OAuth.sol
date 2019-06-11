//編譯指令
//solcjs -o ../migrate --bin --abi B_OAuth.sol
pragma solidity ^0.5.2;

contract B_OAuth {
    address public owner;
    //bytes32 public access_token; //private
    uint public random_number; //private

    mapping(address => bool) participants;//增加運送合約參與者
    mapping(address => bytes32) access_token;

    event participantAdded(address newParticipant);
    event tokenRelease(address msg_sender,bytes32 access_token);

    modifier isParticipant(address _account) {
        require(participants[_account] == true,"account forbidden");
        _;
    }

    //set the owner
    constructor() public{
        owner=msg.sender;
        participants[owner]=true;
    }

    function authentication_req() public isParticipant(msg.sender) {
        random_number = uint(keccak256(abi.encodePacked(block.timestamp)))%100 +1;
        access_token[msg.sender] = (keccak256(abi.encodePacked(now, msg.sender, random_number))) ;
        emit tokenRelease(msg.sender, access_token[msg.sender]);
    }

    function addParticipant(address _newParticipant) public returns(bool){
        require(msg.sender == owner,"Access deny");//only creator can access
        require(_newParticipant != address(0));
        participants[_newParticipant] = true;
        emit participantAdded(_newParticipant);
        return true;
    }
}
