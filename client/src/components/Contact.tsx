import { motion, Variants } from 'framer-motion';
import { useRef } from 'react';

/**
 * Contact Section
 * Call-to-action section with contact information and social links.
 * Only GitHub and LinkedIn (no Twitter/Instagram). No location.
 * Enhanced with magnetic CTA buttons, ripple effects, and ambient glow.
 */
export function Contact() {
  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/Ehsaan08-ai',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/ehsaanshaikh',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section id="contact" className="relative py-20 md:py-32 bg-background overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent pointer-events-none" />

      {/* Ambient floating orbs */}
      <motion.div
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-20 left-1/4 w-64 h-64 bg-gold/10 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{
          x: [0, -20, 0],
          y: [0, 30, 0],
          scale: [1, 1.3, 1],
          opacity: [0.03, 0.08, 0.03],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
        className="absolute bottom-20 right-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none"
      />

      <div className="container relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Main Heading */}
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6"
          >
            Let's{' '}
            <motion.span
              className="text-gold inline-block"
              whileInView={{
                textShadow: [
                  '0 0 0px rgba(212,175,55,0)',
                  '0 0 25px rgba(212,175,55,0.3)',
                  '0 0 0px rgba(212,175,55,0)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              Connect
            </motion.span>
          </motion.h2>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto"
          >
            I'm always interested in hearing about new projects and opportunities.
            Feel free to reach out if you'd like to collaborate or just chat!
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <motion.a
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 40px rgba(212,175,55,0.4)',
              }}
              whileTap={{ scale: 0.95 }}
              href="mailto:ehsaanshaikh08@gmail.com"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 text-lg font-medium text-primary-foreground bg-gold rounded-lg hover:bg-secondary transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden"
            >
              {/* Shimmer sweep */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ translateX: ['-100%', '200%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 3 }}
              />
              <span className="relative z-10">Hire Me</span>
              <svg className="w-5 h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </motion.a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center gap-6 mb-12"
          >
            {socialLinks.map((link, i) => (
              <motion.a
                key={link.name}
                whileHover={{
                  scale: 1.2,
                  y: -8,
                  boxShadow: '0 0 20px rgba(212,175,55,0.2)',
                }}
                whileTap={{ scale: 0.95 }}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                title={link.name}
                className="w-14 h-14 md:w-12 md:h-12 flex items-center justify-center bg-card/50 backdrop-blur-md border border-border rounded-lg hover:border-gold hover:bg-gold/10 transition-all duration-300 text-muted-foreground hover:text-gold relative"
              >
                {/* Pulse ring on hover */}
                <motion.div
                  className="absolute inset-0 rounded-lg border border-gold/30"
                  initial={{ scale: 1, opacity: 0 }}
                  whileHover={{
                    scale: [1, 1.5],
                    opacity: [0.5, 0],
                  }}
                  transition={{ duration: 0.6 }}
                />
                {link.icon}
              </motion.a>
            ))}
          </motion.div>

          {/* Contact Info with animated divider */}
          <motion.div variants={itemVariants} className="relative">
            {/* Animated divider line */}
            <motion.div
              className="w-full h-px mb-8 mx-auto"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)',
              }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
            />

            <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-16">
              <motion.div
                whileHover={{ y: -3 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-sm text-muted-foreground mb-2">Email</p>
                <a
                  href="mailto:ehsaanshaikh08@gmail.com"
                  className="text-lg font-medium text-gold hover:text-champagne transition-colors"
                >
                  ehsaanshaikh08@gmail.com
                </a>
              </motion.div>
              <motion.div
                whileHover={{ y: -3 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-sm text-muted-foreground mb-2">Availability</p>
                <div className="flex items-center gap-2">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-green-400"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [1, 0.7, 1],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <p className="text-lg font-medium text-champagne">Open to Opportunities</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
}
