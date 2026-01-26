// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SummaryIntegrityRegistry {
    mapping(bytes32 => uint256) public eventTimestamp;

    event SummaryAnchored(bytes32 indexed contentHash, bytes32 indexed eventHash, uint256 timestamp, string meetingId, address indexed submitter);

    function anchorSummary(bytes32 contentHash, bytes32 eventHash, string calldata meetingId) external {
        require(eventTimestamp[eventHash] == 0, "Event already exists");
        eventTimestamp[eventHash] = block.timestamp;
        emit SummaryAnchored(contentHash, eventHash, block.timestamp, meetingId, msg.sender);
    }

    function verifyEvent(bytes32 eventHash) external view returns (bool) {
        return eventTimestamp[eventHash] != 0;
    }
}