import { motion } from 'framer-motion';

/**
 * Footer Component
 * Reference-style footer with name, email, social links, and copyright.
 * Enhanced with subtle glow effects, magnetic links, and animated borders.
 */
export function Footer() {
  const socialLinks = [
    { name: 'Github', url: 'https://github.com/Ehsaan08-ai' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/ehsaanshaikh' },
  ];

  return (
    <footer className="relative bg-background pt-16 pb-8 overflow-hidden">
      {/* Animated top border gradient */}
      <motion.div 
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.5), transparent)'
        }}
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        viewport={{ once: true }}
      />

      {/* Subtle ambient glow in footer */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          {/* Large Name */}
          <motion.h2 
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-foreground mb-10 md:mb-14 tracking-tighter"
            whileHover={{ textShadow: '0 0 20px rgba(212,175,55,0.2)' }}
            transition={{ duration: 0.3 }}
          >
            EHSAAN <span className="text-gold/80">SHAIKH</span>
          </motion.h2>

          {/* Three Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
            {/* Column 1: Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <p className="text-sm text-muted-foreground mb-2 font-medium tracking-widest uppercase text-gold/60">Email</p>
              <motion.a
                whileHover={{ x: 5 }}
                href="mailto:ehsaanshaikh08@gmail.com"
                className="text-lg font-medium text-foreground hover:text-gold transition-colors duration-300 block"
              >
                ehsaanshaikh08@gmail.com
              </motion.a>
            </motion.div>

            {/* Column 2: Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <p className="text-sm text-muted-foreground mb-4 font-medium tracking-widest uppercase text-gold/60">Social</p>
              <div className="space-y-4">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 5 }}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-base font-medium text-foreground hover:text-gold transition-all duration-300 group border-b border-border/30 hover:border-gold/50 pb-2 relative overflow-hidden"
                  >
                    <span className="relative z-10">{link.name}</span>
                    <motion.svg
                      className="w-4 h-4 opacity-50 group-hover:opacity-100 text-gold relative z-10"
                      initial={{ x: -5, opacity: 0 }}
                      whileHover={{ x: 0, opacity: 1 }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 17L17 7M17 7H7M17 7v10"
                      />
                    </motion.svg>
                    {/* Hover sweep effect */}
                    <motion.div 
                      className="absolute bottom-0 left-0 h-px bg-gold w-0 group-hover:w-full transition-all duration-500 ease-out"
                    />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Column 3: Credits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="md:text-right"
            >
              <p className="text-base text-foreground mb-2">
                Designed & Developed by{' '}
                <motion.span 
                  className="text-gold font-medium inline-block relative group cursor-default"
                >
                  Ehsaan Shaikh
                  <span className="absolute -bottom-1 left-0 w-full h-px bg-gold/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right group-hover:origin-left" />
                </motion.span>
              </p>
              <p className="text-sm text-muted-foreground/60 tracking-widest">
                © {new Date().getFullYear()}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
