import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
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
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
      style={{
        minHeight: '100vh',
        backgroundColor: '#ffffff'
      }}
      onClick={() => {
        setShowFilterDropdown(false);
        setShowSortDropdown(false);
      }}
    >
      {/* Header */}
      <Header showCartAndWishlist={true} />

      {/* Hero Section - Celebrity Photo Display */}
      {selectedCelebrity && (
        <div style={{
          position: 'relative',
          height: windowWidth >= 1600 ? '450px' : windowWidth >= 1200 ? '400px' : windowWidth >= 768 ? '320px' : '240px',
          overflow: 'hidden',
          borderRadius: '16px',
          margin: windowWidth >= 1200 ? '20px 40px' : windowWidth >= 768 ? '16px 24px' : '12px 16px',
          marginBottom: windowWidth >= 768 ? '32px' : '24px'
        }}>
          <img
            src={selectedCelebrity.image}
            alt={selectedCelebrity.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: windowWidth >= 1200 ? 'center top' : 'center'
            }}
            onError={(e) => {
              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjE5MiIgdmlld0JveD0iMCAwIDQwMCAxOTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMTkyIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iOTYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM2QjczODAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNiIgZm9udC13ZWlnaHQ9IjUwMCI+Q2VsZWJyaXR5IEltYWdlIE5vdCBGb3VuZDwvdGV4dD4KPC9zdmc+Cg==';
            }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{
              textAlign: 'center',
              color: 'white',
              marginTop: windowWidth >= 1600 ? '100px' : windowWidth >= 1200 ? '90px' : windowWidth >= 768 ? '75px' : '50px'
            }}>
              <h1 style={{
                fontSize: windowWidth >= 1200 ? '28px' : windowWidth >= 768 ? '24px' : '20px',
                fontFamily: 'serif',
                fontWeight: 'bold',
                letterSpacing: '0.2em',
                margin: 0
              }}>
                INSPIRED BY {selectedCelebrity.name.toUpperCase()}
              </h1>
            </div>
          </div>
        </div>
      )}

      {/* Filter Bar */}
      <div style={{
        padding: windowWidth >= 1200 ? '20px 32px' : windowWidth >= 768 ? '16px 24px' : '12px 16px',
        backgroundColor: '#f9fafb',
        margin: windowWidth >= 1200 ? '0 40px 32px 40px' : windowWidth >= 768 ? '0 24px 24px 24px' : '0 16px 20px 16px',
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

      {/* Products Grid - Responsive Layout */}
      <div style={{
        padding: windowWidth >= 1200 ? '0 40px 40px 40px' : windowWidth >= 768 ? '0 24px 32px 24px' : '0 16px 24px 16px',
        maxWidth: windowWidth >= 1600 ? '1600px' : '100%',
        margin: '0 auto'
      }}>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            display: 'grid',
            gridTemplateColumns: windowWidth >= 1600 ? 'repeat(auto-fit, minmax(280px, 1fr))' : 
                                windowWidth >= 1200 ? 'repeat(auto-fit, minmax(250px, 1fr))' : 
                                windowWidth >= 768 ? 'repeat(auto-fit, minmax(200px, 1fr))' : 
                                'repeat(2, 1fr)',
            gap: windowWidth >= 1200 ? '24px' : windowWidth >= 768 ? '20px' : '16px',
            justifyContent: 'center'
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