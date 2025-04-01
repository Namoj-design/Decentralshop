
import { useState } from 'react';
import { useWallet } from '@/hooks/use-wallet';
import { sendTransaction, isSupportedNetwork, switchToConfluxTestnet } from '@/lib/wallet';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { useOrders } from '@/context/OrderContext';
import { useEcoCoins } from '@/context/EcoCoinContext';
import { useCart } from '@/context/CartContext';
import { makeContractPayment, requestRefund } from '@/lib/contractInteraction';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Wallet, ArrowRight, CheckCircle, Loader2, AlertCircle, RefreshCw } from 'lucide-react';

interface CryptoPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  price: number;
  sellerAddress?: string;
  onPaymentComplete: () => void;
}

// Mock seller address if none provided
const DEFAULT_SELLER_ADDRESS = '0x71C7656EC7ab88b098defB751B7401B5f6d8976F';

const CryptoPaymentModal = ({
  isOpen,
  onClose,
  productName,
  price,
  sellerAddress = DEFAULT_SELLER_ADDRESS,
  onPaymentComplete
}: CryptoPaymentModalProps) => {
  const { address, isConnected, connectWallet, chainId } = useWallet();
  const { addOrder, orders } = useOrders();
  const { earnCoins } = useEcoCoins();
  const { items, clearCart } = useCart();
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [transactionHash, setTransactionHash] = useState<string | null>(null);
  const [currency, setCurrency] = useState('CFX');
  const [switchingNetwork, setSwitchingNetwork] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  
  // Exchange rates (mock data - in a real app, these would come from an API)
  const exchangeRates = {
    'CFX': 1,      // Base currency for Conflux
    'ETH': 0.005,  // Example: 1 CFX = 0.005 ETH
    'MATIC': 0.25, // Example: 1 CFX = 0.25 MATIC
    'USDC': 5      // Example: 1 CFX = 5 USDC
  };
  
  const calculatePrice = (priceInETH: number, selectedCurrency: string): number => {
    // Convert from ETH price to CFX equivalent price
    const cfxPrice = priceInETH / 0.005;  // Assuming 1 CFX = 0.005 ETH
    return cfxPrice * (exchangeRates[selectedCurrency as keyof typeof exchangeRates] || 1);
  };

  // Check if we're on Conflux Testnet
  const isConfluxNetwork = chainId === '0x47';
  
  const handleSwitchToConflux = async () => {
    setSwitchingNetwork(true);
    const success = await switchToConfluxTestnet();
    setSwitchingNetwork(false);
    
    if (success) {
      toast({
        title: "Network Changed",
        description: "Successfully switched to Conflux eSpace Testnet",
      });
    }
  };
  
  const handlePayment = async () => {
    // Check if user is connected to wallet
    if (!isConnected || !address) {
      await connectWallet();
      return;
    }
    
    // Check if on Conflux network
    if (!isConfluxNetwork) {
      toast({
        title: "Wrong Network",
        description: "Please switch to Conflux eSpace Testnet to make payments",
        variant: "destructive",
      });
      await handleSwitchToConflux();
      return;
    }
    
    setPaymentStatus('processing');
    
    try {
      // Convert price based on selected currency
      const paymentAmount = calculatePrice(price, currency).toString();
      
      // Generate a unique order ID - in a real system this would be more robust
      const newOrderId = `order-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      setOrderId(newOrderId);
      
      // Use the smart contract for payment
      const result = await makeContractPayment(newOrderId, paymentAmount);
      
      if (result.success && result.hash) {
        setTransactionHash(result.hash);
        setPaymentStatus('success');
        
        // Create order items based on cart or single product
        const orderItems = items.length > 0 
          ? items.map(item => ({
              ...item,
              id: item.id.toString() // Convert number id to string
            }))
          : [{
              id: Date.now().toString(),
              name: productName,
              price,
              currency: "ETH",
              quantity: 1,
              image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300"
            }];
        
        // Fix: Calculate total price with proper typing - this was causing the error
        let totalAmount = 0;
        for (const item of orderItems) {
          totalAmount += item.price * item.quantity;
        }
        
        // Add the order to the system
        addOrder({
          date: new Date().toISOString(),
          items: orderItems,
          total: totalAmount,
          status: 'processing',
          transactionHash: result.hash,
          estimatedDelivery: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 2 weeks from now
          trackingNumber: `TRK${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
          refundable: true,  // Mark as refundable
          orderId: newOrderId  // Store the orderId for refund requests
        });
        
        // Award eco coins (5% of the price in eco coins)
        const ecoCoinsEarned = Math.round(price * 100);
        earnCoins(ecoCoinsEarned, `Purchase: ${productName}`);
        
        // Clear the cart if this was a cart purchase
        if (items.length > 0) {
          clearCart();
        }
        
        onPaymentComplete();
        
        toast({
          title: "Payment successful!",
          description: "Your order has been placed and you've earned Eco Coins!",
        });
      } else {
        setPaymentStatus('error');
        toast({
          title: "Payment failed",
          description: result.error || "There was an error processing your payment",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error("Payment error:", error);
      setPaymentStatus('error');
      toast({
        title: "Payment error",
        description: error.message || "There was an error processing your payment",
        variant: "destructive",
      });
    }
  };
  
  const handleRefund = async (orderId: string) => {
    if (!isConnected || !address) {
      await connectWallet();
      return;
    }

    setPaymentStatus('processing');

    try {
      const result = await requestRefund(orderId);

      if (result.success && result.hash) {
        setTransactionHash(result.hash);
        setPaymentStatus('success');

        // Update the order status
        const updatedOrders = orders.map(order => {
          if (order.orderId === orderId) {
            return {
              ...order,
              status: 'cancelled',
              refundable: false,
              refundTransactionHash: result.hash
            };
          }
          return order;
        });

        toast({
          title: "Refund processed successfully!",
          description: "Your refund has been processed and funds will be returned to your wallet",
        });
      } else {
        setPaymentStatus('error');
        toast({
          title: "Refund failed",
          description: result.error || "There was an error processing your refund",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error("Refund error:", error);
      setPaymentStatus('error');
      toast({
        title: "Refund error",
        description: error.message || "There was an error processing your refund",
        variant: "destructive",
      });
    }
  };
  
  const resetModal = () => {
    setPaymentStatus('idle');
    setTransactionHash(null);
    onClose();
  };

  const getExplorerLink = () => {
    return transactionHash ? 
      `https://evmtestnet.confluxscan.io/tx/${transactionHash}` : 
      '#';
  };

  return (
    <Dialog open={isOpen} onOpenChange={resetModal}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Crypto Payment</DialogTitle>
          <DialogDescription>
            Pay for {productName} using cryptocurrency on Conflux eSpace Testnet
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {!isConfluxNetwork && isConnected && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-4">
              <h4 className="font-medium text-yellow-800 flex items-center">
                <AlertCircle className="h-4 w-4 mr-2" /> Network Change Required
              </h4>
              <p className="text-sm text-yellow-700 mt-1 mb-3">
                You need to switch to Conflux eSpace Testnet to continue with the payment.
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                className="bg-yellow-100 text-yellow-800 border-yellow-300 hover:bg-yellow-200"
                onClick={handleSwitchToConflux}
                disabled={switchingNetwork}
              >
                {switchingNetwork ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Switching Network...
                  </>
                ) : (
                  <>
                    Switch to Conflux Testnet
                  </>
                )}
              </Button>
            </div>
          )}
          
          {paymentStatus === 'idle' && (
            <>
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">Product:</div>
                <div className="font-medium">{productName}</div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">Select currency:</div>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CFX">CFX</SelectItem>
                    <SelectItem value="ETH">ETH</SelectItem>
                    <SelectItem value="MATIC">MATIC</SelectItem>
                    <SelectItem value="USDC">USDC</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">Amount:</div>
                <div className="text-lg font-bold">
                  {calculatePrice(price, currency).toFixed(4)} {currency}
                </div>
              </div>
              
              <div className="flex justify-between items-center py-2 px-3 bg-blue-50 text-blue-800 rounded-md text-sm">
                <div className="flex items-center">
                  <Wallet size={16} className="mr-2" />
                  Recipient:
                </div>
                <div className="font-mono">{sellerAddress.substring(0, 8)}...{sellerAddress.substring(sellerAddress.length - 6)}</div>
              </div>
              
              <div className="bg-green-50 p-3 rounded-md border border-green-100">
                <p className="text-sm text-green-800 flex items-center">
                  <CheckCircle className="h-4 w-4 mr-1 text-green-600" />
                  You'll earn {Math.round(price * 100)} Eco Coins with this purchase!
                </p>
              </div>

              <div className="bg-blue-50 p-3 rounded-md border border-blue-100">
                <p className="text-sm text-blue-800">
                  All purchases are eligible for refund within 14 days directly to your wallet through our smart contract.
                </p>
              </div>
            </>
          )}
          
          {paymentStatus === 'processing' && (
            <div className="flex flex-col items-center justify-center py-8">
              <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
              <p className="text-center font-medium">Processing your payment...</p>
              <p className="text-center text-sm text-muted-foreground mt-1">Please confirm the transaction in your wallet</p>
            </div>
          )}
          
          {paymentStatus === 'success' && (
            <div className="flex flex-col items-center justify-center py-8">
              <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
              <p className="text-center font-medium text-green-700">Payment successful!</p>
              <p className="text-center text-sm text-green-600 mt-1">
                You've earned {Math.round(price * 100)} Eco Coins!
              </p>
              {transactionHash && (
                <div className="mt-4 p-3 bg-green-50 rounded-md w-full">
                  <p className="text-xs text-green-800 font-semibold mb-1">Transaction Hash:</p>
                  <p className="text-xs font-mono break-all text-green-700">{transactionHash}</p>
                  <a 
                    href={getExplorerLink()} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-2 text-xs text-green-600 hover:text-green-800 flex items-center justify-center"
                  >
                    View on Conflux Explorer
                    <ArrowRight size={12} className="ml-1" />
                  </a>
                </div>
              )}
              <div className="mt-4 w-full">
                <p className="text-sm text-center mb-2">
                  If needed, you can request a refund within 14 days.
                </p>
              </div>
            </div>
          )}
          
          {paymentStatus === 'error' && (
            <div className="flex flex-col items-center justify-center py-8">
              <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
              <p className="text-center font-medium text-red-700">Payment failed</p>
              <p className="text-center text-sm text-red-500 mt-1">Please try again or use a different payment method</p>
            </div>
          )}
        </div>
        
        <DialogFooter className="sm:justify-between flex flex-col-reverse sm:flex-row gap-3">
          {paymentStatus === 'idle' && (
            <>
              <Button variant="outline" onClick={onClose}>Cancel</Button>
              <Button 
                className="gap-2" 
                onClick={handlePayment}
                disabled={isConnected && !isConfluxNetwork}
              >
                {!isConnected ? (
                  <>Connect Wallet</>
                ) : !isConfluxNetwork ? (
                  <>Switch Network First</>
                ) : (
                  <>Pay with {currency} <ArrowRight size={16} /></>
                )}
              </Button>
            </>
          )}
          
          {(paymentStatus === 'success' || paymentStatus === 'error') && (
            <Button onClick={resetModal} className="w-full sm:w-auto">
              {paymentStatus === 'success' ? 'Close' : 'Try Again'}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CryptoPaymentModal;
