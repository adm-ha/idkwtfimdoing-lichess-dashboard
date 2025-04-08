// src/components/GameHistoryTable.tsx
import React, { useState, useMemo } from 'react';
import { motion, Variants } from 'framer-motion'; // Import Variants
import { generateDummyGames, DummyGame } from '../lib/dataUtils'; // Import generator and type
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import clsx from 'clsx'; // For conditional classes

const ITEMS_PER_PAGE = 25;

// Animation variant for the table container
const tableVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut", delay: 0.2 } // Stagger slightly after charts if needed
    }
};


const GameHistoryTable: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);

    // Generate dummy data memoized (only runs once)
    // Ensure generateDummyGames is correctly creating dates
    const allGames = useMemo(() => generateDummyGames(100), []); // Generate 100 games

    const totalPages = Math.ceil(allGames.length / ITEMS_PER_PAGE);

    // Calculate games for the current page - this logic is standard
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentGames = allGames.slice(startIndex, endIndex);

    // --- Helper Functions ---

    // Function to format date - defined within component scope
    const formatDate = (date: Date | undefined): string => {
        if (!date) return 'N/A'; // Handle potential undefined date
        // Using current locale (Centerville, UT) for formatting as per context, or specific "en-US"
        try {
            return date.toLocaleDateString("en-US", {
                year: 'numeric', month: 'short', day: 'numeric' // e.g., "Apr 8, 2025"
                // Or use previously requested format:
                // year: '2-digit', month: 'numeric', day: 'numeric' // e.g., "4/8/25"
            });
        } catch (e) {
            console.error("Error formatting date:", e);
            return 'Invalid Date';
        }
    }

    // Helper for result styling - seems correct
    const getResultClass = (result: DummyGame['result']): string => {
       switch (result) {
           case 'Win': return 'text-green-600 dark:text-green-400 font-semibold';
           case 'Loss': return 'text-red-600 dark:text-red-400 font-semibold';
           case 'Draw': return 'text-gray-600 dark:text-gray-400 font-semibold';
           default: return '';
       }
    };

    // --- Pagination Handlers - seem correct ---
    const goToNextPage = () => {
        setCurrentPage((page) => Math.min(page + 1, totalPages));
    };
    const goToPreviousPage = () => {
        setCurrentPage((page) => Math.max(page - 1, 1));
    };


    return (
        <motion.div
            className="bg-light-card dark:bg-dark-card rounded-xl shadow-card dark:shadow-card-dark border border-light-border dark:border-dark-border transition-colors duration-300 overflow-hidden"
            variants={tableVariants} // Apply animation variants
            initial="hidden"
            whileInView="visible" // Use whileInView for scroll trigger
            viewport={{ once: true, amount: 0.1 }} // Trigger when 10% visible
        >
            {/* Header Section */}
            <div className="px-5 py-4 sm:px-6 sm:py-5 border-b border-light-border dark:border-dark-border">
                 <h2 className="text-lg sm:text-xl font-semibold font-display text-gray-900 dark:text-gray-100">
                   Recent Game History (Placeholder)
                 </h2>
            </div>

            {/* Table Section */}
            <div className="overflow-x-auto">
                <table className="w-full min-w-[700px] text-left text-sm">
                    <thead className="bg-slate-50 dark:bg-slate-700/50 text-xs text-slate-500 dark:text-slate-400 uppercase">
                        <tr>
                            <th scope="col" className="py-3 px-4 sm:px-6 font-semibold">Result</th>
                            <th scope="col" className="py-3 px-4 sm:px-6 font-semibold">Opponent</th>
                            <th scope="col" className="py-3 px-4 sm:px-6 font-semibold">Mode</th>
                            <th scope="col" className="py-3 px-4 sm:px-6 font-semibold">Date</th> {/* Date Column */}
                            <th scope="col" className="py-3 px-4 sm:px-6 font-semibold">Color</th>
                            <th scope="col" className="py-3 px-4 sm:px-6 font-semibold">Opening</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-light-border dark:divide-dark-border">
                        {currentGames.map((game, index) => (
                            <tr
                                key={game.id}
                                className={clsx(
                                    "transition-colors duration-150",
                                    index % 2 === 0 ? 'bg-white dark:bg-dark-card' : 'bg-slate-50/50 dark:bg-slate-800/30', // Zebra stripes
                                    'hover:bg-slate-100 dark:hover:bg-slate-700/60' // Enhanced hover
                                )}
                            >
                                <td className={clsx("py-3 px-4 sm:px-6 whitespace-nowrap", getResultClass(game.result))}>
                                    {game.result}
                                </td>
                                <td className="py-3 px-4 sm:px-6 whitespace-nowrap text-gray-700 dark:text-gray-200">
                                    {game.opponentName} ({game.opponentRating})
                                </td>
                                <td className="py-3 px-4 sm:px-6 whitespace-nowrap text-gray-600 dark:text-gray-300">{game.mode}</td>
                                {/* Use the formatDate helper */}
                                <td className="py-3 px-4 sm:px-6 whitespace-nowrap text-gray-600 dark:text-gray-300">{formatDate(game.date)}</td>
                                <td className="py-3 px-4 sm:px-6 whitespace-nowrap text-gray-600 dark:text-gray-300">{game.myColor}</td>
                                <td className="py-3 px-4 sm:px-6 text-gray-600 dark:text-gray-300 truncate max-w-[150px]" title={game.opening}>{game.opening}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

           {/* Pagination Controls Section */}
           <div className="flex items-center justify-between px-4 py-3 sm:px-6 border-t border-light-border dark:border-dark-border">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                  Page <span className="font-semibold text-gray-800 dark:text-gray-100">{currentPage}</span> of <span className="font-semibold text-gray-800 dark:text-gray-100">{totalPages}</span>
              </span>
              <div className="flex items-center space-x-2">
                  {/* Previous Button - Disabled logic and styling verified */}
                  <button
                      onClick={goToPreviousPage}
                      disabled={currentPage === 1}
                      className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-500 dark:focus-visible:ring-lime-400 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-light-bg dark:ring-offset-dark-bg border border-light-border dark:border-dark-border hover:bg-slate-100 dark:hover:bg-slate-700 h-9 w-9 p-0"
                      aria-label="Previous page"
                  >
                      <ChevronLeftIcon className="w-5 h-5" />
                  </button>
                  {/* Next Button - Disabled logic and styling verified */}
                  <button
                      onClick={goToNextPage}
                      disabled={currentPage === totalPages}
                      className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-500 dark:focus-visible:ring-lime-400 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-light-bg dark:ring-offset-dark-bg border border-light-border dark:border-dark-border hover:bg-slate-100 dark:hover:bg-slate-700 h-9 w-9 p-0"
                      aria-label="Next page"
                  >
                      <ChevronRightIcon className="w-5 h-5" />
                  </button>
              </div>
           </div>
        </motion.div>
    );
};

export default GameHistoryTable;
