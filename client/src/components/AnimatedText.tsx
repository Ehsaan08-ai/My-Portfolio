import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedTextProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
}

/**
 * AnimatedText Component
 * Reveals text with smooth fade and slide animations.
 * Used throughout the portfolio for engaging text reveals.
 */
export function AnimatedText({
  children,
  className = '',
  delay = 0,
  duration = 0.6,
  stagger = 0.05,
}: AnimatedTextProps) {
  const text = typeof children === 'string' ? children : '';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className={className}
    >
      {text.split('').map((char, index) => (
        <motion.span key={index} variants={itemVariants}>
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
}

/**
 * AnimatedParagraph Component
 * Reveals paragraphs word by word with smooth animations.
 */
interface AnimatedParagraphProps {
  children: string;
  className?: string;
  delay?: number;
  duration?: number;
}

export function AnimatedParagraph({
  children,
  className = '',
  delay = 0,
  duration = 0.4,
}: AnimatedParagraphProps) {
  const words = children.split(' ');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: delay,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 5 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration },
    },
  };

  return (
    <motion.p
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className={className}
    >
      {words.map((word, index) => (
        <motion.span key={index} variants={itemVariants}>
          {word}{' '}
        </motion.span>
      ))}
    </motion.p>
  );
}
