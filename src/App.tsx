// src/App.tsx
import React from 'react';
import ThemeToggle from './components/ThemeToggle';
import StatCard from './components/StatCard';
import RatingChart from './components/RatingChart';
import GameHistoryTable from './components/GameHistoryTable';
// Import new 3D components
import FloatingKingPiece from './components/FloatingKingPiece'; // Renamed/Updated
import FloatingQueenPiece from './components/FloatingQueenPiece'; // New
import { calculateOverallStats, formatDataForChart } from './lib/dataUtils';
import { ArrowUpIcon, ArrowDownIcon, LapTimerIcon, BarChartIcon } from '@radix-ui/react-icons';
import { motion, Variants } from 'framer-motion';
import colors from 'tailwindcss/colors';

// --- Animation Variants ---
const sectionContainerVariants: Variants = { /* ... */ };
const itemVariants: Variants = { /* ... */ };

function App() {
  const { highestRating, lowestRating, averageRating, totalGames } = calculateOverallStats();
  const bulletChartData = formatDataForChart('Bullet');
  const blitzChartData = formatDataForChart('Blitz');
  const viewportConfig = { once: true, amount: 0.15 };

  return (
    <div className="flex flex-col min-h-screen relative">

       {/* --- REMOVED Top-Left Image Placeholder --- */}
       {/* The FloatingQueenPiece component below replaces this */}

       {/* Header Area remains the same */}
       <header className="sticky top-0 z-20 w-full backdrop-blur-lg bg-white/80 dark:bg-dark-bg/80 border-b border-light-border dark:border-dark-border shadow-sm transition-colors duration-300">
         <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-center">
           <h1 className="text-2xl sm:text-3xl font-semibold text-center">
             <a href="https://lichess.org/@/idkwtfimdoing" target="_blank" rel="noopener noreferrer" className="inline-block bg-gradient-to-t from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity" title="View Lichess Profile" >
                idkwtfimdoing
             </a>
           </h1>
           <div className="absolute right-4 sm:right-6 lg:right-8 top-1/2 -translate-y-1/2">
              <ThemeToggle />
           </div>
         </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 z-10">
         <div className="flex flex-col gap-6 sm:gap-8">
            {/* Stat Cards Section */}
            <motion.div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" initial="hidden" whileInView="visible" viewport={viewportConfig} variants={sectionContainerVariants} custom={1} >
              <StatCard variants={itemVariants} title="Highest Rating" value={highestRating} icon={<ArrowUpIcon width={24} height={24} className="text-accent-green" />} duration={1.2} />
              <StatCard variants={itemVariants} title="Lowest Rating" value={lowestRating} icon={<ArrowDownIcon width={24} height={24} className="text-accent-red" />} duration={1.4} />
              <StatCard variants={itemVariants} title="Average Rating" value={averageRating} icon={<BarChartIcon width={24} height={24} className="text-accent-blue" />} duration={1.6} />
              <StatCard variants={itemVariants} title="Tracked Games" value={totalGames} icon={<LapTimerIcon width={24} height={24} className="text-accent-purple" />} duration={1.8} />
            </motion.div>

            {/* Charts Section */}
            <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8" initial="hidden" whileInView="visible" viewport={viewportConfig} variants={sectionContainerVariants} custom={2} >
              <RatingChart title="Bullet Rating History" chartData={bulletChartData} lineColor={colors.red[500]} />
              <RatingChart title="Blitz Rating History" chartData={blitzChartData} lineColor={colors.sky[500]} />
            </motion.div>

            {/* Game History Table Section */}
             <GameHistoryTable />
        </div>
      </main>

      {/* Footer Area */}
      <footer className="text-center py-5 text-xs text-gray-500 dark:text-gray-400 border-t border-light-border dark:border-dark-border transition-colors duration-300 z-10">
         Powered by Vite, Radix, Tailwind, Chart.js, Framer Motion, react-countup, Three.js. Data from Lichess (Static).
      </footer>

      {/* Render BOTH 3D pieces */}
      <FloatingQueenPiece /> {/* Top Left */}
      <FloatingKingPiece /> {/* Bottom Right */}

    </div>
  )
}
export default App;
