import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { useRef } from 'react';

interface TimelineEvent {
  year: string;
  title: string;
  subtitle: string;
  description: string;
}

/**
 * Timeline Section
 * Vertical center-line timeline showing Ehsaan's journey.
 * Enhanced with scroll-driven line progress, staggered card reveals,
 * glowing orbs, and parallax year badges.
 */
export function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Animate the timeline line height based on scroll
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ['0%', '100%']);

  const events: TimelineEvent[] = [
    {
      year: '2025–26',
      title: 'AI/ML Specialization',
      subtitle: 'Current Focus',
      description:
        'Diving deep into Artificial Intelligence and Machine Learning — building predictive models, working with neural networks, and developing intelligent systems using Scikit-learn, PyTorch, and advanced ML techniques.',
    },
    {
      year: '2022–24',
      title: 'Computer Science & Python Mastery',
      subtitle: 'Academic Foundation',
      description:
        'Enrolled in a formal Computer Science degree program. Started learning Python and progressively explored the language in depth — mastering data manipulation with Pandas, numerical computing with NumPy, and data visualization with Matplotlib and Seaborn.',
    },
    {
      year: '2021',
      title: 'Web Fundamentals — HTML & CSS',
      subtitle: 'Expanding Horizons',
      description:
        'During 12th standard, explored web development fundamentals by learning HTML and CSS, building an understanding of how digital interfaces are structured and styled.',
    },
    {
      year: '2020',
      title: 'Started with C/C++',
      subtitle: 'The Spark',
      description:
        'Driven by curiosity about computer and programming, began the programming journey with C and C++, after completing 10th standard.',
    },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section ref={sectionRef} className="relative py-20 md:py-32 bg-background overflow-hidden">
      {/* Background accent */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.03, 0.07, 0.03],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.02, 0.06, 0.02],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        className="absolute top-20 right-10 w-72 h-72 bg-gold/5 rounded-full blur-3xl pointer-events-none"
      />

      <div className="container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-24 text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            {/* Glowing orb with pulse */}
            <motion.div
              className="w-8 h-8 rounded-full bg-gold/30 blur-sm"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
            >
              My career &{' '}
              <motion.span
                className="text-gold italic inline-block"
                whileInView={{
                  textShadow: [
                    '0 0 0px rgba(212,175,55,0)',
                    '0 0 20px rgba(212,175,55,0.25)',
                    '0 0 0px rgba(212,175,55,0)',
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                experience
              </motion.span>
            </motion.h2>
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="relative max-w-4xl mx-auto"
        >
          {/* Center Timeline Line (static track) */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-border/30 transform md:-translate-x-px" />

          {/* Center Timeline Line (animated progress) */}
          <motion.div
            className="absolute left-8 md:left-1/2 top-0 w-px bg-gradient-to-b from-gold via-gold/60 to-gold/20 transform md:-translate-x-px origin-top"
            style={{ height: lineHeight }}
          />

          {/* Timeline Items */}
          <div className="space-y-12 md:space-y-16">
            {events.map((event, index) => (
              <motion.div
                key={event.year}
                variants={itemVariants}
                className="relative"
              >
                <div
                  className={`flex flex-col md:flex-row items-start gap-4 md:gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                >
                  {/* Content side */}
                  <div className={`flex-1 pl-16 md:pl-0 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <motion.div
                      whileHover={{ x: index % 2 === 0 ? -5 : 5, scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                      className="bento-box p-6 text-left"
                    >
                      <h3 className="text-lg md:text-xl font-display font-bold text-foreground mb-1">
                        {event.title}
                      </h3>
                      <p className="text-gold text-sm font-medium mb-2">{event.subtitle}</p>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {event.description}
                      </p>
                    </motion.div>
                  </div>

                  {/* Center year badge with glow */}
                  <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center">
                    <motion.div
                      className="w-16 h-16 rounded-full bg-card border border-border flex items-center justify-center relative"
                      whileInView={{
                        borderColor: ['rgba(51,43,18,1)', 'rgba(212,175,55,0.5)', 'rgba(51,43,18,1)'],
                      }}
                      transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                      viewport={{ once: true }}
                    >
                      {/* Glow ring */}
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        animate={{
                          boxShadow: [
                            '0 0 0px rgba(212,175,55,0)',
                            '0 0 15px rgba(212,175,55,0.2)',
                            '0 0 0px rgba(212,175,55,0)',
                          ],
                        }}
                        transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                      />
                      <span className="text-[10px] font-bold text-gold tracking-wide">
                        {event.year}
                      </span>
                    </motion.div>
                  </div>

                  {/* Year label on opposite side */}
                  <div className={`flex-1 hidden md:block ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                    <motion.span
                      className="text-3xl md:text-4xl font-display font-bold text-muted-foreground/20"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      {event.year}
                    </motion.span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
