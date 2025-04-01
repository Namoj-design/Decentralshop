
import { useState } from "react";
import { useWallet } from "@/hooks/use-wallet";
import { toast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Music, Filter, Ticket } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const internationalConcerts = [
  {
    id: 1,
    name: "Taylor Swift - The Eras Tour",
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=2070&auto=format&fit=crop",
    location: "London, UK",
    date: "June 15, 2023",
    price: "0.1 ETH",
    remaining: 215,
    category: "international"
  },
  {
    id: 2,
    name: "BTS World Tour",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2070&auto=format&fit=crop",
    location: "Seoul, South Korea",
    date: "July 10, 2023",
    price: "0.15 ETH",
    remaining: 78,
    category: "international"
  },
  {
    id: 3,
    name: "Billie Eilish - Happier Than Ever",
    image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?q=80&w=1974&auto=format&fit=crop",
    location: "Los Angeles, USA",
    date: "August 5, 2023",
    price: "0.08 ETH",
    remaining: 156,
    category: "international"
  },
  {
    id: 4,
    name: "The Weeknd - After Hours",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=2074&auto=format&fit=crop",
    location: "Toronto, Canada",
    date: "September 2, 2023",
    price: "0.12 ETH",
    remaining: 92,
    category: "international"
  },
  {
    id: 5,
    name: "Bad Bunny - World's Hottest Tour",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=2070&auto=format&fit=crop",
    location: "San Juan, Puerto Rico",
    date: "October 15, 2023",
    price: "0.09 ETH",
    remaining: 124,
    category: "international"
  },
  {
    id: 6,
    name: "Dua Lipa - Future Nostalgia",
    image: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?q=80&w=2070&auto=format&fit=crop",
    location: "Paris, France",
    date: "November 8, 2023",
    price: "0.11 ETH",
    remaining: 65,
    category: "international"
  },
];

const tamilConcerts = [
  {
    id: 7,
    name: "AR Rahman - Symphony of Dreams",
    image: "https://images.unsplash.com/photo-1501189855873-98141a085f8f?q=80&w=2070&auto=format&fit=crop",
    location: "Chennai, India",
    date: "July 22, 2023",
    price: "0.05 ETH",
    remaining: 185,
    category: "tamil"
  },
  {
    id: 8,
    name: "Yuvan Shankar Raja Live",
    image: "https://images.unsplash.com/photo-1526142684086-7ebd69df27a5?q=80&w=2070&auto=format&fit=crop",
    location: "Coimbatore, India",
    date: "August 12, 2023",
    price: "0.04 ETH",
    remaining: 210,
    category: "tamil"
  },
  {
    id: 9,
    name: "Anirudh Ravichander - Musical Night",
    image: "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?q=80&w=2074&auto=format&fit=crop",
    location: "Madurai, India",
    date: "September 8, 2023",
    price: "0.06 ETH",
    remaining: 150,
    category: "tamil"
  },
  {
    id: 10,
    name: "Sid Sriram - Soulful Evening",
    image: "https://images.unsplash.com/photo-1565035010268-a3816f98589a?q=80&w=2076&auto=format&fit=crop",
    location: "Trichy, India",
    date: "October 5, 2023",
    price: "0.045 ETH",
    remaining: 175,
    category: "tamil"
  }
];

const hindiConcerts = [
  {
    id: 11,
    name: "Arijit Singh - Tum Hi Ho Tour",
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=2070&auto=format&fit=crop",
    location: "Mumbai, India",
    date: "July 30, 2023",
    price: "0.075 ETH",
    remaining: 120,
    category: "hindi"
  },
  {
    id: 12,
    name: "Shreya Ghoshal Live Concert",
    image: "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=2070&auto=format&fit=crop",
    location: "Delhi, India",
    date: "August 19, 2023",
    price: "0.065 ETH",
    remaining: 145,
    category: "hindi"
  },
  {
    id: 13,
    name: "Sonu Nigam - Acoustic Night",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2070&auto=format&fit=crop",
    location: "Bangalore, India",
    date: "September 15, 2023",
    price: "0.07 ETH",
    remaining: 165,
    category: "hindi"
  },
  {
    id: 14,
    name: "Neha Kakkar & Tony Kakkar Show",
    image: "https://images.unsplash.com/photo-1468234847176-28606331216a?q=80&w=2074&auto=format&fit=crop",
    location: "Hyderabad, India",
    date: "October 20, 2023",
    price: "0.055 ETH",
    remaining: 190,
    category: "hindi"
  }
];

// Combine all concerts
const allConcerts = [...internationalConcerts, ...tamilConcerts, ...hindiConcerts];

const ConcertTickets = () => {
  const { isConnected, connectWallet } = useWallet();
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [purchasingTicketId, setPurchasingTicketId] = useState<number | null>(null);
  const [nftPreview, setNftPreview] = useState<{ id: number; image: string } | null>(null);
  const [activeTab, setActiveTab] = useState("all");

  const handlePurchaseTicket = async (concertId: number) => {
    if (!isConnected) {
      toast({
        title: "Connect Wallet Required",
        description: "Please connect your wallet to purchase concert tickets",
        variant: "destructive",
      });
      return;
    }

    setPurchasingTicketId(concertId);
    
    try {
      // Simulate blockchain transaction
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      const concert = allConcerts.find(c => c.id === concertId);
      
      // Simulate NFT ticket creation
      setNftPreview({
        id: concertId,
        image: concert?.image || "",
      });
      
      toast({
        title: "Ticket Purchased Successfully!",
        description: "Your NFT ticket has been minted and sent to your wallet",
      });
      
      setPurchasingTicketId(null);
    } catch (error) {
      console.error("Error purchasing ticket:", error);
      toast({
        title: "Purchase Failed",
        description: "There was an error purchasing your ticket. Please try again.",
        variant: "destructive",
      });
      setPurchasingTicketId(null);
    }
  };

  const getFilteredConcerts = () => {
    let concerts = [];
    
    // Filter by category/tab
    if (activeTab === "all") {
      concerts = allConcerts;
    } else if (activeTab === "international") {
      concerts = internationalConcerts;
    } else if (activeTab === "tamil") {
      concerts = tamilConcerts;
    } else if (activeTab === "hindi") {
      concerts = hindiConcerts;
    }
    
    // Apply search and location filters
    return concerts.filter(concert => {
      const matchesSearch = concert.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLocation = location === "" || concert.location.includes(location);
      return matchesSearch && matchesLocation;
    });
  };

  const filteredConcerts = getFilteredConcerts();

  const closeNftPreview = () => {
    setNftPreview(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24">
        <section className="relative h-96 bg-cover bg-center mb-12" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=2070&auto=format&fit=crop')" }}>
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4">
            <h1 className="text-5xl font-bold mb-4">NFT Concert Tickets</h1>
            <p className="text-xl text-center max-w-3xl">
              Secure your spot with blockchain technology. Each ticket is a unique NFT that can be collected or resold.
            </p>
          </div>
        </section>

        {nftPreview && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">Your NFT Ticket</h3>
                <div className="mb-4 relative">
                  <img 
                    src={nftPreview.image} 
                    alt="NFT Ticket"
                    className="w-full h-64 object-cover rounded-md mb-2"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4 text-white">
                    <p className="text-lg font-bold">
                      {allConcerts.find(c => c.id === nftPreview.id)?.name}
                    </p>
                    <p>
                      {allConcerts.find(c => c.id === nftPreview.id)?.date} • 
                      {allConcerts.find(c => c.id === nftPreview.id)?.location}
                    </p>
                  </div>
                </div>
                <div className="bg-gray-100 p-4 rounded-md mb-4">
                  <p className="text-sm font-mono">Token ID: 0x{Math.random().toString(16).slice(2, 10)}</p>
                  <p className="text-sm">This NFT serves as your ticket and can be verified at the venue</p>
                </div>
                <Button onClick={closeNftPreview} className="w-full">
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 mb-16">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-12">
            <h2 className="text-2xl font-bold mb-6">Find Concert Tickets</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label htmlFor="search">Search Concerts</Label>
                <div className="relative">
                  <Music className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="search"
                    placeholder="Artist or concert name"
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="location">Location</Label>
                <Select onValueChange={setLocation} value={location}>
                  <SelectTrigger id="location">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Locations</SelectItem>
                    <SelectItem value="London">London, UK</SelectItem>
                    <SelectItem value="Seoul">Seoul, South Korea</SelectItem>
                    <SelectItem value="Los Angeles">Los Angeles, USA</SelectItem>
                    <SelectItem value="Chennai">Chennai, India</SelectItem>
                    <SelectItem value="Mumbai">Mumbai, India</SelectItem>
                    <SelectItem value="Delhi">Delhi, India</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {!isConnected && (
                <div className="flex items-end">
                  <Button onClick={connectWallet} className="w-full">
                    Connect Wallet to Buy
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Concerts</TabsTrigger>
              <TabsTrigger value="international">International</TabsTrigger>
              <TabsTrigger value="tamil">Tamil</TabsTrigger>
              <TabsTrigger value="hindi">Hindi</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <h2 className="text-2xl font-bold mb-6">All Concerts</h2>
            </TabsContent>
            
            <TabsContent value="international">
              <h2 className="text-2xl font-bold mb-6">International Concerts</h2>
            </TabsContent>
            
            <TabsContent value="tamil">
              <h2 className="text-2xl font-bold mb-6">Tamil Concerts</h2>
            </TabsContent>
            
            <TabsContent value="hindi">
              <h2 className="text-2xl font-bold mb-6">Hindi Concerts</h2>
            </TabsContent>
          </Tabs>
          
          {filteredConcerts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎵</div>
              <h3 className="text-xl font-bold mb-2">No concerts found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredConcerts.map((concert) => (
                <Card key={concert.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={concert.image} 
                      alt={concert.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle>{concert.name}</CardTitle>
                    <CardDescription>{concert.location} • {concert.date}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-bold text-lg">{concert.price}</p>
                        <p className="text-sm text-gray-500">{concert.remaining} tickets left</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Ticket size={16} className="text-green-500" />
                        <span className="text-sm font-medium">NFT Ticket</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      onClick={() => handlePurchaseTicket(concert.id)} 
                      disabled={purchasingTicketId === concert.id || !isConnected}
                      className="w-full"
                    >
                      {purchasingTicketId === concert.id ? "Processing..." : "Buy NFT Ticket"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
          
          <div className="mt-12 bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Benefits of NFT Tickets</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-purple-100 p-3 rounded-full mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-bold mb-2">Anti-Counterfeit</h3>
                <p className="text-gray-600">Each ticket is verified on the blockchain, eliminating fake tickets</p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="bg-blue-100 p-3 rounded-full mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>
                <h3 className="font-bold mb-2">Collectible</h3>
                <p className="text-gray-600">Keep your tickets as digital memorabilia of your favorite events</p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="bg-green-100 p-3 rounded-full mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <h3 className="font-bold mb-2">Resellable</h3>
                <p className="text-gray-600">Can't attend? Safely resell your ticket on our marketplace</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ConcertTickets;
