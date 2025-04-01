
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from "@/hooks/use-wallet";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plane, CalendarIcon, MapPin, Clock, Info, Tag, Star, Coins } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface DestinationDetailProps {
  destination: {
    id: number;
    name: string;
    image: string;
    price: string;
    description?: string;
    flightDuration?: string;
    bestTimeToVisit?: string;
    topAttractions?: string[];
    rating?: number;
  };
  open: boolean;
  onClose: () => void;
}

const DestinationDetail = ({ destination, open, onClose }: DestinationDetailProps) => {
  const navigate = useNavigate();
  const { isConnected, connectWallet } = useWallet();
  const [isBooking, setIsBooking] = useState(false);

  const handleBookNow = async () => {
    if (!isConnected) {
      toast({
        title: "Connect Wallet Required",
        description: "Please connect your wallet to book a flight",
        variant: "destructive",
      });
      return;
    }

    setIsBooking(true);
    try {
      // Simulate blockchain transaction
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Add eco coins for booking a flight
      const ecoCoins = localStorage.getItem("ecoCoins");
      const currentCoins = ecoCoins ? parseInt(ecoCoins) : 0;
      localStorage.setItem("ecoCoins", (currentCoins + 50).toString());
      
      // Save this transaction
      const savedTransactions = localStorage.getItem("ecoTransactions");
      const transactions = savedTransactions ? JSON.parse(savedTransactions) : [];
      const newTransaction = {
        date: new Date().toISOString().split('T')[0],
        amount: 50,
        type: "flight",
        product: `Flight to ${destination.name}`,
      };
      transactions.unshift(newTransaction);
      localStorage.setItem("ecoTransactions", JSON.stringify(transactions));
      
      toast({
        title: "Flight Booking Initiated",
        description: `Your booking to ${destination.name} has been initiated. You earned 50 Eco Coins!`,
      });
      
      setIsBooking(false);
      onClose();
    } catch (error) {
      console.error("Error booking flight:", error);
      toast({
        title: "Booking Failed",
        description: "There was an error processing your booking. Please try again.",
        variant: "destructive",
      });
      setIsBooking(false);
    }
  };
  
  const handleGoToEcoCoins = () => {
    onClose();
    navigate("/ecocoin");
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{destination.name}</DialogTitle>
          <DialogDescription>
            Explore flights and information about this destination
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4">
          <div className="h-64 overflow-hidden rounded-lg mb-6">
            <img 
              src={destination.image} 
              alt={destination.name} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <Badge variant="secondary" className="mr-2">
                <Tag className="h-4 w-4 mr-1" /> {destination.price}
              </Badge>
              {destination.rating && (
                <Badge className="bg-yellow-500">
                  <Star className="h-4 w-4 mr-1" fill="white" /> {destination.rating}
                </Badge>
              )}
            </div>
            <Badge variant="outline" className="flex items-center text-green-600 border-green-200 bg-green-50">
              <Coins className="h-4 w-4 mr-1" /> Earn 50 Eco Coins
            </Badge>
          </div>
          
          <div className="space-y-4">
            {destination.description && (
              <div>
                <p className="text-gray-700">{destination.description}</p>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {destination.flightDuration && (
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-gray-500" />
                  <span>Flight Duration: {destination.flightDuration}</span>
                </div>
              )}
              
              {destination.bestTimeToVisit && (
                <div className="flex items-center">
                  <CalendarIcon className="h-5 w-5 mr-2 text-gray-500" />
                  <span>Best Time: {destination.bestTimeToVisit}</span>
                </div>
              )}
            </div>
            
            {destination.topAttractions && destination.topAttractions.length > 0 && (
              <div className="mt-4">
                <h4 className="font-semibold flex items-center mb-2">
                  <Info className="h-4 w-4 mr-1" /> Top Attractions
                </h4>
                <ul className="list-disc pl-5 space-y-1">
                  {destination.topAttractions.map((attraction, index) => (
                    <li key={index}>{attraction}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          <Separator className="my-6" />
          
          <div className="bg-green-50 rounded-md p-4 mb-6">
            <h4 className="font-semibold flex items-center mb-2">
              <Coins className="h-5 w-5 mr-2 text-green-600" /> Eco Coin Rewards
            </h4>
            <p className="text-sm text-gray-700 mb-3">
              Book this eco-friendly flight and earn 50 Eco Coins that you can use for games and rewards.
            </p>
            <Button variant="outline" size="sm" onClick={handleGoToEcoCoins}>
              Learn About Eco Coins
            </Button>
          </div>
          
          <div className="flex items-center text-sm text-gray-500 mb-6">
            <MapPin className="h-4 w-4 mr-1" />
            <span>Book flights to {destination.name} with crypto payments</span>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="mr-2">
            Close
          </Button>
          {!isConnected ? (
            <Button onClick={connectWallet}>
              Connect Wallet to Book
            </Button>
          ) : (
            <Button onClick={handleBookNow} disabled={isBooking}>
              <Plane className="h-4 w-4 mr-2" />
              {isBooking ? "Processing..." : "Book Now"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DestinationDetail;
