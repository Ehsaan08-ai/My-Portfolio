import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/** Returns true when viewport width >= 768px (md breakpoint) */
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth >= 768 : true
  );
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return isDesktop;
}

interface Project {
  id: string;
  number: string;
  title: string;
  description: string;
  technologies: string[];
  category: string;
  image: string;
  liveUrl?: string;
  githubUrl?: string;
}

/**
 * Projects Section — Pinned Horizontal Scroll
 * The section pins to the viewport and converts vertical scrolling
 * into horizontal card movement. Scrolling back up reverses seamlessly.
 * Enhanced with magnetic tilt, animated borders, and parallax effects.
 */
export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktop();

  const projects: Project[] = [
    {
      id: 'snapclass',
      number: '01',
      title: 'SnapClass',
      description:
        'AI-powered attendance management system using facial recognition and voice identification. Teachers take attendance in seconds via webcam, while students enjoy a seamless contactless check-in experience.',
      technologies: ['Python', 'Streamlit', 'dlib', 'Supabase', 'Resemblyzer'],
      category: 'AI / Full Stack',
      image: '/snapclass-cover.png',
      liveUrl: 'https://snap-class-landing-page-mu.vercel.app/',
      githubUrl: 'https://github.com/Ehsaan08-ai/SnapClass.git',
    },
    {
      id: 'ai-gym-coach',
      number: '02',
      title: 'Real-Time AI Gym Coach',
      description:
        'A real-time fitness coaching application using MediaPipe pose detection and Groq AI. Tracks exercises, counts reps, and provides live voice-based coaching feedback during workouts.',
      technologies: ['Python', 'MediaPipe', 'Groq AI', 'Streamlit', 'OpenCV'],
      category: 'Computer Vision',
      image: '/ai-gym-coach-cover.png',
      liveUrl: 'https://landing-page-ai-gym-coach.vercel.app/',
      githubUrl: 'https://github.com/Ehsaan08-ai/AI-GYM-COACH-.git',
    },
    {
      id: 'flappy-bird-rl',
      number: '05',
      title: 'Flappy Bird RL Agent',
      description:
        'A Deep Q-Network (DQN) based Reinforcement Learning agent trained to play Flappy Bird autonomously using reward-based learning.',
      technologies: ['Python', 'PyTorch', 'OpenAI Gym', 'DQN', 'NumPy'],
      category: 'Reinforcement Learning',
      image: '/flappy-bird-rl-cover.png',
      githubUrl: 'https://github.com/Ehsaan08-ai/RL-Agent-Playing-Flappy-Bird-Game.git',
    },
    {
      id: 'super-mario-rl',
      number: '06',
      title: 'Super Mario RL Agent',
      description:
        'A Reinforcement Learning agent built with Double DQN architecture to play Super Mario Bros, trained using gymnasium environments.',
      technologies: ['Python', 'PyTorch', 'Gymnasium', 'Double DQN', 'OpenCV'],
      category: 'Reinforcement Learning',
      image: '/mario-rl-cover.png',
      githubUrl: 'https://github.com/Ehsaan08-ai/Super-Mario-Playing-RL-Agent.git',
    },
    {
      id: 'cnn-image-classification',
      number: '03',
      title: 'Image Classification CNN',
      description:
        'Binary Image Classification system using Convolutional Neural Networks to accurately classify images of Cats and Dogs with high precision.',
      technologies: ['Python', 'Scikit-learn', 'Pytorch', 'CNN', 'NumPy'],
      category: 'Deep Learning',
      image: '/cnn-classification-cover.png',
      githubUrl: 'https://github.com/Ehsaan08-ai/Image-Classification-Using-CNN.git',
    },
    {
      id: 'handwritten-digit-classification',
      number: '04',
      title: 'Digit Classification CNN-RNN',
      description:
        'Handwritten Digit Classification system leveraging both CNN and RNN architectures for robust digit recognition on the MNIST dataset.',
      technologies: ['Python', 'Scikit-learn', 'Pytorch', 'CNN', 'RNN'],
      category: 'Deep Learning',
      image: '/digit-classification-cover.png',
      githubUrl: 'https://github.com/Ehsaan08-ai/HandWritten-Digit-Classification-using-CNN-RNN-.git',
    },
  ];

  useEffect(() => {
    // Only run GSAP horizontal scroll on desktop
    if (!isDesktop) return;

    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const getScrollAmount = () => {
      return -(track.scrollWidth - window.innerWidth);
    };

    const tween = gsap.to(track, {
      x: getScrollAmount,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${track.scrollWidth - window.innerWidth}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [isDesktop]);

  // ====== MOBILE LAYOUT ======
  if (!isDesktop) {
    return (
      <section id="work" className="relative bg-background py-20 overflow-hidden">
        {/* Background accents */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"
        />

        <div className="container relative z-10">
          {/* Sticky Section Header */}
          <div className="sticky top-16 z-20 bg-background/80 backdrop-blur-xl py-4 -mx-4 px-4 mb-8">
            <motion.h2
              className="text-3xl font-display font-bold text-foreground leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
            >
              My <span className="text-gold">Work</span>
            </motion.h2>
          </div>

          {/* Vertical cards with varied heights for Bento rhythm */}
          <div className="space-y-5">
            {projects.map((project, index) => (
              <MobileProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ====== DESKTOP LAYOUT (unchanged horizontal scroll) ======
  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative bg-background overflow-hidden"
    >
      {/* Animated background accents */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.05, 0.08, 0.05] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-0 left-1/3 w-80 h-80 bg-gold/5 rounded-full blur-3xl pointer-events-none"
      />

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-gold/20 rounded-full pointer-events-none"
          style={{ left: `${15 + i * 15}%`, top: `${20 + (i % 3) * 25}%` }}
          animate={{ y: [0, -30, 0], opacity: [0.2, 0.6, 0.2], scale: [1, 1.5, 1] }}
          transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.7 }}
        />
      ))}

      {/* Horizontal scroll track */}
      <div
        ref={trackRef}
        className="flex items-center"
        style={{ height: '100vh', willChange: 'transform' }}
      >
        {/* Section Header — first "panel" */}
        <div
          className="flex-shrink-0 flex flex-col justify-center px-12 md:px-20 lg:px-28"
          style={{ width: '40vw', minWidth: '340px' }}
        >
          <motion.div
            ref={headingRef}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-4xl md:text-5xl lg:text-7xl font-display font-bold text-foreground mb-4 leading-tight"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
            >
              My{' '}
              <motion.span
                className="text-gold inline-block"
                whileInView={{
                  textShadow: [
                    '0 0 0px rgba(212,175,55,0)',
                    '0 0 20px rgba(212,175,55,0.3)',
                    '0 0 0px rgba(212,175,55,0)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                Work
              </motion.span>
            </motion.h2>
            <motion.p
              className="text-muted-foreground text-base md:text-lg max-w-md leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Scroll to explore my featured projects —
            </motion.p>

            {/* Animated scroll hint */}
            <motion.div
              className="mt-8 flex items-center gap-3 text-muted-foreground/60"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="w-12 h-[2px] bg-gold/40 rounded-full origin-left"
                animate={{ scaleX: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
              <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
              <motion.svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ x: [0, 6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </motion.svg>
            </motion.div>
          </motion.div>
        </div>

        {/* Project Cards */}
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}

        {/* End spacer */}
        <div className="flex-shrink-0" style={{ width: '8vw' }} />
      </div>
    </section>
  );
}

/**
 * MobileProjectCard — Touch-optimized card with tap feedback and spring entrance.
 */
function MobileProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: '-50px' }}
      whileTap={{ scale: 0.96 }}
      className="bento-box overflow-hidden"
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-44 object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent pointer-events-none" />
        <span className="absolute top-3 left-3 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-full bg-gold/20 text-gold border border-gold/30 backdrop-blur-md">
          {project.category}
        </span>
        <span className="absolute bottom-2 right-3 text-4xl font-display font-bold text-white/10 leading-none">
          {project.number}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-display font-bold text-foreground mb-2">
          {project.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-white/5 text-muted-foreground border border-border/50"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg bg-gold text-background active:scale-95 transition-transform"
            >
              Try App
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gold border border-gold rounded-lg active:bg-gold/10 active:scale-95 transition-all"
            >
              GitHub
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/**
 * ProjectCard — Desktop: magnetic tilt effect, animated gradient border, parallax image.
 */
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Magnetic tilt values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 200,
    damping: 20,
  });

  // Parallax for the image
  const imageX = useSpring(useTransform(mouseX, [-0.5, 0.5], [10, -10]), {
    stiffness: 150,
    damping: 25,
  });
  const imageY = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
    stiffness: 150,
    damping: 25,
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <div
      className="flex-shrink-0 px-4 md:px-5"
      style={{ width: '420px', maxWidth: '85vw' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, rotateY: -5 }}
        whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
        transition={{
          duration: 0.7,
          delay: index * 0.08,
          ease: [0.22, 1, 0.36, 1],
        }}
        viewport={{ once: true, margin: '-10%' }}
        className="group h-full"
        style={{ perspective: '1200px' }}
      >
        <motion.div
          ref={cardRef}
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          className="relative h-full"
        >
          {/* Animated gradient border */}
          <motion.div
            className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10"
            style={{
              background:
                'linear-gradient(135deg, rgba(212,175,55,0.4), rgba(255,215,0,0.1), rgba(212,175,55,0.4))',
              backgroundSize: '200% 200%',
            }}
            animate={
              isHovered
                ? {
                    backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                  }
                : {}
            }
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />

          <div className="bento-box overflow-hidden h-full flex flex-col">
            {/* Project Image with parallax */}
            <div className="relative overflow-hidden">
              <motion.img
                src={project.image}
                alt={project.title}
                className="w-full h-48 md:h-52 object-cover"
                style={{ x: imageX, y: imageY, scale: isHovered ? 1.1 : 1 }}
                transition={{ duration: 0.7 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent pointer-events-none" />

              {/* Category badge with pulse glow */}
              <motion.span
                className="absolute top-4 left-4 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-full bg-gold/20 text-gold border border-gold/30 backdrop-blur-md"
                animate={
                  isHovered
                    ? {
                        boxShadow: [
                          '0 0 0px rgba(212,175,55,0)',
                          '0 0 15px rgba(212,175,55,0.3)',
                          '0 0 0px rgba(212,175,55,0)',
                        ],
                      }
                    : {}
                }
                transition={{ duration: 2, repeat: Infinity }}
              >
                {project.category}
              </motion.span>

              {/* Number watermark with depth */}
              <motion.span
                className="absolute bottom-3 right-4 text-5xl font-display font-bold text-white/10 leading-none"
                style={{ translateZ: isHovered ? '30px' : '0px' }}
              >
                {project.number}
              </motion.span>
            </div>

            {/* Content */}
            <div className="p-5 md:p-6 flex flex-col flex-1">
              <motion.h3
                className="text-lg md:text-xl font-display font-bold text-foreground group-hover:text-gold transition-colors duration-300 mb-2"
                layout
              >
                {project.title}
              </motion.h3>

              <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">
                {project.description}
              </p>

              {/* Tech tags with staggered hover animation */}
              <div className="flex flex-wrap gap-2 mb-5">
                {project.technologies.map((tech, techIndex) => (
                  <motion.span
                    key={tech}
                    className="px-2.5 py-1 text-[11px] font-medium rounded-md bg-white/5 text-muted-foreground border border-border/50 hover:border-gold/40 hover:text-gold hover:bg-gold/5 transition-all duration-300"
                    whileHover={{ scale: 1.08, y: -2 }}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + techIndex * 0.03 }}
                    viewport={{ once: true }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>

              {/* Links with enhanced hover effects */}
              <div className="flex gap-3 mt-auto">
                {project.liveUrl && (
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 relative overflow-hidden"
                    style={{ backgroundColor: '#D4AF37', color: '#1a1a1a' }}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: '0 0 25px rgba(212,175,55,0.4)',
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Shimmer effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
                      animate={{ translateX: ['-100%', '200%'] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
                    />
                    <span className="relative z-10">Try the App</span>
                    <svg className="w-4 h-4 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </motion.a>
                )}
                {project.githubUrl && (
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gold border border-gold rounded-lg hover:bg-gold/10 transition-all duration-300"
                    whileHover={{
                      scale: 1.05,
                      boxShadow: '0 0 15px rgba(212,175,55,0.15)',
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    GitHub
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                    </svg>
                  </motion.a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
