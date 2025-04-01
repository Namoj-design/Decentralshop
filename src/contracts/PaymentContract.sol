
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PaymentContract {
    address public owner;
    mapping(address => mapping(bytes32 => uint256)) public payments;
    mapping(bytes32 => bool) public refundableOrders;
    mapping(bytes32 => uint256) public orderAmounts;
    uint256 public refundPeriod = 14 days; // 14 day refund period
    
    event PaymentReceived(address indexed buyer, bytes32 indexed orderId, uint256 amount);
    event RefundProcessed(address indexed buyer, bytes32 indexed orderId, uint256 amount);
    
    constructor() {
        owner = msg.sender;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    // Receive payment for an order
    function makePayment(bytes32 orderId) external payable {
        require(msg.value > 0, "Payment amount must be greater than zero");
        
        // Record the payment
        payments[msg.sender][orderId] = msg.value;
        orderAmounts[orderId] = msg.value;
        refundableOrders[orderId] = true;
        
        emit PaymentReceived(msg.sender, orderId, msg.value);
    }
    
    // Process refund for a given order
    function processRefund(bytes32 orderId) external {
        require(refundableOrders[orderId], "Order is not refundable");
        require(payments[msg.sender][orderId] > 0, "No payment found for this order");
        
        uint256 refundAmount = payments[msg.sender][orderId];
        
        // Clear the payment record before sending to prevent reentrancy attacks
        payments[msg.sender][orderId] = 0;
        refundableOrders[orderId] = false;
        
        // Send the refund
        (bool success, ) = payable(msg.sender).call{value: refundAmount}("");
        require(success, "Refund failed");
        
        emit RefundProcessed(msg.sender, orderId, refundAmount);
    }
    
    // Set refund period
    function setRefundPeriod(uint256 _days) external onlyOwner {
        refundPeriod = _days * 1 days;
    }
    
    // Disable refund for an order (for expired refund periods)
    function disableRefund(bytes32 orderId) external onlyOwner {
        refundableOrders[orderId] = false;
    }
    
    // Withdraw funds to owner
    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds available to withdraw");
        
        (bool success, ) = payable(owner).call{value: balance}("");
        require(success, "Withdrawal failed");
    }
}
