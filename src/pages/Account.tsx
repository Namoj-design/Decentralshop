
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useWallet } from '@/hooks/use-wallet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useOrders } from '@/context/OrderContext';
import EcoWallet from '@/components/EcoWallet';
import { Link } from 'react-router-dom';
import { User, Package, CreditCard, Settings, ChevronRight, Wallet, LogOut } from 'lucide-react';

const Account = () => {
  const { address, isConnected, networkName } = useWallet();
  const { orders } = useOrders();
  
  // Mock data for orders
  const activeOrderCount = orders.filter(order => ['processing', 'shipped'].includes(order.status)).length;
  
  if (!isConnected) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-32 pb-20 px-6 md:px-12 flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Connect Your Wallet</CardTitle>
              <CardDescription>
                Please connect your wallet to view your account details
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center pb-6">
              <Button>Connect Wallet</Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-apple-text">My Account</h1>
            <p className="text-apple-darkGray">
              Manage your orders, payments, and profile
            </p>
          </div>
          {isConnected && (
            <Card className="w-full md:w-auto">
              <CardContent className="flex items-center p-4">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-3"></div>
                <div>
                  <p className="text-sm font-medium">{address?.substring(0, 8)}...{address?.substring(address.length - 6)}</p>
                  <p className="text-xs text-muted-foreground">{networkName}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Account Menu</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <nav className="flex flex-col">
                  <Link to="/account" className="flex items-center justify-between p-4 hover:bg-gray-50 border-b">
                    <div className="flex items-center">
                      <User className="h-5 w-5 mr-3 text-apple-blue" />
                      <span>Profile</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </Link>
                  <Link to="/account/orders" className="flex items-center justify-between p-4 hover:bg-gray-50 border-b">
                    <div className="flex items-center">
                      <Package className="h-5 w-5 mr-3 text-apple-blue" />
                      <span>Orders</span>
                    </div>
                    <div className="flex items-center">
                      {activeOrderCount > 0 && (
                        <span className="bg-apple-blue text-white text-xs rounded-full w-5 h-5 flex items-center justify-center mr-2">
                          {activeOrderCount}
                        </span>
                      )}
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </Link>
                  <Link to="/account" className="flex items-center justify-between p-4 hover:bg-gray-50 border-b">
                    <div className="flex items-center">
                      <Wallet className="h-5 w-5 mr-3 text-apple-blue" />
                      <span>Eco Wallet</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </Link>
                  <Link to="/account" className="flex items-center justify-between p-4 hover:bg-gray-50 border-b">
                    <div className="flex items-center">
                      <CreditCard className="h-5 w-5 mr-3 text-apple-blue" />
                      <span>Payment Methods</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </Link>
                  <Link to="/account" className="flex items-center justify-between p-4 hover:bg-gray-50 border-b">
                    <div className="flex items-center">
                      <Settings className="h-5 w-5 mr-3 text-apple-blue" />
                      <span>Settings</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </Link>
                  <button className="flex items-center justify-between p-4 hover:bg-gray-50 text-left w-full">
                    <div className="flex items-center">
                      <LogOut className="h-5 w-5 mr-3 text-red-500" />
                      <span className="text-red-500">Disconnect Wallet</span>
                    </div>
                  </button>
                </nav>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-2">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList>
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="orders">Recent Orders</TabsTrigger>
                <TabsTrigger value="wallet">Eco Wallet</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>
                      View and update your profile details
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Wallet Address</p>
                      <p className="font-mono text-sm bg-gray-100 p-2 rounded">
                        {address}
                      </p>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Network</p>
                      <p>{networkName}</p>
                    </div>
                    
                    <div className="pt-4">
                      <Button>Update Profile</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="orders">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Recent Orders</CardTitle>
                      <CardDescription>
                        Track your recent purchases and their status
                      </CardDescription>
                    </div>
                    <Link to="/account/orders">
                      <Button variant="outline" size="sm">
                        View All
                      </Button>
                    </Link>
                  </CardHeader>
                  <CardContent>
                    {orders.length === 0 ? (
                      <div className="text-center py-8">
                        <Package className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                        <h3 className="text-lg font-medium mb-2">No orders yet</h3>
                        <p className="text-muted-foreground mb-6">
                          When you make purchases, they'll appear here
                        </p>
                        <Link to="/categories">
                          <Button>Start Shopping</Button>
                        </Link>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {orders.slice(0, 3).map(order => (
                          <div key={order.id} className="flex items-center justify-between border-b pb-4">
                            <div>
                              <p className="font-medium">Order #{order.id.slice(-8)}</p>
                              <p className="text-sm text-muted-foreground">
                                {new Date(order.date).toLocaleDateString()}
                              </p>
                              <div className={`inline-flex items-center mt-1 px-2 py-0.5 rounded text-xs font-medium 
                                ${order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' : ''}
                                ${order.status === 'shipped' ? 'bg-blue-100 text-blue-800' : ''}
                                ${order.status === 'delivered' ? 'bg-green-100 text-green-800' : ''}
                                ${order.status === 'cancelled' ? 'bg-red-100 text-red-800' : ''}
                              `}>
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">{order.total.toFixed(6)} ETH</p>
                              <p className="text-sm text-muted-foreground">
                                {order.items.reduce((sum, item) => sum + item.quantity, 0)} items
                              </p>
                              <Link to={`/account/orders`} className="text-sm text-apple-blue hover:underline">
                                View details
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="wallet">
                <EcoWallet />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Account;
