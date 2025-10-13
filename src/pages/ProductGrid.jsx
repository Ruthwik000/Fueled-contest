import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useAppStore from '../store/appStore';
import { products } from '../mock/data';
import { filterProductsByCategory, filterProductsByCelebrity } from '../utils/recommendationLogic';
import ProductCard from '../components/ProductCard';
import Header from '../components/Header';

const ProductGrid = () => {
  const navigate = useNavigate();
  const {
    selectedCelebrity,
    selectedCategory,
    selectProduct
  } = useAppStore();

  const [sortBy, setSortBy] = useState('');
  const [filterBy, setFilterBy] = useState('');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  const handleProductSelect = (product) => {
    selectProduct(product);
    navigate(`/product/${product.id}`);
  };

  // Apply filtering and sorting
  let filteredProducts = [...products];

  // Apply category filter
  if (filterBy && filterBy !== 'All') {
    filteredProducts = filteredProducts.filter(product => product.category === filterBy);
  }

  // Apply sorting
  if (sortBy) {
    switch (sortBy) {
      case 'price-low-high':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'name-a-z':
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-z-a':
        filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }
  }

  const handleSortChange = (sortOption) => {
    setSortBy(sortOption);
    setShowSortDropdown(false);
  };

  const handleFilterChange = (filterOption) => {
    setFilterBy(filterOption);
    setShowFilterDropdown(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white"
      onClick={() => {
        setShowFilterDropdown(false);
        setShowSortDropdown(false);
      }}
    >
      {/* Header */}
      <Header showCartAndWishlist={true} />

      {/* Hero Section - Celebrity Photo Display */}
      {selectedCelebrity && (
        <div className="relative h-68 overflow-hidden rounded-2xl mx-4 mt-4" style={{ marginBottom: '26px', marginTop: "16px", margin: "10px" }}>
          <img
            src={selectedCelebrity.image}
            alt={selectedCelebrity.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjE5MiIgdmlld0JveD0iMCAwIDQwMCAxOTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMTkyIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iOTYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM2QjczODAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNiIgZm9udC13ZWlnaHQ9IjUwMCI+Q2VsZWJyaXR5IEltYWdlIE5vdCBGb3VuZDwvdGV4dD4KPC9zdmc+Cg==';
            }}
          />
          <div className="absolute inset-0 bg-opacity-50 flex items-center justify-center">
            <div className="text-center text-white" style={{ marginTop: "120px" }}>
              <h1 className="text-xl font-serif font-bold tracking-[0.2em]">
                INSPIRED BY {selectedCelebrity.name}
              </h1>
            </div>
          </div>
        </div>
      )}

      {/* Filter Bar */}
      <div style={{
        padding: '16px 24px',
        backgroundColor: '#f9fafb',
        margin: '0 16px 24px 16px',
        borderRadius: '8px',
        position: 'relative'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '48px'
          }}>
            {/* Filter By Dropdown */}
            <div style={{ position: 'relative' }} onClick={(e) => e.stopPropagation()}>
              <button 
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#4b5563',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'color 0.2s'
                }}
              >
                <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                </svg>
                <span style={{
                  fontSize: '14px',
                  fontWeight: '500'
                }}>Filter By {filterBy && `(${filterBy})`}</span>
              </button>
              
              {showFilterDropdown && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  zIndex: 10,
                  minWidth: '150px',
                  marginTop: '4px'
                }}>
                  {['All', 'NECKLACES', 'EARRINGS', 'RINGS', 'BRACELETS', 'PENDANTS'].map((category) => (
                    <button
                      key={category}
                      onClick={() => handleFilterChange(category)}
                      style={{
                        display: 'block',
                        width: '100%',
                        padding: '8px 12px',
                        textAlign: 'left',
                        border: 'none',
                        background: filterBy === category ? '#f3f4f6' : 'transparent',
                        cursor: 'pointer',
                        fontSize: '14px',
                        color: '#374151'
                      }}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Sort By Dropdown */}
            <div style={{ position: 'relative' }} onClick={(e) => e.stopPropagation()}>
              <button 
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#4b5563',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'color 0.2s'
                }}
              >
                <span style={{
                  fontSize: '14px',
                  fontWeight: '500'
                }}>Sort by</span>
                <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {showSortDropdown && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  zIndex: 10,
                  minWidth: '180px',
                  marginTop: '4px'
                }}>
                  {[
                    { value: 'price-low-high', label: 'Price: Low to High' },
                    { value: 'price-high-low', label: 'Price: High to Low' },
                    { value: 'name-a-z', label: 'Name: A to Z' },
                    { value: 'name-z-a', label: 'Name: Z to A' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleSortChange(option.value)}
                      style={{
                        display: 'block',
                        width: '100%',
                        padding: '8px 12px',
                        textAlign: 'left',
                        border: 'none',
                        background: sortBy === option.value ? '#f3f4f6' : 'transparent',
                        cursor: 'pointer',
                        fontSize: '14px',
                        color: '#374151'
                      }}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <span style={{
            color: '#6b7280',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            {filteredProducts.length} Products
          </span>
        </div>
      </div>

      {/* Products Grid - 2 Column Layout */}
      <div style={{
        padding: '0 16px 32px 16px'
      }}>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px'
          }}
        >
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 + index * 0.05 }}
            >
              <ProductCard
                product={product}
                onClick={handleProductSelect}
              />
            </motion.div>
          ))}
        </motion.div>

        {filteredProducts.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '80px 0'
          }}>
            <p style={{
              color: '#6b7280',
              fontSize: '18px'
            }}>No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProductGrid;