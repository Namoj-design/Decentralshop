import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlockchainReviews from '@/components/BlockchainReviews';
import BlockchainSupplyChain from '@/components/BlockchainSupplyChain';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useWallet } from '@/hooks/use-wallet';
import { useCart } from '@/context/CartContext';
import { useFavorites } from '@/context/FavoritesContext';
import CryptoPaymentModal from '@/components/CryptoPaymentModal';
import { ShoppingCart, Heart, Share, Shield, Truck, CreditCard, Wallet, CheckCircle } from 'lucide-react';
import { allProducts } from '@/data/products';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const { isConnected } = useWallet();
  const { addToCart } = useCart();
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const [activeImage, setActiveImage] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isCryptoModalOpen, setIsCryptoModalOpen] = useState(false);
  const [purchaseCompleted, setPurchaseCompleted] = useState(false);

  useEffect(() => {
    const fetchProduct = () => {
      setLoading(true);
      setTimeout(() => {
        const foundProduct = allProducts.find(p => p.id.toString() === id);
        if (foundProduct) {
          setProduct(foundProduct);
          setActiveImage(foundProduct.image);
          setLoading(false);
          return;
        }
        
        const mockProducts = [
          {
            id: "1",
            name: "Premium Noise-Cancelling Headphones",
            price: 0.12,
            currency: "ETH",
            description: "Experience premium sound quality with these noise-cancelling headphones. Perfect for travel, work, or enjoying your favorite music without distractions.",
            features: [
              "Active noise cancellation technology",
              "40-hour battery life",
              "Bluetooth 5.0 connectivity",
              "Built-in microphone for calls",
              "Foldable design for easy storage"
            ],
            images: [
              "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
              "https://images.unsplash.com/photo-1484704849700-f032a568e944",
              "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b"
            ],
            category: "Electronics",
            condition: "New",
            carbonRating: 3,
            carbonEmission: "120g CO2/unit",
            seller: {
              name: "AudioPhile",
              rating: 4.8,
              sales: 342,
              address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F"
            },
            location: "Berlin, Germany",
            shipping: "Worldwide",
            reviews: 89,
            rating: 4.7
          },
          {
            id: "2",
            name: "Modern Minimalist Sofa",
            price: 0.35,
            currency: "ETH",
            description: "Transform your living space with this modern minimalist sofa. Featuring clean lines, comfortable cushions, and durable fabric, it's the perfect centerpiece for any contemporary home.",
            features: [
              "Premium stain-resistant fabric",
              "Solid wood frame",
              "High-resilience foam cushions",
              "Easy to assemble",
              "Available in multiple colors"
            ],
            images: [
              "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
              "https://images.unsplash.com/photo-1491926626787-62db157af940",
              "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c"
            ],
            category: "Home & Kitchen",
            condition: "New",
            carbonRating: 4,
            carbonEmission: "85g CO2/unit",
            seller: {
              name: "ModernHome",
              rating: 4.9,
              sales: 157,
              address: "0x8B3392483BA26D65E331dB86D4F430aE0FE1C89A"
            },
            location: "Stockholm, Sweden",
            shipping: "Europe Only",
            reviews: 42,
            rating: 4.9
          },
          {
            id: "3",
            name: "Abstract Digital Art Print",
            price: 0.08,
            currency: "ETH",
            description: "Add a splash of color and creativity to your walls with this unique abstract digital art print. Each piece is limited edition and includes a certificate of authenticity on the blockchain.",
            features: [
              "Limited edition (1 of 50)",
              "Museum-quality print",
              "Archival inks and premium paper",
              "Includes digital certificate of authenticity",
              "Ships in protective tube"
            ],
            images: [
              "https://images.unsplash.com/photo-1472396961693-142e6e269027",
              "https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8",
              "https://images.unsplash.com/photo-1590769620285-75211c7cdd94"
            ],
            category: "Art & Collectibles",
            condition: "New",
            carbonRating: 5,
            carbonEmission: "10g CO2/unit",
            seller: {
              name: "DigitalArtist",
              rating: 5.0,
              sales: 94,
              address: "0x2B5AD5c4795c026514f8317c7a215E218DcCD6cF"
            },
            location: "New York, USA",
            shipping: "Worldwide",
            reviews: 31,
            rating: 5.0
          }
        ];
        
        const mockProduct = mockProducts.find(p => p.id === id);
        if (mockProduct) {
          setProduct(mockProduct);
          setActiveImage(mockProduct.images[0]);
        }
        setLoading(false);
      }, 500);
    };

    fetchProduct();
  }, [id]);

  const addItemToCart = () => {
    if (!isConnected) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to purchase items.",
        variant: "destructive",
      });
      return;
    }

    addToCart(product, quantity);
  };

  const toggleFavorite = () => {
    if (isFavorite(parseInt(id as string))) {
      removeFromFavorites(parseInt(id as string));
    } else {
      addToFavorites(product);
      toast({
        title: "Added to wishlist",
        description: `${product.name} has been added to your wishlist.`,
      });
    }
  };

  const shareProduct = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied!",
      description: "Product link copied to clipboard.",
    });
  };

  const handleBuyWithCrypto = () => {
    if (!isConnected) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to make crypto payments.",
        variant: "destructive",
      });
      return;
    }
    
    setIsCryptoModalOpen(true);
  };
  
  const handlePaymentComplete = () => {
    setPurchaseCompleted(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto w-full">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-200 rounded-xl aspect-square"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-10 bg-gray-200 rounded w-1/2 mt-8"></div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto w-full">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-apple-text mb-4">Product Not Found</h1>
            <p className="text-lg text-apple-darkGray">
              The product you are looking for does not exist or has been removed.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto w-full">
        {purchaseCompleted && (
          <div className="mb-6 bg-green-50 border border-green-200 p-4 rounded-md">
            <p className="flex items-center text-green-700 font-medium">
              <CheckCircle className="mr-2 h-5 w-5" />
              Purchase successful! Thank you for your order.
            </p>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="rounded-xl overflow-hidden border border-gray-100 aspect-square">
              <img 
                src={activeImage} 
                alt={product?.name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product?.images ? (
                product.images.map((img: string, index: number) => (
                  <button 
                    key={index}
                    onClick={() => setActiveImage(img)}
                    className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 transition-all ${
                      activeImage === img ? 'border-apple-blue' : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <img 
                      src={img} 
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))
              ) : (
                <button 
                  onClick={() => setActiveImage(product?.image)}
                  className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 border-apple-blue"
                >
                  <img 
                    src={product?.image} 
                    alt={product?.name}
                    className="w-full h-full object-cover"
                  />
                </button>
              )}
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Badge className="bg-apple-blue/10 text-apple-blue hover:bg-apple-blue/20">
                  {product?.category}
                </Badge>
                <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20">
                  {product?.condition || "New"}
                </Badge>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-apple-text">{product?.name}</h1>
              
              <div className="flex items-center mt-2 space-x-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i} 
                      className={`w-4 h-4 ${i < Math.floor(product?.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`} 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-apple-darkGray">
                  {product?.rating || "N/A"} ({product?.reviews || 0} reviews)
                </span>
              </div>
              
              <p className="text-2xl font-bold text-apple-blue mt-4">
                {product?.price} {product?.currency}
              </p>
              
              {product?.carbonRating && (
                <div className="mt-2 flex items-center">
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Eco Rating: {product.carbonRating}/5
                  </Badge>
                  <span className="text-sm text-gray-500 ml-2">{product.carbonEmission}</span>
                </div>
              )}
            </div>
            
            <p className="text-apple-darkGray">{product?.description}</p>
            
            {product?.features && (
              <div>
                <h3 className="font-semibold text-apple-text mb-2">Key Features:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {product.features.map((feature: string, index: number) => (
                    <li key={index} className="text-apple-darkGray">{feature}</li>
                  ))}
                </ul>
              </div>
            )}
            
            <Separator />
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-apple-text font-medium">Quantity:</span>
                  <div className="flex items-center">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-8 w-8 rounded-r-none"
                      onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                    >
                      -
                    </Button>
                    <div className="h-8 px-4 flex items-center justify-center border-y border-input">
                      {quantity}
                    </div>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-8 w-8 rounded-l-none"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>
                
                {product?.seller && (
                  <div className="text-sm text-apple-darkGray">
                    Seller: <span className="font-medium">{product.seller.name}</span>
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Button 
                  className="flex items-center"
                  onClick={addItemToCart}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                </Button>
                
                <Button 
                  variant="secondary" 
                  className="flex items-center"
                  onClick={handleBuyWithCrypto}
                >
                  <Wallet className="mr-2 h-4 w-4" /> Buy with Crypto
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-3 mt-3">
                <Button 
                  variant="outline" 
                  className={`flex-1 md:flex-none ${
                    isFavorite(parseInt(id as string)) ? 'bg-red-50 text-red-500 border-red-200 hover:bg-red-100' : ''
                  }`}
                  onClick={toggleFavorite}
                >
                  <Heart className="mr-2 h-4 w-4" fill={isFavorite(parseInt(id as string)) ? "currentColor" : "none"} />
                  {isFavorite(parseInt(id as string)) ? 'Remove from Favorites' : 'Add to Favorites'}
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={shareProduct}
                >
                  <Share className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <Separator />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-apple-blue mr-2" />
                <div>
                  <p className="text-sm font-medium text-apple-text">Secure Payment</p>
                  <p className="text-xs text-apple-darkGray">Protected by smart contract</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Truck className="h-5 w-5 text-apple-blue mr-2" />
                <div>
                  <p className="text-sm font-medium text-apple-text">Shipping</p>
                  <p className="text-xs text-apple-darkGray">{product?.shipping || "Worldwide"}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <CreditCard className="h-5 w-5 text-apple-blue mr-2" />
                <div>
                  <p className="text-sm font-medium text-apple-text">Payment Options</p>
                  <p className="text-xs text-apple-darkGray">ETH, MATIC, USDC</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <Separator className="my-12" />
        
        <BlockchainSupplyChain productId={id as string} />
        
        <Separator className="my-12" />
        
        <BlockchainReviews productId={id as string} />
      </main>
      
      <Footer />
      
      <CryptoPaymentModal
        isOpen={isCryptoModalOpen}
        onClose={() => setIsCryptoModalOpen(false)}
        productName={product?.name || ""}
        price={product?.price || 0}
        sellerAddress={product?.seller?.address}
        onPaymentComplete={handlePaymentComplete}
      />
    </div>
  );
};

export default ProductDetail;
