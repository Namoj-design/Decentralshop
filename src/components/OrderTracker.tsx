
import React from 'react';
import { Order } from '@/context/OrderContext';
import { CheckCircle, Truck, Package, Clock, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OrderTrackerProps {
  order: Order;
}

const OrderTracker: React.FC<OrderTrackerProps> = ({ order }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'processing':
        return <Clock className="h-6 w-6 text-yellow-500" />;
      case 'shipped':
        return <Truck className="h-6 w-6 text-blue-500" />;
      case 'delivered':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case 'cancelled':
        return <AlertTriangle className="h-6 w-6 text-red-500" />;
      default:
        return <Package className="h-6 w-6 text-gray-500" />;
    }
  };

  const statusSteps = [
    { key: 'processing', label: 'Processing' },
    { key: 'shipped', label: 'Shipped' },
    { key: 'delivered', label: 'Delivered' }
  ];

  const currentStepIndex = statusSteps.findIndex(step => step.key === order.status);
  const isCancelled = order.status === 'cancelled';

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Order Status</h3>
        <div className="flex items-center gap-2">
          {getStatusIcon(order.status)}
          <span className={cn(
            "font-medium capitalize",
            order.status === 'processing' && "text-yellow-600",
            order.status === 'shipped' && "text-blue-600",
            order.status === 'delivered' && "text-green-600",
            order.status === 'cancelled' && "text-red-600",
          )}>
            {order.status}
          </span>
        </div>
      </div>

      {isCancelled ? (
        <div className="bg-red-50 border border-red-100 rounded-md p-4">
          <p className="text-red-800">
            This order has been cancelled. Please contact support for more information.
          </p>
        </div>
      ) : (
        <>
          <div className="relative mt-6 mb-10">
            <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-1 bg-gray-200 z-0"></div>
            <div className="flex justify-between relative z-10">
              {statusSteps.map((step, index) => {
                const isActive = index <= currentStepIndex;
                const isCompleted = index < currentStepIndex;
                
                return (
                  <div key={step.key} className="flex flex-col items-center">
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center",
                      isActive ? "bg-apple-blue" : "bg-gray-200", 
                    )}>
                      {isCompleted ? (
                        <CheckCircle className="h-5 w-5 text-white" />
                      ) : (
                        <span className={`text-sm ${isActive ? "text-white" : "text-gray-500"}`}>
                          {index + 1}
                        </span>
                      )}
                    </div>
                    <span className={`text-sm mt-2 ${isActive ? "font-medium" : "text-gray-500"}`}>
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="space-y-4 text-sm">
            {order.trackingNumber && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tracking Number:</span>
                <span className="font-medium">{order.trackingNumber}</span>
              </div>
            )}
            
            {order.estimatedDelivery && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estimated Delivery:</span>
                <span className="font-medium">{new Date(order.estimatedDelivery).toLocaleDateString()}</span>
              </div>
            )}
            
            {order.transactionHash && (
              <div className="flex flex-col gap-1">
                <span className="text-muted-foreground">Transaction:</span>
                <a 
                  href={`https://evmtestnet.confluxscan.io/tx/${order.transactionHash}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-apple-blue hover:underline truncate font-mono text-xs"
                >
                  {order.transactionHash}
                </a>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default OrderTracker;
