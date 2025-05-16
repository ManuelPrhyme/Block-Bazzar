import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useWallet } from '../../contexts/WalletContext';
import { useMarketplace } from '../../contexts/MarketplaceContext';
import { Menu, X, ShoppingCart, Search, User, Menu as MenuIcon } from 'lucide-react';

const Header = () => {
  const { account, connectWallet, disconnectWallet, isConnecting } = useWallet();
  const { getCartCount } = useMarketplace();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const [isConnected,setConnection] = useState(false)

  useEffect(()=>{

      const ConnnectionCheck = async () => {
        if(window.ethereum){
        
            const Acc = await window.ethereum.request({method:'eth_accounts'})

            Acc ? setConnection(true) : setConnection(false)

        }

    }

    ConnnectionCheck()

  },[])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  const cartCount = getCartCount();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Link 
            to="/" 
            className="text-2xl font-bold text-teal-600 dark:text-teal-400 flex items-center"
          >
            <span className="mr-2">BlockBazaar</span>
          </Link>
        </div>

        {/* Search Bar - Hidden on mobile */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <form onSubmit={handleSearch} className="w-full">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:text-white"
              />
              <button 
                type="submit"
                className="absolute right-0 top-0 h-full px-4 text-gray-500 dark:text-gray-400 flex items-center"
              >
                <Search size={18} />
              </button>
            </div>
          </form>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/products" className="text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
            Products
          </Link>
          
          {account ? (
            <>
              <Link 
                to="/cart" 
                className="text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors relative"
              >
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
              
              <div className="relative group">
                <button className="flex items-center text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400">
                  <User size={20} className="mr-1" />
                  <span className="text-sm truncate max-w-[100px]">
                    {`${account.substring(0, 6)}...${account.substring(account.length - 4)}`}
                  </span>
                </button>
                <div className="absolute right-0 w-48 mt-2 origin-top-right bg-white dark:bg-gray-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out">
                  <div className="py-1">
                    <Link
                      to={`/profile/${account}`}
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      My Profile
                    </Link>
                    <button
                      onClick={disconnectWallet}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Disconnect Wallet
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <button
              onClick={connectWallet}
              disabled={isConnecting}
              className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-full transition-colors flex items-center"
            >
              {isConnecting ? 'Connecting...' : 'Connect Wallet'}
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          {account && (
            <Link 
              to="/cart" 
              className="mr-4 text-gray-700 dark:text-gray-300 relative"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          )}
          <button
            onClick={toggleMenu}
            className="text-gray-700 dark:text-gray-300 focus:outline-none"
          >
            {isMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 shadow-md">
          <div className="px-4 py-3">
            <form onSubmit={handleSearch} className="mb-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:text-white"
                />
                <button 
                  type="submit"
                  className="absolute right-0 top-0 h-full px-4 text-gray-500 dark:text-gray-400 flex items-center"
                >
                  <Search size={18} />
                </button>
              </div>
            </form>
            <div className="space-y-3">
              <Link 
                to="/products" 
                className="block py-2 text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              
              {account ? (
                <>
                  <Link 
                    to={`/profile/${account}`} 
                    className="block py-2 text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Profile
                  </Link>
                  <button
                    onClick={() => {
                      disconnectWallet();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left py-2 text-red-600 dark:text-red-400"
                  >
                    Disconnect Wallet
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    connectWallet();
                    setIsMenuOpen(false);
                  }}
                  disabled={isConnecting}
                  className="block w-full py-2 px-4 bg-teal-600 hover:bg-teal-700 text-white rounded-full text-center"
                >
                  {isConnecting ? 'Connecting...' : 'Connect Wallet'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;