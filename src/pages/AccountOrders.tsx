
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useOrders } from '@/context/OrderContext';
import { useWallet } from '@/hooks/use-wallet';
import OrderTracker from '@/components/OrderTracker';
import EcoWallet from '@/components/EcoWallet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Package, ShoppingBag, ArrowLeft, RotateCcw, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const AccountOrders = () => {
  const { orders, requestRefund } = useOrders();
  const { isConnected, connectWallet } = useWallet();
  const [processingRefundId, setProcessingRefundId] = useState<string | null>(null);
  
  const handleRefundRequest = async (orderId: string) => {
    if (!isConnected) {
      await connectWallet();
      return;
    }
    
    setProcessingRefundId(orderId);
    try {
      await requestRefund(orderId);
      setProcessingRefundId(null);
    } catch (error) {
      console.error("Error processing refund:", error);
      setProcessingRefundId(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="mb-8">
          <Link to="/account">
            <Button variant="ghost" className="pl-0 flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Account
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-apple-text mt-4">My Orders & Rewards</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="active" className="w-full">
              <TabsList>
                <TabsTrigger value="active" className="flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Active Orders
                </TabsTrigger>
                <TabsTrigger value="completed" className="flex items-center gap-2">
                  <ShoppingBag className="h-4 w-4" />
                  Order History
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="active" className="mt-6">
                {orders.filter(order => ['processing', 'shipped'].includes(order.status)).length === 0 ? (
                  <div className="text-center py-12 border rounded-lg">
                    <Package className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium mb-2">No active orders</h3>
                    <p className="text-muted-foreground mb-6">You don't have any active orders at the moment</p>
                    <Link to="/categories">
                      <Button>Browse Products</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {orders
                      .filter(order => ['processing', 'shipped'].includes(order.status))
                      .map(order => (
                        <div key={order.id} className="border rounded-lg overflow-hidden">
                          <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                              <div>
                                <p className="text-sm text-muted-foreground">Order #{order.id.slice(-8)}</p>
                                <p className="text-sm text-muted-foreground">
                                  Placed on {new Date(order.date).toLocaleDateString()}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">{order.total.toFixed(6)} ETH</p>
                                <p className="text-sm text-muted-foreground">
                                  {order.items.reduce((sum, item) => sum + item.quantity, 0)} items
                                </p>
                              </div>
                            </div>
                            
                            <OrderTracker order={order} />
                            
                            <div className="space-y-4">
                              {order.items.map((item, index) => (
                                <div key={index} className="flex gap-4">
                                  <div className="w-16 h-16 rounded bg-gray-100 overflow-hidden flex-shrink-0">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                  </div>
                                  <div>
                                    <p className="font-medium">{item.name}</p>
                                    <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                                    <p className="text-sm">{item.price} {item.currency}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                            
                            {order.refundable && !order.refundTransactionHash && (
                              <div className="mt-6">
                                <Button 
                                  variant="outline"
                                  className="w-full flex items-center justify-center gap-2"
                                  onClick={() => handleRefundRequest(order.id)}
                                  disabled={processingRefundId === order.id}
                                >
                                  {processingRefundId === order.id ? (
                                    <>
                                      <Loader2 className="h-4 w-4 animate-spin" />
                                      Processing Refund...
                                    </>
                                  ) : (
                                    <>
                                      <RotateCcw className="h-4 w-4" />
                                      Request Refund
                                    </>
                                  )}
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="completed" className="mt-6">
                {orders.filter(order => ['delivered', 'cancelled'].includes(order.status)).length === 0 ? (
                  <div className="text-center py-12 border rounded-lg">
                    <ShoppingBag className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium mb-2">No order history</h3>
                    <p className="text-muted-foreground mb-6">You haven't completed any orders yet</p>
                    <Link to="/categories">
                      <Button>Browse Products</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {orders
                      .filter(order => ['delivered', 'cancelled'].includes(order.status))
                      .map(order => (
                        <div key={order.id} className="border rounded-lg overflow-hidden">
                          <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                              <div>
                                <p className="text-sm text-muted-foreground">Order #{order.id.slice(-8)}</p>
                                <p className="text-sm text-muted-foreground">
                                  Placed on {new Date(order.date).toLocaleDateString()}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">{order.total.toFixed(6)} ETH</p>
                                <p className="text-sm text-muted-foreground">
                                  {order.items.reduce((sum, item) => sum + item.quantity, 0)} items
                                </p>
                              </div>
                            </div>
                            
                            <OrderTracker order={order} />
                            
                            <div className="space-y-4">
                              {order.items.map((item, index) => (
                                <div key={index} className="flex gap-4">
                                  <div className="w-16 h-16 rounded bg-gray-100 overflow-hidden flex-shrink-0">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                  </div>
                                  <div>
                                    <p className="font-medium">{item.name}</p>
                                    <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                                    <p className="text-sm">{item.price} {item.currency}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                            
                            {/* Display refund information if applicable */}
                            {order.refundTransactionHash && (
                              <div className="mt-4 p-3 bg-green-50 rounded-lg">
                                <p className="text-sm font-medium text-green-800">Refund Processed</p>
                                <a 
                                  href={`https://evmtestnet.confluxscan.io/tx/${order.refundTransactionHash}`}
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-green-600 text-xs hover:underline break-all"
                                >
                                  View transaction: {order.refundTransactionHash}
                                </a>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
          
          <div>
            <EcoWallet />
            <div className="mt-6 p-4 border rounded-lg">
              <h3 className="font-bold mb-2">About our Refund Policy</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Our blockchain-powered refund system ensures you can get your money back directly to your wallet.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                <li>Refunds are processed directly through our smart contract</li>
                <li>All refunds are subject to 14-day refund policy</li>
                <li>Funds are returned to the same wallet that made the purchase</li>
                <li>All transactions are viewable on the blockchain explorer</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AccountOrders;
