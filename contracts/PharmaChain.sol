// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract PharmaChain {
    address public owner;

    struct Batch {
        string id;
        string compoundId;
        uint256 timestamp;
        address currentHolder;
        bool isVerified;
    }

    mapping(string => Batch) public batches;
    string[] public batchIds;

    event BatchCreated(string id, address indexed creator);
    event BatchTransferred(string id, address indexed from, address indexed to);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    function createBatch(string memory _id, string memory _compoundId) public onlyOwner {
        require(bytes(batches[_id].id).length == 0, "Batch already exists");
        
        batches[_id] = Batch({
            id: _id,
            compoundId: _compoundId,
            timestamp: block.timestamp,
            currentHolder: msg.sender,
            isVerified: true
        });
        
        batchIds.push(_id);
        emit BatchCreated(_id, msg.sender);
    }

    function transferBatch(string memory _id, address _to) public {
        require(batches[_id].currentHolder == msg.sender, "Not the current holder");
        require(_to != address(0), "Invalid address");

        batches[_id].currentHolder = _to;
        emit BatchTransferred(_id, msg.sender, _to);
    }

    function getBatchCount() public view returns (uint256) {
        return batchIds.length;
    }
}
