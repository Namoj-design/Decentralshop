
import { useState, useEffect } from 'react';
import { Menu, X, User, Package, Plane } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import WalletConnect from './WalletConnect';
import Cart from './Cart';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 md:px-12 ${
        isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-apple-text font-bold text-2xl tracking-tight relative z-50">
          DecentralShop
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className={`text-apple-text hover:text-apple-blue transition-apple ${location.pathname === '/' ? 'text-apple-blue' : ''}`}>
            Home
          </Link>
          <Link to="/categories" className={`text-apple-text hover:text-apple-blue transition-apple ${location.pathname === '/categories' ? 'text-apple-blue' : ''}`}>
            Categories
          </Link>
          <Link to="/flights" className={`text-apple-text hover:text-apple-blue transition-apple ${location.pathname === '/flights' ? 'text-apple-blue' : ''}`}>
            <span className="flex items-center gap-1">
              <Plane size={16} />
              Flights
            </span>
          </Link>
          <Link to="/sell" className={`text-apple-text hover:text-apple-blue transition-apple ${location.pathname === '/sell' ? 'text-apple-blue' : ''}`}>
            Sell
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <WalletConnect />
          <Link
            to="/sell"
            className="flex items-center gap-2 text-apple-text hover:text-apple-blue transition-apple"
          >
            <Package size={20} />
            <span>Sell</span>
          </Link>
          <Cart />
          <Link 
            to="/account" 
            className="p-2 text-apple-text hover:text-apple-blue transition-apple"
          >
            <User size={20} />
          </Link>
        </div>
        
        <button 
          className="md:hidden text-apple-text relative z-50" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        {/* Mobile menu */}
        <div 
          className={`fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="pt-24 px-6 flex flex-col space-y-8 h-full">
            <Link 
              to="/" 
              className="text-apple-text hover:text-apple-blue transition-apple text-2xl font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/categories" 
              className="text-apple-text hover:text-apple-blue transition-apple text-2xl font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Categories
            </Link>
            <Link 
              to="/flights" 
              className="text-apple-text hover:text-apple-blue transition-apple text-2xl font-medium flex items-center gap-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Plane size={20} />
              Flights
            </Link>
            <Link 
              to="/sell" 
              className="text-apple-text hover:text-apple-blue transition-apple text-2xl font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sell
            </Link>
            
            <div className="flex flex-col items-start space-y-6 mt-auto mb-8">
              <WalletConnect />
              <div className="p-2">
                <Cart />
              </div>
              <Link 
                to="/account" 
                className="p-2 text-apple-text hover:text-apple-blue transition-apple flex items-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <User size={24} className="mr-2" />
                <span>Account</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
