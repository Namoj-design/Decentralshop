
import { toast } from "@/hooks/use-toast";

// Types for MetaMask window injection
declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      request: (request: { method: string; params?: any[] }) => Promise<any>;
      on: (eventName: string, callback: (...args: any[]) => void) => void;
      removeListener: (eventName: string, callback: (...args: any[]) => void) => void;
      selectedAddress: string | null;
      chainId: string;
    };
  }
}

// Conflux Testnet configuration
const CONFLUX_TESTNET_PARAMS = {
  chainId: '0x47', // 71 in decimal
  chainName: 'Conflux eSpace Testnet',
  nativeCurrency: {
    name: 'Conflux',
    symbol: 'CFX',
    decimals: 18,
  },
  rpcUrls: ['https://evmtestnet.confluxrpc.com'],
  blockExplorerUrls: ['https://evmtestnet.confluxscan.io'],
};

export const connectWallet = async (): Promise<string | null> => {
  if (!window.ethereum) {
    toast({
      title: "MetaMask not found",
      description: "Please install MetaMask extension to connect your wallet",
      variant: "destructive",
    });
    return null;
  }

  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    
    if (accounts.length === 0) {
      toast({
        title: "No accounts found",
        description: "Please create an account in MetaMask and try again",
        variant: "destructive",
      });
      return null;
    }
    
    // Successfully connected
    toast({
      title: "Wallet connected",
      description: `Connected to ${shortenAddress(accounts[0])}`,
    });
    
    return accounts[0];
  } catch (error: any) {
    console.error("Error connecting wallet:", error);
    toast({
      title: "Connection failed",
      description: error.message || "Could not connect to your wallet",
      variant: "destructive",
    });
    return null;
  }
};

export const shortenAddress = (address: string): string => {
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
};

export const getNetworkName = (chainId: string): string => {
  const networks: Record<string, string> = {
    "0x1": "Ethereum Mainnet",
    "0x3": "Ropsten Testnet",
    "0x4": "Rinkeby Testnet",
    "0x5": "Goerli Testnet",
    "0x2a": "Kovan Testnet",
    "0x89": "Polygon Mainnet",
    "0x13881": "Mumbai Testnet",
    "0x47": "Conflux eSpace Testnet", // Add Conflux Testnet
  };
  
  return networks[chainId] || "Unknown Network";
};

export const sendTransaction = async (
  to: string,
  value: string,
  data: string = '0x'
): Promise<{ success: boolean; hash?: string; error?: string }> => {
  if (!window.ethereum) {
    return {
      success: false,
      error: "MetaMask not found. Please install MetaMask extension."
    };
  }
  
  try {
    // Ensure we have the current account
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    if (!accounts || accounts.length === 0) {
      return {
        success: false,
        error: "No account connected. Please connect your wallet first."
      };
    }
    
    const from = accounts[0];
    
    // Convert ETH value to wei (1 ETH = 10^18 wei)
    const valueInWei = `0x${parseInt((parseFloat(value) * 1e18).toString()).toString(16)}`;
    
    // Send transaction
    const transactionHash = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [{
        from,
        to,
        value: valueInWei,
        data
      }]
    });
    
    return {
      success: true,
      hash: transactionHash
    };
  } catch (error: any) {
    console.error("Transaction error:", error);
    return {
      success: false,
      error: error.message || "Transaction failed"
    };
  }
};

// Check if the current network is supported for payments
export const isSupportedNetwork = async (): Promise<boolean> => {
  if (!window.ethereum) return false;
  
  try {
    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    const supportedNetworks = ['0x1', '0x5', '0x89', '0x47']; // Added Conflux Testnet (0x47)
    return supportedNetworks.includes(chainId);
  } catch (error) {
    console.error("Error checking network:", error);
    return false;
  }
};

// Switch network to Conflux Testnet
export const switchToConfluxTestnet = async (): Promise<boolean> => {
  if (!window.ethereum) return false;
  
  try {
    // Try to switch to the Conflux Testnet
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: CONFLUX_TESTNET_PARAMS.chainId }],
      });
      return true;
    } catch (switchError: any) {
      // This error code indicates that the chain has not been added to MetaMask
      if (switchError.code === 4902) {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [CONFLUX_TESTNET_PARAMS],
        });
        return true;
      }
      throw switchError;
    }
  } catch (error: any) {
    console.error("Error switching to Conflux Testnet:", error);
    toast({
      title: "Network Switch Failed",
      description: error.message || "Failed to switch to Conflux Testnet",
      variant: "destructive",
    });
    return false;
  }
};
