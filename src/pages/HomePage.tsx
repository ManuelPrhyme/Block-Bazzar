import React from 'react';
import { Link } from 'react-router-dom';
import { useWallet } from '../contexts/WalletContext';
import { ArrowRight, ShoppingBag, Shield, TrendingUp, Zap } from 'lucide-react';
import ProductCard from '../components/product/ProductCard';
import { mockProducts } from '../data/mockData';

const HomePage = () => {
  const { connectWallet, account } = useWallet();
  
  // Get featured products from mock data
  const featuredProducts = mockProducts.slice(0, 8);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-500 to-violet-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Decentralized Marketplace for Unique Products
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Buy and sell authentic products using stable coins on the blockchain. 
              Secure, transparent, and decentralized.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {!account ? (
                <button 
                  onClick={connectWallet} 
                  className="bg-white text-teal-600 hover:bg-gray-100 px-8 py-3 rounded-full font-medium text-lg transition-all transform hover:scale-105"
                >
                  Connect Wallet
                </button>
              ) : (
                <Link 
                  to="/products" 
                  className="bg-white text-teal-600 hover:bg-gray-100 px-8 py-3 rounded-full font-medium text-lg transition-all transform hover:scale-105 flex items-center justify-center"
                >
                  Explore Products
                  <ArrowRight size={18} className="ml-2" />
                </Link>
              )}
              <Link 
                to="/how-it-works" 
                className="bg-transparent border-2 border-white hover:bg-white/10 px-8 py-3 rounded-full font-medium text-lg transition-all"
              >
                How It Works
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Why Buy and Sell on BlockBazaar?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl text-center transition-transform hover:transform hover:scale-105">
              <div className="w-16 h-16 mx-auto mb-4 bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center">
                <Shield className="text-teal-600 dark:text-teal-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Secure Transactions</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Every transaction is secured by blockchain technology. No chargebacks or fraud.
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl text-center transition-transform hover:transform hover:scale-105">
              <div className="w-16 h-16 mx-auto mb-4 bg-violet-100 dark:bg-violet-900 rounded-full flex items-center justify-center">
                <ShoppingBag className="text-violet-600 dark:text-violet-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Buy with Stablecoins</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Use popular stablecoins for predictable pricing and easy transactions.
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl text-center transition-transform hover:transform hover:scale-105">
              <div className="w-16 h-16 mx-auto mb-4 bg-amber-100 dark:bg-amber-900 rounded-full flex items-center justify-center">
                <TrendingUp className="text-amber-600 dark:text-amber-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Transparent Ratings</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Verified reviews and seller ratings stored on the blockchain for full transparency.
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl text-center transition-transform hover:transform hover:scale-105">
              <div className="w-16 h-16 mx-auto mb-4 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                <Zap className="text-red-600 dark:text-red-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Fast Delivery</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Quick and efficient delivery system with real-time tracking on the blockchain.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Featured Products
            </h2>
            <Link 
              to="/products" 
              className="text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 flex items-center"
            >
              View all
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-violet-600 to-teal-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Selling?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join our community of creators and sellers. Start earning crypto for your unique products today.
          </p>
          <Link 
            to={account ? "/profile/seller-setup" : "#"} 
            onClick={!account ? connectWallet : undefined}
            className="bg-white text-teal-600 hover:bg-gray-100 px-8 py-3 rounded-full font-medium text-lg inline-flex items-center transition-all transform hover:scale-105"
          >
            {account ? "Start Selling" : "Connect Wallet to Sell"}
            <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;