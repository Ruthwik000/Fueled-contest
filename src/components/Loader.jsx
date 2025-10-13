import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const Loader = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Navigate to celebrities after 3 seconds
    const timer = setTimeout(() => {
      navigate('/celebrities');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        minHeight: '100vh',
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Header */}
      <Header showBackButton={true} backTo="/survey" />

      {/* Main Content */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px'
      }}>
        <div style={{
          textAlign: 'center',
          maxWidth: '600px',
          margin: '0 auto',
          width: '100%'
        }}>

          {/* Spinning Ring Animation */}
          <motion.div style={{
            position: 'relative',
            marginBottom: '48px',
            display: 'flex',
            justifyContent: 'center'
          }}>
            <div style={{ position: 'relative' }}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                style={{
                  width: '80px',
                  height: '80px',
                  border: '4px solid #e5e7eb',
                  borderTop: '4px solid #d97706',
                  borderRadius: '50%'
                }}
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '80px',
                  height: '80px',
                  border: '4px solid transparent',
                  borderBottom: '4px solid #f59e0b',
                  borderRadius: '50%'
                }}
              />
            </div>
          </motion.div>

          {/* Loading Text */}
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{ marginBottom: '40px' }}
          >
            <h2 style={{
              fontSize: '28px',
              fontFamily: 'serif',
              color: '#1e293b',
              marginBottom: '24px',
              lineHeight: '1.2',
              fontWeight: '400'
            }}>
              Generating your personalized recommendations...
            </h2>
            <p style={{
              fontSize: '18px',
              color: '#64748b',
              maxWidth: '500px',
              margin: '0 auto',
              lineHeight: '1.6',
              fontWeight: '400'
            }}>
              We're analyzing your preferences to find the perfect jewelry pieces that match your unique style.
            </p>
          </motion.div>

          {/* Animated Dots */}
          <motion.div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '16px'
          }}>
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.4, 1, 0.4]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: index * 0.2
                }}
                style={{
                  width: '16px',
                  height: '16px',
                  backgroundColor: '#d97706',
                  borderRadius: '50%'
                }}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Loader;