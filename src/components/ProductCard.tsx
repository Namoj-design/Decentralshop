
import { ShoppingCart, Heart, Leaf } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useFavorites } from '@/context/FavoritesContext';

interface Product {
  id: number;
  name: string;
  price: number;
  currency: string;
  image: string;
  category: string;
  carbonRating?: number; // 1-5 rating (5 is most eco-friendly)
  carbonEmission?: string; // e.g. "12g CO2/unit"
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  
  const isFav = isFavorite(product.id);
  
  // Get color for carbon rating
  const getCarbonRatingColor = (rating?: number) => {
    if (!rating) return "bg-gray-200 text-gray-600";
    if (rating >= 4) return "bg-green-100 text-green-700";
    if (rating >= 3) return "bg-lime-100 text-lime-700";
    if (rating >= 2) return "bg-amber-100 text-amber-700";
    return "bg-red-100 text-red-700";
  };
  
  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isFav) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };
  
  return (
    <div 
      className="group rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product.id}`} className="block relative">
        <div className="h-64 overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name}
            className={`w-full h-full object-cover transition-all duration-700 ${
              isHovered ? 'scale-110' : 'scale-100'
            }`}
          />
        </div>
        
        <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-apple-text text-xs font-medium px-3 py-1 rounded-full">
          {product.category}
        </span>
        
        {product.carbonRating && (
          <span className={`absolute bottom-4 left-4 flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${getCarbonRatingColor(product.carbonRating)}`}>
            <Leaf size={12} />
            <span className="font-semibold">Eco Rating: {product.carbonRating}/5</span>
          </span>
        )}
        
        <button 
          className={`absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full transition-colors ${
            isFav ? 'text-red-500' : 'text-apple-text hover:text-red-500'
          }`}
          aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
          onClick={handleToggleFavorite}
        >
          <Heart size={16} fill={isFav ? "currentColor" : "none"} />
        </button>
      </Link>
      
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-lg text-apple-text">
              {product.name}
            </h3>
            <p className="text-apple-blue font-semibold mt-1">
              {product.price} {product.currency}
            </p>
            {product.carbonEmission && (
              <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                <Leaf size={12} className="text-green-600" />
                {product.carbonEmission}
              </p>
            )}
          </div>
          
          <button 
            className="p-2.5 rounded-full bg-apple-blue text-white hover:bg-apple-blue/90 transition-colors"
            aria-label="Add to cart"
            onClick={handleAddToCart}
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
