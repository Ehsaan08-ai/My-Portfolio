import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface LuxuryCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
}

/**
 * LuxuryCard Component
 * Shadcn-style card with dark bronze border, backdrop blur, and smooth animations.
 * Used for projects, skills, and content sections.
 */
export function LuxuryCard({
  children,
  className = '',
  hover = true,
  delay = 0,
}: LuxuryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={hover ? { y: -8, transition: { duration: 0.3 } } : {}}
      className={`luxury-card p-6 md:p-8 transition-all duration-300 ${className}`}
    >
      {children}
    </motion.div>
  );
}
