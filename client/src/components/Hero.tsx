import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from 'framer-motion';
import { useRef, useState, MouseEvent } from 'react';
import Spline from '@splinetool/react-spline';
import { Spotlight } from './Spotlight';

/**
 * Hero Section — matches reference layout:
 * "Hello! I'm" + name on the LEFT side
 * "An AI/ML Engineer" on the RIGHT side
 * 3D robot in the CENTER
 * Scroll-driven animation: robot shifts and scales as user scrolls down
 * Enhanced with dynamic spotlight, glassmorphic buttons, and pulsing glows.
 */
export function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Robot scroll animations
  const robotScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.9, 0.75]);
  const robotY = useTransform(scrollYProgress, [0, 0.5, 1], [0, 40, 100]);
  const robotOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.85, 0.3]);

  // Ambient mouse follow glow
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const backgroundGlow = useMotionTemplate`
    radial-gradient(
      600px circle at ${mouseX}px ${mouseY}px,
      rgba(212, 175, 55, 0.08),
      transparent 80%
    )
  `;

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full bg-background overflow-hidden pt-20"
    >
      {/* Background ambient gradient tied to mouse */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        style={{ background: backgroundGlow }}
      />
      
      {/* Subtle ambient pulsing orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.03, 0.08, 0.03],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.02, 0.05, 0.02],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] pointer-events-none"
      />

      <div className="container relative z-10 h-full min-h-[calc(100vh-80px)] flex flex-col justify-center">
        {/* Main hero layout: text left — robot center — text right */}
        <div className="relative flex items-center justify-between w-full">
          {/* LEFT SIDE — Greeting & Name */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex-shrink-0 z-20 w-[280px] md:w-[320px] lg:w-[360px]"
          >
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-sm md:text-base font-medium text-gold uppercase tracking-widest block mb-4"
            >
              Hello! I'm
            </motion.span>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold text-foreground leading-tight tracking-tighter">
              EHSAAN
              <br />
              <motion.span 
                className="text-gold inline-block"
                animate={{
                  textShadow: [
                    '0 0 0px rgba(212,175,55,0)',
                    '0 0 30px rgba(212,175,55,0.5)',
                    '0 0 0px rgba(212,175,55,0)',
                  ],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                SHAIKH
              </motion.span>
            </h1>
          </motion.div>

          {/* CENTER — 3D Robot */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              scale: robotScale,
              y: robotY,
              opacity: robotOpacity,
            }}
            className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[400px] h-[500px] md:w-[500px] md:h-[600px] lg:w-[600px] lg:h-[700px] z-10"
          >
            <div className="absolute inset-0 z-0">
              <Spotlight fill="#D4AF37" />
            </div>
            <div className="absolute inset-0 z-10">
              <Spline
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                onLoad={() => setIsLoaded(true)}
              />
            </div>
            {!isLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm z-20 rounded-full border border-gold/10 shadow-[0_0_50px_rgba(212,175,55,0.05)]">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 border-2 border-gold border-t-transparent rounded-full animate-spin" />
                  <p className="text-sm text-muted-foreground animate-pulse tracking-widest">INITIALIZING</p>
                </div>
              </div>
            )}
          </motion.div>

          {/* RIGHT SIDE — Role */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex-shrink-0 z-20 text-right w-[280px] md:w-[320px] lg:w-[360px]"
          >
            <h2 className="text-xl md:text-2xl lg:text-4xl font-display font-bold text-foreground tracking-tight">
              An <span className="text-gold">AI/ML</span>
              <br />
              Engineer
            </h2>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-end"
            >
              <motion.a
                href="#work"
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: '0 0 30px rgba(212, 175, 55, 0.4)',
                }}
                whileTap={{ scale: 0.95 }}
                className="relative overflow-hidden px-8 py-3 bg-gold text-background font-semibold rounded-lg hover:bg-secondary transition-all duration-300 text-center text-sm group"
              >
                {/* Shimmer sweep */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ translateX: ['-100%', '200%'] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
                />
                <span className="relative z-10">View My Work</span>
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border border-gold text-gold font-semibold rounded-lg hover:bg-gold/10 hover:shadow-[0_0_20px_rgba(212,175,55,0.15)] transition-all duration-300 text-center text-sm bg-background/50 backdrop-blur-md"
              >
                Get in Touch
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-3"
        >
          <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em]">Scroll to explore</p>
          <div className="w-5 h-8 border-2 border-gold/50 rounded-full flex justify-center pt-1">
            <motion.div 
              animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-2 bg-gold rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
