// src/components/GameHistoryTable.tsx
import React, { useState, useMemo } from 'react';
import { motion, Variants } from 'framer-motion';
import { generateDummyGames, DummyGame } from '../lib/dataUtils';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';

const ITEMS_PER_PAGE = 25;
const tableVariants: Variants = { /* ... same variants ... */ };

const GameHistoryTable: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const allGames = useMemo(() => generateDummyGames(100), []);
    const totalPages = Math.ceil(allGames.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentGames = allGames.slice(startIndex, endIndex);

    const formatDate = (date: Date | undefined): string => { /* ... same function ... */ };
    const getResultClass = (result: DummyGame['result']): string => { /* ... same function ... */ };
    const goToNextPage = () => { /* ... same function ... */ };
    const goToPreviousPage = () => { /* ... same function ... */ };

    return (
        <motion.div
            className="bg-light-card dark:bg-dark-card rounded-xl shadow-card dark:shadow-card-dark border border-light-border dark:border-dark-border transition-colors duration-300 overflow-hidden"
            variants={tableVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
        >
            <div className="px-5 py-4 sm:px-6 sm:py-5 border-b border-light-border dark:border-dark-border">
                 <h2 className="text-lg sm:text-xl font-semibold font-display text-gray-900 dark:text-gray-100"> Recent Game History (Placeholder) </h2>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full min-w-[700px] text-left text-sm">
                    <thead className="bg-slate-50 dark:bg-slate-700/50 text-xs text-slate-500 dark:text-slate-400 uppercase">
                        {/* Ensure no extra spaces/newlines between <tr> and <th> */}
                        <tr><th scope="col" className="py-3 px-4 sm:px-6 font-semibold">Result</th><th scope="col" className="py-3 px-4 sm:px-6 font-semibold">Opponent</th><th scope="col" className="py-3 px-4 sm:px-6 font-semibold">Mode</th><th scope="col" className="py-3 px-4 sm:px-6 font-semibold">Date</th><th scope="col" className="py-3 px-4 sm:px-6 font-semibold">Color</th><th scope="col" className="py-3 px-4 sm:px-6 font-semibold">Opening</th></tr>
                    </thead>
                    <tbody className="divide-y divide-light-border dark:divide-dark-border">
                        {currentGames.map((game, index) => (
                            // Ensure no extra spaces/newlines between <tr> and <td>
                            <tr key={game.id} className={clsx("transition-colors duration-150", index % 2 === 0 ? 'bg-white dark:bg-dark-card' : 'bg-slate-50/50 dark:bg-slate-800/30', 'hover:bg-slate-100 dark:hover:bg-slate-700/60')}>
                                <td className={clsx("py-3 px-4 sm:px-6 whitespace-nowrap", getResultClass(game.result))}>{game.result}</td>
                                <td className="py-3 px-4 sm:px-6 whitespace-nowrap text-gray-700 dark:text-gray-200">{game.opponentName} ({game.opponentRating})</td>
                                <td className="py-3 px-4 sm:px-6 whitespace-nowrap text-gray-600 dark:text-gray-300">{game.mode}</td>
                                <td className="py-3 px-4 sm:px-6 whitespace-nowrap text-gray-600 dark:text-gray-300">{formatDate(game.date)}</td>
                                <td className="py-3 px-4 sm:px-6 whitespace-nowrap text-gray-600 dark:text-gray-300">{game.myColor}</td>
                                <td className="py-3 px-4 sm:px-6 text-gray-600 dark:text-gray-300 truncate max-w-[150px]" title={game.opening}>{game.opening}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
           </div>

           <div className="flex items-center justify-between px-4 py-3 sm:px-6 border-t border-light-border dark:border-dark-border">
                {/* Pagination controls remain the same */}
                <span className="text-sm text-gray-600 dark:text-gray-400"> Page <span className="font-semibold text-gray-800 dark:text-gray-100">{currentPage}</span> of <span className="font-semibold text-gray-800 dark:text-gray-100">{totalPages}</span> </span>
                <div className="flex items-center space-x-2"> <button onClick={goToPreviousPage} disabled={currentPage === 1} className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-500 dark:focus-visible:ring-lime-400 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-light-bg dark:ring-offset-dark-bg border border-light-border dark:border-dark-border hover:bg-slate-100 dark:hover:bg-slate-700 h-9 w-9 p-0" aria-label="Previous page"> <ChevronLeftIcon className="w-5 h-5" /> </button> <button onClick={goToNextPage} disabled={currentPage === totalPages} className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-500 dark:focus-visible:ring-lime-400 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-light-bg dark:ring-offset-dark-bg border border-light-border dark:border-dark-border hover:bg-slate-100 dark:hover:bg-slate-700 h-9 w-9 p-0" aria-label="Next page"> <ChevronRightIcon className="w-5 h-5" /> </button> </div>
           </div>
        </motion.div>
    );
};

export default GameHistoryTable;
