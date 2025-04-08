// src/components/ThemeToggle.tsx
import React from 'react';
import * as Switch from '@radix-ui/react-switch';
import { SunIcon, MoonIcon } from '@radix-ui/react-icons';
// import { useTheme } from '../context/ThemeContext'; // Old path
import { useTheme } from '../hooks/useTheme'; // *** NEW PATH ***
import { motion } from 'framer-motion'; // For subtle animation

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.5 }}
      className="flex items-center space-x-2"
    >
      <SunIcon className={`w-5 h-5 transition-colors ${isDark ? 'text-gray-500' : 'text-yellow-500'}`} />
      <Switch.Root
        className="w-[42px] h-[25px] bg-gray-300 dark:bg-gray-700 rounded-full relative data-[state=checked]:bg-indigo-600 dark:data-[state=checked]:bg-indigo-400 outline-none cursor-pointer transition-colors"
        checked={isDark}
        onCheckedChange={toggleTheme}
        aria-label="Toggle theme"
      >
        <Switch.Thumb className="block w-[21px] h-[21px] bg-white rounded-full shadow-sm transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
      </Switch.Root>
      <MoonIcon className={`w-5 h-5 transition-colors ${isDark ? 'text-indigo-400' : 'text-gray-500'}`} />
    </motion.div>
  );
};

export default ThemeToggle;
