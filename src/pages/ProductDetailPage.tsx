import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingCart, ArrowLeft, ChevronLeft, ChevronRight, Plus, Minus } from 'lucide-react';
import { useMarketplace } from '../contexts/MarketplaceContext';
import { useWallet } from '../contexts/WalletContext';
import { mockProducts, mockReviews } from '../data/mockData';
import { Product } from '../types';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useMarketplace();
  const { account, connectWallet } = useWallet();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const reviews = mockReviews.filter(review => review.productId === id);
  const averageRating = reviews.length > 0 
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length 
    : 0;

  useEffect(() => {
    // Simulate fetching product data
    setLoading(true);
    setTimeout(() => {
      const foundProduct = mockProducts.find(p => p.id === id);
      setProduct(foundProduct || null);
      setLoading(false);
    }, 500);
  }, [id]);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0 && product && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  const handleNextImage = () => {
    if (product) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const handlePrevImage = () => {
    if (product) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
      );
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-72 mb-6"></div>
          <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded w-full max-w-lg mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-64 mb-4"></div>
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Product Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          The product you are looking for doesn't exist or has been removed.
        </p>
        <Link
          to="/products"
          className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg flex items-center"
        >
          <ArrowLeft size={18} className="mr-2" />
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link to="/" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <Link to="/products" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                    Products
                  </Link>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <span className="text-gray-600 dark:text-gray-300">
                    {product.name}
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {/* Product Images */}
          <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm">
            <div className="relative aspect-square">
              <img
                src={product.images[currentImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-md text-gray-800 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-800"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-md text-gray-800 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-800"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
            </div>
            
            {/* Thumbnail gallery */}
            {product.images.length > 1 && (
              <div className="flex mt-4 px-4 pb-4 space-x-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-16 h-16 flex-shrink-0 rounded-md overflow-hidden border-2 ${
                      currentImageIndex === index
                        ? 'border-teal-500 dark:border-teal-400'
                        : 'border-transparent'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {product.name}
            </h1>

            <div className="flex items-center mb-4">
              <div className="flex items-center mr-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={16}
                    className={`${
                      star <= Math.round(averageRating)
                        ? 'text-amber-500 fill-amber-500'
                        : 'text-gray-300 dark:text-gray-600'
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                  {averageRating.toFixed(1)} ({reviews.length} reviews)
                </span>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Category: {product.category}
              </span>
            </div>

            <div className="text-2xl font-bold text-violet-600 dark:text-violet-400 mb-4">
              ${product.price.toFixed(2)}
            </div>

            <div className="mb-6">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Description</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {product.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-xs px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Seller</h3>
              <Link
                to={`/profile/${product.seller.address}`}
                className="flex items-center group"
              >
                <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-400 mr-3">
                  {product.seller.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                    {product.seller.name}
                  </p>
                  <div className="flex items-center">
                    <Star size={14} className="text-amber-500 fill-amber-500 mr-1" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {product.seller.rating.toFixed(1)}
                    </span>
                  </div>
                </div>
              </Link>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <div className="mb-6">
                <div className="flex items-center">
                  <span className="text-gray-600 dark:text-gray-300 mr-4">
                    Quantity:
                  </span>
                  <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                    <button
                      onClick={() => handleQuantityChange(quantity - 1)}
                      disabled={quantity <= 1}
                      className={`px-3 py-1 ${
                        quantity <= 1
                          ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                          : 'text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-3 py-1 min-w-[40px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(quantity + 1)}
                      disabled={product.stock <= quantity}
                      className={`px-3 py-1 ${
                        product.stock <= quantity
                          ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                          : 'text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  {product.stock > 0 
                    ? `${product.stock} items available` 
                    : 'Out of stock'}
                </p>
              </div>

              {account ? (
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className={`w-full flex items-center justify-center rounded-lg py-3 px-4 font-medium ${
                    product.stock > 0
                      ? 'bg-teal-600 hover:bg-teal-700 text-white'
                      : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCart size={20} className="mr-2" />
                  {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                </button>
              ) : (
                <button
                  onClick={connectWallet}
                  className="w-full bg-violet-600 hover:bg-violet-700 text-white rounded-lg py-3 px-4 font-medium"
                >
                  Connect Wallet to Purchase
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-10">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Customer Reviews
          </h2>

          {reviews.length > 0 ? (
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                        {review.reviewer.charAt(0).toUpperCase()}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <div className="flex mr-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              size={16}
                              className={`${
                                star <= review.rating
                                  ? 'text-amber-500 fill-amber-500'
                                  : 'text-gray-300 dark:text-gray-600'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-800 dark:text-gray-200 mb-2">
                        {review.comment}
                      </p>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <span className="truncate max-w-[120px]">
                          {`${review.reviewer.substring(0, 6)}...${review.reviewer.substring(review.reviewer.length - 4)}`}
                        </span>
                        <span className="mx-2">•</span>
                        <span>Verified Purchase</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                No reviews yet for this product.
              </p>
              {account ? (
                <button className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-medium">
                  Be the first to review
                </button>
              ) : (
                <button
                  onClick={connectWallet}
                  className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-medium"
                >
                  Connect Wallet to Review
                </button>
              )}
            </div>
          )}
        </div>

        {/* Related Products */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Related Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {mockProducts
              .filter(p => p.category === product.category && p.id !== product.id)
              .slice(0, 4)
              .map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;