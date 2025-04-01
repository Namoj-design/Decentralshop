
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "@/hooks/use-toast";
import { requestRefund } from "@/lib/contractInteraction";

// Types for order tracking
export type OrderStatus = 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  currency: string;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  transactionHash?: string;
  estimatedDelivery?: string;
  trackingNumber?: string;
  refundable?: boolean;
  orderId?: string;
  refundTransactionHash?: string;
}

// Context type
interface OrderContextType {
  orders: Order[];
  addOrder: (order: Omit<Order, 'id'>) => void;
  getOrder: (id: string) => Order | undefined;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  requestRefund: (id: string) => Promise<boolean>;
}

// Create context
const OrderContext = createContext<OrderContextType | undefined>(undefined);

// Provider component
export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  // Load orders from localStorage on mount
  useEffect(() => {
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders));
      } catch (error) {
        console.error('Error loading orders from localStorage:', error);
      }
    }
  }, []);

  // Save orders to localStorage when they change
  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  // Add a new order
  const addOrder = (order: Omit<Order, 'id'>) => {
    const newOrder: Order = {
      ...order,
      id: `order-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    };
    
    setOrders(prevOrders => [...prevOrders, newOrder]);
    
    toast({
      title: "Order Placed",
      description: `Order #${newOrder.id.slice(-8)} has been successfully placed.`,
    });
    
    return newOrder.id;
  };

  // Get a specific order by ID
  const getOrder = (id: string) => {
    return orders.find(order => order.id === id);
  };

  // Update order status
  const updateOrderStatus = (id: string, status: OrderStatus) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === id ? { ...order, status } : order
      )
    );
    
    toast({
      title: "Order Updated",
      description: `Order #${id.slice(-8)} status changed to ${status}.`,
    });
  };

  // Request a refund for an order
  const processRefund = async (id: string) => {
    const order = orders.find(order => order.id === id);
    if (!order || !order.orderId || !order.refundable) {
      toast({
        title: "Refund Error",
        description: "This order is not eligible for refund.",
        variant: "destructive",
      });
      return false;
    }

    try {
      const result = await requestRefund(order.orderId);
      
      if (result.success) {
        // Update the order status
        setOrders(prevOrders =>
          prevOrders.map(order =>
            order.id === id ? {
              ...order,
              status: 'cancelled',
              refundable: false,
              refundTransactionHash: result.hash
            } : order
          )
        );
        
        toast({
          title: "Refund Processed",
          description: `Refund for order #${id.slice(-8)} has been processed.`,
        });
        
        return true;
      } else {
        toast({
          title: "Refund Failed",
          description: result.error || "There was an error processing your refund",
          variant: "destructive",
        });
        return false;
      }
    } catch (error: any) {
      console.error("Refund error:", error);
      toast({
        title: "Refund Error",
        description: error.message || "An error occurred while processing the refund",
        variant: "destructive",
      });
      return false;
    }
  };

  return (
    <OrderContext.Provider value={{ 
      orders, 
      addOrder, 
      getOrder, 
      updateOrderStatus,
      requestRefund: processRefund
    }}>
      {children}
    </OrderContext.Provider>
  );
};

// Hook for using the order context
export const useOrders = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};
