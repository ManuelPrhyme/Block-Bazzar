import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Package, ShoppingBag, Settings, ExternalLink, Pencil } from 'lucide-react';
import { useWallet } from '../contexts/WalletContext';
import { mockUsers, mockProducts, mockOrders } from '../data/mockData';
import { User, Product, Order } from '../types';
import ProductCard from '../components/product/ProductCard';

const ProfilePage = () => {
  const { address } = useParams<{ address: string }>();
  const { account } = useWallet();
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<'products' | 'purchases' | 'reviews'>('products');
  const [isLoading, setIsLoading] = useState(true);
  
  const isCurrentUser = account && address?.toLowerCase() === account.toLowerCase();
  
  useEffect(() => {
    // Simulate fetching user data
    setIsLoading(true);
    setTimeout(() => {
      let foundUser = mockUsers.find(u => u.address.toLowerCase() === address?.toLowerCase());
      
      // If user not found, create a placeholder
      if (!foundUser && address) {
        foundUser = {
          address,
          name: `User ${address.substring(0, 6)}`,
          bio: '',
          avatar: '',
          rating: 0,
          isSeller: false
        };
      }
      
      setUser(foundUser || null);
      setIsLoading(false);
    }, 800);
  }, [address]);
  
  // Get user's products if they are a seller
  const sellerProducts = user?.isSeller
    ? mockProducts.filter(product => product.seller.address.toLowerCase() === address?.toLowerCase())
    : [];
  
  // Get user's purchases
  const userPurchases = isCurrentUser
    ? mockOrders.filter(order => order.buyer.toLowerCase() === address?.toLowerCase())
    : [];
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-center mb-4">
                <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-full mr-4"></div>
                <div className="flex-1">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full max-w-md"></div>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-6"></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-gray-200 dark:bg-gray-700 rounded-lg h-64"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              User Not Found
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              The user you are looking for doesn't exist or has been removed.
            </p>
            <Link
              to="/"
              className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-lg font-medium"
            >
              Go Back Home
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Profile Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-400 text-2xl font-bold mb-4 md:mb-0 md:mr-6">
              {user.name.charAt(0).toUpperCase()}
            </div>
            
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 md:mb-0">
                  {user.name}
                </h1>
                {isCurrentUser && (
                  <Link 
                    to="/profile/edit" 
                    className="inline-flex items-center text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300"
                  >
                    <Pencil size={16} className="mr-1" />
                    Edit Profile
                  </Link>
                )}
              </div>
              
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <div className="flex items-center bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                  <span className="text-xs text-gray-600 dark:text-gray-300 font-medium truncate max-w-[150px]">
                    {address}
                  </span>
                  <a 
                    href={`https://etherscan.io/address/${address}`}
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="ml-1 text-gray-500 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400"
                  >
                    <ExternalLink size={12} />
                  </a>
                </div>
                
                {user.isSeller && (
                  <div className="flex items-center text-amber-600 dark:text-amber-400">
                    <Star size={16} className="fill-amber-500 mr-1" />
                    <span>{user.rating.toFixed(1)}</span>
                  </div>
                )}
                
                {user.isSeller && (
                  <div className="bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 text-xs px-3 py-1 rounded-full font-medium">
                    Verified Seller
                  </div>
                )}
              </div>
              
              {user.bio && (
                <p className="text-gray-600 dark:text-gray-300 mb-4">{user.bio}</p>
              )}
            </div>
          </div>
        </div>
        
        {/* Profile Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('products')}
                className={`py-4 px-6 font-medium text-sm border-b-2 ${
                  activeTab === 'products'
                    ? 'border-teal-600 dark:border-teal-400 text-teal-600 dark:text-teal-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                }`}
              >
                <div className="flex items-center">
                  <ShoppingBag size={16} className="mr-2" />
                  {user.isSeller ? 'Products' : 'Favorites'}
                  {sellerProducts.length > 0 && (
                    <span className="ml-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full px-2 py-0.5">
                      {sellerProducts.length}
                    </span>
                  )}
                </div>
              </button>
              
              {isCurrentUser && (
                <button
                  onClick={() => setActiveTab('purchases')}
                  className={`py-4 px-6 font-medium text-sm border-b-2 ${
                    activeTab === 'purchases'
                      ? 'border-teal-600 dark:border-teal-400 text-teal-600 dark:text-teal-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                  }`}
                >
                  <div className="flex items-center">
                    <Package size={16} className="mr-2" />
                    Purchases
                    {userPurchases.length > 0 && (
                      <span className="ml-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full px-2 py-0.5">
                        {userPurchases.length}
                      </span>
                    )}
                  </div>
                </button>
              )}
              
              {isCurrentUser && (
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`py-4 px-6 font-medium text-sm border-b-2 ${
                    activeTab === 'reviews'
                      ? 'border-teal-600 dark:border-teal-400 text-teal-600 dark:text-teal-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                  }`}
                >
                  <div className="flex items-center">
                    <Star size={16} className="mr-2" />
                    Reviews
                  </div>
                </button>
              )}
            </nav>
          </div>
          
          <div className="p-6">
            {/* Products Tab */}
            {activeTab === 'products' && (
              <>
                {user.isSeller ? (
                  <>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        {isCurrentUser ? 'Your Products' : `${user.name}'s Products`}
                      </h2>
                      {isCurrentUser && (
                        <Link
                          to="/product/new"
                          className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                        >
                          Add New Product
                        </Link>
                      )}
                    </div>
                    
                    {sellerProducts.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {sellerProducts.map((product) => (
                          <ProductCard key={product.id} product={product} />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <ShoppingBag size={48} className="mx-auto mb-4 text-gray-400 dark:text-gray-500" />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                          No Products Yet
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                          {isCurrentUser
                            ? "You haven't listed any products for sale yet."
                            : `${user.name} hasn't listed any products for sale yet.`}
                        </p>
                        {isCurrentUser && (
                          <Link
                            to="/product/new"
                            className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-medium"
                          >
                            Add Your First Product
                          </Link>
                        )}
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div className="mb-6">
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        {isCurrentUser ? 'Your Favorites' : `${user.name}'s Favorites`}
                      </h2>
                    </div>
                    
                    <div className="text-center py-12">
                      <Star size={48} className="mx-auto mb-4 text-gray-400 dark:text-gray-500" />
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                        No Favorites Yet
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        {isCurrentUser
                          ? "You haven't added any products to your favorites yet."
                          : `${user.name} hasn't added any products to their favorites yet.`}
                      </p>
                      {isCurrentUser && (
                        <Link
                          to="/products"
                          className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-medium"
                        >
                          Browse Products
                        </Link>
                      )}
                    </div>
                  </>
                )}
              </>
            )}
            
            {/* Purchases Tab */}
            {activeTab === 'purchases' && isCurrentUser && (
              <>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Your Purchases
                </h2>
                
                {userPurchases.length > 0 ? (
                  <div className="space-y-4">
                    {userPurchases.map((order) => (
                      <div
                        key={order.id}
                        className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
                      >
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                          <div>
                            <div className="flex items-center mb-2">
                              <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mr-2">
                                Order #{order.id.substring(0, 8)}
                              </span>
                              <span className="text-xs bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-2 py-0.5 rounded-full">
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </span>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Placed on {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="font-medium text-gray-900 dark:text-white">
                            ${order.totalPrice.toFixed(2)}
                          </div>
                        </div>
                        
                        <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                          <div className="space-y-3">
                            {order.items.map((item) => (
                              <div key={item.product.id} className="flex items-center">
                                <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-md overflow-hidden mr-3 flex-shrink-0">
                                  <img
                                    src={item.product.images[0]}
                                    alt={item.product.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="flex-grow">
                                  <Link
                                    to={`/products/${item.product.id}`}
                                    className="font-medium text-gray-900 dark:text-white hover:text-teal-600 dark:hover:text-teal-400"
                                  >
                                    {item.product.name}
                                  </Link>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Qty: {item.quantity} × ${item.product.price.toFixed(2)}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="mt-4 flex justify-between items-center border-t border-gray-200 dark:border-gray-600 pt-4">
                          <a
                            href={`https://etherscan.io/tx/${order.txHash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-gray-500 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 flex items-center"
                          >
                            View transaction
                            <ExternalLink size={12} className="ml-1" />
                          </a>
                          
                          {order.status === 'delivered' && (
                            <button className="text-sm text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300">
                              Leave Review
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Package size={48} className="mx-auto mb-4 text-gray-400 dark:text-gray-500" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      No Purchases Yet
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      You haven't made any purchases yet.
                    </p>
                    <Link
                      to="/products"
                      className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-medium"
                    >
                      Start Shopping
                    </Link>
                  </div>
                )}
              </>
            )}
            
            {/* Reviews Tab */}
            {activeTab === 'reviews' && isCurrentUser && (
              <>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Your Reviews
                </h2>
                
                <div className="text-center py-12">
                  <Star size={48} className="mx-auto mb-4 text-gray-400 dark:text-gray-500" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No Reviews Yet
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    You haven't left any reviews yet.
                  </p>
                  <Link
                    to="/products"
                    className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-medium"
                  >
                    Browse Products
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;