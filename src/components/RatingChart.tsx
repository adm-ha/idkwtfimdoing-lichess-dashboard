// src/components/RatingChart.tsx
import React, { useMemo } from 'react'; // Import useMemo
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from 'chart.js';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import colors from 'tailwindcss/colors';

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend
);

interface RatingChartProps {
  title: string;
  chartData: ChartData<'line'>; // Received Prop
  lineColor?: string;
  className?: string;
}

const RatingChart: React.FC<RatingChartProps> = ({
    title: chartTitle, chartData, lineColor = '#84cc16', className = ''
}) => {
  const { theme } = useTheme(); // Get theme for styling
  const isDark = theme === 'dark';

  // --- Derived/Memoized Data for Chart ---
  const themedChartData = useMemo(() => {
    // Safety Check: Ensure chartData and datasets are valid before mapping
    if (!chartData || !Array.isArray(chartData.datasets)) {
      console.warn("RatingChart received invalid chartData prop:", chartData);
      return { labels: [], datasets: [] }; // Return default empty structure
    }

    // Define colors based on theme INSIDE useMemo or ensure theme changes trigger re-memoization
    const gridColor = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)';
    const textColor = isDark ? colors.slate[300] : colors.slate[600];
    const pointBgColor = isDark ? '#1e293b' : '#ffffff'; // Match card bg

    return {
      ...chartData, // Spread existing labels, etc.
      datasets: chartData.datasets.map(dataset => ({ // Now safe to map
          ...dataset, // Spread original dataset properties (like data, tension etc.)
          // Apply theme-dependent styling
          borderColor: lineColor,
          backgroundColor: lineColor, // For tooltips mainly
          pointRadius: 0,
          pointHoverRadius: 5,
          pointBackgroundColor: pointBgColor,
          pointBorderColor: lineColor,
          pointHoverBackgroundColor: lineColor,
          pointHoverBorderColor: pointBgColor,
          borderWidth: 2,
      })),
    };
    // Dependency array includes chartData and theme (if colors depend on it)
  }, [chartData, lineColor, isDark]); // Added isDark dependency

  // --- Chart Options ---
  // Define colors based on theme OUTSIDE useMemo for options object clarity
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)';
  const textColor = isDark ? colors.slate[300] : colors.slate[600];
  const axisTitleColor = isDark ? colors.slate[400] : colors.slate[500];
  const titleColor = isDark ? colors.slate[100] : colors.slate[800];

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        // ... plugins config remains the same ...
        legend: { display: false },
        title: { display: true, text: chartTitle, color: titleColor, font: { size: 16, family: "'Inter', sans-serif", weight: 600 }, padding: { top: 5, bottom: 15 } },
        tooltip: { backgroundColor: isDark ? 'rgba(45, 55, 72, 0.9)' : 'rgba(255, 255, 255, 0.9)', titleColor: isDark ? colors.slate[100] : colors.slate[700], bodyColor: isDark ? colors.slate[200] : colors.slate[600], borderColor: gridColor, borderWidth: 1, padding: 10, boxPadding: 5, usePointStyle: true, titleFont: { family: "'Inter', sans-serif", weight: 'bold' }, bodyFont: { family: "'Inter', sans-serif" } }
    },
    scales: {
        // ... scales config remains the same (with previous fixes) ...
        x: { title: { display: true, text: 'Date', color: axisTitleColor, font: { size: 12, family: "'Inter', sans-serif", weight: 500 }, padding: { top: 10 } }, ticks: { color: textColor, font: { family: "'Inter', sans-serif", size: 10 }, maxRotation: 45, minRotation: 45, autoSkip: true, maxTicksLimit: 10 }, grid: { display: false }, border: { color: gridColor, display: true } },
        y: { title: { display: true, text: 'Rating', color: axisTitleColor, font: { size: 12, family: "'Inter', sans-serif", weight: 500 }, padding: { bottom: 10 } }, ticks: { color: textColor, font: { family: "'Inter', sans-serif" }, padding: 5 }, grid: { color: gridColor } } // Removed invalid drawBorder
    },
    interaction: { mode: 'index', intersect: false },
  };

  return (
     <motion.div
        className={`bg-light-card dark:bg-dark-card p-4 rounded-xl shadow-card dark:shadow-card-dark border border-light-border dark:border-dark-border transition-colors duration-300 ${className}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
     >
       {/* Render only if data is minimally valid */}
       {themedChartData.datasets.length > 0 ? (
           <div style={{ height: '300px' }}>
              <Line options={options} data={themedChartData} />
           </div>
       ) : (
           <div style={{ height: '300px' }} className="flex items-center justify-center text-gray-500">Loading chart data...</div> // Optional loading/empty state
       )}
    </motion.div>
  );
};

export default RatingChart;
