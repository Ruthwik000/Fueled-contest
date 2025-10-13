import { motion } from 'framer-motion';
import useAppStore from '../store/appStore';
import { formatPrice } from '../utils/recommendationLogic';

const ProductCard = ({ product, onClick }) => {
  const { wishlist, addToWishlist, removeFromWishlist } = useAppStore();
  
  const isInWishlist = wishlist.some(item => item.id === product.id);

  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    if (isInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      onClick={() => onClick(product)}
      className="cursor-pointer group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img 
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = '/images/placeholder-product.jpg';
          }}
        />
        
        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center"
        >
          <svg 
            className={`w-4 h-4 transition-colors ${
              isInWishlist ? 'text-red-500 fill-current' : 'text-gray-400 hover:text-red-500'
            }`}
            fill={isInWishlist ? 'currentColor' : 'none'}
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
            />
          </svg>
        </button>
      </div>

      {/* Product Info */}
      <div className="p-3 text-center">
        <h3 className="font-normal text-gray-800 text-sm" style={{ marginBottom: '4px' }}>
          {product.name}
        </h3>
        <p className="text-sm font-medium text-gray-600">
          {formatPrice(product.price)}
        </p>
      </div>
    </motion.div>
  );
};

export default ProductCard;