
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "@/hooks/use-toast";

interface Product {
  id: number;
  name: string;
  price: number;
  currency: string;
  image: string;
  category: string;
  carbonRating?: number;
  carbonEmission?: string;
}

interface FavoritesContextType {
  favorites: Product[];
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
  totalFavorites: number;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Product[]>([]);
  
  // Load favorites from localStorage on initial render
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error('Failed to parse favorites from localStorage:', error);
      }
    }
  }, []);
  
  // Save favorites to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (product: Product) => {
    setFavorites(currentFavorites => {
      const existingItem = currentFavorites.find(item => item.id === product.id);
      
      if (existingItem) {
        return currentFavorites;
      } else {
        toast({
          title: "Added to favorites",
          description: `${product.name} added to your favorites.`,
        });
        return [...currentFavorites, product];
      }
    });
  };

  const removeFromFavorites = (productId: number) => {
    setFavorites(currentFavorites => {
      const filtered = currentFavorites.filter(item => item.id !== productId);
      if (filtered.length < currentFavorites.length) {
        toast({
          title: "Removed from favorites",
          description: "Item removed from your favorites.",
        });
      }
      return filtered;
    });
  };

  const isFavorite = (productId: number) => {
    return favorites.some(item => item.id === productId);
  };

  const totalFavorites = favorites.length;

  return (
    <FavoritesContext.Provider value={{
      favorites,
      addToFavorites,
      removeFromFavorites,
      isFavorite,
      totalFavorites
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
