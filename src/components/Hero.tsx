
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-6 md:px-12 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-50 to-white"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 fade-in">
            <span className="inline-block px-3 py-1 bg-apple-blue/10 text-apple-blue rounded-full text-sm font-medium">
              Decentralized Commerce
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-apple-text tracking-tight leading-tight">
              Shop with <span className="text-apple-blue">trust</span>, 
              <br className="hidden md:block" /> powered by blockchain
            </h1>
            <p className="text-lg text-apple-darkGray max-w-lg">
              Experience a new era of e-commerce with our decentralized platform. No intermediaries, lower fees, complete transparency.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
              <Link to="/categories" className="button-primary flex items-center justify-center space-x-2">
                <span>Start Shopping</span>
                <ArrowRight size={16} />
              </Link>
              <Link to="/connect" className="button-secondary flex items-center justify-center">
                <span>Connect Wallet</span>
              </Link>
            </div>
          </div>
          
          <div className="relative h-96 fade-in animation-delay-400">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-72 h-72 bg-apple-blue/5 rounded-full animate-breath"></div>
            </div>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="neo-glass rounded-2xl w-64 h-80 overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9" 
                  alt="Premium product"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <div className="absolute top-1/3 -right-8 glass rounded-lg p-3 shadow-lg fade-up animation-delay-600">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                  ✓
                </div>
                <span className="text-sm font-medium">Payment Verified</span>
              </div>
            </div>
            
            <div className="absolute bottom-1/3 -left-8 glass rounded-lg p-3 shadow-lg fade-up animation-delay-800">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
                  🔒
                </div>
                <span className="text-sm font-medium">Secure Transaction</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
