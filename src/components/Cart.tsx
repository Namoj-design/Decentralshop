
import React from 'react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Trash2, X, Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

const Cart = () => {
  const { items, totalItems, totalPrice, removeFromCart, updateQuantity, clearCart } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="relative p-2">
          <ShoppingCart size={20} />
          {totalItems > 0 && (
            <Badge variant="destructive" className="absolute -top-1 -right-1 px-1.5 py-0.5 min-w-5 h-5 flex items-center justify-center text-xs">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader className="mb-4">
          <SheetTitle className="flex items-center">
            <ShoppingCart size={20} className="mr-2" />
            Your Cart ({totalItems} items)
          </SheetTitle>
        </SheetHeader>
        
        {items.length === 0 ? (
          <div className="flex-grow flex flex-col items-center justify-center text-center py-12">
            <ShoppingCart size={64} className="text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-apple-text mb-2">Your cart is empty</h3>
            <p className="text-sm text-apple-darkGray mb-6">Add some items to your cart to see them here</p>
            <SheetTrigger asChild>
              <Link to="/categories">
                <Button>Browse Products</Button>
              </Link>
            </SheetTrigger>
          </div>
        ) : (
          <>
            <div className="flex-grow overflow-y-auto pr-2 -mr-2">
              {items.map(item => (
                <div key={item.id} className="mb-4 pb-4 border-b border-gray-100">
                  <div className="flex gap-3">
                    <div className="w-20 h-20 rounded-md overflow-hidden bg-gray-50 flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <h4 className="font-medium text-apple-text">{item.name}</h4>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-7 w-7 text-red-500 hover:text-red-700 -mt-1 -mr-1"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <X size={15} />
                        </Button>
                      </div>
                      
                      <div className="text-sm text-apple-darkGray mb-2">
                        {item.price} {item.currency}
                      </div>
                      
                      <div className="flex items-center">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-7 w-7 rounded-r-none"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus size={14} />
                        </Button>
                        <div className="h-7 px-3 flex items-center justify-center border-y border-input text-sm">
                          {item.quantity}
                        </div>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-7 w-7 rounded-l-none"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus size={14} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-auto">
              <Separator className="my-4" />
              
              <div className="flex justify-between items-center mb-2">
                <span className="text-apple-darkGray">Subtotal</span>
                <span className="font-medium">{totalPrice.toFixed(4)} ETH</span>
              </div>
              
              <div className="flex justify-between items-center mb-4">
                <span className="text-apple-darkGray">Estimated Gas Fee</span>
                <span className="font-medium">0.0025 ETH</span>
              </div>
              
              <div className="flex justify-between items-center text-lg font-bold mb-6">
                <span>Total</span>
                <span>{(totalPrice + 0.0025).toFixed(4)} ETH</span>
              </div>
              
              <div className="flex gap-3">
                <Button className="flex-1" variant="default">
                  Checkout
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={clearCart}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
