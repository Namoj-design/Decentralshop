import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import ProductCard from '@/components/ProductCard';
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
  Search,
  ArrowRight,
  Clock,
  TrendingUp,
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
}

const Categories = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

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
      id: 'health',
      name: 'Health & Medicine',
      icon: <Stethoscope size={36} />,
      description: 'Medical supplies, supplements, and healthcare products',
      color: 'from-red-500 to-orange-500',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae',
      productCount: 623
    },
    {
      id: 'tech',
      name: 'Tech & Software',
      icon: <Code size={36} />,
      description: 'Digital products, software, and services',
      color: 'from-indigo-500 to-blue-500',
      image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e',
      productCount: 521
    },
    {
      id: 'machinery',
      name: 'Machinery & Tools',
      icon: <Cog size={36} />,
      description: 'Industrial equipment, tools, and machinery',
      color: 'from-gray-500 to-slate-500',
      image: 'https://images.unsplash.com/photo-1531758854681-402b49fc7da4',
      productCount: 432
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
      id: 'food',
      name: 'Food & Groceries',
      icon: <Utensils size={36} />,
      description: 'Food items, ingredients, and specialty products',
      color: 'from-yellow-500 to-amber-500',
      image: 'https://images.unsplash.com/photo-1506617420156-8e4536971650',
      productCount: 645
    },
    {
      id: 'gaming',
      name: 'Gaming',
      icon: <Gamepad size={36} />,
      description: 'Video games, consoles, and gaming accessories',
      color: 'from-blue-500 to-cyan-500',
      image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575',
      productCount: 531
    },
    {
      id: 'books',
      name: 'Books & Stationery',
      icon: <BookOpen size={36} />,
      description: 'Books, notebooks, and writing supplies',
      color: 'from-amber-500 to-yellow-500',
      image: 'https://images.unsplash.com/photo-1550399105-c4db5fb85c18',
      productCount: 798
    },
    {
      id: 'automotive',
      name: 'Automotive',
      icon: <Car size={36} />,
      description: 'Car parts, accessories, and maintenance products',
      color: 'from-slate-500 to-gray-500',
      image: 'https://images.unsplash.com/photo-1617813960481-5ad0ae5920db',
      productCount: 384
    },
    {
      id: 'baby',
      name: 'Baby & Kids',
      icon: <Baby size={36} />,
      description: 'Children\'s clothing, toys, and baby supplies',
      color: 'from-pink-400 to-rose-500',
      image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba',
      productCount: 423
    },
    {
      id: 'sports',
      name: 'Sports & Fitness',
      icon: <Dumbbell size={36} />,
      description: 'Sporting goods, fitness equipment, and activewear',
      color: 'from-green-400 to-emerald-500',
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438',
      productCount: 519
    },
    {
      id: 'beauty',
      name: 'Beauty & Personal Care',
      icon: <Heart size={36} />,
      description: 'Skincare, makeup, and personal hygiene products',
      color: 'from-rose-400 to-red-500',
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9',
      productCount: 687
    },
    {
      id: 'pets',
      name: 'Pets',
      icon: <Dog size={36} />,
      description: 'Pet food, toys, and accessories',
      color: 'from-amber-400 to-orange-500',
      image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba',
      productCount: 354
    },
    {
      id: 'other',
      name: 'Everything Else',
      icon: <ShoppingBag size={36} />,
      description: 'Other unique items that don\'t fit the categories above',
      color: 'from-violet-500 to-fuchsia-500',
      image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc',
      productCount: 475
    }
  ];

  // Sample featured products
  const featuredProducts: Product[] = [
    {
      id: 1,
      name: "Premium Headphones",
      price: 0.032,
      currency: "ETH",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
      category: "Electronics"
    },
    {
      id: 2,
      name: "Modern Furniture Set",
      price: 0.089,
      currency: "ETH",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
      category: "Home"
    },
    {
      id: 3,
      name: "Limited Edition Print",
      price: 0.015,
      currency: "ETH",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
      category: "Art"
    },
    {
      id: 4,
      name: "Designer Dress",
      price: 0.045,
      currency: "ETH",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050",
      category: "Fashion"
    },
    {
      id: 5,
      name: "Gaming Console",
      price: 0.12,
      currency: "ETH",
      image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575",
      category: "Gaming"
    },
    {
      id: 6,
      name: "Vintage Collector's Book",
      price: 0.025,
      currency: "ETH",
      image: "https://images.unsplash.com/photo-1550399105-c4db5fb85c18",
      category: "Books"
    }
  ];

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const featuredCategories = categories.filter(cat => cat.featured);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-apple-text mb-4">Shop by Category</h1>
          <p className="text-lg text-apple-darkGray max-w-2xl mx-auto">
            Explore our wide range of product categories, from electronics and home goods to health products and machinery.
          </p>
          
          <div className="mt-8 max-w-2xl mx-auto flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search categories..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-apple-blue"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button 
              variant="outline" 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <SlidersHorizontal size={16} />
              Filters
            </Button>
          </div>
        </div>
        
        {/* Featured Categories */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-apple-text">Featured Categories</h2>
            <Button variant="ghost" className="text-apple-blue font-medium flex items-center">
              View all <ArrowRight size={16} className="ml-1" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCategories.map((category) => (
              <Link 
                to={`/categories/${category.id}`} 
                key={category.id}
                className="group"
              >
                <div className="relative h-48 rounded-xl overflow-hidden shadow-md transition-transform group-hover:shadow-lg group-hover:-translate-y-1">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                    <h3 className="text-white font-bold text-xl">{category.name}</h3>
                    <p className="text-white/80 text-sm mt-1">{category.productCount} products</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
        
        {/* All Categories Filter */}
        <section>
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-apple-text">All Categories</h2>
              <div className="flex items-center space-x-4">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="popular">Popular</TabsTrigger>
                  <TabsTrigger value="new">Newest</TabsTrigger>
                </TabsList>
              </div>
            </div>
            
            <TabsContent value="all" className="p-0 mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCategories.map((category) => (
                  <Link 
                    to={`/categories/${category.id}`} 
                    key={category.id}
                    className="group"
                  >
                    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 h-full">
                      <div className={`bg-gradient-to-r ${category.color} p-6 flex justify-center items-center text-white relative h-48 overflow-hidden`}>
                        {category.icon}
                        <img 
                          src={category.image} 
                          alt={category.name}
                          className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-xl mb-2 text-apple-text group-hover:text-apple-blue transition-all">
                            {category.name}
                          </h3>
                          <Badge variant="outline" className="bg-gray-100">
                            {category.productCount}
                          </Badge>
                        </div>
                        <p className="text-apple-darkGray">
                          {category.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              
              {filteredCategories.length === 0 && (
                <div className="text-center py-16">
                  <h3 className="text-2xl font-medium mb-2">No categories found</h3>
                  <p className="text-apple-darkGray">Try a different search term</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="popular" className="p-0 mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCategories
                  .sort((a, b) => b.productCount - a.productCount)
                  .slice(0, 6)
                  .map((category) => (
                    <Link 
                      to={`/categories/${category.id}`} 
                      key={category.id}
                      className="group"
                    >
                      <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 h-full">
                        <div className={`bg-gradient-to-r ${category.color} p-6 flex justify-center items-center text-white relative h-48 overflow-hidden`}>
                          {category.icon}
                          <img 
                            src={category.image} 
                            alt={category.name}
                            className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity"
                          />
                          <Badge className="absolute top-4 right-4 bg-white text-apple-blue">
                            <TrendingUp size={12} className="mr-1" /> Popular
                          </Badge>
                        </div>
                        <div className="p-6">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold text-xl mb-2 text-apple-text group-hover:text-apple-blue transition-all">
                              {category.name}
                            </h3>
                            <Badge variant="outline" className="bg-gray-100">
                              {category.productCount}
                            </Badge>
                          </div>
                          <p className="text-apple-darkGray">
                            {category.description}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="new" className="p-0 mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCategories
                  .slice(0, 6)
                  .map((category) => (
                    <Link 
                      to={`/categories/${category.id}`} 
                      key={category.id}
                      className="group"
                    >
                      <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 h-full">
                        <div className={`bg-gradient-to-r ${category.color} p-6 flex justify-center items-center text-white relative h-48 overflow-hidden`}>
                          {category.icon}
                          <img 
                            src={category.image} 
                            alt={category.name}
                            className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity"
                          />
                          <Badge className="absolute top-4 right-4 bg-white text-apple-blue">
                            <Clock size={12} className="mr-1" /> New
                          </Badge>
                        </div>
                        <div className="p-6">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold text-xl mb-2 text-apple-text group-hover:text-apple-blue transition-all">
                              {category.name}
                            </h3>
                            <Badge variant="outline" className="bg-gray-100">
                              {category.productCount}
                            </Badge>
                          </div>
                          <p className="text-apple-darkGray">
                            {category.description}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>
        
        {/* Featured Products */}
        <section className="mt-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-apple-text">Featured Products</h2>
            <Button variant="ghost" className="text-apple-blue font-medium flex items-center">
              View all <ArrowRight size={16} className="ml-1" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="fade-up">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Categories;
