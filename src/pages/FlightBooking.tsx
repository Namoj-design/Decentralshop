
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWallet } from "@/hooks/use-wallet";
import { toast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DestinationDetail from "@/components/DestinationDetail";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalendarIcon, Plane, MapPin } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const popularDestinations = [
  {
    id: 1,
    name: "Bali, Indonesia",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1974&auto=format&fit=crop",
    price: "0.05 ETH",
    description: "Known for its volcanic mountains, iconic rice paddies, beaches and coral reefs. The island is home to religious sites such as cliffside Uluwatu Temple.",
    flightDuration: "~14 hours",
    bestTimeToVisit: "April to October",
    topAttractions: ["Ubud Monkey Forest", "Tegalalang Rice Terraces", "Uluwatu Temple", "Kuta Beach"],
    rating: 4.8
  },
  {
    id: 2,
    name: "Tokyo, Japan",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1788&auto=format&fit=crop",
    price: "0.08 ETH",
    description: "A bustling city where ultra-modern meets traditional, from neon-lit skyscrapers to historic temples.",
    flightDuration: "~12 hours",
    bestTimeToVisit: "March to May and September to November",
    topAttractions: ["Tokyo Skytree", "Meiji Shrine", "Sensō-ji Temple", "Shibuya Crossing"],
    rating: 4.9
  },
  {
    id: 3,
    name: "Paris, France",
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=2020&auto=format&fit=crop",
    price: "0.07 ETH",
    description: "Known as the 'City of Light', Paris is famous for its art museums, architectural landmarks, and romantic atmosphere.",
    flightDuration: "~8 hours",
    bestTimeToVisit: "June to August and September to October",
    topAttractions: ["Eiffel Tower", "Louvre Museum", "Notre-Dame Cathedral", "Arc de Triomphe"],
    rating: 4.7
  },
  {
    id: 4,
    name: "New York, USA",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070&auto=format&fit=crop",
    price: "0.06 ETH",
    description: "The city that never sleeps offers iconic skyscrapers, Broadway shows, and diverse cultural experiences.",
    flightDuration: "~7 hours",
    bestTimeToVisit: "April to June and September to November",
    topAttractions: ["Times Square", "Central Park", "Empire State Building", "Statue of Liberty"],
    rating: 4.6
  },
];

const FlightBooking = () => {
  const { isConnected, connectWallet } = useWallet();
  const navigate = useNavigate();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departDate, setDepartDate] = useState<Date | undefined>(undefined);
  const [returnDate, setReturnDate] = useState<Date | undefined>(undefined);
  const [passengers, setPassengers] = useState(1);
  const [isBooking, setIsBooking] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<typeof popularDestinations[0] | null>(null);
  const [isDestinationDetailOpen, setIsDestinationDetailOpen] = useState(false);

  const handleBookFlight = async () => {
    if (!isConnected) {
      toast({
        title: "Connect Wallet Required",
        description: "Please connect your wallet to book a flight",
        variant: "destructive",
      });
      return;
    }

    if (!from || !to || !departDate) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsBooking(true);
    try {
      // Simulate blockchain transaction
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      toast({
        title: "Flight Booked Successfully!",
        description: `Your flight from ${from} to ${to} has been booked. Check your wallet for confirmation.`,
      });
      
      setIsBooking(false);
    } catch (error) {
      console.error("Error booking flight:", error);
      toast({
        title: "Booking Failed",
        description: "There was an error booking your flight. Please try again.",
        variant: "destructive",
      });
      setIsBooking(false);
    }
  };

  const handleDestinationSelect = (destination: string) => {
    setTo(destination);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDestinationClick = (destination: typeof popularDestinations[0]) => {
    setSelectedDestination(destination);
    setIsDestinationDetailOpen(true);
  };

  const handleCloseDestinationDetail = () => {
    setIsDestinationDetailOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24">
        <section className="relative h-96 bg-cover bg-center mb-12" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=2070&auto=format&fit=crop')" }}>
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4">
            <h1 className="text-5xl font-bold mb-4">Book Flights with Crypto</h1>
            <p className="text-xl text-center max-w-3xl">
              Direct peer-to-peer flight bookings with no middlemen. Secure your travels with blockchain technology.
            </p>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 mb-16">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-12">
            <h2 className="text-2xl font-bold mb-6">Find Your Flight</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <Label htmlFor="from">From</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="from"
                    placeholder="Departure City"
                    className="pl-10"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="to">To</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="to"
                    placeholder="Destination City"
                    className="pl-10"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                  />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              <div>
                <Label htmlFor="depart">Departure Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {departDate ? format(departDate, "PPP") : <span>Select date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={departDate}
                      onSelect={setDepartDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div>
                <Label htmlFor="return">Return Date (Optional)</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {returnDate ? format(returnDate, "PPP") : <span>Select date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={returnDate}
                      onSelect={setReturnDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div>
                <Label htmlFor="passengers">Passengers</Label>
                <Input
                  id="passengers"
                  type="number"
                  min="1"
                  max="10"
                  value={passengers}
                  onChange={(e) => setPassengers(parseInt(e.target.value) || 1)}
                />
              </div>
            </div>
            
            {!isConnected ? (
              <Button onClick={connectWallet} className="w-full md:w-auto">
                Connect Wallet to Book
              </Button>
            ) : (
              <Button 
                onClick={handleBookFlight} 
                disabled={isBooking}
                className="w-full md:w-auto"
              >
                {isBooking ? "Processing..." : "Search Flights"}
                <Plane className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
          
          <h2 className="text-2xl font-bold mb-6">Popular Destinations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularDestinations.map((destination) => (
              <div 
                key={destination.id} 
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleDestinationClick(destination)}
              >
                <div className="h-40 overflow-hidden">
                  <img 
                    src={destination.image} 
                    alt={destination.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">{destination.name}</h3>
                  <p className="text-gray-500 mb-3">Starting from {destination.price}</p>
                  <div className="flex justify-between">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 mr-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDestinationSelect(destination.name.split(',')[0]);
                      }}
                    >
                      Select
                    </Button>
                    <Button 
                      size="sm" 
                      className="flex-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDestinationClick(destination);
                      }}
                    >
                      Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {selectedDestination && (
            <DestinationDetail 
              destination={selectedDestination} 
              open={isDestinationDetailOpen}
              onClose={handleCloseDestinationDetail}
            />
          )}
          
          <div className="mt-12 bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Why Book with Crypto?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-blue-100 p-3 rounded-full mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="font-bold mb-2">Secure Bookings</h3>
                <p className="text-gray-600">All transactions are secured by blockchain technology</p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="bg-green-100 p-3 rounded-full mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-bold mb-2">No Hidden Fees</h3>
                <p className="text-gray-600">Direct peer-to-peer bookings eliminate unnecessary middlemen</p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="bg-purple-100 p-3 rounded-full mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                  </svg>
                </div>
                <h3 className="font-bold mb-2">Digital Identity</h3>
                <p className="text-gray-600">Your travel profile stored securely on the blockchain</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FlightBooking;
