// src/components/StatCard.tsx
import React, { ReactNode } from 'react';
import { motion, Variants } from 'framer-motion'; // Import Variants type
import CountUp from 'react-countup'; // Import CountUp

interface StatCardProps {
  title: string;
  value: number; // Ensure value is number for CountUp
  icon?: ReactNode;
  className?: string;
  duration?: number; // Add duration prop for CountUp speed
  variants?: Variants; // Accept variants from parent
}

// Animation Variant for individual card entrance (can be overridden by props)
const defaultCardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: "easeOut" }
    }
};

const StatCard: React.FC<StatCardProps> = ({
    title,
    value,
    icon,
    className = '',
    duration = 1.5, // Default CountUp duration
    variants = defaultCardVariants // Use default or passed variants
}) => {
  // Ensure value is a valid number for CountUp, default to 0 if not
  const numericValue = typeof value === 'number' && !isNaN(value) ? value : 0;

  return (
    <motion.div
      className={`group relative overflow-hidden bg-light-card dark:bg-dark-card p-5 rounded-xl shadow-card dark:shadow-card-dark border border-light-border dark:border-dark-border transition-all duration-300 ease-in-out hover:shadow-card-hover dark:hover:shadow-card-dark-hover ${className}`}
      variants={variants} // Apply variants for entrance animation
      whileHover={{
          scale: 1.03,
          transition: { duration: 0.2 }
      }}
    >
      <div className="relative z-10 flex items-center space-x-4">
        {icon && (
          <div className="flex-shrink-0 rounded-lg bg-slate-100 dark:bg-slate-700 p-3">
            {icon}
          </div>
        )}
        <div className="flex-1 min-w-0"> {/* Added min-w-0 for flex truncation */}
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
            {title}
          </p>
          <p className="mt-1 text-3xl font-semibold font-display text-gray-900 dark:text-white">
             {/* Use CountUp */}
             <CountUp
                start={0}
                end={numericValue}
                duration={duration}
                separator="," // Optional: add comma separators
                useEasing={true}
                preserveValue={true} // Keep final value visible after animation
             />
          </p>
        </div>
      </div>
    </motion.div>
  );
};
export default StatCard;
