
import React, { useState } from 'react';
import { useEcoCoins } from '@/context/EcoCoinContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Coins, ArrowDown, ArrowUp, History, Gift, Tag } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface OfferProps {
  id: string;
  title: string;
  description: string;
  cost: number;
  image?: string;
}

const EcoWallet = () => {
  const { balance, transactions, spendCoins } = useEcoCoins();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const offers: OfferProps[] = [
    {
      id: '1',
      title: '10% Discount',
      description: 'Get a 10% discount on your next purchase',
      cost: 500,
      image: 'https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=800&auto=format&fit=crop'
    },
    {
      id: '2',
      title: 'Free Shipping',
      description: 'Free shipping on your next order',
      cost: 300,
      image: 'https://images.unsplash.com/photo-1586769852044-692d6e3703f2?w=800&auto=format&fit=crop'
    },
    {
      id: '3',
      title: 'Carbon Offset',
      description: 'Offset 1 ton of carbon emissions',
      cost: 1000,
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop'
    }
  ];

  const handleRedeemOffer = (offer: OfferProps) => {
    const success = spendCoins(offer.cost, `Redeemed offer: ${offer.title}`);
    if (success) {
      setIsDialogOpen(true);
    }
  };

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
      <div className="p-6 bg-gradient-to-r from-green-500 to-green-600 text-white">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-medium flex items-center">
            <Coins className="mr-2 h-5 w-5" /> Eco Coin Wallet
          </h3>
          <div className="bg-white/20 px-3 py-1 rounded-full text-xs">
            GREEN REWARDS
          </div>
        </div>
        <div className="flex items-baseline">
          <span className="text-3xl font-bold">{balance.toLocaleString()}</span>
          <span className="ml-2 text-sm opacity-80">Eco Coins</span>
        </div>
        <p className="mt-2 text-sm opacity-80">
          Earn Eco Coins by purchasing eco-friendly products and redeem for exclusive rewards
        </p>
      </div>

      <Tabs defaultValue="offers" className="w-full">
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger value="offers" className="flex items-center">
            <Gift className="mr-2 h-4 w-4" /> Offers
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center">
            <History className="mr-2 h-4 w-4" /> History
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="offers" className="p-4 max-h-80 overflow-y-auto">
          {offers.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No offers available at the moment
            </div>
          ) : (
            <div className="space-y-4">
              {offers.map(offer => (
                <div key={offer.id} className="flex gap-4 border rounded-lg p-3">
                  {offer.image && (
                    <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                      <img src={offer.image} alt={offer.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="flex-1">
                    <h4 className="font-medium">{offer.title}</h4>
                    <p className="text-sm text-muted-foreground">{offer.description}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center text-green-600 font-medium">
                        <Coins className="h-3 w-3 mr-1" />
                        {offer.cost}
                      </div>
                      <Button 
                        size="sm" 
                        variant={balance >= offer.cost ? "default" : "outline"}
                        disabled={balance < offer.cost}
                        onClick={() => handleRedeemOffer(offer)}
                      >
                        <Tag className="h-3 w-3 mr-1" />
                        Redeem
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="history" className="p-4 max-h-80 overflow-y-auto">
          {transactions.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No transaction history yet
            </div>
          ) : (
            <div className="space-y-3">
              {transactions.map(tx => (
                <div key={tx.id} className="border-b pb-3 last:border-b-0">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      {tx.type === 'earned' ? (
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                          <ArrowUp className="h-4 w-4 text-green-600" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                          <ArrowDown className="h-4 w-4 text-red-600" />
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-medium">
                          {tx.type === 'earned' ? 'Earned' : 'Spent'} Eco Coins
                        </p>
                        <p className="text-xs text-muted-foreground">{tx.description}</p>
                      </div>
                    </div>
                    <div className={`font-medium ${tx.type === 'earned' ? 'text-green-600' : 'text-red-600'}`}>
                      {tx.type === 'earned' ? '+' : '-'}{tx.amount}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(tx.date).toLocaleDateString()} at {new Date(tx.date).toLocaleTimeString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Offer Redeemed!</DialogTitle>
            <DialogDescription>
              Your reward has been added to your account. You can view your active rewards in your account page.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end">
            <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EcoWallet;
