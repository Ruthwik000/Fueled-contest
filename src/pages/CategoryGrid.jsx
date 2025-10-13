import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useAppStore from '../store/appStore';
import Header from '../components/Header';

const CategoryGrid = () => {
  const navigate = useNavigate();
  const { selectCategory, viewAllProducts } = useAppStore();

  const handleCategorySelect = (categoryName) => {
    selectCategory(categoryName);
    navigate('/products');
  };

  const handleViewAllProducts = () => {
    viewAllProducts();
    navigate('/products');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white"
    >
      {/* Header */}
      <Header showBackButton={true} backTo="/celebrities" />

      {/* Content - Optimized for Digital Marketing Screens */}
      <div className="px-6 py-12 max-w-4xl mx-auto">
        {/* Title */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-40"
        
        >
          <h1 className="text-2xl font-serif  text-black tracking-[0.2em] font-normal">
            SELECT A CATEGORY
          </h1>
        </motion.div>

        {/* Category Grid Layout - Exact match to your image */}
        <div className="grid grid-cols-2 gap-2 max-w-2xl mx-auto">

          {/* Left Column - 3 Cards */}
          <div className="flex flex-col gap-2">
            {/* Bracelets */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="relative overflow-hidden cursor-pointer group"
              onClick={() => handleCategorySelect("BRACELETS")}
            >
              <img
                src="/images/bracelets.png"
                alt="Bracelets"
                className="w-full h-50 object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE2MCIgdmlld0JveD0iMCAwIDMwMCAxNjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMTYwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjE1MCIgeT0iODAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM2QjczODAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZm9udC13ZWlnaHQ9IjUwMCI+QlJBQ0VMRVRTIC0gSW1hZ2UgTm90IEZvdW5kPC90ZXh0Pgo8L3N2Zz4K';
                }}
              />
              <div className="absolute inset-0  bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300" />
              <div className="absolute bottom-4 left-4">
                
              </div>
            </motion.div>

            {/* Pendants */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="relative overflow-hidden cursor-pointer group"
              onClick={() => handleCategorySelect("PENDANTS")}
            >
              <img
                src="/images/pendant.png"
                alt="Pendants"
                className="w-full h-50 object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE2MCIgdmlld0JveD0iMCAwIDMwMCAxNjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMTYwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjE1MCIgeT0iODAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM2QjczODAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZm9udC13ZWlnaHQ9IjUwMCI+UEVOREFOVFMGIC0gSW1hZ2UgTm90IEZvdW5kPC90ZXh0Pgo8L3N2Zz4K';
                }}
              />
              <div className="absolute inset-0  bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300" />
              <div className="absolute bottom-4 left-4">
               
              </div>
            </motion.div>

            {/* Rings */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="relative overflow-hidden cursor-pointer group"
              onClick={() => handleCategorySelect("RINGS")}
            >
              <img
                src="/images/rings.png"
                alt="Rings"
                className="w-full h-50 object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE2MCIgdmlld0JveD0iMCAwIDMwMCAxNjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMTYwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjE1MCIgeT0iODAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM2QjczODAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZm9udC13ZWlnaHQ9IjUwMCI+UklOR1MgLSBJbWFnZSBOb3QgRm91bmQ8L3RleHQ+Cjwvc3ZnPgo=';
                }}
              />
              <div className="absolute inset-0  bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300" />
              <div className="absolute bottom-4 left-4">
               
              </div>
            </motion.div>
          </div>

          {/* Right Column - 2 Cards + Button */}
          <div className="flex flex-col gap-2 ">
            {/* Necklace - Taller */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="relative overflow-hidden cursor-pointer group"
              onClick={() => handleCategorySelect("NECKLACE")}
            >
              <img
                src="/images/necklace.png"
                alt="Necklace"
                className="w-full h-88 object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwOCIgdmlld0JveD0iMCAwIDMwMCAyMDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjA4IiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjE1MCIgeT0iMTA0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNkI3MzgwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZvbnQtd2VpZ2h0PSI1MDAiPk5FQ0tMQUNFIC0gSW1hZ2UgTm90IEZvdW5kPC90ZXh0Pgo8L3N2Zz4K';
                }}
              />
              <div className="absolute inset-0  bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300" />
              
            </motion.div>

            {/* Earrings */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="relative overflow-hidden cursor-pointer group"
              onClick={() => handleCategorySelect("EARRINGS")}
            >
              <img
                src="/images/earring.png"
                alt="Earrings"
                className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDMwMCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMTI4IiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjE1MCIgeT0iNjQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM2QjczODAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZm9udC13ZWlnaHQ9IjUwMCI+RUFSUKLOR1MgLSBJbWFnZSBOb3QgRm91bmQ8L3RleHQ+Cjwvc3ZnPgo=';
                }}
              />
              <div className="absolute inset-0  bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300" />
             
            </motion.div>

            {/* Show All Button */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="bg-gray-100 hover:bg-gray-200 transition-colors duration-300 cursor-pointer"
              onClick={handleViewAllProducts}
            >
              <button className="w-full h-10 py-10 px-6 inline-flex items-center justify-center text-black font-medium text-sm tracking-[0.1em] group">
                SHOW ALL
                <svg
                  className="ml-2 w-4 h-6 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CategoryGrid;