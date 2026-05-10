import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

/**
 * Navigation Component
 * Sticky header with gold theme, email center display, and smooth animations.
 * Enhanced with active section tracking, animated underlines, and glassmorphism.
 */
export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Track active section
      const sections = ['about', 'work', 'contact'];
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
      if (window.scrollY < 100) setActiveSection('');
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'ABOUT', id: 'about' },
    { label: 'WORK', id: 'work' },
    { label: 'CONTACT', id: 'contact' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false); // Close menu on click
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled || isMobileMenuOpen
          ? 'bg-background/90 backdrop-blur-xl border-b border-gold/10 shadow-lg shadow-black/5'
          : 'bg-transparent'
      }`}
    >
      <div className="container flex items-center justify-between py-4 md:py-6">
        {/* Logo with glow */}
        <motion.div
          whileHover={{
            scale: 1.1,
            textShadow: '0 0 15px rgba(212,175,55,0.4)',
          }}
          whileTap={{ scale: 0.95 }}
          className="text-xl md:text-2xl font-display font-bold text-gold cursor-pointer"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setIsMobileMenuOpen(false);
          }}
        >
          ES
        </motion.div>

        {/* Center - Email */}
        <motion.a
          href="mailto:ehsaanshaikh08@gmail.com"
          className="hidden md:block text-sm text-muted-foreground hover:text-gold transition-colors duration-300"
          whileHover={{ scale: 1.02 }}
        >
          ehsaanshaikh08@gmail.com
        </motion.a>

        {/* Navigation Links (Desktop) */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item, index) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
              onClick={() => scrollToSection(item.id)}
              className={`text-sm font-medium transition-colors duration-300 relative group ${
                activeSection === item.id ? 'text-gold' : 'text-foreground hover:text-gold'
              }`}
            >
              {item.label}
              {/* Animated underline */}
              <motion.span
                className="absolute -bottom-1 left-0 h-0.5 bg-gold rounded-full"
                initial={{ width: 0 }}
                animate={{ width: activeSection === item.id ? '100%' : 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
              {/* Hover underline */}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold/50 group-hover:w-full transition-all duration-300 rounded-full" />
            </motion.button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-gold p-2 -mr-2"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </motion.button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-background/95 backdrop-blur-xl border-b border-gold/10"
          >
            <div className="flex flex-col items-center py-6 gap-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-lg font-medium tracking-wider ${
                    activeSection === item.id ? 'text-gold' : 'text-foreground hover:text-gold'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <a
                href="mailto:ehsaanshaikh08@gmail.com"
                className="text-sm text-muted-foreground hover:text-gold mt-2"
              >
                ehsaanshaikh08@gmail.com
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animated bottom glow line when scrolled */}
      <AnimatePresence>
        {isScrolled && !isMobileMenuOpen && (
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            exit={{ scaleX: 0, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute bottom-0 left-0 right-0 h-px"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent)',
            }}
          />
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
