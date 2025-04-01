
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { 
  Laptop, 
  Home, 
  Palette, 
  Stethoscope, 
  Code, 
  Cog, 
  ShoppingBag, 
  Shirt, 
  Utensils, 
  Gamepad,
  BookOpen,
  Car,
  Baby,
  Dumbbell,
  Heart,
  Dog,
  Ticket,
  Globe,
  Briefcase,
  Search,
  ChevronDown,
  ArrowUpDown,
  SlidersHorizontal
} from 'lucide-react';

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  color: string;
  image: string;
  featured?: boolean;
  productCount: number;
}

interface Product {
  id: number;
  name: string;
  price: number;
  currency: string;
  image: string;
  category: string;
  subcategory?: string;
  rating?: number;
  condition?: string;
  isNew?: boolean;
}

const CategoryDetail = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1]);
  const [sortBy, setSortBy] = useState('popular');
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [subcategories, setSubcategories] = useState<string[]>([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);

  // Define category icons
  const categoryIcons: Record<string, React.ReactNode> = {
    'electronics': <Laptop size={36} />,
    'home': <Home size={36} />,
    'art': <Palette size={36} />,
    'health': <Stethoscope size={36} />,
    'tech': <Code size={36} />,
    'machinery': <Cog size={36} />,
    'fashion': <Shirt size={36} />,
    'food': <Utensils size={36} />,
    'gaming': <Gamepad size={36} />,
    'books': <BookOpen size={36} />,
    'automotive': <Car size={36} />,
    'baby': <Baby size={36} />,
    'sports': <Dumbbell size={36} />,
    'beauty': <Heart size={36} />,
    'pets': <Dog size={36} />,
    'tickets': <Ticket size={36} />,
    'travel': <Globe size={36} />,
    'services': <Briefcase size={36} />,
    'other': <ShoppingBag size={36} />
  };

  // Category definitions for all categories with mock data
  const categories: Category[] = [
    {
      id: 'electronics',
      name: 'Electronics',
      icon: <Laptop size={36} />,
      description: 'Computers, phones, tablets, and other electronic devices',
      color: 'from-blue-500 to-purple-500',
      image: 'https://images.unsplash.com/photo-1588508065123-287b28e013da',
      featured: true,
      productCount: 1245
    },
    {
      id: 'home',
      name: 'Home & Living',
      icon: <Home size={36} />,
      description: 'Furniture, kitchenware, and home decor',
      color: 'from-green-500 to-teal-500',
      image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6',
      featured: true,
      productCount: 987
    },
    {
      id: 'art',
      name: 'Art & Collectibles',
      icon: <Palette size={36} />,
      description: 'Art pieces, decorations, and collectibles',
      color: 'from-pink-500 to-red-500',
      image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5',
      featured: true,
      productCount: 754
    },
    {
      id: 'fashion',
      name: 'Fashion',
      icon: <Shirt size={36} />,
      description: 'Clothing, shoes, accessories, and jewelry',
      color: 'from-purple-500 to-pink-500',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050',
      featured: true,
      productCount: 876
    },
    {
      id: 'gaming',
      name: 'Gaming',
      icon: <Gamepad size={36} />,
      description: 'Video games, consoles, and gaming accessories',
      color: 'from-blue-500 to-cyan-500',
      image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575',
      productCount: 531
    }
  ];

  // Mock product data
  const mockProducts = {
    'electronics': [
      {
        id: 101,
        name: "Noise-Cancelling Headphones",
        price: 0.032,
        currency: "ETH",
        image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
        category: "Electronics",
        subcategory: "Audio",
        rating: 4.7,
        condition: "New",
        isNew: true
      },
      {
        id: 102,
        name: "Smartphone XR Pro",
        price: 0.15,
        currency: "ETH",
        image: "https://images.unsplash.com/photo-1662947995386-d18019d4f8c3",
        category: "Electronics",
        subcategory: "Smartphones",
        rating: 4.9,
        condition: "New"
      },
      {
        id: 103,
        name: "Ultra HD Smart TV",
        price: 0.25,
        currency: "ETH",
        image: "https://images.unsplash.com/photo-1601944179066-29b8f7e53c56",
        category: "Electronics",
        subcategory: "TVs",
        rating: 4.5,
        condition: "New"
      },
      {
        id: 104,
        name: "Professional Camera Kit",
        price: 0.18,
        currency: "ETH",
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32",
        category: "Electronics",
        subcategory: "Cameras",
        rating: 4.8,
        condition: "Like New"
      },
      {
        id: 105,
        name: "Wireless Earbuds",
        price: 0.022,
        currency: "ETH",
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df",
        category: "Electronics",
        subcategory: "Audio",
        rating: 4.6,
        condition: "New",
        isNew: true
      },
      {
        id: 106,
        name: "Smart Home Hub",
        price: 0.045,
        currency: "ETH",
        image: "https://images.unsplash.com/photo-1558002038-1055e2e8ebc9",
        category: "Electronics",
        subcategory: "Smart Home",
        rating: 4.3,
        condition: "New"
      }
    ],
    'home': [
      {
        id: 201,
        name: "Modern Minimalist Sofa",
        price: 0.35,
        currency: "ETH",
        image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
        category: "Home",
        subcategory: "Furniture",
        rating: 4.8,
        condition: "New"
      },
      {
        id: 202,
        name: "Artisan Coffee Table",
        price: 0.089,
        currency: "ETH",
        image: "https://images.unsplash.com/photo-1634712282287-14ed57b9cc89",
        category: "Home",
        subcategory: "Furniture",
        rating: 4.7,
        condition: "New"
      },
      {
        id: 203,
        name: "Designer Table Lamp",
        price: 0.042,
        currency: "ETH",
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c",
        category: "Home",
        subcategory: "Lighting",
        rating: 4.5,
        condition: "New",
        isNew: true
      },
      {
        id: 204,
        name: "Luxury Bedding Set",
        price: 0.056,
        currency: "ETH",
        image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af",
        category: "Home",
        subcategory: "Bedding",
        rating: 4.9,
        condition: "New"
      }
    ],
    'art': [
      {
        id: 301,
        name: "Abstract Digital Art Print",
        price: 0.015,
        currency: "ETH",
        image: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
        category: "Art",
        subcategory: "Digital Art",
        rating: 4.8,
        condition: "New",
        isNew: true
      },
      {
        id: 302,
        name: "Handcrafted Ceramic Vase",
        price: 0.038,
        currency: "ETH",
        image: "https://images.unsplash.com/photo-1578692644416-51c957574e1b",
        category: "Art",
        subcategory: "Ceramics",
        rating: 4.7,
        condition: "New"
      },
      {
        id: 303,
        name: "Limited Edition Sculpture",
        price: 0.23,
        currency: "ETH",
        image: "https://images.unsplash.com/photo-1544423617-5c1b67fd2b92",
        category: "Art",
        subcategory: "Sculpture",
        rating: 5.0,
        condition: "New"
      }
    ],
    'fashion': [
      {
        id: 401,
        name: "Designer Silk Dress",
        price: 0.045,
        currency: "ETH",
        image: "https://images.unsplash.com/photo-1445205170230-053b83016050",
        category: "Fashion",
        subcategory: "Women's Clothing",
        rating: 4.6,
        condition: "New"
      },
      {
        id: 402,
        name: "Luxury Leather Handbag",
        price: 0.075,
        currency: "ETH",
        image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1",
        category: "Fashion",
        subcategory: "Accessories",
        rating: 4.9,
        condition: "New",
        isNew: true
      },
      {
        id: 403,
        name: "Premium Watch Collection",
        price: 0.12,
        currency: "ETH",
        image: "https://images.unsplash.com/photo-1539874754764-5a96559165b0",
        category: "Fashion",
        subcategory: "Accessories",
        rating: 4.8,
        condition: "New"
      }
    ],
    'gaming': [
      {
        id: 501,
        name: "Next-Gen Gaming Console",
        price: 0.12,
        currency: "ETH",
        image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575",
        category: "Gaming",
        subcategory: "Consoles",
        rating: 4.9,
        condition: "New",
        isNew: true
      },
      {
        id: 502,
        name: "Virtual Reality Headset",
        price: 0.085,
        currency: "ETH",
        image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac",
        category: "Gaming",
        subcategory: "Accessories",
        rating: 4.7,
        condition: "New"
      },
      {
        id: 503,
        name: "Pro Gaming Controller",
        price: 0.035,
        currency: "ETH",
        image: "https://images.unsplash.com/photo-1592840496694-26d035b52b48",
        category: "Gaming",
        subcategory: "Accessories",
        rating: 4.5,
        condition: "New"
      }
    ]
  };

  useEffect(() => {
    // Simulating API call to fetch category and products
    setLoading(true);
    
    setTimeout(() => {
      // Find the category
      const foundCategory = categories.find(cat => cat.id === categoryId);
      
      if (foundCategory) {
        setCategory(foundCategory);
        
        // Get products for this category
        const categoryProducts = mockProducts[categoryId as keyof typeof mockProducts] || [];
        setProducts(categoryProducts);
        
        // Extract unique subcategories
        const uniqueSubcategories = Array.from(new Set(categoryProducts.map(p => p.subcategory))).filter(Boolean) as string[];
        setSubcategories(uniqueSubcategories);
      }
      
      setLoading(false);
    }, 800);
  }, [categoryId]);

  // Filter products based on search term, price range, and selected filters
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    
    const matchesSubcategory = selectedSubcategories.length === 0 || 
      (product.subcategory && selectedSubcategories.includes(product.subcategory));
      
    const matchesCondition = selectedConditions.length === 0 || 
      (product.condition && selectedConditions.includes(product.condition));
    
    return matchesSearch && matchesPrice && matchesSubcategory && matchesCondition;
  });

  // Sort products based on selection
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch(sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      case 'new':
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      default: // popular
        return (b.rating || 0) - (a.rating || 0);
    }
  });

  // Calculate max price for the range slider
  const maxPrice = Math.max(...products.map(p => p.price), 0.5);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto w-full">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-200 rounded w-1/3 mb-6"></div>
            <div className="h-6 bg-gray-200 rounded w-2/3 mb-12"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="hidden md:block space-y-6">
                <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="space-y-2">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-6 bg-gray-200 rounded w-full"></div>
                  ))}
                </div>
              </div>
              
              <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="bg-gray-200 rounded-xl h-80"></div>
                ))}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto w-full">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-apple-text mb-4">Category Not Found</h1>
            <p className="text-lg text-apple-darkGray mb-8">
              The category you are looking for does not exist.
            </p>
            <Link to="/categories">
              <Button>Browse All Categories</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div 
        className="relative h-80 w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${category.image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30 flex flex-col justify-center px-6 md:px-12">
          <div className="max-w-7xl mx-auto w-full">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{category.name}</h1>
            <p className="text-lg text-white/80 max-w-2xl">
              {category.description}
            </p>
            <div className="flex items-center mt-6 text-white/80">
              <span className="mr-2">{category.productCount} products</span>
            </div>
          </div>
        </div>
      </div>
      
      <main className="flex-grow py-12 px-6 md:px-12 max-w-7xl mx-auto w-full">
        {/* Search and Filter Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder={`Search in ${category.name}...`}
              className="w-full pl-10 pr-4 py-2 rounded-xl"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-initial">
              <Button 
                variant="outline" 
                className="w-full sm:w-auto flex items-center justify-between"
                onClick={() => setSortBy(prev => prev === 'popular' ? 'price-low' : 'popular')}
              >
                Sort by
                <ChevronDown size={16} className="ml-2" />
              </Button>
              
              <div className="absolute right-0 top-full mt-1 bg-white rounded-md shadow-lg z-10 hidden group-hover:block">
                <div className="py-1">
                  <button 
                    className={`block px-4 py-2 text-sm w-full text-left ${sortBy === 'popular' ? 'bg-apple-blue/10 text-apple-blue' : ''}`}
                    onClick={() => setSortBy('popular')}
                  >
                    Popular
                  </button>
                  <button 
                    className={`block px-4 py-2 text-sm w-full text-left ${sortBy === 'price-low' ? 'bg-apple-blue/10 text-apple-blue' : ''}`}
                    onClick={() => setSortBy('price-low')}
                  >
                    Price: Low to High
                  </button>
                  <button 
                    className={`block px-4 py-2 text-sm w-full text-left ${sortBy === 'price-high' ? 'bg-apple-blue/10 text-apple-blue' : ''}`}
                    onClick={() => setSortBy('price-high')}
                  >
                    Price: High to Low
                  </button>
                  <button 
                    className={`block px-4 py-2 text-sm w-full text-left ${sortBy === 'rating' ? 'bg-apple-blue/10 text-apple-blue' : ''}`}
                    onClick={() => setSortBy('rating')}
                  >
                    Highest Rated
                  </button>
                  <button 
                    className={`block px-4 py-2 text-sm w-full text-left ${sortBy === 'new' ? 'bg-apple-blue/10 text-apple-blue' : ''}`}
                    onClick={() => setSortBy('new')}
                  >
                    Newest First
                  </button>
                </div>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => setFilterPanelOpen(!filterPanelOpen)}
            >
              <SlidersHorizontal size={16} />
              Filters
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Filters Sidebar - Desktop */}
          <div className="hidden md:block space-y-8">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Subcategories</h3>
              <div className="space-y-2">
                {subcategories.map((subcat) => (
                  <div key={subcat} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`subcat-${subcat}`} 
                      checked={selectedSubcategories.includes(subcat)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedSubcategories([...selectedSubcategories, subcat]);
                        } else {
                          setSelectedSubcategories(selectedSubcategories.filter(sc => sc !== subcat));
                        }
                      }}
                    />
                    <label 
                      htmlFor={`subcat-${subcat}`}
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {subcat}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Price Range</h3>
              <div className="px-2">
                <Slider 
                  defaultValue={[0, maxPrice]} 
                  max={maxPrice} 
                  step={0.001}
                  onValueChange={(value) => setPriceRange(value as [number, number])}
                />
                <div className="flex justify-between mt-2 text-sm text-apple-darkGray">
                  <span>{priceRange[0].toFixed(3)} ETH</span>
                  <span>{priceRange[1].toFixed(3)} ETH</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Condition</h3>
              <div className="space-y-2">
                {['New', 'Like New', 'Good', 'Fair', 'Poor'].map((condition) => (
                  <div key={condition} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`condition-${condition}`} 
                      checked={selectedConditions.includes(condition)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedConditions([...selectedConditions, condition]);
                        } else {
                          setSelectedConditions(selectedConditions.filter(c => c !== condition));
                        }
                      }}
                    />
                    <label 
                      htmlFor={`condition-${condition}`}
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {condition}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => {
                setSelectedSubcategories([]);
                setSelectedConditions([]);
                setPriceRange([0, maxPrice]);
              }}
            >
              Reset Filters
            </Button>
          </div>
          
          {/* Mobile Filters - Expandable Panel */}
          {filterPanelOpen && (
            <div className="md:hidden bg-white p-4 rounded-lg shadow-lg mb-6">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Subcategories</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {subcategories.map((subcat) => (
                      <div key={subcat} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`mobile-subcat-${subcat}`} 
                          checked={selectedSubcategories.includes(subcat)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedSubcategories([...selectedSubcategories, subcat]);
                            } else {
                              setSelectedSubcategories(selectedSubcategories.filter(sc => sc !== subcat));
                            }
                          }}
                        />
                        <label 
                          htmlFor={`mobile-subcat-${subcat}`}
                          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {subcat}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Price Range</h3>
                  <div className="px-2">
                    <Slider 
                      defaultValue={[0, maxPrice]} 
                      max={maxPrice} 
                      step={0.001}
                      onValueChange={(value) => setPriceRange(value as [number, number])}
                    />
                    <div className="flex justify-between mt-2 text-sm text-apple-darkGray">
                      <span>{priceRange[0].toFixed(3)} ETH</span>
                      <span>{priceRange[1].toFixed(3)} ETH</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Condition</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {['New', 'Like New', 'Good', 'Fair', 'Poor'].map((condition) => (
                      <div key={condition} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`mobile-condition-${condition}`} 
                          checked={selectedConditions.includes(condition)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedConditions([...selectedConditions, condition]);
                            } else {
                              setSelectedConditions(selectedConditions.filter(c => c !== condition));
                            }
                          }}
                        />
                        <label 
                          htmlFor={`mobile-condition-${condition}`}
                          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {condition}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    className="w-1/2"
                    onClick={() => {
                      setSelectedSubcategories([]);
                      setSelectedConditions([]);
                      setPriceRange([0, maxPrice]);
                    }}
                  >
                    Reset
                  </Button>
                  <Button 
                    className="w-1/2"
                    onClick={() => setFilterPanelOpen(false)}
                  >
                    Apply Filters
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          {/* Products Grid */}
          <div className="md:col-span-3">
            {/* Sort info */}
            <div className="flex items-center justify-between mb-6">
              <div className="text-sm text-apple-darkGray">
                Showing {sortedProducts.length} of {products.length} products
              </div>
              <div className="hidden sm:flex items-center text-sm text-apple-darkGray">
                <span className="mr-2">Sort by:</span>
                <Button variant="ghost" size="sm" className="h-8 px-2" onClick={() => setSortBy('popular')}>
                  <span className={sortBy === 'popular' ? 'text-apple-blue font-medium' : ''}>Popular</span>
                </Button>
                <Button variant="ghost" size="sm" className="h-8 px-2" onClick={() => setSortBy('price-low')}>
                  <span className={sortBy === 'price-low' ? 'text-apple-blue font-medium' : ''}>Price: Low to High</span>
                </Button>
                <Button variant="ghost" size="sm" className="h-8 px-2" onClick={() => setSortBy('price-high')}>
                  <span className={sortBy === 'price-high' ? 'text-apple-blue font-medium' : ''}>Price: High to Low</span>
                </Button>
                <Button variant="ghost" size="sm" className="h-8 px-2" onClick={() => setSortBy('new')}>
                  <span className={sortBy === 'new' ? 'text-apple-blue font-medium' : ''}>Newest</span>
                </Button>
              </div>
            </div>
            
            {sortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map((product) => (
                  <div key={product.id}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-gray-50 rounded-xl">
                <h3 className="text-xl font-medium mb-2">No products found</h3>
                <p className="text-apple-darkGray mb-6">Try adjusting your filters or search criteria</p>
                <Button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedSubcategories([]);
                    setSelectedConditions([]);
                    setPriceRange([0, maxPrice]);
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CategoryDetail;
