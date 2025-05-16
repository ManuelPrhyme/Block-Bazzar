import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { Product } from '../../types';
import { useMarketplace } from '../../contexts/MarketplaceContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useMarketplace();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow group">
      <Link to={`/products/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden">
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {product.stock <= 3 && product.stock > 0 && (
            <span className="absolute top-2 right-2 bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              Only {product.stock} left
            </span>
          )}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-white font-bold text-lg">Sold Out</span>
            </div>
          )}
        </div>
        
        <div className="p-4">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-1">
            <span>{product.category}</span>
            <span className="mx-2">•</span>
            <div className="flex items-center">
              <Star size={14} className="text-amber-500 fill-amber-500 mr-1" />
              <span>{product.seller.rating.toFixed(1)}</span>
            </div>
          </div>
          
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2 line-clamp-2">
            {product.name}
          </h3>
          
          <div className="flex items-center justify-between">
            <p className="text-xl font-bold text-violet-600 dark:text-violet-400">
              ${product.price.toFixed(2)}
            </p>
            
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`p-2 rounded-full ${
                product.stock > 0
                  ? 'bg-teal-100 text-teal-600 hover:bg-teal-200 dark:bg-teal-900 dark:text-teal-400 dark:hover:bg-teal-800'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
              }`}
            >
              <ShoppingCart size={18} />
            </button>
          </div>
          
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 truncate">
            Seller: {product.seller.name}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;