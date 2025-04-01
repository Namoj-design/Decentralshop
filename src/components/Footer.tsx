
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="pt-16 pb-8 px-6 md:px-12 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <Link to="/" className="text-apple-text font-bold text-2xl tracking-tight">
              DecentralShop
            </Link>
            <p className="text-apple-darkGray mt-4 max-w-xs">
              A decentralized e-commerce platform built on blockchain technology for secure, transparent transactions.
            </p>
          </div>
          
          <div>
            <h4 className="text-apple-text font-semibold mb-4">Platform</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/shop" className="text-apple-darkGray hover:text-apple-blue transition-apple">
                  Browse Products
                </Link>
              </li>
              <li>
                <Link to="/sell" className="text-apple-darkGray hover:text-apple-blue transition-apple">
                  Sell on Platform
                </Link>
              </li>
              <li>
                <Link to="/connect" className="text-apple-darkGray hover:text-apple-blue transition-apple">
                  Connect Wallet
                </Link>
              </li>
              <li>
                <Link to="/token" className="text-apple-darkGray hover:text-apple-blue transition-apple">
                  DEC Token
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-apple-text font-semibold mb-4">Resources</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/docs" className="text-apple-darkGray hover:text-apple-blue transition-apple">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-apple-darkGray hover:text-apple-blue transition-apple">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-apple-darkGray hover:text-apple-blue transition-apple">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/partners" className="text-apple-darkGray hover:text-apple-blue transition-apple">
                  Partners
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-apple-text font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-apple-darkGray hover:text-apple-blue transition-apple">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-apple-darkGray hover:text-apple-blue transition-apple">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-apple-darkGray hover:text-apple-blue transition-apple">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-apple-darkGray hover:text-apple-blue transition-apple">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-apple-darkGray">
            © {new Date().getFullYear()} DecentralShop. All rights reserved.
          </p>
          
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-apple-darkGray hover:text-apple-blue transition-apple"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-apple-darkGray hover:text-apple-blue transition-apple"
              aria-label="Twitter"
            >
              <Twitter size={20} />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-apple-darkGray hover:text-apple-blue transition-apple"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
