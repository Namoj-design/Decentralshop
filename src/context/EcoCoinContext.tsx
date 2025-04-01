
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "@/hooks/use-toast";

// Types for eco coin wallet
interface Transaction {
  id: string;
  date: string;
  amount: number;
  type: 'earned' | 'spent';
  description: string;
}

interface EcoCoinContextType {
  balance: number;
  transactions: Transaction[];
  earnCoins: (amount: number, description: string) => void;
  spendCoins: (amount: number, description: string) => boolean;
  canAfford: (amount: number) => boolean;
}

// Create context
const EcoCoinContext = createContext<EcoCoinContextType | undefined>(undefined);

// Provider component
export const EcoCoinProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [balance, setBalance] = useState<number>(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Load wallet data from localStorage on mount
  useEffect(() => {
    const savedBalance = localStorage.getItem('ecoCoins');
    if (savedBalance) {
      try {
        setBalance(JSON.parse(savedBalance));
      } catch (error) {
        console.error('Error loading eco coins balance from localStorage:', error);
      }
    }
    
    const savedTransactions = localStorage.getItem('ecoCoinTransactions');
    if (savedTransactions) {
      try {
        setTransactions(JSON.parse(savedTransactions));
      } catch (error) {
        console.error('Error loading eco coin transactions from localStorage:', error);
      }
    }
  }, []);

  // Save wallet data to localStorage when they change
  useEffect(() => {
    localStorage.setItem('ecoCoins', JSON.stringify(balance));
    localStorage.setItem('ecoCoinTransactions', JSON.stringify(transactions));
  }, [balance, transactions]);

  // Add coins to wallet
  const earnCoins = (amount: number, description: string) => {
    if (amount <= 0) return;
    
    const newTransaction: Transaction = {
      id: `tx-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      date: new Date().toISOString(),
      amount,
      type: 'earned',
      description
    };
    
    setBalance(prev => prev + amount);
    setTransactions(prev => [newTransaction, ...prev]);
    
    toast({
      title: "Eco Coins Earned",
      description: `You earned ${amount} Eco Coins! (${description})`,
    });
  };

  // Spend coins from wallet
  const spendCoins = (amount: number, description: string) => {
    if (amount <= 0) return true;
    
    if (balance < amount) {
      toast({
        title: "Insufficient Eco Coins",
        description: `You need ${amount} Eco Coins, but only have ${balance}.`,
        variant: "destructive",
      });
      return false;
    }
    
    const newTransaction: Transaction = {
      id: `tx-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      date: new Date().toISOString(),
      amount,
      type: 'spent',
      description
    };
    
    setBalance(prev => prev - amount);
    setTransactions(prev => [newTransaction, ...prev]);
    
    toast({
      title: "Eco Coins Spent",
      description: `You spent ${amount} Eco Coins. (${description})`,
    });
    
    return true;
  };

  // Check if user can afford a purchase
  const canAfford = (amount: number) => {
    return balance >= amount;
  };

  return (
    <EcoCoinContext.Provider value={{ balance, transactions, earnCoins, spendCoins, canAfford }}>
      {children}
    </EcoCoinContext.Provider>
  );
};

// Hook for using the eco coin context
export const useEcoCoins = () => {
  const context = useContext(EcoCoinContext);
  if (context === undefined) {
    throw new Error('useEcoCoins must be used within an EcoCoinProvider');
  }
  return context;
};
