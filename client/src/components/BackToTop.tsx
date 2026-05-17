import { motion, useScroll, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';

export function BackToTop() {
  const { scrollYProgress } = useScroll();
  const controls = useAnimation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      if (latest > 0.1) {
        setIsVisible(true);
        controls.start({ opacity: 1, y: 0 });
      } else {
        setIsVisible(false);
        controls.start({ opacity: 0, y: 20 });
      }
    });
  }, [scrollYProgress, controls]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(212,175,55,0.4)' }}
      whileTap={{ scale: 0.9 }}
      onClick={scrollToTop}
      className={`fixed bottom-8 left-8 md:left-auto md:right-32 z-40 flex items-center justify-center w-12 h-12 bg-card/60 backdrop-blur-xl border border-gold/30 rounded-full text-gold hover:bg-gold hover:text-background transition-colors duration-300 shadow-lg ${!isVisible ? 'pointer-events-none' : ''}`}
      aria-label="Back to top"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    </motion.button>
  );
}
