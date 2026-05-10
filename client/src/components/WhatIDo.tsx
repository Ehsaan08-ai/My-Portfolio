import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { useState, MouseEvent } from 'react';

/**
 * WhatIDo Section
 * Matches reference: "WHAT I DO" vertical text on left,
 * two dashed-border skill cards on the right.
 * Cards: Data Scientist + AI Engineer, each with description & tools.
 * Enhanced with magnetic spotlight hover, glassmorphism, and advanced reveals.
 */
export function WhatIDo() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const skills = [
    {
      id: 'data-scientist',
      title: 'DATA SCIENTIST',
      subtitle: 'Extracting insights & building data-driven solutions',
      description:
        'Analyzing complex datasets, building statistical models, and creating data visualizations using Python, Pandas, and Matplotlib. Specializing in customer segmentation, exploratory data analysis, and transforming raw data into actionable business insights.',
      tools: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Scikit-Learn', 'MySQL', 'Streamlit'],
    },
    {
      id: 'ai-engineer',
      title: 'AI ENGINEER',
      subtitle: 'Building intelligent systems & ML solutions',
      description:
        'Developing machine learning models, predictive systems, and deep learning pipelines using PyTorch and Scikit-learn. Focused on building production-ready models that perform reliably in real-world environments.',
      tools: ['Python', 'Scikit-Learn', 'PyTorch', 'NumPy', 'Streamlit', 'Git'],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 40 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
    },
  };

  return (
    <section className="relative py-20 md:py-32 bg-background overflow-hidden">
      {/* Ambient glowing background */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.02, 0.05, 0.02],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-1/4 right-0 w-80 h-80 bg-gold/5 rounded-full blur-[100px] pointer-events-none"
      />

      <div className="container relative z-10">
        <div className="flex flex-col lg:flex-row items-start gap-8 md:gap-16">
          {/* Vertical "WHAT I DO" label — LEFT side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: '-100px' }}
            className="hidden lg:flex flex-shrink-0 items-start sticky top-32"
          >
            <h2
              className="text-6xl xl:text-8xl font-display font-bold text-foreground whitespace-nowrap"
              style={{ writingMode: 'vertical-lr', textOrientation: 'mixed' }}
            >
              WHAT I{' '}
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
                DO
              </motion.span>
            </h2>
            <motion.div 
              className="w-px h-32 bg-gradient-to-b from-gold/50 to-transparent ml-6 mt-8"
              initial={{ scaleY: 0, originY: 0 }}
              whileInView={{ scaleY: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
            />
          </motion.div>

          {/* Mobile heading */}
          <div className="lg:hidden w-full">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-display font-bold text-foreground mb-8"
            >
              WHAT I <span className="text-gold">DO</span>
            </motion.h2>
          </div>

          {/* Skill Cards — RIGHT side */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="flex-1 space-y-6 w-full"
          >
            {skills.map((skill) => (
              <SkillCard 
                key={skill.id} 
                skill={skill} 
                isExpanded={expandedCard === skill.id}
                onToggle={() => setExpandedCard(expandedCard === skill.id ? null : skill.id)}
                variants={itemVariants}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function SkillCard({ skill, isExpanded, onToggle, variants }: any) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const backgroundGlow = useMotionTemplate`
    radial-gradient(
      400px circle at ${mouseX}px ${mouseY}px,
      rgba(212, 175, 55, 0.15),
      transparent 80%
    )
  `;

  return (
    <motion.div variants={variants} className="relative group">
      {/* Dashed border card with corner brackets and spotlight */}
      <div 
        onMouseMove={handleMouseMove}
        className="relative border border-dashed border-border/40 rounded-xl p-6 md:p-8 hover:border-gold/30 transition-all duration-500 bg-card/10 backdrop-blur-md overflow-hidden cursor-pointer"
        onClick={onToggle}
      >
        {/* Dynamic Spotlight Glow */}
        <motion.div
          className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 group-hover:opacity-100"
          style={{ background: backgroundGlow }}
        />

        {/* Corner brackets */}
        <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-gold/40 rounded-tl-sm transition-all duration-300 group-hover:w-8 group-hover:h-8 group-hover:border-gold" />
        <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-gold/40 rounded-tr-sm transition-all duration-300 group-hover:w-8 group-hover:h-8 group-hover:border-gold" />
        <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-gold/40 rounded-bl-sm transition-all duration-300 group-hover:w-8 group-hover:h-8 group-hover:border-gold" />
        <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-gold/40 rounded-br-sm transition-all duration-300 group-hover:w-8 group-hover:h-8 group-hover:border-gold" />

        <div className="flex items-start justify-between relative z-10">
          <div className="flex-1 pr-4">
            <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2 group-hover:text-gold transition-colors duration-300">
              {skill.title}
            </h3>
            <p className="text-muted-foreground text-sm md:text-base mb-3">
              {skill.subtitle}
            </p>

            {/* Expandable content */}
            <motion.div
              initial={false}
              animate={{
                height: isExpanded ? 'auto' : 0,
                opacity: isExpanded ? 1 : 0,
              }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="pt-2 pb-4">
                <p className="text-muted-foreground leading-relaxed mb-6 text-sm md:text-base">
                  {skill.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {skill.tools.map((tool: string, i: number) => (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isExpanded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                      transition={{ delay: i * 0.05 + 0.2, duration: 0.3 }}
                      key={tool}
                      className="inline-block px-3 py-1.5 text-xs font-medium text-gold bg-gold/5 rounded-full border border-gold/20 shadow-[0_0_10px_rgba(212,175,55,0.05)] hover:bg-gold/15 transition-colors"
                    >
                      {tool}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Expand/collapse chevron */}
          <motion.div
            animate={{ 
              rotate: isExpanded ? 180 : 0,
              backgroundColor: isExpanded ? 'rgba(212,175,55,0.1)' : 'transparent',
              color: isExpanded ? '#D4AF37' : 'currentColor'
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="flex-shrink-0 w-10 h-10 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground group-hover:border-gold/30 group-hover:text-gold transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
