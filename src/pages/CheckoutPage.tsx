import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../contexts/WalletContext';
import { useMarketplace } from '../contexts/MarketplaceContext';
import { CheckCircle2, AlertTriangle } from 'lucide-react';
import {MARKETPLACE_ABI,MARKETPLACE_CONTRACT,USDC_ABI,USDC_ADDRESS} from '../../contracts/ContractConfig'
import {ethers, parseEther,parseUnits} from 'ethers'
import { Eip1193Provider } from 'ethers';

const CheckoutPage = () => {
  const { account, connectWallet } = useWallet();
  const { cart, getTotalPrice, clearCart } = useMarketplace();
  const navigate = useNavigate();
  
  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    streetAddress: '',
    city: '',
    parish: '',
    division: '',
    region: '',
    phoneNumber: '',
  });
  
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [transactionHash, setTransactionHash] = useState('');
  
  const totalPrice = getTotalPrice();
  const gasPrice = 2.5; // Fixed gas price for example
  const finalPrice = totalPrice + gasPrice;
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
  };
  

  const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();
        setPaymentStatus('processing');

  try {
    const Provider = new ethers.BrowserProvider(window.ethereum as Eip1193Provider);
    const Signer = await Provider.getSigner()
    
     const USDC_Authorize = new ethers.Contract(USDC_ADDRESS,USDC_ABI,Signer)
     const Authorize = await USDC_Authorize.approve(MARKETPLACE_CONTRACT,parseUnits(`${finalPrice}`,18))
     const AuthReceipt = await Authorize.wait()
     console.log(AuthReceipt.hash);

    const Marketplace_Contract = new ethers.Contract(MARKETPLACE_CONTRACT,MARKETPLACE_ABI,Signer)

      const shipDetails = `Name -> ${shippingAddress.fullName} || Phone -> ${shippingAddress.phoneNumber} || 
      Street -> ${shippingAddress.streetAddress} || City -> ${shippingAddress.city} || Parish -> ${shippingAddress.parish} || 
      Division -> ${shippingAddress.division} || Region -> ${shippingAddress.division} `

    const Complete_Purchase = await Marketplace_Contract.placeOrder(shipDetails,parseUnits(`${finalPrice}`,18))

    const Receipt = await Complete_Purchase.wait()

    console.log('........',Receipt.hash)

      setTransactionHash(Receipt.hash);
      setPaymentStatus('success');
      
      setTimeout(() => {
        clearCart();
      }, 3000);
    } catch (error) {
      console.error('Transaction failed:', error);
      setPaymentStatus('error');
    }
  };

  
  if (!account) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Connect Your Wallet
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Please connect your wallet to proceed with checkout.
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
  
  if (cart.length === 0 && paymentStatus !== 'success') {
    navigate('/cart');
    return null;
  }
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Checkout</h1>
        
        {paymentStatus === 'success' ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={32} className="text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Payment Successful!
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Your order has been placed successfully.
              </p>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Transaction Hash:</p>
                <p className="font-mono text-sm break-all">{transactionHash}</p>
              </div>
              
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => navigate('/')}
                  className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg"
                >
                  Back to Home
                </button>
                {/* <button
                  onClick={() => navigate('/profile/' + account)}
                  className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-2 rounded-lg"
                >
                  View Orders
                </button> */}
              </div>
            </div>
          </div>
        ) : paymentStatus === 'error' ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle size={32} className="text-red-600 dark:text-red-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Payment Failed
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                We couldn't process your payment. Please try again.
              </p>
              
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setPaymentStatus('idle')}
                  className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg"
                >
                  Try Again
                </button>
                <button
                  onClick={() => navigate('/cart')}
                  className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-6 py-2 rounded-lg"
                >
                  Back to Cart
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <form onSubmit={handleSubmit}>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                    Shipping Information
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={shippingAddress.fullName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={shippingAddress.phoneNumber}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="streetAddress" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Street Address
                    </label>
                    <input
                      type="text"
                      id="streetAddress"
                      name="streetAddress"
                      value={shippingAddress.streetAddress}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="col-span-2">
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={shippingAddress.city}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <label htmlFor="parish" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Parish
                      </label>
                      <input
                        type="text"
                        id="parish"
                        name="parish"
                        value={shippingAddress.parish}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <label htmlFor="division" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Division
                      </label>
                      <input
                        type="text"
                        id="division"
                        name="division"
                        value={shippingAddress.division}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="region" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Region
                    </label>
                    <select
                      id="region"
                      name="region"
                      value={shippingAddress.region}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="">Select region</option>
                      <option value="KL">Kampala</option>
                      <option value="WK">Wakiso</option>
                      <option value="JJ">Jinja</option>
                      <option value="MB">Mbarara</option>
                      <option value="FP">Fort Portal</option>
                      <option value="HM">Hoima</option>
                      <option value="GL">Gulu</option>
                    </select>
                  </div>
                  
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 mt-8">
                    Payment Method
                  </h2>
                  
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="crypto"
                        name="paymentMethod"
                        checked
                        readOnly
                        className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300"
                      />
                      <label htmlFor="crypto" className="ml-3 block text-gray-700 dark:text-gray-300">
                        Pay with Stablecoin (USDC)
                      </label>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 ml-7">
                      Payment will be processed directly from your connected wallet
                    </p>
                  </div>
                  
                  <div className="mt-8">
                    <button
                      type="submit"
                      disabled={paymentStatus === 'processing'}
                      className={`w-full ${
                        paymentStatus === 'processing'
                          ? 'bg-teal-500 cursor-not-allowed'
                          : 'bg-teal-600 hover:bg-teal-700'
                      } text-white py-3 px-4 rounded-lg font-medium`}
                    >
                      {paymentStatus === 'processing' ? 'Processing Payment...' : 'Complete Purchase'}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 sticky top-20">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  Order Summary
                </h2>
                
                <div className="max-h-64 overflow-y-auto mb-6">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex items-center py-2 border-b border-gray-200 dark:border-gray-700 last:border-0">
                      <div className="w-12 h-12 flex-shrink-0 bg-gray-100 dark:bg-gray-700 rounded-md overflow-hidden mr-3">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{item.product.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Subtotal</span>
                    <span className="text-gray-900 dark:text-white">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Gas fees (estimated)</span>
                    <span className="text-gray-900 dark:text-white">${gasPrice.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-3">
                    <div className="flex justify-between font-bold">
                      <span className="text-gray-900 dark:text-white">Total</span>
                      <span className="text-violet-600 dark:text-violet-400">
                        ${finalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center mr-3">
                      <span className="text-sm font-medium">
                        {account.substring(0, 1)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        Payment from wallet
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate w-48">
                        {`${account.substring(0, 6)}...${account.substring(account.length - 4)}`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;