import { motion } from 'framer-motion';

/**
 * ResumeButton Component
 * Fixed button in the bottom-right corner.
 * Opens resume link in a new tab (placeholder # for now).
 */
export function ResumeButton() {
  return (
    <motion.a
      href="https://drive.google.com/file/d/1xswhdZCG3ZYyVCFdoKlSwb-rhris9FKn/view?usp=drive_link"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      whileHover={{ scale: 1.05, color: '#D4AF37' }}
      className="fixed bottom-8 right-8 z-40 hidden md:flex items-center gap-3 text-muted-foreground hover:text-gold transition-colors duration-300 tracking-[0.3em] text-sm font-medium"
    >
      RESUME
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
        />
      </svg>
    </motion.a>
  );
}
