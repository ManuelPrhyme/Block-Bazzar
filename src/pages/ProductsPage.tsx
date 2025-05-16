import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Filter, ChevronDown, Search, X } from 'lucide-react';
import ProductCard from '../components/product/ProductCard';
import { mockProducts } from '../data/mockData';
import { Product } from '../types';

const ProductsPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get('category') || '';

  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: initialCategory,
    minPrice: '',
    maxPrice: '',
    sortBy: 'newest',
  });
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Categories from mock data
  const categories = Array.from(new Set(mockProducts.map(product => product.category)));

  // Apply filters and search
  useEffect(() => {
    let result = [...products];

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        product =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Filter by category
    if (filters.category) {
      result = result.filter(product => product.category === filters.category);
    }

    // Filter by price range
    if (filters.minPrice) {
      result = result.filter(product => product.price >= Number(filters.minPrice));
    }
    if (filters.maxPrice) {
      result = result.filter(product => product.price <= Number(filters.maxPrice));
    }

    // Sort products
    switch (filters.sortBy) {
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'price-low-high':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'popularity':
        result.sort((a, b) => b.seller.rating - a.seller.rating);
        break;
      default:
        break;
    }

    setFilteredProducts(result);
  }, [products, searchQuery, filters]);

  const handleFilterChange = (name: string, value: string) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      minPrice: '',
      maxPrice: '',
      sortBy: 'newest',
    });
    setSearchQuery('');
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Explore Products
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Discover unique products from our marketplace
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Button */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className="w-full flex items-center justify-between bg-white dark:bg-gray-800 px-4 py-3 rounded-lg shadow-sm"
            >
              <div className="flex items-center">
                <Filter size={18} className="mr-2 text-gray-500 dark:text-gray-400" />
                <span>Filters</span>
              </div>
              <ChevronDown
                size={18}
                className={`text-gray-500 dark:text-gray-400 transition-transform ${
                  isMobileFilterOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
          </div>

          {/* Sidebar Filters - Desktop always visible, Mobile conditionally */}
          <div
            className={`lg:w-1/4 ${
              isMobileFilterOpen || window.innerWidth >= 1024 ? 'block' : 'hidden'
            }`}
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Search</h3>
                <form onSubmit={handleSearchSubmit}>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:text-white"
                    />
                    <button
                      type="submit"
                      className="absolute right-0 top-0 h-full px-3 text-gray-500 dark:text-gray-400"
                    >
                      <Search size={18} />
                    </button>
                  </div>
                </form>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Categories</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="all-categories"
                      name="category"
                      checked={filters.category === ''}
                      onChange={() => handleFilterChange('category', '')}
                      className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                    />
                    <label htmlFor="all-categories" className="ml-2 text-gray-700 dark:text-gray-300">
                      All Categories
                    </label>
                  </div>
                  {categories.map((category) => (
                    <div key={category} className="flex items-center">
                      <input
                        type="radio"
                        id={category}
                        name="category"
                        checked={filters.category === category}
                        onChange={() => handleFilterChange('category', category)}
                        className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                      />
                      <label htmlFor={category} className="ml-2 text-gray-700 dark:text-gray-300">
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Price Range</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="min-price" className="sr-only">
                      Min Price
                    </label>
                    <input
                      type="number"
                      id="min-price"
                      placeholder="Min"
                      value={filters.minPrice}
                      onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:text-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="max-price" className="sr-only">
                      Max Price
                    </label>
                    <input
                      type="number"
                      id="max-price"
                      placeholder="Max"
                      value={filters.maxPrice}
                      onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Sort By</h3>
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:text-white"
                >
                  <option value="newest">Newest</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                  <option value="popularity">Popularity</option>
                </select>
              </div>

              <button
                onClick={clearFilters}
                className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg flex items-center justify-center"
              >
                <X size={16} className="mr-2" />
                Clear Filters
              </button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="lg:w-3/4">
            {filteredProducts.length > 0 ? (
              <>
                <div className="mb-4 flex justify-between items-center">
                  <p className="text-gray-600 dark:text-gray-300">
                    Showing {filteredProducts.length} products
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center">
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
                  No products match your search criteria
                </p>
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;