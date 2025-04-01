import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

const FeaturedProducts = () => {
  const featuredProducts = [
    {
      id: 1,
      name: "Premium Headphones",
      price: 0.032,
      currency: "ETH",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
      category: "Electronics",
      carbonRating: 3,
      carbonEmission: "120g CO2/unit"
    },
    {
      id: 2,
      name: "Modern Furniture Set",
      price: 0.089,
      currency: "ETH",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
      category: "Home",
      carbonRating: 4,
      carbonEmission: "85g CO2/unit"
    },
    {
      id: 3,
      name: "Limited Edition Print",
      price: 0.015,
      currency: "ETH",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
      category: "Art",
      carbonRating: 5,
      carbonEmission: "10g CO2/unit"
    },
    {
      id: 4,
      name: "Industrial Machinery",
      price: 0.245,
      currency: "ETH",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
      category: "Machinery",
      carbonRating: 2,
      carbonEmission: "420g CO2/unit"
    }
  ];

  return (
    <section className="py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <h2 className="section-title fade-in">Featured Products</h2>
            <p className="section-subtitle fade-in animation-delay-200">Curated selection from our marketplace</p>
          </div>
          <Link 
            to="/categories" 
            className="text-apple-blue font-medium flex items-center space-x-1 hover:text-apple-blue/80 transition-apple fade-in animation-delay-400"
          >
            <span>View all products</span>
            <ArrowRight size={16} />
          </Link>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product, index) => (
            <div 
              key={product.id} 
              className={`fade-up ${
                index === 0 ? 'animation-delay-200' : 
                index === 1 ? 'animation-delay-400' : 
                index === 2 ? 'animation-delay-600' :
                'animation-delay-800'
              }`}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
