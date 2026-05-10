import { motion, Variants } from 'framer-motion';
import { useState } from 'react';

interface TechItem {
  name: string;
  icon: string;
  url?: string;
}

/**
 * TechStack Section
 * Inverted triangle layout with devicon SVG icons.
 * GitHub icon uses a light-colored version for dark backgrounds.
 * Row pattern: 7 → 5 → 3 → 2 (inverted triangle)
 * Enhanced with magnetic hover, orbital glow, and staggered wave reveal.
 */
export function TechStack() {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  const technologies: TechItem[] = [
    { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg', url: 'https://python.org' },
    { name: 'NumPy', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg', url: 'https://numpy.org' },
    { name: 'Pandas', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg', url: 'https://pandas.pydata.org' },
    { name: 'Matplotlib', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/matplotlib/matplotlib-original.svg', url: 'https://matplotlib.org' },
    { name: 'Seaborn', icon: 'https://seaborn.pydata.org/_images/logo-mark-lightbg.svg', url: 'https://seaborn.pydata.org' },
    { name: 'Scikit-Learn', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg', url: 'https://scikit-learn.org' },
    { name: 'PyTorch', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg', url: 'https://pytorch.org' },
    { name: 'LangChain', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/langchain.svg', url: 'https://langchain.com' },
    { name: 'FastAPI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg', url: 'https://fastapi.tiangolo.com' },
    { name: 'Flask', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flask/flask-original.svg', url: 'https://flask.palletsprojects.com' },
    { name: 'HTML', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
    { name: 'CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
    { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg', url: 'https://mysql.com' },
    { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg', url: 'https://git-scm.com' },
    { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg', url: 'https://github.com' },
    { name: 'Streamlit', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/streamlit/streamlit-original.svg', url: 'https://streamlit.io' },
    { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg', url: 'https://code.visualstudio.com' },
  ];

  // Inverted triangle rows: 7 - 5 - 3 - 2
  const rows = [
    technologies.slice(0, 7),   // Row 1: Python, NumPy, Pandas, Matplotlib, Seaborn, Scikit-Learn, PyTorch
    technologies.slice(7, 12),  // Row 2: LangChain, FastAPI, Flask, HTML, CSS
    technologies.slice(12, 15), // Row 3: MySQL, Git, GitHub
    technologies.slice(15, 17), // Row 4: Streamlit, VS Code
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.5, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  // Calculate a global index for each tech item across all rows
  let globalIndex = 0;

  return (
    <section className="relative py-20 md:py-32 bg-background overflow-hidden">
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.03, 0.08, 0.03],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.02, 0.06, 0.02],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        className="absolute bottom-20 right-0 w-80 h-80 bg-gold/5 rounded-full blur-3xl pointer-events-none"
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
          <motion.h2
            className="text-5xl md:text-6xl lg:text-8xl font-display font-bold text-foreground tracking-wider"
            initial={{ opacity: 0, y: 30, letterSpacing: '0.1em' }}
            whileInView={{ opacity: 1, y: 0, letterSpacing: '0.05em' }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            TECH{' '}
            <motion.span
              className="text-gold inline-block"
              whileInView={{
                textShadow: [
                  '0 0 0px rgba(212,175,55,0)',
                  '0 0 30px rgba(212,175,55,0.3)',
                  '0 0 0px rgba(212,175,55,0)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              STACK
            </motion.span>
          </motion.h2>
        </motion.div>

        {/* Inverted Triangle Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="flex flex-col items-center gap-5 md:gap-6 max-w-5xl mx-auto"
        >
          {rows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="flex justify-center gap-4 md:gap-6"
            >
              {row.map((tech) => {
                const currentGlobalIndex = globalIndex++;
                return (
                  <motion.div
                    key={tech.name}
                    variants={itemVariants}
                    whileHover={{
                      scale: 1.2,
                      y: -10,
                      transition: { duration: 0.3, ease: 'easeOut' },
                    }}
                    onHoverStart={() => setHoveredTech(tech.name)}
                    onHoverEnd={() => setHoveredTech(null)}
                    className="group relative"
                  >
                    {/* Glow effect behind hovered item */}
                    <motion.div
                      className="absolute inset-0 rounded-xl bg-gold/10 blur-xl pointer-events-none"
                      animate={{
                        opacity: hoveredTech === tech.name ? 0.6 : 0,
                        scale: hoveredTech === tech.name ? 1.5 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                    />

                    <a
                      href={tech.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative flex flex-col items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-xl bg-card/30 backdrop-blur-sm border border-border/50 hover:border-gold/50 transition-all duration-300"
                    >
                      {/* Floating animation on icon */}
                      <motion.img
                        src={tech.icon}
                        alt={tech.name}
                        className={`w-9 h-9 md:w-11 md:h-11 mb-2 transition-transform duration-300 ${
                          tech.name === 'GitHub' || tech.name === 'Flask' || tech.name === 'LangChain' ? 'invert brightness-200' : ''
                        }`}
                        animate={{
                          y: [0, -3, 0],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: currentGlobalIndex * 0.2,
                        }}
                        loading="lazy"
                      />
                      <span className="text-[9px] md:text-[11px] font-medium text-muted-foreground group-hover:text-gold transition-colors duration-300 text-center leading-tight">
                        {tech.name}
                      </span>
                    </a>
                  </motion.div>
                );
              })}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
