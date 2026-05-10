import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { MouseEvent } from 'react';

/**
 * About Section
 * Professional about section with the user's exact bio text.
 * Enhanced with advanced glassmorphism, magnetic hover effect, and ambient glow.
 */
export function About() {
  // Mouse position for gradient spotlight effect
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
      rgba(212, 175, 55, 0.1),
      transparent 80%
    )
  `;

  return (
    <section id="about" className="relative py-20 md:py-32 bg-background overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.03, 0.08, 0.03],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none"
      />

      <div className="container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-12 md:mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-4">
            About{' '}
            <motion.span
              className="text-gold inline-block"
              whileInView={{
                textShadow: [
                  '0 0 0px rgba(212,175,55,0)',
                  '0 0 20px rgba(212,175,55,0.4)',
                  '0 0 0px rgba(212,175,55,0)',
                ],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              Me
            </motion.span>
          </h2>
          
          {/* Animated divider line */}
          <motion.div
            className="h-px bg-gradient-to-r from-gold/50 to-transparent w-48"
            initial={{ scaleX: 0, originX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
          />
        </motion.div>

        {/* About content — right-aligned for the viewer */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-3xl ml-auto"
        >
          <div 
            onMouseMove={handleMouseMove}
            className="relative group bg-card/10 backdrop-blur-xl border border-gold/10 rounded-2xl p-8 md:p-12 hover:border-gold/30 transition-all duration-700 overflow-hidden"
          >
            {/* Dynamic Spotlight Glow */}
            <motion.div
              className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-500 group-hover:opacity-100"
              style={{ background: backgroundGlow }}
            />

            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-gold/40 rounded-tl-xl transition-all duration-500 group-hover:w-8 group-hover:h-8" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-gold/40 rounded-br-xl transition-all duration-500 group-hover:w-8 group-hover:h-8" />

            <div className="relative z-10 space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                I'm an <span className="text-gold font-medium">AI/ML engineer</span> and data-driven problem solver with a strong foundation in Python and machine learning. I enjoy building intelligent systems that move beyond theory into real-world impact, whether that's developing predictive models or designing data pipelines.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                I have hands-on experience with tools like NumPy, Pandas, Scikit-learn, and PyTorch, and I am continuously improving my skills in advanced machine learning and production systems. I focus on building solutions that perform reliably in real-world environments by optimizing performance and handling edge cases.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Currently, I am building projects to deepen my understanding of both <span className="text-gold font-medium">machine learning and deep learning</span>, while strengthening my ability to design practical, real-world solutions.
              </motion.p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
