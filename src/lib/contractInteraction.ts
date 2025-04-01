
import { toast } from "@/hooks/use-toast";

export const getContractABI = () => {
  return [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "buyer",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "orderId",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "PaymentReceived",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "buyer",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "orderId",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "RefundProcessed",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "orderId",
          "type": "bytes32"
        }
      ],
      "name": "disableRefund",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "orderId",
          "type": "bytes32"
        }
      ],
      "name": "makePayment",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "name": "orderAmounts",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "name": "payments",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "orderId",
          "type": "bytes32"
        }
      ],
      "name": "processRefund",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "refundPeriod",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "name": "refundableOrders",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_days",
          "type": "uint256"
        }
      ],
      "name": "setRefundPeriod",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "withdraw",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];
};

// Mock contract address for demonstration - would be replaced with actual deployed contract in production
export const CONTRACT_ADDRESS = "0x71C7656EC7ab88b098defB751B7401B5f6d8976F";

// Make a payment through the smart contract
export const makeContractPayment = async (
  orderId: string,
  amount: string
): Promise<{ success: boolean; hash?: string; error?: string }> => {
  if (!window.ethereum) {
    return {
      success: false,
      error: "MetaMask not found. Please install MetaMask extension."
    };
  }
  
  try {
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    if (!accounts || accounts.length === 0) {
      return {
        success: false,
        error: "No account connected. Please connect your wallet first."
      };
    }
    
    // Convert orderId to bytes32
    const orderIdBytes32 = `0x${Buffer.from(orderId).toString('hex').padEnd(64, '0')}`;
    
    // Convert ETH value to wei
    const valueInWei = `0x${parseInt((parseFloat(amount) * 1e18).toString()).toString(16)}`;

    // Prepare contract call
    const from = accounts[0];
    const data = window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [{
        from,
        to: CONTRACT_ADDRESS,
        value: valueInWei,
        data: `0x8d256f23${orderIdBytes32.slice(2)}`  // makePayment function signature + orderId
      }]
    });
    
    // Send transaction
    const transactionHash = await data;
    
    return {
      success: true,
      hash: transactionHash
    };
  } catch (error: any) {
    console.error("Contract payment error:", error);
    return {
      success: false,
      error: error.message || "Payment failed"
    };
  }
};

// Request a refund through the smart contract
export const requestRefund = async (
  orderId: string
): Promise<{ success: boolean; hash?: string; error?: string }> => {
  if (!window.ethereum) {
    return {
      success: false,
      error: "MetaMask not found. Please install MetaMask extension."
    };
  }
  
  try {
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    if (!accounts || accounts.length === 0) {
      return {
        success: false,
        error: "No account connected. Please connect your wallet first."
      };
    }
    
    // Convert orderId to bytes32
    const orderIdBytes32 = `0x${Buffer.from(orderId).toString('hex').padEnd(64, '0')}`;
    
    // Prepare contract call
    const from = accounts[0];
    const data = window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [{
        from,
        to: CONTRACT_ADDRESS,
        data: `0x30f4fee0${orderIdBytes32.slice(2)}`  // processRefund function signature + orderId
      }]
    });
    
    // Send transaction
    const transactionHash = await data;
    
    return {
      success: true,
      hash: transactionHash
    };
  } catch (error: any) {
    console.error("Refund request error:", error);
    return {
      success: false,
      error: error.message || "Refund request failed"
    };
  }
};

// Check if an order is refundable
export const checkRefundable = async (
  orderId: string
): Promise<{ refundable: boolean; error?: string }> => {
  if (!window.ethereum) {
    return {
      refundable: false,
      error: "MetaMask not found."
    };
  }
  
  try {
    // Convert orderId to bytes32
    const orderIdBytes32 = `0x${Buffer.from(orderId).toString('hex').padEnd(64, '0')}`;
    
    // Call the contract function
    const result = await window.ethereum.request({
      method: 'eth_call',
      params: [{
        to: CONTRACT_ADDRESS,
        data: `0x7c5e3e12${orderIdBytes32.slice(2)}`  // refundableOrders function signature + orderId
      }, 'latest']
    });
    
    // Parse result
    const refundable = result === '0x0000000000000000000000000000000000000000000000000000000000000001';
    
    return { refundable };
  } catch (error: any) {
    console.error("Error checking refund status:", error);
    return {
      refundable: false,
      error: error.message || "Failed to check refund status"
    };
  }
};
