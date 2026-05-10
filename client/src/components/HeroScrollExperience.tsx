import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from 'framer-motion';
import { useRef, useState, MouseEvent } from 'react';
import Spline from '@splinetool/react-spline';
import { Spotlight } from './Spotlight';

/**
 * HeroScrollExperience Component
 *
 * This is one tall scroll container that holds:
 * - Scene 1 (Hero): "Hello! I'm EHSAAN SHAIKH" left, "An AI Engineer" right, robot center
 * - Scene 2 (About): About Me text appears on the right while robot stays visible
 * - Scene 3 (What I Do): Two skill cards on the right, "WHAT I DO" on left
 *
 * The 3D robot is position:sticky so it remains visible as user scrolls through all 3 scenes.
 * Enhanced with advanced glassmorphism, dynamic spotlight hover effects, and stagger animations.
 */
export function HeroScrollExperience() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Fade sections based on scroll position
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25, 0.33], [1, 1, 0]);
  const aboutOpacity = useTransform(scrollYProgress, [0.25, 0.33, 0.58, 0.66], [0, 1, 1, 0]);
  const whatIdoOpacity = useTransform(scrollYProgress, [0.58, 0.66, 0.95, 1], [0, 1, 1, 0.5]);

  // Dynamic pointer events so invisible overlapping scenes don't steal clicks
  const heroPointerEvents = useTransform(heroOpacity, (v) => (v > 0.1 ? 'auto' : 'none'));
  const aboutPointerEvents = useTransform(aboutOpacity, (v) => (v > 0.1 ? 'auto' : 'none'));
  const whatIdoPointerEvents = useTransform(whatIdoOpacity, (v) => (v > 0.1 ? 'auto' : 'none'));

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

  // Mouse position for About Scene gradient spotlight effect
  const aboutMouseX = useMotionValue(0);
  const aboutMouseY = useMotionValue(0);

  function handleAboutMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    aboutMouseX.set(clientX - left);
    aboutMouseY.set(clientY - top);
  }

  const aboutBackgroundGlow = useMotionTemplate`
    radial-gradient(
      600px circle at ${aboutMouseX}px ${aboutMouseY}px,
      rgba(212, 175, 55, 0.1),
      transparent 80%
    )
  `;

  return (
    <div ref={containerRef} className="relative" style={{ height: '300vh' }}>
      {/* Navigation Anchor for About Section */}
      <div id="about" className="absolute top-[100vh] w-full h-px pointer-events-none invisible" />

      {/* =========== STICKY ROBOT (stays visible across all 3 scenes) =========== */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-background" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />

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

        {/* 3D Robot — centered */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div className="relative w-[300px] h-[400px] sm:w-[400px] sm:h-[500px] md:w-[550px] md:h-[650px] lg:w-[600px] lg:h-[700px] pointer-events-auto">
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
          </div>
        </div>

        {/* =========== SCENE 1: HERO =========== */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="absolute inset-0 z-20 flex items-center pointer-events-none"
        >
          <div className="container flex flex-col md:flex-row items-center justify-between w-full h-full md:h-auto py-24 md:py-0">
            {/* LEFT — Name */}
            <motion.div
              style={{ pointerEvents: heroPointerEvents }}
              className="relative z-50 w-full md:w-[320px] lg:w-[360px] pl-0 md:pl-16 text-center md:text-left mb-auto md:mb-0"
            >
              <span className="text-xs sm:text-sm md:text-base font-medium text-gold uppercase tracking-widest block mb-2 md:mb-4">
                Hello! I'm
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-7xl font-display font-bold text-foreground leading-tight tracking-tighter">
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

            {/* RIGHT — Role + Buttons */}
            <motion.div
              style={{ pointerEvents: heroPointerEvents }}
              className="relative z-50 w-full md:w-[320px] lg:w-[360px] pr-0 md:pr-12 lg:pr-24 text-center md:text-right mt-auto md:mt-0"
            >
              <h2 className="text-xl sm:text-2xl md:text-2xl lg:text-4xl font-display font-bold text-foreground mb-6 md:mb-8 tracking-tight whitespace-normal md:whitespace-nowrap">
                An <span className="text-gold">AI/ML</span> Engineer
              </h2>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-end">
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
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* =========== SCENE 2: ABOUT ME =========== */}
        <motion.div
          style={{ opacity: aboutOpacity }}
          className="absolute inset-0 z-20 flex items-center pointer-events-none"
        >
          <div className="container">
            <motion.div style={{ pointerEvents: aboutPointerEvents }} className="ml-auto w-full md:max-w-xl pt-24 md:pt-0">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-4 text-center md:text-left">
                About{' '}
                <motion.span
                  className="text-gold inline-block"
                  animate={{
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
                className="h-px bg-gradient-to-r from-gold/50 to-transparent w-32 md:w-48 mb-6 md:mb-8 mx-auto md:mx-0"
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                viewport={{ once: true }}
              />

              <div 
                onMouseMove={handleAboutMouseMove}
                className="relative group bg-card/10 backdrop-blur-xl border border-gold/10 rounded-2xl p-8 hover:border-gold/30 transition-all duration-700 overflow-hidden"
              >
                {/* Dynamic Spotlight Glow */}
                <motion.div
                  className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-500 group-hover:opacity-100"
                  style={{ background: aboutBackgroundGlow }}
                />

                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-gold/40 rounded-tl-xl transition-all duration-500 group-hover:w-8 group-hover:h-8" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-gold/40 rounded-br-xl transition-all duration-500 group-hover:w-8 group-hover:h-8" />

                <div className="relative z-10 space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed">
                  <p>
                    I'm an <span className="text-gold font-medium">AI/ML engineer</span> and data-driven problem solver with a strong foundation in Python and machine learning. I enjoy building intelligent systems that move beyond theory into real-world impact.
                  </p>
                  <p>
                    I have hands-on experience with tools like NumPy, Pandas, Scikit-learn, and PyTorch, and I am continuously improving my skills in advanced machine learning and production systems.
                  </p>
                  <p>
                    Currently, I am building projects to deepen my understanding of both <span className="text-gold font-medium">machine learning and deep learning</span>, while strengthening my ability to design practical, real-world solutions.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* =========== SCENE 3: WHAT I DO =========== */}
        <motion.div
          style={{ opacity: whatIdoOpacity }}
          className="absolute inset-0 z-20 flex items-center pointer-events-none"
        >
          <div className="container">
            <div className="flex items-start gap-6 md:gap-12">
              {/* Vertical "WHAT I DO" label */}
              <div className="hidden lg:block flex-shrink-0">
                <h2
                  className="text-5xl xl:text-7xl font-display font-bold text-foreground whitespace-nowrap"
                  style={{ writingMode: 'vertical-lr', textOrientation: 'mixed' }}
                >
                  WHAT I <span className="text-gold">DO</span>
                </h2>
                <motion.div 
                  className="w-px h-32 bg-gradient-to-b from-gold/50 to-transparent ml-6 mt-8"
                  initial={{ scaleY: 0, originY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  viewport={{ once: true }}
                />
              </div>

              {/* Cards — on the right half */}
              <motion.div style={{ pointerEvents: whatIdoPointerEvents }} className="ml-auto max-w-md lg:max-w-lg space-y-4 w-full">
                <h2 className="lg:hidden text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                  WHAT I <span className="text-gold">DO</span>
                </h2>
                {skills.map((skill) => (
                  <SkillCard 
                    key={skill.id} 
                    skill={skill} 
                    isExpanded={expandedCard === skill.id}
                    onToggle={() => setExpandedCard(expandedCard === skill.id ? null : skill.id)}
                  />
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator (visible only at start) */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-30"
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
      </div>
    </div>
  );
}

function SkillCard({ skill, isExpanded, onToggle }: any) {
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
    <div className="relative group">
      {/* Dashed border card with corner brackets and spotlight */}
      <div 
        onMouseMove={handleMouseMove}
        className="relative border border-dashed border-border/40 rounded-xl p-5 md:p-6 hover:border-gold/30 transition-all duration-500 bg-card/10 backdrop-blur-md overflow-hidden cursor-pointer"
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
            <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mb-1 group-hover:text-gold transition-colors duration-300">
              {skill.title}
            </h3>
            <p className="text-muted-foreground text-xs md:text-sm mb-2">
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
              <div className="pt-2 pb-2">
                <p className="text-muted-foreground leading-relaxed mb-4 text-xs md:text-sm">
                  {skill.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {skill.tools.map((tool: string, i: number) => (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isExpanded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                      transition={{ delay: i * 0.05 + 0.1, duration: 0.3 }}
                      key={tool}
                      className="inline-block px-2.5 py-1 text-[10px] font-medium text-gold bg-gold/5 rounded-full border border-gold/20 shadow-[0_0_10px_rgba(212,175,55,0.05)] hover:bg-gold/15 transition-colors"
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
            className="flex-shrink-0 w-8 h-8 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground group-hover:border-gold/30 group-hover:text-gold transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
