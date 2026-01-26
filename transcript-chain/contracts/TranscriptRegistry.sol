// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract TranscriptRegistry {
    mapping(bytes32 => uint256) public timestamp;

    event HashStored(bytes32 indexed fileHash, uint256 timestamp);

    function storeHash(bytes32 fileHash) external {
        require(timestamp[fileHash] == 0, "Hash already exists");
        timestamp[fileHash] = block.timestamp;
        emit HashStored(fileHash, block.timestamp);
    }

    function verifyHash(bytes32 fileHash) external view returns (bool) {
        return timestamp[fileHash] != 0;
    }
}