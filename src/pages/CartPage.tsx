import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowLeft, ArrowRight, Plus, Minus } from 'lucide-react';
import { useMarketplace } from '../contexts/MarketplaceContext';
import { useWallet } from '../contexts/WalletContext';

const CartPage = () => {
  const { cart, removeFromCart, updateCartItemQuantity, getTotalPrice, clearCart } = useMarketplace();
  const { account, connectWallet } = useWallet();
  const navigate = useNavigate();

  if (!account) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
            <ShoppingBag size={48} className="mx-auto mb-4 text-gray-400 dark:text-gray-500" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Connect Your Wallet
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Please connect your wallet to view your cart and checkout.
            </p>
            <button
              onClick={connectWallet}
              className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-lg"
            >
              Connect Wallet
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
            <ShoppingBag size={48} className="mx-auto mb-4 text-gray-400 dark:text-gray-500" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Your Cart is Empty
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Link
              to="/products"
              className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-lg inline-flex items-center"
            >
              <ShoppingBag size={18} className="mr-2" />
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const totalPrice = getTotalPrice();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Your Cart</h1>
          <button
            onClick={clearCart}
            className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 text-sm flex items-center"
          >
            <Trash2 size={16} className="mr-1" />
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  className="p-4 border-b border-gray-200 dark:border-gray-700 last:border-0 flex"
                >
                  <div className="w-20 h-20 flex-shrink-0 bg-gray-100 dark:bg-gray-700 rounded-md overflow-hidden mr-4">
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
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      Seller: {item.product.seller.name}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <button
                          onClick={() => updateCartItemQuantity(item.product.id, item.quantity - 1)}
                          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="mx-2 w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartItemQuantity(item.product.id, item.quantity + 1)}
                          disabled={item.quantity >= item.product.stock}
                          className={`${
                            item.quantity >= item.product.stock
                              ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
                              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                          }`}
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      
                      <div className="flex items-center">
                        <span className="font-medium text-gray-900 dark:text-white mr-4">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Order Summary
              </h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Subtotal</span>
                  <span className="text-gray-900 dark:text-white">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Gas fees (estimated)</span>
                  <span className="text-gray-900 dark:text-white">$2.50</span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-3">
                  <div className="flex justify-between font-bold">
                    <span className="text-gray-900 dark:text-white">Total</span>
                    <span className="text-violet-600 dark:text-violet-400">
                      ${(totalPrice + 2.5).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => navigate('/checkout')}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center"
              >
                Proceed to Checkout
                <ArrowRight size={18} className="ml-2" />
              </button>
              
              <div className="mt-6">
                <Link
                  to="/products"
                  className="text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 inline-flex items-center text-sm"
                >
                  <ArrowLeft size={16} className="mr-1" />
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;