
import { useState } from "react";
import { useOrders, type Order } from "@/context/OrderContext";
import { useWallet } from "@/hooks/use-wallet";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wallet, ArrowRight, CheckCircle, Loader2, RotateCcw } from "lucide-react";
import { format } from "date-fns";

const RefundCenter = () => {
  const { orders, requestRefund } = useOrders();
  const { isConnected, connectWallet } = useWallet();
  const [processingRefundId, setProcessingRefundId] = useState<string | null>(null);
  
  // Filter orders by their status
  const refundableOrders = orders.filter(order => order.refundable && order.status !== 'cancelled');
  const refundedOrders = orders.filter(order => order.refundTransactionHash || order.status === 'cancelled');
  
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
  
  const OrderCard = ({ order }: { order: Order }) => (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-lg flex justify-between">
          <span>Order #{order.id.slice(-8)}</span>
          <span className={`text-sm px-2 py-1 rounded-full ${
            order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
            order.status === 'shipped' ? 'bg-amber-100 text-amber-800' :
            order.status === 'delivered' ? 'bg-green-100 text-green-800' :
            'bg-red-100 text-red-800'
          }`}>
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </span>
        </CardTitle>
        <CardDescription>
          {order.date && format(new Date(order.date), 'PPP')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {order.items.map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-md overflow-hidden mr-3">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.quantity} × {item.price} {item.currency}
                  </p>
                </div>
              </div>
              <p className="font-medium">
                {(item.price * item.quantity).toFixed(2)} {item.currency}
              </p>
            </div>
          ))}
          
          <div className="pt-4 mt-4 border-t border-gray-200">
            <div className="flex justify-between">
              <span className="font-medium">Total:</span>
              <span className="font-bold">{order.total.toFixed(2)} ETH</span>
            </div>
          </div>
          
          {order.transactionHash && (
            <div className="pt-2 mt-2 text-sm">
              <p className="text-muted-foreground">Transaction Hash:</p>
              <a 
                href={`https://evmtestnet.confluxscan.io/tx/${order.transactionHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline font-mono text-xs break-all"
              >
                {order.transactionHash}
              </a>
            </div>
          )}
          
          {order.refundTransactionHash && (
            <div className="pt-2 mt-2 bg-green-50 p-3 rounded-md">
              <p className="text-sm font-medium text-green-800">Refund Transaction:</p>
              <a 
                href={`https://evmtestnet.confluxscan.io/tx/${order.refundTransactionHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-700 hover:underline font-mono text-xs break-all"
              >
                {order.refundTransactionHash}
              </a>
            </div>
          )}
        </div>
      </CardContent>
      {order.refundable && !order.refundTransactionHash && order.status !== 'cancelled' && (
        <CardFooter>
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
        </CardFooter>
      )}
    </Card>
  );
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 max-w-5xl mx-auto px-4 py-8 w-full pt-24">
        <h1 className="text-3xl font-bold mb-2">Refund Center</h1>
        <p className="text-muted-foreground mb-8">
          Request refunds for eligible purchases and track refund status
        </p>
        
        {!isConnected ? (
          <div className="bg-muted p-8 rounded-lg text-center">
            <Wallet className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-xl font-bold mb-2">Connect Your Wallet</h2>
            <p className="mb-6 text-muted-foreground max-w-md mx-auto">
              Please connect your wallet to view your orders and request refunds.
            </p>
            <Button onClick={connectWallet}>
              Connect Wallet
            </Button>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-muted p-8 rounded-lg text-center">
            <CheckCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-xl font-bold mb-2">No Orders Found</h2>
            <p className="mb-6 text-muted-foreground max-w-md mx-auto">
              You haven't placed any orders yet. Browse products and make a purchase.
            </p>
            <Link to="/">
              <Button>
                Browse Products
              </Button>
            </Link>
          </div>
        ) : (
          <Tabs defaultValue="eligible" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="eligible">
                Eligible for Refund ({refundableOrders.length})
              </TabsTrigger>
              <TabsTrigger value="processed">
                Refund History ({refundedOrders.length})
              </TabsTrigger>
              <TabsTrigger value="all">
                All Orders ({orders.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="eligible">
              {refundableOrders.length === 0 ? (
                <div className="bg-muted p-8 rounded-lg text-center">
                  <CheckCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h2 className="text-xl font-bold mb-2">No Eligible Orders</h2>
                  <p className="text-muted-foreground">
                    You don't have any orders that are currently eligible for refund.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {refundableOrders.map((order) => (
                    <OrderCard key={order.id} order={order} />
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="processed">
              {refundedOrders.length === 0 ? (
                <div className="bg-muted p-8 rounded-lg text-center">
                  <CheckCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h2 className="text-xl font-bold mb-2">No Refund History</h2>
                  <p className="text-muted-foreground">
                    You haven't requested any refunds yet.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {refundedOrders.map((order) => (
                    <OrderCard key={order.id} order={order} />
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="all">
              <div className="space-y-6">
                {orders.map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        )}
        
        <div className="mt-12 p-6 bg-blue-50 rounded-lg">
          <h2 className="text-xl font-bold text-blue-900 mb-4">About our Refund Policy</h2>
          <div className="space-y-4">
            <p className="text-blue-800">
              Our smart contract-powered refund system ensures that customers can get their money back directly to their wallet without any intermediaries.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-blue-800">
              <li>Refunds are available for 14 days after purchase</li>
              <li>Refunds are processed directly on the blockchain</li>
              <li>Funds are returned to the same wallet that made the purchase</li>
              <li>Refund transactions can be viewed on the blockchain explorer</li>
            </ul>
            <p className="text-blue-800">
              If you have any questions about our refund policy, please contact our support team.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default RefundCenter;
