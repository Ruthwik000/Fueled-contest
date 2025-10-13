import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useAppStore from '../store/appStore';
import { celebrities } from '../mock/data';
import Header from '../components/Header';

const CelebrityGrid = () => {
  const navigate = useNavigate();
  const [selectedCelebrity, setSelectedCelebrity] = useState(null);
  const { selectCelebrity } = useAppStore();

  const handleCelebrityClick = (celebrity) => {
    setSelectedCelebrity(celebrity);
  };

  const handleConfirmCelebrity = () => {
    if (selectedCelebrity) {
      selectCelebrity(selectedCelebrity);
      navigate('/categories');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white"
    >
      {/* Header */}
      <Header showBackButton={true} backTo="/survey" />

      <AnimatePresence mode="wait">
        {!selectedCelebrity ? (
          /* Celebrity Selection View - Exact match to your image */
          <motion.div
            key="selection"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="px-6 py-12 max-w-4xl mx-auto"
          >
            {/* Title */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-center"
              style={{ marginBottom: '168px' }}
            >
              <h2 className="text-2xl font-serif tracking-[0.2em] text-black font-normal">
                SELECT A CELEBRITY
              </h2>
            </motion.div>

            {/* Celebrity Grid - 3 Column Layout */}
            <div
              className="grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-2xl sm:max-w-3xl mx-auto px-4 sm:px-6"
              style={{ marginBottom: '64px' }}
            >
              {celebrities.slice(0, 3).map((celebrity, index) => (
                <motion.div
                  key={celebrity.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{
                    delay: 0.2 + index * 0.1,
                    duration: 0.4
                  }}
                  className="flex flex-col items-center cursor-pointer group"
                  onClick={() => handleCelebrityClick(celebrity)}
                >
                  <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <img
                      src={`${celebrity.image}?t=${Date.now()}`}
                      alt={celebrity.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      onLoad={() => console.log(`Loaded image for ${celebrity.name}: ${celebrity.image}`)}
                      onError={(e) => {
                        console.error(`Failed to load image for ${celebrity.name}: ${celebrity.image}`);
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDEyOCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjY0IiBjeT0iNjQiIHI9IjY0IiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjY0IiB5PSI2NCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzZCNzM4MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEwIiBmb250LXdlaWdodD0iNTAwIj5JbWFnZTwvdGV4dD4KPC9zdmc+Cg==';
                      }}
                    />
                  </div>
                  <h3 className="text-center text-sm font-serif text-black tracking-[0.15em] font-medium uppercase">
                    {celebrity.name}
                  </h3>
                </motion.div>
              ))}
            </div>

            {/* Description Text - Centered and Responsive */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex justify-center items-center px-4 sm:px-6 lg:px-8"
            >
              <p className="text-sm sm:text-base lg:text-lg text-gray-600 text-center leading-relaxed font-normal max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-xl">
                Based on your preferences for elegant and timeless pieces, we've selected these celebrities who share your classic style.
              </p>
            </motion.div>
          </motion.div>
        ) : (
          /* Celebrity Detail View - Centered on Page */
          <motion.div
            key="detail"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center min-h-[calc(100vh-120px)] px-6 py-8"
          >
            {/* Celebrity Card */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="bg-gray-100 rounded-2xl overflow-hidden shadow-lg max-w-md w-full"
            >
              {/* Celebrity Image */}
              <div className="overflow-hidden rounded-t-2xl" style={{ height: '400px' }}>
                <img
                  src={selectedCelebrity.image}
                  alt={selectedCelebrity.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNkI3MzgwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiIGZvbnQtd2VpZ2h0PSI1MDAiPkNlbGVicml0eSBJbWFnZSBOb3QgRm91bmQ8L3RleHQ+Cjwvc3ZnPgo=';
                  }}
                />
              </div>

              {/* Celebrity Info */}
              <div className="px-8 text-center bg-white" style={{ paddingTop: '48px', paddingBottom: '56px' }}>
                <h1 
                  className="text-xl font-serif text-black tracking-[0.2em] uppercase font-normal"
                  style={{ marginBottom: '32px' }}
                >
                  {selectedCelebrity.name}
                </h1>

                <p 
                  className="text-base text-gray-600 leading-relaxed px-4"
                  style={{ marginBottom: '48px' }}
                >
                  {selectedCelebrity.description}
                </p>

                {/* View Products Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleConfirmCelebrity}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-medium tracking-[0.1em] transition-all duration-300"
                  style={{
                    padding: '16px 40px',
                    borderRadius: '24px',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  View Products
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CelebrityGrid;