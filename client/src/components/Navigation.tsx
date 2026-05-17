import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

/**
 * Navigation Component
 * Sticky header with gold theme, email center display, and smooth animations.
 * Enhanced with active section tracking, animated underlines, and glassmorphism.
 * Mobile: Full-screen overlay menu with staggered link animations.
 * Progressive blur: transparent → frosted glass as user scrolls.
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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const navItems = [
    { label: 'ABOUT', id: 'about' },
    { label: 'WORK', id: 'work' },
    { label: 'CONTACT', id: 'contact' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  // Stagger variants for full-screen mobile menu links
  const menuContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const menuItemVariants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
    },
    exit: {
      opacity: 0,
      y: -20,
      filter: 'blur(4px)',
      transition: { duration: 0.3 },
    },
  };

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled || isMobileMenuOpen
            ? 'bg-background/80 backdrop-blur-2xl border-b border-gold/10 shadow-lg shadow-black/5'
            : 'bg-transparent backdrop-blur-none'
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
            className="text-xl md:text-2xl font-display font-bold text-gold cursor-pointer relative z-[60]"
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

          {/* Mobile Menu Button (Hamburger / Close) */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gold p-2 -mr-2 relative z-[60]"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <motion.span
                className="block w-full h-0.5 bg-gold rounded-full origin-left"
                animate={isMobileMenuOpen ? { rotate: 45, y: 0, width: '100%' } : { rotate: 0 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="block w-full h-0.5 bg-gold rounded-full"
                animate={isMobileMenuOpen ? { opacity: 0, x: -20 } : { opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="block w-full h-0.5 bg-gold rounded-full origin-left"
                animate={isMobileMenuOpen ? { rotate: -45, y: 0, width: '100%' } : { rotate: 0 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.button>
        </div>

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

      {/* =========== FULL-SCREEN MOBILE MENU =========== */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[55] md:hidden bg-background/95 backdrop-blur-3xl flex flex-col items-center justify-center"
          >
            {/* Ambient background orbs */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gold/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />

            <motion.div
              variants={menuContainerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col items-center gap-8"
            >
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  variants={menuItemVariants}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-4xl sm:text-5xl font-display font-bold tracking-wider transition-colors duration-300 ${
                    activeSection === item.id
                      ? 'text-gold'
                      : 'text-foreground active:text-gold'
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}

              {/* Email link in mobile menu */}
              <motion.a
                variants={menuItemVariants}
                whileTap={{ scale: 0.96 }}
                href="mailto:ehsaanshaikh08@gmail.com"
                className="text-sm text-muted-foreground active:text-gold mt-8 border border-gold/20 px-6 py-3 rounded-full backdrop-blur-md"
              >
                ehsaanshaikh08@gmail.com
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
