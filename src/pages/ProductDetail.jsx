import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useAppStore from '../store/appStore';
import { products } from '../mock/data';
import Header from '../components/Header';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    addToCart,
    addToWishlist,
    removeFromWishlist,
    wishlist
  } = useAppStore();

  const [selectedPurity, setSelectedPurity] = useState('14kt');
  const [selectedColor, setSelectedColor] = useState('YELLOW GOLD');
  const [showDescription, setShowDescription] = useState(false);

  // Find product by ID from URL params
  const selectedProduct = products.find(product => product.id === parseInt(id));

  if (!selectedProduct) {
    return <Navigate to="/products" replace />;
  }

  const isInWishlist = wishlist.some(item => item.id === selectedProduct.id);

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      removeFromWishlist(selectedProduct.id);
    } else {
      addToWishlist(selectedProduct);
    }
  };

  const handleAddToCart = () => {
    addToCart(selectedProduct);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'white' }}>
      {/* Header with Cart and Wishlist */}
      <Header showCartAndWishlist={true} />

      {/* Product Content */}
      <div style={{ padding: '20px' }}>
        {/* Product Image */}
        <div style={{
          width: '100%',
          maxWidth: '400px',
          margin: '0 auto 24px auto',
          aspectRatio: '1',
          borderRadius: '16px',
          overflow: 'hidden'
        }}>
          <img
            src={selectedProduct.image}
            alt={selectedProduct.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
            onError={(e) => {
              e.target.src = '/images/placeholder-product.jpg';
            }}
          />
        </div>

        {/* Product Name and Action Buttons */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '8px'
        }}>
          <h1 style={{
            fontSize: '24px',
            fontWeight: '400',
            color: '#374151',
            margin: 0,
            flex: 1
          }}>
            {selectedProduct.name}
          </h1>

          {/* Share Button */}
          <button style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#6b7280',
            marginLeft: '16px'
          }}>
            <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
          </button>
        </div>

        {/* Price and Wishlist */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px'
        }}>
          <p style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#111827',
            margin: 0
          }}>
            ₹{selectedProduct.price.toLocaleString('en-IN')}
          </p>

          {/* Wishlist Button */}
          <button
            onClick={handleWishlistToggle}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: isInWishlist ? '#ef4444' : '#6b7280'
            }}
          >
            <svg style={{ width: '20px', height: '20px' }} fill={isInWishlist ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>

        {/* Purity Section */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{
            fontSize: '12px',
            fontWeight: '500',
            color: '#6b7280',
            marginBottom: '8px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            PURITY
          </h3>
          <div style={{ display: 'flex', gap: '8px' }}>
            {['14kt', '18kt'].map((purity) => (
              <button
                key={purity}
                onClick={() => setSelectedPurity(purity)}
                style={{
                  padding: '8px 16px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  backgroundColor: selectedPurity === purity ? '#f3f4f6' : 'white',
                  color: '#374151',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                {purity}
              </button>
            ))}
          </div>
        </div>

        {/* Color Section */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{
            fontSize: '12px',
            fontWeight: '500',
            color: '#6b7280',
            marginBottom: '8px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            COLOR
          </h3>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {['YELLOW GOLD', 'ROSE GOLD', 'WHITE GOLD'].map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                style={{
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  backgroundColor: selectedColor === color ? '#f3f4f6' : 'white',
                  color: '#374151',
                  fontSize: '12px',
                  cursor: 'pointer'
                }}
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          style={{
            width: '100%',
            padding: '16px',
            backgroundColor: '#000000',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '500',
            cursor: 'pointer',
            marginBottom: '16px'
          }}
        >
          ADD TO CART
        </button>

        {/* Product Description */}
        <button
          onClick={() => setShowDescription(!showDescription)}
          style={{
            width: '100%',
            padding: '16px',
            border: '1px solid #d1d5db',
            borderRadius: '8px',
            backgroundColor: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
            marginBottom: '12px'
          }}
        >
          <span style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>
            PRODUCT DESCRIPTION
          </span>
          <svg
            style={{
              width: '16px',
              height: '16px',
              transform: showDescription ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s'
            }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Delivery Time */}
        <div style={{
          padding: '16px',
          border: '1px solid #d1d5db',
          borderRadius: '8px',
          backgroundColor: 'white',
          marginBottom: '24px'
        }}>
          <span style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>
            DELIVERY TIME - {selectedProduct.deliveryTime}
          </span>
        </div>


      </div>
    </div>
  );
};

export default ProductDetail;