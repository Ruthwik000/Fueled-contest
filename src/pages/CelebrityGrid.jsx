import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useAppStore from '../store/appStore';
// Removed mock data import - using ML recommendations only
import Header from '../components/Header';

const CelebrityGrid = () => {
  const navigate = useNavigate();
  const [selectedCelebrity, setSelectedCelebrity] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { selectCelebrity, recommendations } = useAppStore();

  // Use ML recommendations only - no fallback to mock data
  const celebritiesToShow = recommendations.celebrities;

  // Responsive calculations based on screen width - NO HORIZONTAL SCROLLING
  const getResponsiveValues = () => {
    const width = windowWidth;
    
    // Calculate circle size to fit exactly 3 celebrities with proper spacing
    const containerPadding = Math.max(width * 0.08, 25); // More padding for better edge gap
    const availableWidth = width - (containerPadding * 2); // Account for container padding
    
    // Further reduce gap percentage between circles
    let gapPercentage = width < 400 ? 0.05 : 0.08; // Even smaller gaps between circles
    
    // Calculate optimal circle size to fit 3 celebrities with minimal gaps
    const totalGapSpace = availableWidth * gapPercentage;
    const circleSpace = availableWidth - totalGapSpace;
    const baseCircleSize = Math.max(Math.min(circleSpace / 3, 280), width < 400 ? 80 : 90);
    
    // Calculate smaller gap between circles
    const gap = Math.max((availableWidth - (baseCircleSize * 3)) / 2, width < 400 ? 5 : 8);
    
    return {
      circleSize: baseCircleSize,
      gap: gap,
      fontSize: Math.max(Math.min(baseCircleSize * 0.1, 24), 10),
      titleSize: Math.max(Math.min(width * 0.04, 32), 18),
      descriptionSize: Math.max(Math.min(width * 0.025, 18), 12),
      containerPadding: containerPadding,
      marginBottom: Math.max(baseCircleSize * 0.25, 15), // Spacing between image and name
      imageNameSpacing: Math.max(baseCircleSize * 0.15, 12) // Additional spacing between image and name
    };
  };

  const responsive = getResponsiveValues();
  
  // Debug logging
  console.log('🎭 CelebrityGrid - Recommendations:', recommendations);
  console.log('🎭 CelebrityGrid - Celebrities to show:', celebritiesToShow);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
      style={{
        minHeight: '100vh',
        backgroundColor: '#ffffff'
      }}
    >
      {/* Header */}
      <Header showBackButton={true} backTo="/survey" />
      
      {/* Debug component removed */}

      <AnimatePresence mode="wait">
        {!selectedCelebrity ? (
          /* Celebrity Selection View - Responsive for all screens */
          <motion.div
            key="selection"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              padding: `${responsive.containerPadding * 2}px 0`,
              width: '100%',
              maxWidth: '100vw',
              margin: '0 auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden'
            }}
          >
            {/* Title */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                width: '100%',
                marginBottom: responsive.marginBottom * 3
              }}
            >
              <h2 style={{
                fontSize: `${responsive.titleSize}px`,
                fontFamily: 'serif',
                letterSpacing: '0.2em',
                color: '#000000',
                fontWeight: '400',
                margin: 0,
                textAlign: 'center'
              }}>
                SELECT A CELEBRITY
              </h2>
            </motion.div>

            {/* Celebrity Grid - Fully Responsive No Scroll */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexWrap: 'nowrap',
                gap: `${responsive.gap}px`,
                width: '100%',
                maxWidth: '100%',
                margin: '0 auto',
                marginBottom: responsive.marginBottom * 2,
                padding: `0 ${responsive.containerPadding}px`,
                overflow: 'visible'
              }}
            >
              {celebritiesToShow && celebritiesToShow.length > 0 ? celebritiesToShow.slice(0, 3).map((celebrity, index) => (
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
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    cursor: 'pointer',
                    textAlign: 'center',
                    flex: '0 0 auto',
                    width: `${responsive.circleSize + 40}px`, // More width for full names
                    minHeight: `${responsive.circleSize + responsive.imageNameSpacing * 3}px`, // Ensure space for wrapped text
                    padding: '5px'
                  }}
                  onClick={() => handleCelebrityClick(celebrity)}
                >
                  <div style={{
                    position: 'relative',
                    width: `${responsive.circleSize}px`,
                    height: `${responsive.circleSize}px`,
                    borderRadius: '50%',
                    overflow: 'hidden',
                    marginBottom: `${responsive.imageNameSpacing}px`,
                    boxShadow: '0 15px 35px -5px rgba(0, 0, 0, 0.15)',
                    transition: 'all 0.3s ease-in-out',
                    margin: '0 auto',
                    flexShrink: 0
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 25px 50px -5px rgba(0, 0, 0, 0.25)';
                    e.currentTarget.style.transform = 'translateY(-8px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 15px 35px -5px rgba(0, 0, 0, 0.15)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                  >
                    <img
                      src={`${celebrity.image}?t=${Date.now()}`}
                      alt={celebrity.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.3s ease-in-out'
                      }}
                      onLoad={() => console.log(`Loaded image for ${celebrity.name}: ${celebrity.image}`)}
                      onError={(e) => {
                        console.error(`Failed to load image for ${celebrity.name}: ${celebrity.image}`);
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDEyOCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjY0IiBjeT0iNjQiIHI9IjY0IiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjY0IiB5PSI2NCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzZCNzM4MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEwIiBmb250LXdlaWdodD0iNTAwIj5JbWFnZTwvdGV4dD4KPC9zdmc+Cg==';
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'scale(1.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'scale(1)';
                      }}
                    />
                  </div>
                  <h3 style={{
                    textAlign: 'center',
                    fontSize: `${responsive.fontSize}px`,
                    fontFamily: 'serif',
                    color: '#000000',
                    letterSpacing: '0.1em',
                    fontWeight: '500',
                    textTransform: 'uppercase',
                    margin: 0,
                    marginTop: `${responsive.imageNameSpacing}px`,
                    lineHeight: '1.2',
                    wordWrap: 'break-word',
                    width: '100%',
                    maxWidth: `${responsive.circleSize + 40}px`, // Allow more width for full names
                    overflow: 'visible', // Show full text
                    whiteSpace: 'normal', // Allow text wrapping
                    textAlign: 'center'
                  }}>
                    {celebrity.name}
                  </h3>
                </motion.div>
              )) : (
                <div style={{
                  gridColumn: '1 / -1',
                  textAlign: 'center',
                  padding: '40px 20px',
                  color: '#6b7280'
                }}>
                  <h3 style={{ marginBottom: '16px' }}>No celebrity recommendations available</h3>
                  <p>Please complete the survey to get personalized recommendations.</p>
                </div>
              )}
            </div>

            {/* Description Text - Centered and Responsive */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                textAlign: 'center',
                padding: `0 ${responsive.containerPadding}px`,
                marginTop: responsive.marginBottom
              }}
            >
              <p style={{
                fontSize: `${responsive.descriptionSize}px`,
                color: '#6b7280',
                textAlign: 'center',
                lineHeight: '1.6',
                fontWeight: '400',
                maxWidth: Math.min(windowWidth * 0.8, 600),
                margin: '0 auto'
              }}>
                Based on your preferences for elegant and timeless pieces, we've selected these celebrities who share your classic style.
              </p>
            </motion.div>
          </motion.div>
        ) : (
          /* Celebrity Detail View - Responsive Centered Layout */
          <motion.div
            key="detail"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 'calc(100vh - 120px)',
              padding: window.innerWidth >= 1200 ? '60px 40px' : window.innerWidth >= 768 ? '40px 24px' : '32px 24px'
            }}
          >
            {/* Celebrity Card */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              style={{
                backgroundColor: '#f3f4f6',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                maxWidth: window.innerWidth >= 1200 ? '500px' : window.innerWidth >= 768 ? '450px' : '400px',
                width: '100%'
              }}
            >
              {/* Celebrity Image */}
              <div style={{
                overflow: 'hidden',
                borderTopLeftRadius: '16px',
                borderTopRightRadius: '16px',
                height: window.innerWidth >= 1200 ? '500px' : window.innerWidth >= 768 ? '450px' : '400px'
              }}>
                <img
                  src={selectedCelebrity.image}
                  alt={selectedCelebrity.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNkI3MzgwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiIGZvbnQtd2VpZ2h0PSI1MDAiPkNlbGVicml0eSBJbWFnZSBOb3QgRm91bmQ8L3RleHQ+Cjwvc3ZnPgo=';
                  }}
                />
              </div>

              {/* Celebrity Info */}
              <div style={{
                padding: window.innerWidth >= 1200 ? '48px 40px 56px 40px' : window.innerWidth >= 768 ? '40px 32px 48px 32px' : '32px 24px 40px 24px',
                textAlign: 'center',
                backgroundColor: '#ffffff'
              }}>
                <h1 style={{
                  fontSize: window.innerWidth >= 1200 ? '24px' : window.innerWidth >= 768 ? '22px' : '20px',
                  fontFamily: 'serif',
                  color: '#000000',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  fontWeight: '400',
                  marginBottom: window.innerWidth >= 1200 ? '32px' : window.innerWidth >= 768 ? '28px' : '24px',
                  margin: `0 0 ${window.innerWidth >= 1200 ? '32px' : window.innerWidth >= 768 ? '28px' : '24px'} 0`
                }}>
                  {selectedCelebrity.name}
                </h1>

                <p style={{
                  fontSize: window.innerWidth >= 1200 ? '18px' : window.innerWidth >= 768 ? '16px' : '14px',
                  color: '#6b7280',
                  lineHeight: '1.6',
                  padding: window.innerWidth >= 1200 ? '0 20px' : window.innerWidth >= 768 ? '0 16px' : '0 12px',
                  marginBottom: window.innerWidth >= 1200 ? '48px' : window.innerWidth >= 768 ? '40px' : '32px',
                  margin: `0 ${window.innerWidth >= 1200 ? '20px' : window.innerWidth >= 768 ? '16px' : '12px'} ${window.innerWidth >= 1200 ? '48px' : window.innerWidth >= 768 ? '40px' : '32px'} ${window.innerWidth >= 1200 ? '20px' : window.innerWidth >= 768 ? '16px' : '12px'}`
                }}>
                  {selectedCelebrity.description}
                </p>

                {/* View Products Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleConfirmCelebrity}
                  style={{
                    backgroundColor: '#eab308',
                    color: 'white',
                    fontSize: window.innerWidth >= 1200 ? '16px' : window.innerWidth >= 768 ? '15px' : '14px',
                    fontWeight: '500',
                    letterSpacing: '0.1em',
                    padding: window.innerWidth >= 1200 ? '18px 48px' : window.innerWidth >= 768 ? '16px 40px' : '14px 32px',
                    borderRadius: '24px',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#ca8a04';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#eab308';
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