
import { useState, useEffect, useCallback } from "react";
import { connectWallet, getNetworkName } from "@/lib/wallet";
import { toast } from "@/hooks/use-toast";

export interface WalletState {
  address: string | null;
  chainId: string | null;
  networkName: string | null;
  isConnecting: boolean;
  isConnected: boolean;
}

export function useWallet() {
  const [walletState, setWalletState] = useState<WalletState>({
    address: null,
    chainId: null,
    networkName: null,
    isConnecting: false,
    isConnected: false
  });

  const handleAccountsChanged = useCallback((accounts: string[]) => {
    if (accounts.length === 0) {
      // User disconnected
      setWalletState(prev => ({
        ...prev,
        address: null,
        isConnected: false
      }));
      toast({
        title: "Wallet disconnected",
        description: "Your wallet has been disconnected",
      });
    } else if (accounts[0] !== walletState.address) {
      // Account changed
      setWalletState(prev => ({
        ...prev,
        address: accounts[0],
        isConnected: true
      }));
      toast({
        title: "Account changed",
        description: `Connected to new account: ${accounts[0].substring(0, 6)}...`,
      });
    }
  }, [walletState.address]);

  const handleChainChanged = useCallback((chainId: string) => {
    const networkName = getNetworkName(chainId);
    setWalletState(prev => ({
      ...prev,
      chainId,
      networkName
    }));
    
    toast({
      title: "Network changed",
      description: `Connected to ${networkName}`,
    });
    
    // Reload the page as recommended by MetaMask
    window.location.reload();
  }, []);

  const connectToWallet = useCallback(async () => {
    setWalletState(prev => ({ ...prev, isConnecting: true }));
    
    try {
      const address = await connectWallet();
      
      if (address) {
        const chainId = await window.ethereum!.request({ method: 'eth_chainId' });
        const networkName = getNetworkName(chainId);
        
        setWalletState({
          address,
          chainId,
          networkName,
          isConnecting: false,
          isConnected: true
        });
      } else {
        setWalletState(prev => ({ ...prev, isConnecting: false }));
      }
    } catch (error) {
      console.error("Error in connectToWallet:", error);
      setWalletState(prev => ({ ...prev, isConnecting: false }));
    }
  }, []);

  // Disconnect wallet function
  const disconnectWallet = useCallback(async () => {
    // MetaMask doesn't have a disconnect method, so we just reset the state
    setWalletState({
      address: null,
      chainId: null,
      networkName: null,
      isConnecting: false,
      isConnected: false
    });

    toast({
      title: "Wallet disconnected",
      description: "You have successfully disconnected your wallet",
    });

    // Clear any wallet-related data from local storage
    localStorage.removeItem('walletConnected');
    
    // Note: MetaMask and most providers don't have a standard disconnect method
    // We're handling disconnection by just resetting our app state
  }, []);

  // Check if already connected on initial load
  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum && window.ethereum.selectedAddress) {
        const address = window.ethereum.selectedAddress;
        const chainId = window.ethereum.chainId;
        const networkName = getNetworkName(chainId);
        
        setWalletState({
          address,
          chainId,
          networkName,
          isConnecting: false,
          isConnected: true
        });
      }
    };
    
    checkConnection();
  }, []);

  // Setup event listeners
  useEffect(() => {
    if (!window.ethereum) return;

    window.ethereum.on('accountsChanged', handleAccountsChanged);
    window.ethereum.on('chainChanged', handleChainChanged);

    return () => {
      window.ethereum?.removeListener('accountsChanged', handleAccountsChanged);
      window.ethereum?.removeListener('chainChanged', handleChainChanged);
    };
  }, [handleAccountsChanged, handleChainChanged]);

  return {
    ...walletState,
    connectWallet: connectToWallet,
    disconnectWallet
  };
}
